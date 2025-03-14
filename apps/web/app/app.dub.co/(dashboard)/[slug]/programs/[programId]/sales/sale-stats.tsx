"use client";

import useSalesCount from "@/lib/swr/use-sales-count";
import { ProgramStatsFilter } from "@/ui/partners/program-stats-filter";
import { SaleStatusBadges } from "@/ui/partners/sale-status-badges";
import { useRouterStuff } from "@dub/ui";
import { Users } from "@dub/ui/icons";
import { useParams } from "next/navigation";

export function SaleStats() {
  const { slug, programId } = useParams();
  const { queryParams } = useRouterStuff();

  const { salesCount, error } = useSalesCount();

  return (
    <div className="xs:grid-cols-4 xs:divide-x xs:divide-y-0 grid divide-y-[6px] divide-neutral-100 overflow-hidden rounded-lg border-[6px] border-neutral-100">
      <ProgramStatsFilter
        label="All"
        href={`/${slug}/programs/${programId}/sales`}
        count={salesCount?.all}
        icon={Users}
        iconClassName="text-neutral-600 bg-neutral-100"
        error={!!error}
      />
      <ProgramStatsFilter
        label="Pending"
        href={
          queryParams({
            set: { status: "pending" },
            getNewPath: true,
          }) as string
        }
        count={salesCount?.pending}
        icon={SaleStatusBadges.pending.icon}
        iconClassName={SaleStatusBadges.pending.className}
        error={!!error}
      />
      <ProgramStatsFilter
        label="Processed"
        href={
          queryParams({
            set: { status: "processed" },
            getNewPath: true,
          }) as string
        }
        count={salesCount?.processed}
        icon={SaleStatusBadges.processed.icon}
        iconClassName={SaleStatusBadges.processed.className}
        error={!!error}
      />
      <ProgramStatsFilter
        label="Paid"
        href={
          queryParams({
            set: { status: "paid" },
            getNewPath: true,
          }) as string
        }
        count={salesCount?.paid}
        icon={SaleStatusBadges.paid.icon}
        iconClassName={SaleStatusBadges.paid.className}
        error={!!error}
      />
    </div>
  );
}
