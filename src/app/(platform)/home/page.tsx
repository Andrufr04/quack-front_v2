
"use client";

import { useState } from "react";
import HomeHeader from "@/components/home/HomeHeader/HomeHeader";
import FiltersPanel from "@/components/home/FiltersPanel/FiltersPanel";
import TutorCard from "@/components/cards/TutorCard/TutorCard";
import styles from "./Home.module.css";

const tutors = Array.from({ length: 12 }, (_, index) => ({
  id: `tutor-${index + 1}`,
  name: "Tutor Name",
  description:
    "Lorem ipsum is a dummy or placeholder text commonly used in graphic design.",
  photos: [],
  skills: ["Python", "C++", "Assembler", "JavaScript", "React"],
  rating: 5,
  reviews: 84,
  lessons: 400,
  price: 200,
}));

export default function HomePage() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className={styles.home}>
      <HomeHeader
        filtersOpen={filtersOpen}
        onToggleFilters={() => setFiltersOpen((prev) => !prev)}
      />

      <div
        className={`${styles.layout} ${
          filtersOpen ? styles.withFilters : ""
        }`}
      >
        {filtersOpen && (
          <div id="home-filters" className={styles.filters}>
            <FiltersPanel />
          </div>
        )}

        <section className={styles.tutors} aria-label="Tutors">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} {...tutor} />
          ))}
        </section>
      </div>
    </div>
  );
}
