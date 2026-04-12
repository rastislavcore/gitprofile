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

/**
 * Resolve profile image URL from a Fediverse handle (`@user@instance`).
 * Tries Mastodon-compatible API first, then Misskey `users/show`.
 */
export async function fetchFediverseAvatarUrl(
  handle: string | undefined,
): Promise<string | undefined> {
  const parsed = parseFediverseHandle(handle);
  if (!parsed) return undefined;

  const { username, server } = parsed;
  const base = `https://${server}`;
  const acct = `${username}@${server}`;

  try {
    const { data } = await axios.get<{
      avatar?: string;
      avatar_static?: string;
    }>(`${base}/api/v1/accounts/lookup`, {
      params: { acct },
      timeout: 15000,
    });
    if (data?.avatar_static || data?.avatar) {
      return data.avatar_static || data.avatar;
    }
  } catch {
    /* not Mastodon-compatible or unreachable */
  }

  try {
    const { data } = await axios.post<{ avatarUrl?: string | null }>(
      `${base}/api/users/show`,
      { username },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      },
    );
    if (data?.avatarUrl) {
      return data.avatarUrl;
    }
  } catch {
    return undefined;
  }

  return undefined;
}
