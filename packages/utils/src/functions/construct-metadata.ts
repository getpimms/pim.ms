import { Metadata } from "next";
import { HOME_DOMAIN } from "../constants";

export function constructMetadata({
  title,
  fullTitle,
  description = "Pimms",
  image = "https://assets.pimms.io/thumbnail.jpg",
  video,
  icons = [
    {
      rel: "apple-touch-icon",
      sizes: "32x32",
      url: "https://assets.pimms.io/apple-icon.png",
    },
    // {
    //   rel: "icon",
    //   type: "image/png",
    //   sizes: "32x32",
    //   url: "https://assets.pimms.io/favicons/favicon-32x32.png",
    // },
    // {
    //   rel: "icon",
    //   type: "image/png",
    //   sizes: "16x16",
    //   url: "https://assets.pimms.io/favicons/favicon-16x16.png",
    // },
  ],
  url,
  canonicalUrl,
  noIndex = false,
  manifest,
}: {
  title?: string;
  fullTitle?: string;
  description?: string;
  image?: string | null;
  video?: string | null;
  icons?: Metadata["icons"];
  url?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  manifest?: string | URL | null;
} = {}): Metadata {
  return {
    title:
      fullTitle ||
      (title
        ? `${title} | Dub.co`
        : "Dub.co - Link Management for Modern Marketing Teams"),
    description,
    openGraph: {
      title,
      description,
      ...(image && {
        images: image,
      }),
      url,
      ...(video && {
        videos: video,
      }),
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: "summary_large_image",
        images: [image],
      }),
      ...(video && {
        player: video,
      }),
      creator: "@dubdotco",
    },
    icons,
    metadataBase: new URL(HOME_DOMAIN),
    ...((url || canonicalUrl) && {
      alternates: {
        canonical: url || canonicalUrl,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    ...(manifest && {
      manifest,
    }),
  };
}
