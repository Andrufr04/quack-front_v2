
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import PhotoCarousel from "@/components/ui/PhotoCarousel/PhotoCarousel";
import SaveButton from "@/components/ui/SaveButton/SaveButton";
import SkillLabel from "@/components/ui/SkillLabel/SkillLabel";
import styles from "./TutorCard.module.css";

type TutorCardProps = {
  id: string;
  name: string;
  description: string;
  photos: string[];
  skills: string[];
  rating: number;
  reviews: number;
  lessons: number;
  price: number;
};

type TutorStatsProps = Pick<
  TutorCardProps,
  "rating" | "reviews" | "lessons" | "price"
>;

function TutorStats({
  rating,
  reviews,
  lessons,
  price,
}: TutorStatsProps) {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <strong>{rating.toFixed(1)}</strong>
        <span>({reviews})</span>
      </div>

      <div className={styles.stat}>
        <strong>{lessons.toLocaleString("en-US")}+</strong>
        <span>Lessons</span>
      </div>

      <div className={styles.stat}>
        <strong>${price}</strong>
        <span>per hour</span>
      </div>
    </div>
  );
}

function TutorSkills({
  id,
  skills,
}: {
  id: string;
  skills: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(skills.length);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure) return;

    function calculate() {
      if (!container || !measure) return;

      const available = container.clientWidth;
      if (!available) return;

      const labels = Array.from(
        measure.querySelectorAll<HTMLElement>("[data-skill]")
      );

      const badges = Array.from(
        measure.querySelectorAll<HTMLElement>("[data-count]")
      );

      const gap = parseFloat(getComputedStyle(container).gap) || 0;

      const widths = labels.map((label) =>
        label.getBoundingClientRect().width
      );

      const total = widths.reduce((sum, width) => sum + width, 0)
        + Math.max(0, widths.length - 1) * gap;

      if (total <= available) {
        setVisibleCount(skills.length);
        return;
      }

      for (let count = skills.length - 1; count >= 0; count--) {
        const labelsWidth = widths
          .slice(0, count)
          .reduce((sum, width) => sum + width, 0);

        const badgeWidth = badges[
          skills.length - count - 1
        ]?.getBoundingClientRect().width ?? 0;

        const required = labelsWidth + badgeWidth + count * gap;

        if (required <= available) {
          setVisibleCount(count);
          return;
        }
      }

      setVisibleCount(0);
    }

    const observer = new ResizeObserver(calculate);
    observer.observe(container);

    calculate();

    document.fonts.ready.then(calculate);

    return () => observer.disconnect();
  }, [id, skills]);

  const hiddenCount = skills.length - visibleCount;

  return (
    <div className={styles.skills} ref={containerRef}>
      {skills.slice(0, visibleCount).map((skill, index) => (
        <SkillLabel key={`${skill}-${index}`} tutorId={id}>
          {skill}
        </SkillLabel>
      ))}

      {hiddenCount > 0 && (
        <span className={styles.moreSkills}>
          +{hiddenCount}
        </span>
      )}

      <div className={styles.measure} ref={measureRef} aria-hidden="true">
        {skills.map((skill, index) => (
          <span key={index} data-skill className={styles.measureItem}>
            <SkillLabel tutorId={id}>{skill}</SkillLabel>
          </span>
        ))}

        {skills.map((_, index) => (
          <span
            key={index}
            data-count
            className={styles.moreSkills}
          >
            +{index + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TutorCard({
  id,
  name,
  description,
  photos,
  skills,
  rating,
  reviews,
  lessons,
  price,
}: TutorCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.photoSection}>
        <PhotoCarousel
          photos={photos}
          alt={name}
          variant="card"
        />

        <div className={styles.mobileSave}>
          <SaveButton />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.heading}>
          <h3 className={styles.name}>{name}</h3>

          <div className={styles.desktopSave}>
            <SaveButton />
          </div>
        </div>

        <TutorSkills id={id} skills={skills} />

        <p className={styles.description}>{description}</p>

        <TutorStats
          rating={rating}
          reviews={reviews}
          lessons={lessons}
          price={price}
        />
      </div>
    </article>
  );
}
