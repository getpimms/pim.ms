import { DUB_WORDMARK } from "@dub/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Footer } from "../components/footer";

export function ReferralInvite({
  email = "panic@thedis.co",
  appName = "PIMMS",
  url = "https://pimms.io",
  workspaceUser = "Brendon Urie",
  workspaceUserEmail = "panic@thedis.co",
}: {
  email: string;
  appName: string;
  url: string;
  workspaceUser: string | null;
  workspaceUserEmail: string | null;
}) {
  return (
    <Html>
      <Head />
      <Preview>Sign up for {appName}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded-3xl border border-solid border-neutral-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="20"
                alt="PIMMS"
                className="my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-xl font-semibold text-black">
              Sign up for {appName}
            </Heading>
            {workspaceUser && workspaceUserEmail ? (
              <Text className="text-sm leading-6 text-black">
                <strong>{workspaceUser}</strong> (
                <Link
                  className="text-blue-600 no-underline"
                  href={`mailto:${workspaceUserEmail}`}
                >
                  {workspaceUserEmail}
                </Link>
                ) has invited you to start using {appName}!
              </Text>
            ) : (
              <Text className="text-sm leading-6 text-black">
                You have been invited to start using {appName}!
              </Text>
            )}
            <Section className="my-8">
              <Link
                className="cursor-pointer rounded-xl bg-[#dc2e65] px-5 py-2 font-semibold text-white no-underline outline outline-[6px] transition hover:outline-[#F0A8BF]"
                href={url}
              >
                Learn More
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              or copy and paste this URL into your browser:
            </Text>
            <Text className="max-w-sm flex-wrap break-words font-medium text-purple-600 no-underline">
              {url.replace(/^https?:\/\//, "")}
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ReferralInvite;
