"use client";

import useLinks from "@/lib/swr/use-links";
import useLinksCount from "@/lib/swr/use-links-count";
import { ExpandedLinkProps, UserProps } from "@/lib/types";
import {
  CardList,
  MaxWidthWrapper,
  PaginationControls,
  usePagination,
} from "@dub/ui";
import { CursorRays, Hyperlink, LoadingSpinner } from "@dub/ui/icons";
import { cn } from "@dub/utils";
import { useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { AnimatedEmptyState } from "../shared/animated-empty-state";
import ArchivedLinksHint from "./archived-links-hint";
import { LinkCard } from "./link-card";
import LinkCardPlaceholder from "./link-card-placeholder";
import { LinksDisplayContext } from "./links-display-provider";

export type ResponseLink = ExpandedLinkProps & {
  user: UserProps;
};

export default function LinksContainer({
  CreateLinkButton,
}: {
  CreateLinkButton: () => JSX.Element;
}) {
  const { viewMode, sortBy, showArchived } = useContext(LinksDisplayContext);

  const { links, isValidating } = useLinks({ sortBy, showArchived });
  const { data: count } = useLinksCount<number>({ showArchived });

  return (
    <MaxWidthWrapper className="max-w-full grid gap-y-2 px-0 lg:px-0">
      <LinksList
        CreateLinkButton={CreateLinkButton}
        links={links}
        count={count}
        loading={isValidating}
        compact={viewMode === "rows"}
      />
    </MaxWidthWrapper>
  );
}

export const LinksListContext = createContext<{
  openMenuLinkId: string | null;
  setOpenMenuLinkId: Dispatch<SetStateAction<string | null>>;
}>({
  openMenuLinkId: null,
  setOpenMenuLinkId: () => {},
});

function LinksList({
  CreateLinkButton,
  links,
  count,
  loading,
  compact,
}: {
  CreateLinkButton: () => JSX.Element;
  links?: ResponseLink[];
  count?: number;
  loading?: boolean;
  compact: boolean;
}) {
  const searchParams = useSearchParams();

  const { pagination, setPagination } = usePagination();

  const [openMenuLinkId, setOpenMenuLinkId] = useState<string | null>(null);

  const isFiltered = [
    "folderId",
    "tagIds",
    "domain",
    "userId",
    "search",
    "showArchived",
  ].some((param) => searchParams.has(param));

  return (
    <>
      {!links || links.length ? (
        <LinksListContext.Provider
          value={{ openMenuLinkId, setOpenMenuLinkId }}
        >
          {/* Cards */}
          <CardList variant={compact ? "compact" : "loose"} loading={loading}>
            {links?.length
              ? // Link cards
                links.map((link) => <LinkCard key={link.id} link={link} />)
              : // Loading placeholder cards
                Array.from({ length: 12 }).map((_, idx) => (
                  <CardList.Card
                    key={idx}
                    outerClassName="pointer-events-none"
                    innerClassName="flex items-center gap-4"
                  >
                    <LinkCardPlaceholder />
                  </CardList.Card>
                ))}
          </CardList>
        </LinksListContext.Provider>
      ) : (
        <AnimatedEmptyState
          title={isFiltered ? "No links found" : "No links yet"}
          description={
            isFiltered
              ? "Bummer! There are no links that match your filters. Adjust your filters to yield more results."
              : "Start creating your first link."
          }
          cardContent={
            <>
              <Hyperlink className="size-4 text-neutral-700" />
              <div className="h-2.5 w-24 min-w-0 rounded-sm bg-neutral-200" />
              <div className="xs:flex hidden grow items-center justify-end gap-1.5 text-neutral-500">
                <CursorRays className="size-3.5" />
              </div>
            </>
          }
          // {...(!isFiltered && {
          //   addButton: (
          //     <div>
          //       <CreateLinkButton />
          //     </div>
          //   ),
          //   learnMoreHref: "https://dub.co/help/article/how-to-create-link",
          //   learnMoreClassName: "h-10",
          // })}
        />
      )}

      {/* Pagination */}
      {links && (
        <>
          <div className="h-[90px]" />
          <div className="fixed bottom-0 left-0 w-full sm:max-[1330px]:w-[calc(100%-150px)] md:left-[240px] md:w-[calc(100%-240px)]">
            <div
              className={cn(
                "relative w-full px-4",
                // "max-[1330px]:left-0 max-[1330px]:translate-x-0",
              )}
            >
              <div className="rounded-t-xl border-2 border-b-0 border-neutral-200 ring-t-[6px] ring-neutral-100 bg-white px-4 py-3.5">
                <PaginationControls
                  pagination={pagination}
                  setPagination={setPagination}
                  totalCount={count ?? links?.length ?? 0}
                  unit={(plural) => `${plural ? "links" : "link"}`}
                >
                  {loading ? (
                    <LoadingSpinner className="size-3.5" />
                  ) : (
                    <div className="hidden sm:block">
                      <ArchivedLinksHint />
                    </div>
                  )}
                </PaginationControls>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
