
"use client";

import { useState, type ReactNode } from "react";
import styles from "./FiltersPanel.module.css";

type FilterSectionProps = {
  title: string;
  children: ReactNode;
};

function FilterSection({ title, children }: FilterSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.section}>
      <button
        type="button"
        className={styles.sectionButton}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className={styles.chevron}>
          {open ? "⌃" : "⌄"}
        </span>
      </button>

      {open && (
        <div className={styles.sectionContent}>
          {children}
        </div>
      )}
    </section>
  );
}

function FilterCheckbox({
  label,
}: {
  label: string;
}) {
  return (
    <label className={styles.option}>
      <input type="checkbox" />
      <span>{label}</span>
    </label>
  );
}

function FilterRadio({
  label,
  name,
  value,
}: {
  label: string;
  name: string;
  value: string;
}) {
  return (
    <label className={styles.option}>
      <input type="radio" name={name} value={value} />
      <span>{label}</span>
    </label>
  );
}

function FilterRange({
  label,
  min,
  max,
  step = 1,
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
}) {
  const [value, setValue] = useState(max);

  return (
    <label className={styles.field}>
      <span className={styles.fieldHeading}>
        {label}
        <span>${value}</span>
      </span>

      <input
        className={styles.range}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </label>
  );
}

function FilterInput({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input
        className={styles.input}
        type="number"
        min={0}
        placeholder={placeholder}
      />
    </label>
  );
}

function FilterSelect({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <select className={styles.input} defaultValue="">
        <option value="" disabled>
          Select...
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function FiltersPanel() {
  return (
    <aside className={styles.panel} aria-label="Tutor filters">
      <h2 className={styles.title}>Filters</h2>

      <div className={styles.group}>
        <FilterSection title="Category">
          <FilterCheckbox label="Programming" />
          <FilterCheckbox label="Design" />
          <FilterCheckbox label="Marketing" />
          <FilterCheckbox label="Languages" />
        </FilterSection>

        <FilterSection title="Budget">
          <FilterRange
            label="Price per hour"
            min={0}
            max={300}
            step={10}
          />
        </FilterSection>
      </div>

      <div className={styles.group}>
        <FilterSection title="Lesson format">
          <FilterRadio
            label="Individual"
            name="lesson-format"
            value="individual"
          />
          <FilterRadio
            label="Group"
            name="lesson-format"
            value="group"
          />
        </FilterSection>

        <FilterSection title="Language">
          <FilterSelect
            label="Teaching language"
            options={["English", "Ukrainian", "Polish"]}
          />
        </FilterSection>

        <FilterSection title="Rating">
          <FilterInput
            label="Minimum rating"
            placeholder="0 - 5"
          />
        </FilterSection>
      </div>
    </aside>
  );
}
