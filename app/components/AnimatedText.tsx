'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimatedTextProps {
  text: string;
  element?: 'h1' | 'p';
  className?: string;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  element = 'p',
  className = '',
  delay = 0,
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textElement = textRef.current;

    if (textElement) {
      gsap.fromTo(
        textElement.children,
        { opacity: 0, y: 20, rotate: 10 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.02,
          stagger: 0.02,
          delay,
          ease: 'power3.out',
        }
      );
    }
  }, [delay]);

  const TextComponent = element;

  return (
    <TextComponent ref={textRef} className={className}>
      {text.split(' ').map((word, index) => (
        <React.Fragment key={index}>
          {index > 0 && ' '}
          <span>{word}</span>
        </React.Fragment>
      ))}
    </TextComponent>
  );
};

export default AnimatedText;
