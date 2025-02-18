"use client";

import { getDirectLink } from "@/lib/middleware/utils";
import { useEffect } from "react";

export const runtime = "edge";

export default function DirectLinkPage({
  params,
}: {
  params: { url: string };
}) {
  // First decode the full URL parameter from the route
  const url = decodeURIComponent(params.url);

  // get direct link uri scheme
  const directLink = getDirectLink(url);

  useEffect(() => {
    if (!directLink) {
      return;
    }

    // Attempt to open the YouTube app via the deep link.
    // If this fails (i.e. if the app is not installed), fallback to the web URL.
    window.location.href = directLink;

    // After a short delay, force navigation to the YouTube web URL.
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Redirect to the redirect URL (which may be the same as the original URL,
  // or a cleaned-up version with properly encoded parameters)
  if (directLink) {
    console.log("direct link", directLink);
    return <meta httpEquiv="refresh" content={`0;url=${directLink}`} />;
  } else {
    console.log("fail to get direct link", url);
    return <meta httpEquiv="refresh" content={`0;url=${url}`} />;
  }
}
