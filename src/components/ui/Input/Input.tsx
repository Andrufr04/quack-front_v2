"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Input.module.css";
import EyeIcon from "@/components/ui/Icon/EyeIcon";
import EyeOffIcon from "@/components/ui/Icon/EyeOffIcon";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  icon?: ReactNode;
};

export default function Input({
  label,
  error,
  icon,
  id,
  type = "text",
  className = "",
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      <div className={styles.inputWrapper}>
        <input
          {...props}
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${styles.input} ${icon || isPassword ? styles.hasIcon : ""} ${error ? styles.invalid : ""} ${className}`}
        />

        {isPassword ? (
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            disabled={props.disabled}
          >
            {showPassword ? <EyeIcon/> : <EyeOffIcon /> }
          </button>
        ) : icon ? (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </div>

      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}
