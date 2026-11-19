
"use client";

import { useState } from "react";
import styles from "./SaveButton.module.css";

export default function SaveButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      className={`${styles.button} ${saved ? styles.saved : ""}`}
      onClick={() => setSaved(!saved)}
      aria-label={saved ? "Remove from saved" : "Save tutor"}
      aria-pressed={saved}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 4.5C5 3.67 5.67 3 6.5 3h11c.83 0 1.5.67 1.5 1.5v15.2c0 .82-.92 1.29-1.59.82L12 16.7l-5.41 3.82C5.92 21 5 20.52 5 19.7V4.5Z"
        />
      </svg>
    </button>
  );
}
