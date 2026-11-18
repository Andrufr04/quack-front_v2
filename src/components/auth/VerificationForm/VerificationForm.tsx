
"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import Button from "@/components/ui/Button/Button";
import styles from "./VerificationForm.module.css";

const CODE_LENGTH = 6;

export default function VerificationForm() {
  const [digits, setDigits] = useState<string[]>(
    Array(CODE_LENGTH).fill("")
  );

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const email = "hello@gmail.com";

  const isComplete = digits.every((digit) => digit !== "");

  function focusInput(index: number) {
    const input = inputRefs.current[index];
    input?.focus();
    input?.select();
  }

  function updateDigit(index: number, value: string) {
    if (!/^\d$/.test(value)) return;

    setDigits((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });

    if (index < CODE_LENGTH - 1) {
      focusInput(index + 1);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusInput(Math.max(0, index - 1));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusInput(Math.min(CODE_LENGTH - 1, index + 1));
    }

    if (event.key === "Backspace") {
      event.preventDefault();

      if (digits[index]) {
        setDigits((previous) => {
          const next = [...previous];
          next[index] = "";
          return next;
        });
      } else if (index > 0) {
        focusInput(index - 1);
      }
    }

    if (event.key === "Delete") {
      event.preventDefault();

      setDigits((previous) => {
        const next = [...previous];
        next[index] = "";
        return next;
      });
    }

    if (/^[0-9]$/.test(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      updateDigit(index, event.key);
    }
  }

  function handlePaste(
    event: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH - index);

    if (!pasted) return;

    setDigits((previous) => {
      const next = [...previous];

      for (let i = 0; i < pasted.length; i++) {
        next[index + i] = pasted[i];
      }

      return next;
    });

    focusInput(Math.min(index + pasted.length, CODE_LENGTH - 1));
  }

  return (
    <section className={styles.verification}>
      <Link
        href="/sign-up"
        className={styles.back}
        aria-label="Back to sign up"
      >
        ←
      </Link>

      <div className={styles.heading}>
        <h1>Enter confirmation code</h1>
        <p>We&apos;ve sent a code to {email}</p>
      </div>

      <div
        className={styles.codeFields}
        role="group"
        aria-label="6-digit confirmation code"
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            className={styles.digit}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={CODE_LENGTH}
            value={digit}
            aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
            onFocus={(event) => event.target.select()}
            onClick={(event) => event.currentTarget.select()}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onChange={(event) => {
              const value = event.target.value;

              if (value.length > 1) {
                const numbers = value.replace(/\D/g, "");
                if (!numbers) return;

                setDigits((previous) => {
                  const next = [...previous];
                  for (let i = 0; i < numbers.length && index + i < CODE_LENGTH; i++) {
                    next[index + i] = numbers[i];
                  }
                  return next;
                });

                focusInput(Math.min(index + numbers.length, CODE_LENGTH - 1));
              } else {
                updateDigit(index, value);
              }
            }}
            onPaste={(event) => handlePaste(event, index)}
          />
        ))}
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="gradient"
          fullWidth
          disabled={!isComplete}
        >
          Verify
        </Button>

        <p className={styles.resend}>
          Didn&apos;t get a code?{" "}
          <button type="button">
            Click to resend.
          </button>
        </p>
      </div>
    </section>
  );
}
