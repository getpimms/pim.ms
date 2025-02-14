"use client";

interface AppLink {
  appName: string;
  urlPatterns: RegExp[];
  uriScheme: string;
  extractId?: (url: string) => string | null;
  constructUri?: (id: string, originalUrl?: string) => string;
}

// Helper: Extract the full pathname from the URL.
const extractPathname = (url: string): string | null => {
  try {
    return new URL(url).pathname;
  } catch {
    return null;
  }
};

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
    "i"
  );

/* ========================
   Define Regular Expression Arrays
======================== */

// YouTube: Allow any URL from a domain containing "youtube" and exactly "youtu.be".
const youtubePatterns = [
  buildFlexibleDomainPattern("youtube"),
  buildExactDomainPattern("youtu.be"),
];

// TikTok: Allow flexible matching for "tiktok".
const tiktokPatterns = [buildFlexibleDomainPattern("tiktok")];

// Instagram: Flexible for "instagram" plus strict match for "instagr.am".
const instagramPatterns = [
  buildFlexibleDomainPattern("instagram"),
  buildExactDomainPattern("instagr.am"),
];

// Amazon: Flexible for "amazon" and strict match for "amzn.to".
const amazonPatterns = [
  buildFlexibleDomainPattern("amazon"),
  buildExactDomainPattern("amzn.to"),
];

// Facebook: Flexible for "facebook" and strict match for "fb.me".
const facebookPatterns = [
  buildFlexibleDomainPattern("facebook"),
  buildExactDomainPattern("fb.me"),
];

// Twitter: Flexible for "twitter" and strict match for "t.co".
const twitterPatterns = [
  buildFlexibleDomainPattern("twitter"),
  buildExactDomainPattern("t.co"),
];

// LinkedIn: Flexible for "linkedin" and strict match for "lnkd.in".
const linkedinPatterns = [
  buildFlexibleDomainPattern("linkedin"),
  buildExactDomainPattern("lnkd.in"),
];

// Medium: Use a flexible pattern only.
const mediumPatterns = [buildFlexibleDomainPattern("medium")];

// Spotify: Flexible for "spotify" and strict match for "spoti.fi".
const spotifyPatterns = [
  buildFlexibleDomainPattern("spotify"),
  buildExactDomainPattern("spoti.fi"),
];

/* ========================
   Facebook-Specific Helper
======================== */

// This helper attempts to detect several Facebook URL types.
// If the pathname starts with "groups", "events", "videos", or "posts", we generate a deep link accordingly.
// Otherwise, we fallback to treating it as a profile.
const constructFacebookDeepLink = (originalUrl: string): string | null => {
  try {
    const parsedUrl = new URL(originalUrl);
    const segments = parsedUrl.pathname.split("/").filter(Boolean);
    if (segments.length === 0) return null;

    // Case: Facebook Group – URL: /groups/{groupId}/...
    if (segments[0].toLowerCase() === "groups" && segments[1]) {
      return `fb://group?id=${segments[1]}`;
    }
    // Case: Facebook Event – URL: /events/{eventId}/...
    if (segments[0].toLowerCase() === "events" && segments[1]) {
      return `fb://event?id=${segments[1]}`;
    }
    // Case: Facebook Video – URL might be /{username}/videos/{videoId}/...
    const videoIndex = segments.findIndex((s) => s.toLowerCase() === "videos");
    if (videoIndex !== -1 && segments[videoIndex + 1]) {
      return `fb://video?id=${segments[videoIndex + 1]}`;
    }
    // Case: Facebook Post – URL: /{username}/posts/{postId}/...
    const postIndex = segments.findIndex((s) => s.toLowerCase() === "posts");
    if (postIndex !== -1 && segments[postIndex + 1]) {
      return `fb://story/?id=${segments[postIndex + 1]}`;
    }
    // Fallback: Treat as a profile/page.
    return `fb://profile?username=${segments[0]}`;
  } catch {
    return null;
  }
};

/* ========================
   Spotify-Specific Helper
======================== */

const constructSpotifyDeepLink = (originalUrl: string): string | null => {
  try {
    const parsedUrl = new URL(originalUrl);
    const segments = parsedUrl.pathname.split("/").filter(Boolean);
    // Expected URL format: /{type}/{id}
    if (segments.length >= 2) {
      const [resourceType, resourceId] = segments;
      if (["track", "album", "artist", "playlist"].includes(resourceType.toLowerCase())) {
        return `spotify:${resourceType}:${resourceId}`;
      }
    }
    return null;
  } catch {
    return null;
  }
};

/* ========================
   AppLinks Array
======================== */

const appLinks: AppLink[] = [
  {
    appName: "YouTube",
    urlPatterns: youtubePatterns,
    uriScheme: "vnd.youtube://",
    extractId: extractPathname,
    constructUri: (path: string) => `vnd.youtube://${path}`,
  },
  {
    appName: "TikTok",
    urlPatterns: tiktokPatterns,
    uriScheme: "snssdk1233://",
    extractId: extractPathname,
    constructUri: (path: string) => `snssdk1233://${path}`,
  },
  {
    appName: "Instagram",
    urlPatterns: instagramPatterns,
    uriScheme: "instagram://",
    // Use custom Instagram deep linking logic
    extractId: extractPathname,
    constructUri: (_: string, originalUrl?: string) =>
      originalUrl ? (constructInstagramDeepLink(originalUrl) || "instagram://") : "instagram://",
  },
  {
    appName: "Amazon",
    urlPatterns: amazonPatterns,
    uriScheme: "amazon://",
    extractId: extractPathname,
    constructUri: (path: string) => `amazon://${path}`,
  },
  {
    appName: "Facebook",
    urlPatterns: facebookPatterns,
    uriScheme: "fb://",
    extractId: extractPathname,
    // Use the updated Facebook-specific helper
    constructUri: (_: string, originalUrl?: string) =>
      originalUrl ? (constructFacebookDeepLink(originalUrl) || "fb://") : "fb://",
  },
  {
    appName: "Twitter",
    urlPatterns: twitterPatterns,
    uriScheme: "twitter://",
    extractId: extractPathname,
    constructUri: (path: string) => `twitter://${path}`,
  },
  {
    appName: "LinkedIn",
    urlPatterns: linkedinPatterns,
    uriScheme: "linkedin://",
    extractId: extractPathname,
    constructUri: (path: string) => `linkedin://${path}`,
  },
  {
    appName: "Medium",
    urlPatterns: mediumPatterns,
    uriScheme: "medium://",
    extractId: extractPathname,
    constructUri: (path: string) => `medium://${path}`,
  },
  {
    appName: "Spotify",
    urlPatterns: spotifyPatterns,
    uriScheme: "spotify://",
    extractId: extractPathname,
    // Use the Spotify-specific helper
    constructUri: (_: string, originalUrl?: string) =>
      originalUrl ? (constructSpotifyDeepLink(originalUrl) || "spotify://") : "spotify://",
  },
];

/* ========================
   Utility Functions
======================== */

export const getUriScheme = (url: string): string | null => {
  for (const app of appLinks) {
    if (app.urlPatterns.some((pattern) => pattern.test(url))) {
      const path = app.extractId ? app.extractId(url) : null;
      return path && app.constructUri ? app.constructUri(path, url) : app.uriScheme;
    }
  }
  return null;
};

export const isSupportedDirectLink = (url: string): boolean =>
  appLinks.some((app) => app.urlPatterns.some((pattern) => pattern.test(url)));

export const getDirectLink = (url: string): string | null => {
  for (const app of appLinks) {
    if (app.urlPatterns.some((pattern) => pattern.test(url))) {
      const path = app.extractId ? app.extractId(url) : null;
      console.log("direct link", { path, app, url });
      return path && app.constructUri ? app.constructUri(path, url) : null;
    }
  }
  return null;
};

/* ========================
   Instagram-Specific Post Deep Link Helper
======================== */

// For Instagram deep links, if the URL is for a post, convert the shortcode to a numeric ID.
// Otherwise, assume it's a profile deep link.
const constructInstagramDeepLink = (originalUrl: string): string | null => {
  try {
    const parsedUrl = new URL(originalUrl);
    const segments = parsedUrl.pathname.split("/").filter(Boolean);
    if (segments[0] === "p" && segments[1]) {
      // It's a post; convert shortcode to numeric ID.
      const shortcode = segments[1];
      const numericId = shortcodeToId(shortcode);
      if (numericId !== null) {
        return `instagram://media?id=${numericId}`;
      }
    } else if (segments[0]) {
      // Assume it's a profile.
      return `instagram://user?username=${segments[0]}`;
    }
    return null;
  } catch {
    return null;
  }
};

// Instagram shortcode conversion helper.
const instagramAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const shortcodeToId = (shortcode: string): number | null => {
  let id = 0;
  for (let i = 0; i < shortcode.length; i++) {
    const char = shortcode[i];
    const index = instagramAlphabet.indexOf(char);
    if (index === -1) return null;
    id = id * 64 + index;
  }
  return id;
};
