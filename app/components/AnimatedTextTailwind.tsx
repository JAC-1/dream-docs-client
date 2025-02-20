import React from "react";

interface AnimatedTextProps {
  text: string;
  element?: "h1" | "p";
  className?: string;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  element = "p",
  className = "",
  delay = 0,
}) => {
  const TextComponent = element;

  return (
    <TextComponent className={className}>
      {text.split(" ").map((word, index) => (
        <React.Fragment key={index}>
          {index > 0 && " "}
          <span
            className="inline-block animate-fadeIn opacity-0"
            style={{ animationDelay: `${delay + index * 0.1}s` }}
          >
            {word}
          </span>
        </React.Fragment>
      ))}
    </TextComponent>
  );
};

export default AnimatedText;
