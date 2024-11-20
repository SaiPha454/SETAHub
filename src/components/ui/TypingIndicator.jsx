import React from 'react';
import styles from "./TypingIndicator.module.css";

const TypingIndicator = () => {
    console.log("Indicator is rendering...")
  return (
    <div className={styles.typing_indicator}>
        Typing 
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
};

export default TypingIndicator;
