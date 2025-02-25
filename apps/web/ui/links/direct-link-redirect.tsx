"use client";

import { useEffect } from "react";

export default function DirectLinkRedirect({ directLink, url, os }: { directLink: string | null; url: string; os: "ios" | "android" | undefined }) {
  useEffect(() => {
    if (!directLink) {
      return;
    }

    // Attempt to open the YouTube app via the deep link.
    // If this fails (i.e. if the app is not installed), fallback to the web URL.
    // window.location.href = directLink;

    // After a short delay, force navigation to the YouTube web URL.
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Redirect to the redirect URL (which may be the same as the original URL,
  // or a cleaned-up version with properly encoded parameters)
  if (directLink) {
    return <meta httpEquiv="refresh" content={`0;url=${directLink}`} />;
  } else {
    return <meta httpEquiv="refresh" content={`0;url=${url}`} />;
  }
}