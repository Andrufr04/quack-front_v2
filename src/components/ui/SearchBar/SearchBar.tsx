
"use client";

import { useState } from "react";
import SearchIcon from "@/components/ui/Icon/SearchIcon";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
};

export default function SearchBar({
  placeholder = "Search tutor or skills...",
  className = "",
}: SearchBarProps) {
  const [value, setValue] = useState("");

  return (
    <div className={`${styles.search} ${className}`}>
      <input
        className={styles.input}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />

      <button
        type="button"
        className={styles.button}
        aria-label="Search"
        onClick={() => {}}
      >
        <SearchIcon />
      </button>
    </div>
  );
}
