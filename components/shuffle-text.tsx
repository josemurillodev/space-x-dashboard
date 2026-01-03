'use client';

import { useEffect, useState, useRef } from 'react';

interface ShuffleTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export function ShuffleTextSimple({ text, delay = 0, className = '' }: ShuffleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | number>(-1);

  const CHAR_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  useEffect(() => {
    // Initial empty state
    // setDisplayText(' '.repeat(text.length));
    setDisplayText(text);

    const startTimer = setTimeout(() => {
      setIsAnimating(true);
      shuffleAnimation();
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [text, delay]);

  const shuffleAnimation = () => {
    const characters = text.split('');
    const steps = 25; // Total animation steps
    let step = 0;

    const animate = () => {
      if (step > steps) {
        // Final state
        setDisplayText(text);
        setIsAnimating(false);
        return;
      }

      // Create scrambled text
      const scrambled = characters.map((char, i) => {
        if (char === ' ') return ' ';
        
        // Gradually reveal the real character
        if (step > i * 2) {
          return char;
        }
        
        // Show random character
        return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
      });

      setDisplayText(scrambled.join(''));
      step++;
      animationRef.current = setTimeout(animate, 50);
    };

    animate();
  };

  return (
    <span 
      className={`inline-block min-w-[${text.length * 0.6}em] align-top ${className}`}
      data-animating={isAnimating}
    >
      {displayText}
    </span>
  );
}