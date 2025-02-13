"use client";

import { getDirectLink } from "@/lib/middleware/utils";
import { useEffect } from "react";

export const runtime = "edge";

export default function DirectLinkPage({ params }: { params: { url: string } }) {
  // First decode the full URL parameter from the route
  const url = decodeURIComponent(params.url);
  // Split into base URL and query string
  const [baseUrl, queryString] = url.split("?");

  let redirectUrl = url;

  // if there are query parameters, we need to process them
  if (queryString) {
    // Parse the query string (but don't use toString() later as it adds extra encoding)
    const queryParams = new URLSearchParams(queryString);

    // Process each parameter with proper encoding
    const processedParams = Array.from(queryParams.entries()).map(
      ([key, value]) => {
        // Handle form-encoded spaces ('+' → ' ')
        const decodedFromForm = value.replace(/\+/g, " ");
        // Decode any existing percent-encoding (e.g., '%26' → '&')
        const fullyDecoded = decodeURIComponent(decodedFromForm);
        // Apply one clean round of encoding
        const encoded = encodeURIComponent(fullyDecoded);

        return `${key}=${encoded}`;
      },
    );

    // Reconstruct the URL with properly encoded parameters
    redirectUrl = `${baseUrl}?${processedParams.join("&")}`;
  }

  // get direct link uri scheme
  const directLink = getDirectLink(redirectUrl);

  useEffect(() => {
    if (!directLink) {
      return;
    }

    // Attempt to open the YouTube app via the deep link.
    // If this fails (i.e. if the app is not installed), fallback to the web URL.
    window.location.href = directLink;

    // After a short delay, force navigation to the YouTube web URL.
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Redirect to the redirect URL (which may be the same as the original URL,
  // or a cleaned-up version with properly encoded parameters)
  return null;
}
