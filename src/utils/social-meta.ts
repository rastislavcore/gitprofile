/**
 * Updates Open Graph, Twitter, and related meta tags in the document `head`.
 * Only sets attributes for properties that are passed.
 */
export function updateDocumentSocialMeta(opts: {
  imageUrl?: string;
  title?: string;
  description?: string;
}): void {
  const setContent = (sel: string, value: string) => {
    const el = document.querySelector(sel);
    if (el) {
      el.setAttribute('content', value);
    }
  };

  if (opts.imageUrl) {
    setContent('meta[property="og:image"]', opts.imageUrl);
    setContent('meta[property="og:image:secure_url"]', opts.imageUrl);
    setContent('meta[name="twitter:image"]', opts.imageUrl);
    setContent('meta[itemprop="image"]', opts.imageUrl);
  }

  if (opts.title) {
    document.title = opts.title;
    setContent('meta[property="title"]', opts.title);
    setContent('meta[property="og:title"]', opts.title);
    setContent('meta[name="twitter:title"]', opts.title);
    setContent('meta[itemprop="name"]', opts.title);
  }

  if (opts.description) {
    setContent('meta[name="description"]', opts.description);
    setContent('meta[property="og:description"]', opts.description);
    setContent('meta[name="twitter:description"]', opts.description);
    setContent('meta[itemprop="description"]', opts.description);
  }
}
