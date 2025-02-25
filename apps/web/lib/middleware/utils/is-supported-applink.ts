"use client";

import { NextRequest } from "next/server";
import {
  extractDomainAndPath,
  extractPathname,
} from "./applink/extract-generic";
import { buildInstagramAppLink } from "./applink/extract-instagram";
import {
  amazonPatterns,
  instagramPatterns,
  linkedinPatterns,
  mediumPatterns,
  spotifyPatterns,
  tiktokPatterns,
  xPatterns,
  youtubePatterns,
} from "./applink/patterns";

interface AppLink {
  appName: string;
  urlPatterns: RegExp[];
  constructUri: (originalUrl?: string, os?: "ios" | "android") => string;
}

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
      if (
        ["track", "album", "artist", "playlist"].includes(
          resourceType.toLowerCase(),
        )
      ) {
        return `spotify://${resourceType}/${resourceId}`;
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
  // work on android / iphone
  {
    appName: "YouTube",
    urlPatterns: youtubePatterns,
    constructUri: (url: string) => `vnd.youtube://${extractDomainAndPath(url)}`,
  },
  // work on android / iphone
  {
    appName: "Amazon",
    urlPatterns: amazonPatterns,
    constructUri: (url: string) =>
      `com.amazon.mobile.shopping.web://${extractDomainAndPath(url)}`,
  },
  // work on android / iphone
  {
    appName: "Medium",
    urlPatterns: mediumPatterns,
    constructUri: (url: string) => `medium://${extractPathname(url)}`,
  },
  // instagram
  {
    appName: "Instagram",
    urlPatterns: instagramPatterns,
    constructUri: (url: string, os?: "ios" | "android") => {
      if (!!os && ["ios", "android"].includes(os)) {
        return `instagram://${buildInstagramAppLink(url, os)}`;
      } else {
        console.log("Platform header is missing for instagram link", url);
        return url;
      }
    },
  },
  // Fail on android
  {
    appName: "TikTok",
    urlPatterns: tiktokPatterns,
    constructUri: (url: string) => `snssdk1233://${extractPathname(url)}`,
  },
  // to check
  {
    appName: "X",
    urlPatterns: xPatterns,
    constructUri: (url: string) => `twitter://${extractPathname(url)}`,
  },
  {
    appName: "LinkedIn",
    urlPatterns: linkedinPatterns,
    constructUri: (url: string) => `linkedin://${extractPathname(url)}`,
  },
  // fail on android
  {
    appName: "Spotify",
    urlPatterns: spotifyPatterns,
    // Use the Spotify-specific helper
    constructUri: (_: string, originalUrl?: string) =>
      originalUrl
        ? constructSpotifyDeepLink(originalUrl) || "spotify://"
        : "spotify://",
  },
];

/* ========================
   Utility Functions
======================== */

export const shallShowDirectPreview = (req: NextRequest): boolean => {
  const listOfBrowsers = [
    "linkedinbot",
    "facebookexternalhit",
    "twitterbot",
    "iframely",
    "whatsapp",
    "slackbot",
    "telegrambot",
    "google-pagerenderer",
    "chatgpt",
    "discordbot",
    "skypeuripreview",
    "zoombot",
    "mediumbot",
    "embedly",
    "google-safety",
    "fedicabot",
  ];

  const userAgent = req.headers.get("user-agent") || "";

  // If the user agent includes any of the browsers in the list, return true.
  return listOfBrowsers.some((browser) =>
    userAgent.toLowerCase().includes(browser),
  );
};

export const isLinkedinBot = (req: NextRequest): boolean => {
  const userAgent = req.headers.get("user-agent") || "";
  return userAgent.toLowerCase().includes("linkedinbot") || false;
};

export const isSupportedDirectAppLink = (url: string): boolean =>
  appLinks.some((app) => app.urlPatterns.some((pattern) => pattern.test(url)));

export const getDirectAppLink = (
  url: string,
  os: "ios" | "android",
): string | null => {
  for (const app of appLinks) {
    if (app.urlPatterns.some((pattern) => pattern.test(url))) {
      return app.constructUri(url, os);
    }
  }
  return null;
};
