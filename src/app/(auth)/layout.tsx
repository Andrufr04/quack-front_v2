import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./AuthLayout.module.css";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <div className={styles.visual}>
        <Image
          src="/images/gradient.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 0px, 50vw"
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            Quack
          </Link>
        </header>

        <main className={styles.main}>
          {children}
        </main>

        <footer className={styles.footer}>
          <span>Have questions?</span>
          <Link href="/privacy">
            Privacy Policy
          </Link>
        </footer>
      </div>
    </div>
  );
}
