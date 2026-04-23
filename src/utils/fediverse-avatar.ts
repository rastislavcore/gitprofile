import axios from 'axios';

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
 * Tries Mastodon-compatible API first, then Misskey `users/show`.
 */
export async function fetchFediverseProfile(
  handle: string | undefined,
): Promise<FediverseProfileResult> {
  const parsed = parseFediverseHandle(handle);
  if (!parsed) return {};

  const { username, server } = parsed;
  const base = `https://${server}`;
  const acct = `${username}@${server}`;

  try {
    const { data } = await axios.get<{
      avatar?: string;
      avatar_static?: string;
      display_name?: string;
      note?: string;
    }>(`${base}/api/v1/accounts/lookup`, {
      params: { acct },
      timeout: 15000,
    });
    if (data) {
      const notePlain = data.note ? stripHtml(data.note) : undefined;
      return {
        avatarUrl: data.avatar_static || data.avatar,
        displayName: data.display_name?.trim() || undefined,
        description: notePlain || undefined,
      };
    }
  } catch {
    /* not Mastodon-compatible or unreachable */
  }

  try {
    const { data } = await axios.post<{
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
    );
    if (data) {
      return {
        avatarUrl: data.avatarUrl || undefined,
        displayName: data.name?.trim() || undefined,
        description: data.description?.trim() || undefined,
      };
    }
  } catch {
    return {};
  }

  return {};
}
