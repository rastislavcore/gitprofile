import axios from 'axios';

const MAX_REQUEST_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 300;

function shouldRetry(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return false;
  if (!error.response) return true;

  return error.response.status === 429 || error.response.status >= 500;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function withRetry<T>(request: () => Promise<T>): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_REQUEST_ATTEMPTS; attempt += 1) {
    try {
      return await request();
    } catch (error) {
      lastError = error;
      if (!shouldRetry(error) || attempt === MAX_REQUEST_ATTEMPTS - 1) {
        throw error;
      }

      await wait(RETRY_BASE_DELAY_MS * 2 ** attempt);
    }
  }

  throw lastError;
}

function parseFediverseHandle(
  handle: string | undefined,
): { username: string; server: string } | undefined {
  if (!handle?.trim()) return undefined;
  const value = handle.trim();
  const indexOfAt = value.lastIndexOf('@');
  if (indexOfAt <= 0) return undefined;
  const username = value.substring(1, indexOfAt);
  const server = value.substring(indexOfAt + 1);
  if (!username || !server) return undefined;
  return { username, server };
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface FediverseProfileResult {
  avatarUrl?: string;
  displayName?: string;
  description?: string;
}

/**
 * Profile fields from a Fediverse handle (`@user@instance`).
 * Tries Misskey `users/show` first, then the Mastodon-compatible API.
 * Public profile endpoints do not require an API key.
 */
export async function fetchFediverseProfile(
  handle: string | undefined,
): Promise<FediverseProfileResult> {
  const parsed = parseFediverseHandle(handle);
  if (!parsed) return {};

  const { username, server } = parsed;
  const base = `https://${server}`;
  try {
    const { data } = await withRetry(() =>
      axios.post<{
        avatarUrl?: string | null;
        name?: string | null;
        description?: string | null;
      }>(
        `${base}/api/users/show`,
        { username },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 15000,
        },
      ),
    );
    if (data) {
      return {
        avatarUrl: data.avatarUrl || undefined,
        displayName: data.name?.trim() || undefined,
        description: data.description?.trim() || undefined,
      };
    }
  } catch {
    /* not Misskey-compatible or temporarily unreachable */
  }

  const acct = `${username}@${server}`;

  try {
    const { data } = await withRetry(() =>
      axios.get<{
        avatar?: string;
        avatar_static?: string;
        display_name?: string;
        note?: string;
      }>(`${base}/api/v1/accounts/lookup`, {
        params: { acct },
        timeout: 15000,
      }),
    );
    if (data) {
      const notePlain = data.note ? stripHtml(data.note) : undefined;
      return {
        avatarUrl: data.avatar_static || data.avatar,
        displayName: data.display_name?.trim() || undefined,
        description: notePlain || undefined,
      };
    }
  } catch {
    return {};
  }

  return {};
}
