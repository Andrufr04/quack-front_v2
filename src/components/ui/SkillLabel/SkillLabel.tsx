
import styles from "./SkillLabel.module.css";

type SkillLabelProps = {
  children: string;
  tutorId: string;
};

const colors = [
  styles.orange,
  styles.red,
  styles.green,
  styles.blue,
  styles.purple,
  styles.pink,
  styles.yellow,
  styles.teal,
];

function getColor(tutorId: string, skill: string) {
  const value = `${tutorId}:${skill}`;
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }

  return colors[(hash >>> 0) % colors.length];
}

export default function SkillLabel({
  children,
  tutorId,
}: SkillLabelProps) {
  return (
    <span className={`${styles.label} ${getColor(tutorId, children)}`}>
      {children}
    </span>
  );
}
