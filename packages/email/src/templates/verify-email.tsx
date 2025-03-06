import { DUB_WORDMARK } from "@dub/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Footer } from "../components/footer";

export function VerifyEmail({
  email = "cheers@pimms.io",
  code = "123456",
}: {
  email: string;
  code: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Your PIMMS Verification Code</Preview>
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
              Please confirm your email address
            </Heading>
            <Text className="mx-auto text-sm leading-6">
              Enter this code on the PIMMS verify page to complete your sign up:
            </Text>
            <Section className="my-8">
              <div className="mx-auto w-fit rounded-xl px-6 py-3 text-center font-mono text-2xl font-semibold tracking-[0.25em]">
                {code}
              </div>
            </Section>
            <Text className="text-sm leading-6 text-black">
              This code expires in 10 minutes.
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default VerifyEmail;
