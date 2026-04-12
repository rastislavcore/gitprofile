/**
 * Updates `<link rel="icon">` to the given image URL (e.g. Fediverse avatar).
 */
export function setFaviconHref(imageUrl: string): void {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  try {
    const u = new URL(imageUrl, window.location.origin);
    if (u.hostname.includes('avatars.githubusercontent.com')) {
      u.searchParams.set('s', '32');
    }
    link.href = u.toString();
  } catch {
    link.href = imageUrl;
  }

  link.removeAttribute('type');
}
