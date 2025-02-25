// Helper: Extract the full pathname from the URL.
export const extractPathname = (url: string): string | null => {
  try {
    return new URL(url).pathname.slice(1);
  } catch {
    return null;
  }
};

// Helper: Extract domain + pathname from the URL.
export const extractDomainAndPath = (url: string): string => {
  const parsedUrl = new URL(url);
  // Remove 'www.' from the hostname if it exists.
  const hostname = parsedUrl.hostname.replace(/^www\./, "");
  return `${hostname}${parsedUrl.pathname}`;
};
