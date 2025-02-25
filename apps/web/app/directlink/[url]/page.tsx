"use client";

import { useEffect } from "react";

export const runtime = "edge";

export default function DirectLinkPage({
  params,
}: {
  params: { url: string; os: "ios" | "android" };
}) {
  // First decode the full URL parameter from the route
  const url = decodeURIComponent(params.url);

  console.log("direct link", {
    url,
    os: params.os,
  });
  
  useEffect(() => {
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // After a short delay, force navigation to the YouTube web URL.
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Redirect to the redirect URL (which may be the same as the original URL,
  // or a cleaned-up version with properly encoded parameters)
  return null; //<meta httpEquiv="refresh" content={`0;url=${url}`} />;
}
