import { notFound } from "next/navigation";
import { navigation } from "@/components/layout/AppShell/navigation";

type PageProps = {
  params: Promise<{ section: string }>;
};

export default async function PlatformPage({ params }: PageProps) {
  const { section } = await params;

  const exists = navigation.some((group) =>
    group.some((item) => item.href === `/${section}`)
  );

  if (!exists && section !== "become-a-tutor") {
    notFound();
  }

  return null;
}
