'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

const AnimatedTitle = () => {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const title_split = 'Dream Docks'.split('');

  useEffect(() => {
    gsap.fromTo(
      letterRefs.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
        stagger: 0.1,
        ease: 'power3.out',
        yoyo: true,
        repeat: -1,
        repeatDelay: 3,
      }
    );
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/'; // Force full page refresh
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="bg-transparent flex items-center space-x-2"
    >
      <Image
        src={'/DD-Panda.png'}
        alt="An image of a cute dreaming panada"
        width={50}
        height={50}
      />
      <div className="text-md md:text-xl font-bold flex ">
        {title_split.map((letter, index) => (
          <span
            key={index}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            className={letter === ' ' ? 'w-2 tracking-wide' : 'tracking-wide'}
          >
            {letter}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default AnimatedTitle;
