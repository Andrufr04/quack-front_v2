
"use client";

import { useState } from "react";
import SmallArrowIcon from "@/components/ui/Icon/SmallArrowIcon";
import styles from "./PhotoCarousel.module.css";

type PhotoCarouselProps = {
  photos: string[];
  alt: string;
  variant?: "card" | "gallery";
};

export default function PhotoCarousel({
  photos,
  alt,
  variant = "card",
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = photos.length;
  const activeIndex = count > 0 ? index % count : 0;

  function changePhoto(direction: number) {
    if (count < 2) return;
    setIndex((current) => (current + direction + count) % count);
  }

  return (
    <div className={`${styles.carousel} ${styles[variant]}`}>
      <div className={styles.photo}>
        {count > 0 && (
          <img
            src={photos[activeIndex]}
            alt={`${alt}, photo ${activeIndex + 1}`}
            className={styles.image}
          />
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.previous}`}
              onClick={() => changePhoto(-1)}
              aria-label="Previous photo"
            >
              <SmallArrowIcon />
            </button>

            <button
              type="button"
              className={`${styles.arrow} ${styles.next}`}
              onClick={() => changePhoto(1)}
              aria-label="Next photo"
            >
              <SmallArrowIcon />
            </button>
          </>
        )}

        {variant === "card" && count > 1 && (
          <div className={styles.indicators} aria-hidden="true">
            {photos.map((_, photoIndex) => (
              <span
                key={photoIndex}
                className={`${styles.indicator} ${
                  photoIndex === activeIndex ? styles.active : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {variant === "gallery" && count > 1 && (
        <div className={styles.thumbnails}>
          {photos.map((photo, photoIndex) => (
            <button
              key={photoIndex}
              type="button"
              className={`${styles.thumbnail} ${
                photoIndex === activeIndex ? styles.selected : ""
              }`}
              onClick={() => setIndex(photoIndex)}
              aria-label={`Show photo ${photoIndex + 1}`}
              aria-pressed={photoIndex === activeIndex}
            >
              <img src={photo} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
