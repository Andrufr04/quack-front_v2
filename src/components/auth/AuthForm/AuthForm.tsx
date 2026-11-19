
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import ArrowRightIcon from "@/components/ui/Icon/ArrowRightIcon";
import MailIcon from "@/components/ui/Icon/EmailIcon";

import styles from "./AuthForm.module.css";

type AuthFormProps = {
  mode: "login" | "sign-up";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isSignUp = mode === "sign-up";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSignUp) return;

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    router.push(
     `/sign-up/verify?email=${encodeURIComponent(email)}`
    );
  }

  return (
    <section className={styles.auth}>
      <h1 className={styles.title}>
        {isSignUp ? "Create an account" : "Welcome back"}
      </h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            icon={<MailIcon />}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete={
              isSignUp ? "new-password" : "current-password"
            }
            required
          />

          {!isSignUp && (
            <Link
              href="/forgot-password"
              className={styles.forgotPassword}
            >
              Forgot password?
            </Link>
          )}
        </div>

        <div className={styles.actions}>
          <Button
            type="submit"
            variant="gradient"
            fullWidth
            icon={<ArrowRightIcon />}
          >
            {isSignUp ? "Create account" : "Log in"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            fullWidth
          >
            <Image
              src="/icons/google.svg"
              alt=""
              width={20}
              height={20}
            />
            {isSignUp
              ? "Sign up with Google"
              : "Log in with Google"}
          </Button>
        </div>
      </form>

      <p className={styles.switchText}>
        {isSignUp
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <Link href={isSignUp ? "/login" : "/sign-up"}>
          {isSignUp ? "Log in" : "Sign up"}
        </Link>
      </p>
    </section>
  );
}
