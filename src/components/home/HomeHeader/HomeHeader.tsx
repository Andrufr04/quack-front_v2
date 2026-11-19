
"use client";

import type { ReactNode } from "react";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import MenuIcon from "@/components/ui/Icon/MenuIcon";
import FiltersIcon from "@/components/ui/Icon/FiltersIcon";
import SaveIcon from "@/components/ui/Icon/SaveIcon";
import NotificationIcon from "@/components/ui/Icon/NotificationIcon";
import styles from "./HomeHeader.module.css";

type HeaderActionProps = {
  label: string;
  icon: ReactNode;
  variant?: "gradient" | "secondary";
  onClick?: () => void;
  expanded?: boolean;
};

function HeaderAction({
  label,
  icon,
  variant = "secondary",
  onClick,
  expanded,
}: HeaderActionProps) {
  return (
    <button
      type="button"
      className={`${styles.action} ${styles[variant]}`}
      onClick={onClick}
      aria-expanded={expanded}
      aria-controls={expanded !== undefined ? "home-filters" : undefined}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

type HomeHeaderProps = {
  filtersOpen: boolean;
  onToggleFilters: () => void;
};

const categories = [
  "Trend",
  "AI",
  "Development",
  "Design",
  "Marketing",
  "Trend",
  "AI",
  "Development",
  "Design",
  "Marketing",
  "Trend",
  "AI",
  "Development",
  "Design",
];

export default function HomeHeader({
  filtersOpen,
  onToggleFilters,
}: HomeHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.actions}>
          <HeaderAction
            label="Catalog"
            icon={<MenuIcon />}
            variant="gradient"
          />

          <HeaderAction
            label="Filters"
            icon={<FiltersIcon />}
            variant="secondary"
            onClick={onToggleFilters}
            expanded={filtersOpen}
          />
        </div>

        <div className={styles.search}>
          <SearchBar placeholder="Search tutor or skills..." />
        </div>

        <div className={styles.icons}>
          <span
            className={styles.notification}
            role="img"
            aria-label="Notifications"
          >
            <NotificationIcon />
          </span>

          <span
            className={styles.saved}
            role="img"
            aria-label="Saved tutors"
          >
            <SaveIcon />
          </span>
        </div>
      </div>

      <nav className={styles.categories} aria-label="Tutor categories">
        <div className={styles.categoryList}>
          {categories.map((category, index) => (
            <span key={`${category}-${index}`} className={styles.category}>
              {category}
            </span>
          ))}
        </div>

        <span className={styles.more}>More</span>
      </nav>
    </header>
  );
}
