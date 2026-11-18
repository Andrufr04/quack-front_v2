import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import styles from "./Button.module.css";

type ButtonVariant = "gradient" | "solid" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
};

export default function Button({
  variant = "solid",
  fullWidth = false,
  loading = false,
  disabled,
  className = "",
  children,
  icon,
  type = "button",
  ...props
}: ButtonProps) {
  const animatedIcon = variant === "gradient" && icon != null;

  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        animatedIcon && styles.withIcon,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {animatedIcon ? (
        <span className={styles.animatedContent}>
          <span className={styles.buttonText}>{children}</span>
          <span aria-hidden="true" className={styles.buttonIcon}>
            {icon}
          </span>
        </span>
      ) : (
        <>
          {icon && (
            <span aria-hidden="true">{icon}</span>
          )}
          {children}
        </>
      )}
    </button>
  );
}
