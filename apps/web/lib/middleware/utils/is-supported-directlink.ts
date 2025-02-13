interface AppLink {
  appName: string;
  urlPatterns: RegExp[];
  uriScheme: string;
  extractId?: (url: string) => string | null;
  constructUri?: (id: string) => string;
}

const youtubePatterns = [/^https?:\/\/(www\.)?youtube\.com\/watch\?v=([^&]+)/, /^https?:\/\/youtu\.be\/([^?]+)/];
const tiktokPattern = [/^https?:\/\/(www\.)?tiktok\.com\/(@[\w.-]+\/video\/\d+)/];
const instagramPattern = [/^https?:\/\/(www\.)?instagram\.com\/p\/([^/?]+)/];

const appLinks: AppLink[] = [
  {
    appName: 'YouTube',
    urlPatterns: youtubePatterns,
    uriScheme: 'vnd.youtube://',
    extractId: (url: string) => {
      const match = youtubePatterns.map(pattern => url.match(pattern)).find(m => m);
      return match ? match[1] : null;
    },
    constructUri: (id: string) => `vnd.youtube://${id}`,
  },
  {
    appName: 'TikTok',
    urlPatterns: tiktokPattern,
    uriScheme: 'snssdk1233://',
    extractId: (url: string) => {
      const match = tiktokPattern.map(pattern => url.match(pattern)).find(m => m);
      return match ? match[1] : null;
    },
    constructUri: (id: string) => `snssdk1233://${id}`,
  },
  {
    appName: 'Instagram',
    urlPatterns: instagramPattern,
    uriScheme: 'instagram://',
    extractId: (url: string) => {
      const match = instagramPattern.map(pattern => url.match(pattern)).find(m => m);
      return match ? match[1] : null;
    },
    constructUri: (id: string) => `instagram://media?id=${id}`,
  }
];

export const getUriScheme = (url: string): string | null => {
  for (const app of appLinks) {
    if (app.urlPatterns.some(pattern => pattern.test(url))) {
      const id = app.extractId ? app.extractId(url) : null;
      return id && app.constructUri ? app.constructUri(id) : app.uriScheme;
    }
  }
  return null;
};

export const isSupportedDirectLink = (url: string): boolean => {
  return appLinks.some(app => app.urlPatterns.some(pattern => pattern.test(url)));
};

export const getDirectLink = (url: string): string | null => {
  for (const app of appLinks) {
    if (app.urlPatterns.some(pattern => pattern.test(url))) {
      const id = app.extractId ? app.extractId(url) : null;
      console.log("direct link", { id, app, url });
      return id && app.constructUri ? app.constructUri(id) : null;
    }
  }
  return null;
};