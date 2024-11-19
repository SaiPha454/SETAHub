import React from 'react';
import styles from './TADisplay.module.css';
import LinkButton from '../../components/ui/LinkButton';
import LinkProfile from '../../components/ui/LinkProfile';
import { useLocation } from 'react-router-dom';

export default function TADisplay({ name, year, id, topicId }) {

  const location = useLocation()
  const path = location.pathname
  const query = location.search
  const current_url = path+ query
  console.log(current_url)
  return (
    <div className={`${styles.profileParent}`}>
      
      <LinkProfile classes={`${styles.profile}`} />
      <div className={`${styles.TAName}`}>{name}</div>
      <div className={`${styles.year}`}> ( {year} )</div>
      <div className={`${styles.aBrightSocially}`}>
        A bright, socially intelligent who effortlessly connects with others, blending wit with empathy in every interaction.
      </div>
      <div className={`${styles.buttonContainer}`}>
        <LinkButton 
        url={`/me/topics/${topicId}/tas/${id}/booking?ta_name=${name}&from=${encodeURIComponent(current_url)}`}
        classes={`${styles.button}`}
        text={"See Available Timeslots"} />
      </div>
    </div>
  );
}
