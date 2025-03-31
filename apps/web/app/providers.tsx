"use client";

import {
  KeyboardShortcutProvider,
  TooltipProvider,
  useRemoveGAParams,
} from "@dub/ui";
import { Analytics as PimmsAnalytics } from "@getpimms/analytics/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function RootProviders({ children }: { children: ReactNode }) {
  useRemoveGAParams();

  return (
      <TooltipProvider>
        <KeyboardShortcutProvider>
          <Toaster closeButton className="pointer-events-auto" />
          {children}
          {/* <DubAnalytics
            apiHost="/_proxy/dub"
            shortDomain="refer.pimms.io"
            cookieOptions={{
              domain: ".pimms.io",
            }}
          /> */}
          <PimmsAnalytics
            cookieOptions={{
              domain: ".pimms.io",
            }}
          />
        </KeyboardShortcutProvider>
      </TooltipProvider>
  );
}
