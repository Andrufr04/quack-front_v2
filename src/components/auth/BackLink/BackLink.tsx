"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ArrowRightIcon from "@/components/ui/Icon/ArrowRightIcon";
import styles from "./BackLink.module.css";

export default function BackLink() {
  const pathname = usePathname();

  const href = pathname === "/sign-up/verify" ? "/sign-up" : "/";

  return (
    <Link
      href={href}
      className={styles.back}
      aria-label="Go back"
    >
      <ArrowRightIcon className={styles.arrow} />
    </Link>
  );
}
