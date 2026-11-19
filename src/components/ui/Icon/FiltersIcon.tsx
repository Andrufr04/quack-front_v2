
import type { SVGProps } from "react";

export default function FiltersIcon(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 5h14M3 10h14M3 15h14" />
      <circle cx="7" cy="5" r="2" fill="white" />
      <circle cx="13" cy="10" r="2" fill="white" />
      <circle cx="8" cy="15" r="2" fill="white" />
    </svg>
  );
}
