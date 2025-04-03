import { MetaTag } from "@/lib/types";
import { expect, test } from "vitest";
import { IntegrationHarness } from "../utils/integration";

test("GET /metatags", async (ctx) => {
  const h = new IntegrationHarness(ctx);
  const { http } = await h.init();

  const { status, data: metatags } = await http.get<MetaTag>({
    path: `/metatags`,
    query: {
      url: "https://pimms.io",
    },
  });

  expect(status).toEqual(200);
  expect(metatags).toStrictEqual({
    title: "Dub.co - Link Management for Modern Marketing Teams",
    description:
      "Dub.co is the open-source link management platform for modern marketing teams to create marketing campaigns, link sharing features, and referral programs.",
    image: "https://assets.pimms.io/thumbnail.jpg",
    poweredBy: "Dub.co - Link management for modern marketing teams",
  });
});
