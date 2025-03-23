
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterText?: number;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterText = 2000,
  className = '',
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Toggle cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    if (isTyping) {
      // Typing effect
      if (displayedText.length < currentFullText.length) {
        const timeoutId = setTimeout(() => {
          setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        }, typingSpeed);
        
        return () => clearTimeout(timeoutId);
      } else {
        // Finished typing, wait before deleting
        const timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, delayAfterText);
        
        return () => clearTimeout(timeoutId);
      }
    } else {
      // Deleting effect
      if (displayedText.length > 0) {
        const timeoutId = setTimeout(() => {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }, deletingSpeed);
        
        return () => clearTimeout(timeoutId);
      } else {
        // Finished deleting, move to next text
        setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentTextIndex, texts, typingSpeed, deletingSpeed, delayAfterText]);

  return (
    <span className={className}>
      {displayedText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
    </span>
  );
};

export default TypewriterText;
