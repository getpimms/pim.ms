// Helper: Build a flexible regex pattern for the given keyword.
// This will match URLs starting with http(s)://, allowing any subdomains,
// then the keyword followed by a dot and any TLD.
const buildFlexibleDomainPattern = (keyword: string): RegExp =>
  new RegExp(`^https?:\\/\\/(?:[a-z0-9-]+\\.)*${keyword}\\.[a-z]+\\/.*`, "i");

// Helper: Build an exact regex pattern for a specific domain (including its TLD).
// This ensures that only the given domain (with optional "www.") is matched.
const buildExactDomainPattern = (domain: string): RegExp =>
  new RegExp(
    `^https?:\\/\\/(?:www\\.)?${domain.replace(".", "\\.")}(?:\\/.*)?$`,
    "i",
  );

// YouTube: Allow any URL from a domain containing "youtube" and exactly "youtu.be".
export const youtubePatterns = [
  buildFlexibleDomainPattern("youtube"),
  buildExactDomainPattern("youtu.be"),
];

// TikTok: Allow flexible matching for "tiktok".
export const tiktokPatterns = [buildFlexibleDomainPattern("tiktok")];

// Instagram: Flexible for "instagram" plus strict match for "instagr.am".
export const instagramPatterns = [
  buildFlexibleDomainPattern("instagram"),
  buildExactDomainPattern("instagr.am"),
];

// Amazon: Flexible for "amazon" and strict match for "amzn.to".
export const amazonPatterns = [
  buildFlexibleDomainPattern("amazon"),
  buildExactDomainPattern("amzn.to"),
];

// Facebook: Flexible for "facebook" and strict match for "fb.me".
export const facebookPatterns = [
  buildFlexibleDomainPattern("facebook"),
  buildExactDomainPattern("fb.me"),
];

// X: Flexible for "x.com"
export const xPatterns = [buildFlexibleDomainPattern("x.com")];

// LinkedIn: Flexible for "linkedin" and strict match for "lnkd.in".
export const linkedinPatterns = [
  buildFlexibleDomainPattern("linkedin"),
  buildExactDomainPattern("lnkd.in"),
];

// Medium: Use a flexible pattern only.
export const mediumPatterns = [buildFlexibleDomainPattern("medium")];

// Spotify: Flexible for "spotify" and strict match for "spoti.fi".
export const spotifyPatterns = [
  buildFlexibleDomainPattern("spotify"),
  buildExactDomainPattern("spoti.fi"),
];
