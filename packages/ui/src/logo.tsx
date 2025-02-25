import { cn } from "@dub/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10 text-black dark:text-white", className)}
    >
      <path d="M0 0H64V64H0V0Z" fill="white" />
      <path
        d="M16.8887 11.0222H42.9222C45.7147 11.0222 47.1109 12.3555 47.1109 15.0222C47.1109 17.6889 45.6263 19.0222 42.6571 19.0222H16.8887V11.0222Z"
        fill="#08272E"
      />
      <path
        d="M16.8887 53.0718V22.9333H32.0908C36.8038 22.9333 40.4892 23.8641 43.1469 25.7256C45.8401 27.5575 47.1867 30.1282 47.1867 33.4375C47.1867 36.7468 45.8401 39.3322 43.1469 41.1937C40.4892 43.0257 36.8393 43.9417 32.1971 43.9417H27.7322V53.0718H16.8887ZM31.8782 30.0248H27.7322V36.8502H31.6124C34.5891 36.8502 36.0774 35.7127 36.0774 33.4375C36.0774 31.1623 34.6777 30.0248 31.8782 30.0248Z"
        fill="#08272E"
      />
    </svg>
  );
}
