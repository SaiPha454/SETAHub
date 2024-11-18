import React from 'react';
import styles from './Box.module.css';
// import profileImage from '../../assets/profile.svg';
import LinkProfile from '../../components/ui/LinkProfile';

export default function Box({ name, year, id }) {
  return (
    <div className={`${styles.profileParent}`}>
      
      <LinkProfile classes={`${styles.profile}`} />
      <div className={`${styles.TAName}`}>{name}</div>
      <div className={`${styles.year}`}>{id} ({year})</div>
      <div className={`${styles.aBrightSocially}`}>
        A bright, socially intelligent who effortlessly connects with others, blending wit with empathy in every interaction.
      </div>
      <div className={`${styles.button}`}>
        <b className={`${styles.seeAvailableTime}`}>See Available Time slots</b>
      </div> 
    </div>
  );
}
