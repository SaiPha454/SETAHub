import React, { useState, useEffect, useRef } from 'react';
import styles from "./TATimeSlot.module.css";

export default function TimeSlot({ start, end, onRemove }) {
  const [isShaking, setIsShaking] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const timeSlotRef = useRef(null);
  const shakeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isShaking && timeSlotRef.current && !timeSlotRef.current.contains(event.target)) {
        setIsShaking(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    // Clear shake state after 1 second if user doesn't interact
    if (isShaking) {
      shakeTimeoutRef.current = setTimeout(() => {
        setIsShaking(false);
      }, 1000);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }
    };
  }, [isShaking]);

  const handleClick = (event) => {
    event.stopPropagation();
    
    if (isShaking) {
      setIsRemoving(true);
      // Wait for removal animation to complete before calling onRemove
      setTimeout(() => {
        if (onRemove) onRemove();
      }, 300); // Match this with CSS animation duration
    } else {
      setIsShaking(true);
      // Clear any existing shake timeout
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }
    }
  };

  return (
    <div
      ref={timeSlotRef}
      className={`${styles.timeSlot} 
                 ${isShaking ? styles.shake : ''} 
                 ${isRemoving ? styles.remove : ''}`}
      onClick={handleClick}
    >
      <span>{start} - {end}</span>
    </div>
  );
}