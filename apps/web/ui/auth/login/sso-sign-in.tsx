"use client";

import { Button, InfoTooltip, useMediaQuery } from "@dub/ui";
import { Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useContext } from "react";
import { toast } from "sonner";
import { LoginFormContext } from "./login-form";

export const SSOSignIn = () => {
  const { isMobile } = useMediaQuery();

  const {
    setClickedMethod,
    clickedMethod,
    setLastUsedAuthMethod,
    setShowSSOOption,
    showSSOOption,
  } = useContext(LoginFormContext);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setClickedMethod("saml");
        fetch("/api/auth/saml/verify", {
          method: "POST",
          body: JSON.stringify({ slug: e.currentTarget.slug.value }),
        }).then(async (res) => {
          const { data, error } = await res.json();
          if (error) {
            toast.error(error);
            setClickedMethod(undefined);
            return;
          }
          setLastUsedAuthMethod("saml");
          await signIn("saml", undefined, {
            tenant: data.workspaceId,
            product: "PIMMS",
          });
        });
      }}
      className="flex flex-col space-y-3"
    >
      {showSSOOption && (
        <div>
          <div className="mb-4 mt-1 border-t border-neutral-300" />
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-medium text-neutral-900">
              Workspace Slug
            </h2>
            <InfoTooltip
              content={`This is your workspace's unique identifier on ${process.env.NEXT_PUBLIC_APP_NAME}. E.g. app.dub.co/acme is "acme".`}
            />
          </div>
          <input
            id="slug"
            name="slug"
            autoFocus={!isMobile}
            type="text"
            placeholder="my-team"
            autoComplete="off"
            required
            className="mt-1 block w-full appearance-none rounded-xl border-2 border-neutral-200 text-black outline-none placeholder:text-neutral-400 sm:text-sm transition-all focus:border-neutral-500 focus:ring-0 h-10"
          />
        </div>
      )}

      <Button
        text="Continue with SAML SSO"
        variant="secondary"
        icon={<Lock className="size-4" />}
        {...(!showSSOOption && {
          type: "button",
          onClick: (e) => {
            e.preventDefault();
            setShowSSOOption(true);
          },
        })}
        loading={clickedMethod === "saml"}
        disabled={clickedMethod && clickedMethod !== "saml"}
      />
    </form>
  );
};
