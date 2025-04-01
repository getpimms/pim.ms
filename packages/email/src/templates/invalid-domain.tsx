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

export function InvalidDomain({
  email = "cheers@pimms.io",
  domain = "pim.ms",
  workspaceSlug = "pimms",
  invalidDays = 14,
  appDomain = "pimms.io",
}: {
  email: string;
  domain: string;
  workspaceSlug: string;
  invalidDays: number;
  appDomain: string;
}): JSX.Element {
  const notificationSettingsUrl = `https://app.${appDomain}/${workspaceSlug}/settings/notifications`;

  return (
    <Html>
      <Head />
      <Preview>Invalid Domain Configuration</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded-3xl border-[6px] border-solid border-neutral-100 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="14"
                alt="PIMMS"
                className="my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-xl font-semibold text-black">
              Invalid Domain Configuration
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Your domain <code className="text-purple-600">{domain}</code> for
              your PIMMS workspace{" "}
              <Link
                href={`https://app.pimms.io/${workspaceSlug}`}
                className="font-medium text-blue-600 no-underline"
              >
                {workspaceSlug}↗
              </Link>{" "}
              has been invalid for {invalidDays} days.
            </Text>
            <Text className="text-sm leading-6 text-black">
              If your domain remains unconfigured for 30 days, it will be
              automatically deleted from PIMMS. Please click the link below to
              configure your domain.
            </Text>
            <Section className="my-8 text-center">
              <Link
                className="px-5 py-3 bg-[#dc2e65] text-white font-semibold outline outline-[6px] transition outline-[#ffeaf1] cursor-pointer no-underline rounded-xl"
                href={`https://app.pimms.io/${workspaceSlug}/settings/domains`}
              >
                Configure domain
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              If you do not want to keep this domain on PIMMS, you can{" "}
              <Link
                href={`https://app.pimms.io/${workspaceSlug}/settings/domains`}
                className="font-medium text-blue-600 no-underline"
              >
                delete it
              </Link>{" "}
              or simply ignore this email. To respect your inbox,{" "}
              {invalidDays < 28
                ? `we will only send you one more email about this in ${
                    28 - invalidDays
                  } days.`
                : "this will be the last time we will email you about this."}
            </Text>
            <Footer
              email={email}
              notificationSettingsUrl={notificationSettingsUrl}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default InvalidDomain;
