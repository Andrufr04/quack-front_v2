
"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";

import Button from "@/components/ui/Button/Button";
import styles from "./VerificationForm.module.css";

const CODE_LENGTH = 6;

export default function VerificationForm({ email }: { email?: string }) {
    const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const isComplete = digits.every(Boolean);

    function focus(index: number) {
        inputs.current[index]?.focus();
    }

    function enterCode(value: string, index: number) {
        const numbers = value.replace(/\D/g, "").slice(0, CODE_LENGTH - index);
        if (!numbers) return;

        setDigits((prev) => {
            const next = [...prev];
            [...numbers].forEach((digit, i) => {
                next[index + i] = digit;
            });
            return next;
        });

        focus(Math.min(index + numbers.length, CODE_LENGTH - 1));
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>, index: number) {
        const value = event.target.value;

        if (!value) {
            setDigits((prev) => prev.map((digit, i) => i === index ? "" : digit));
            return;
        }

        enterCode(value, index);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            focus(Math.max(0, index - 1));
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            focus(Math.min(CODE_LENGTH - 1, index + 1));
        }

        if (event.key === "Backspace" && !digits[index] && index > 0) {
            event.preventDefault();
            setDigits((prev) => prev.map((digit, i) => i === index - 1 ? "" : digit));
            focus(index - 1);
        }
    }

    function handlePaste(event: ClipboardEvent<HTMLInputElement>, index: number) {
        event.preventDefault();
        enterCode(event.clipboardData.getData("text"), index);
    }

    return (
        <section className={styles.verification}>
            <div className={styles.heading}>
                <h1>Enter confirmation code</h1>
                <p>We&apos;ve sent a code to {email || "your email address"}</p>
            </div>

            <div className={styles.codeFields} role="group" aria-label="6-digit confirmation code">
                {digits.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputs.current[index] = el; }}
                        className={styles.digit}
                        type="text"
                        inputMode="numeric"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        maxLength={CODE_LENGTH}
                        value={digit}
                        id={`verification-digit-${index + 1}`}
                        name={`verification-digit-${index + 1}`}
                        aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={(e) => handlePaste(e, index)}
                    />
                ))}
            </div>

            <div className={styles.actions}>
                <Button type="button" variant="gradient" fullWidth disabled={!isComplete}>
                    Verify
                </Button>

                <p className={styles.resend}>
                    Didn&apos;t get a code?{" "}
                    <button type="button">Click to resend.</button>
                </p>
            </div>
        </section>
    );
}
