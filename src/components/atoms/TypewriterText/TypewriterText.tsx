'use client';

import { cn } from '@/lib/utils';
import { createElement, useEffect } from 'react';
import { useState } from 'react';

interface TypewriterTextProps {
  children: string;
  typeSpeed?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export const TypewriterText = ({ children: text, className, typeSpeed = 200, as = 'p' }: TypewriterTextProps) => {
  const [currentText, setCurrentText] = useState(text);
  const [lastTypedCharIndex, setLastTypedCharIndex] = useState(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    for (let index = 0; index < currentText.length; index++) {
      const timeout = setTimeout(() => {
        setLastTypedCharIndex(index);
      }, typeSpeed * index);

      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [currentText, typeSpeed]);

  useEffect(() => {
    if (text === currentText) return;

    const timeouts: NodeJS.Timeout[] = [];
    for (let index = 0; index < currentText.length; index++) {
      const timeout = setTimeout(() => {
        setLastTypedCharIndex(currentText.length - index - 2);
      }, typeSpeed * index);

      timeouts.push(timeout);
    }

    const timeout = setTimeout(() => {
      setCurrentText(text);
    }, typeSpeed * currentText.length);

    timeouts.push(timeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [currentText, text, typeSpeed]);

  return createElement(
    as,
    { className: cn('w-fit animate-[caret-blink_1.5s_linear_infinite] border-r-4 min-h-32', className) },
    currentText.slice(0, lastTypedCharIndex + 1)
  );
};
