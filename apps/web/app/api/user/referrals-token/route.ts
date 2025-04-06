import { withSession } from "@/lib/auth";
import { pimms } from "@/lib/pimms";
import { NextResponse } from "next/server";

export const GET = withSession(async ({ session }) => {
  const { publicToken } = await pimms.embedTokens.referrals({
    programId: "prog_d8pl69xXCv4AoHNT281pHQdo",
    tenantId: session.user.id,
    partner: {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image || null,
      tenantId: session.user.id,
    },
  });

  return NextResponse.json({ publicToken });
});
