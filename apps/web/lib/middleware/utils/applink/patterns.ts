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

// YouTube
export const youtubePatterns = [
  buildFlexibleDomainPattern("youtube"),
  buildExactDomainPattern("youtu.be"),
];

// TikTok
export const tiktokPatterns = [buildFlexibleDomainPattern("tiktok")];

// Instagram
export const instagramPatterns = [
  buildFlexibleDomainPattern("instagram"),
  buildExactDomainPattern("instagr.am"),
];

// Amazon
export const amazonPatterns = [
  buildFlexibleDomainPattern("amazon"),
  buildExactDomainPattern("amzn.to"),
  // TODO: amaz.?
];

// Facebook
export const facebookPatterns = [
  buildFlexibleDomainPattern("facebook"),
  buildExactDomainPattern("fb.me"),
];

// X
export const xPatterns = [buildFlexibleDomainPattern("x.com")];

// LinkedIn
export const linkedinPatterns = [
  buildFlexibleDomainPattern("linkedin"),
  buildExactDomainPattern("lnkd.in"),
];

// Medium
export const mediumPatterns = [buildFlexibleDomainPattern("medium")];

// Spotify
export const spotifyPatterns = [
  buildFlexibleDomainPattern("spotify"),
  buildExactDomainPattern("spoti.fi"),
];

// Whatsapp
export const whatsappPatterns = [
  buildExactDomainPattern("wa.me"),
  buildFlexibleDomainPattern("whatsapp"),
];

// Snapchat
export const snapchatPatterns = [
  buildFlexibleDomainPattern("snapchat")
];

// Telegram
export const telegramPatterns = [
  buildExactDomainPattern("t.me"),
];


// Messenger
export const messengerPatterns = [
  buildFlexibleDomainPattern("messenger"),
  buildExactDomainPattern("m.me"),
];

