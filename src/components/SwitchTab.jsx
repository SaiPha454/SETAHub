import React, { useState } from 'react';
import styles from './SwitchTab.module.css';

export default function SwitchTab({ activeTab, setActiveTab }) {
   // Initial active tab

  return (
    <div className={styles.switchTabContainer}>
      <div
        className={`${styles.tab} ${
          activeTab === 'upcoming' ? styles.active : ''
        }`}
        onClick={() => setActiveTab('upcoming')}
      >
        Upcoming
      </div>
      <div
        className={`${styles.tab} ${
          activeTab === 'completed' ? styles.active : ''
        }`}
        onClick={() => setActiveTab('completed')}
      >
        Completed
      </div>
    </div>
  );
}
