import { DUB_WORDMARK, getPlanDetails } from "@dub/utils";
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

export function UpgradeEmail({
  name = "Brendon Urie",
  email = "panic@thedis.co",
  plan = "Business",
}: {
  name: string | null;
  email: string;
  plan: string;
}) {
  const planDetails = getPlanDetails(plan);
  return (
    <Html>
      <Head />
      <Preview>Thank you for upgrading to PIMMS {plan}!</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded-3xl border border-solid border-neutral-200 px-10 py-5">
            <Section className="my-8">
              <Img
                src={DUB_WORDMARK}
                height="20"
                alt="PIMMS"
                className="my-0"
              />
            </Section>
            <Heading className="mx-0 p-0 text-lg font-medium text-black">
              Thank you for upgrading to PIMMS {plan}!
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Hey{name && ` ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              My name is Alexandre, and I'm the founder of PIMMS. I wanted to
              personally reach out to thank you for upgrading to{" "}
              <Link
                href={planDetails.link}
                className="font-medium text-blue-600 no-underline"
              >
                PIMMS {plan}
              </Link>
              !
            </Text>
            <Text className="text-sm leading-6 text-black">
              If you have any questions or feedback about PIMMS, please don't
              hesitate to reach out – I'm always happy to help!
            </Text>
            <Text className="text-sm font-light leading-6 text-neutral-400">
              Alexandre from PIMMS
            </Text>
            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default UpgradeEmail;
