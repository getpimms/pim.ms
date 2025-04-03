"use client";

import { Button } from "@dub/ui";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export function NotFoundHint() {
  return (
    <SessionProvider>
      <NotFoundHintChild />
    </SessionProvider>
  );
}

function NotFoundHintChild() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 text-neutral-600">
        You're signed in as{" "}
        {session ? (
          <b className="text-neutral-800">{session.user?.email}.</b>
        ) : (
          <span className="h-5 w-40 rounded-xl border-[2px] border-neutral-300 bg-neutral-200" />
        )}
      </div>
      <Button
        text="Sign in as a different user"
        onClick={() => {
          setIsLoading(true);
          signOut();
        }}
        loading={isLoading}
        className="w-fit"
      />
    </>
  );
}
