import { getDomainWithoutWWW } from "@dub/utils";
import { CustomResponse } from "./utils";

export const addDomainToVercel = async (
  domain: string,
  {
    redirectToApex,
  }: {
    redirectToApex?: boolean;
  } = {},
): Promise<CustomResponse> => {
  console.log("process.env.PROJECT_ID_VERCEL", process.env.PROJECT_ID_VERCEL);
  console.log("process.env.TEAM_ID_VERCEL", process.env.TEAM_ID_VERCEL);
  console.log("AUTH_BEARER_TOKEN", process.env.AUTH_BEARER_TOKEN);
  
  return await fetch(
    `https://api.vercel.com/v10/projects/${process.env.PROJECT_ID_VERCEL}/domains?teamId=${process.env.TEAM_ID_VERCEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: domain.toLowerCase(),
        ...(redirectToApex && {
          redirect: getDomainWithoutWWW(domain.toLowerCase()),
        }),
      }),
    },
  ).then((res) => res.json());
};
