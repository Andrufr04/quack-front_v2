import type { Metadata } from "next";

import VerificationForm from "@/components/auth/VerificationForm/VerificationForm";

export const metadata: Metadata = {
  title: "Verify email",
};

type VerifyEmailPageProps = {
  searchParams: Promise<{
    email?: string | string[];
  }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = await searchParams;

  const email =
    typeof params.email === "string"
      ? params.email
      : undefined;

  return <VerificationForm email={email} />;
}
