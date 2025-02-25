"use client";

import { getDirectAppLink } from "@/lib/middleware/utils";
import { useEffect } from "react";

export const runtime = "edge";

export default function ApplinkPage({
  params,
}: {
  params: { url: string; os: "ios" | "android" };
}) {
  // First decode the full URL parameter from the route
  const url = decodeURIComponent(params.url);

  // get direct link uri scheme
  const appLink = getDirectAppLink(url, params.os);

  console.log("direct app link", {
    appLink,
    url,
    os: params.os,
  });
  
  useEffect(() => {
    if (!appLink) {
      return;
    }

    // Attempt to open the YouTube app via the deep link.
    // If this fails (i.e. if the app is not installed), fallback to the web URL.
    // window.location.href = appLink;

    // After a short delay, force navigation to the YouTube web URL.
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Redirect to the redirect URL (which may be the same as the original URL,
  // or a cleaned-up version with properly encoded parameters)
  if (appLink) {
    return <meta httpEquiv="refresh" content={`0;url=${appLink}`} />;
  } else {
    return <meta httpEquiv="refresh" content={`0;url=${url}`} />;
  }
}
