import { Text } from "zmp-ui";

interface SectionTitleProps {
  title: string;
  image?: string;
  hideIcon?: boolean;
}

export default function SectionTitle({
  title,
  image,
  hideIcon = false,
}: SectionTitleProps) {
  return (
    <Text.Title
      size="small"
      className="flex items-center gap-2 text-text-title"
    >
      {!hideIcon &&
        (image ? (
          <img
            draggable={false}
            src={image}
            alt={title}
            className="inline-block h-6 w-6 text-center"
          />
        ) : (
          <span> 🔥 </span>
        ))}
      <span> {title} </span>
    </Text.Title>
  );
}
