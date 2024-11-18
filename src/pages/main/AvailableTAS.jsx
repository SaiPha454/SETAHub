import React from 'react';
import styles from "./AvailableTAS.module.css";
import Box from "./Box";
import { useParams } from 'react-router-dom';
import backArrow from '../../assets/navigation-back-arrow-svgrepo-com 1.png';
import Java from '../../assets/java-svgrepo-com 1.png';
import globalClasses from '../../styles/global.module.css';

export default function AvailableTAS() {
  const { topicId } = useParams();

  // Simulating TA data
  const taList = [
    { name: 'Username', year: 'Year 2', id: '66011533' },
    { name: 'Username', year: 'Year 2', id: '66011533' },
    { name: 'Username', year: 'Year 2', id: '66011534' },
    { name: 'Username', year: 'Year 2', id: '66011535' },
  ];

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.javaIcon}`}>
          <img
            className={`${styles.navigationBackArrowSvgrepoIcon}`}
            alt=""
            src={backArrow}
          />
          <img
            className={`${styles.javaSvgrepoCom1Icon}`}
            alt=""
            src={Java}
          />
          <span className={`${styles.CourseName}`}>
            Data Structure and Algorithms
          </span>
      </div>

      {/* //important */}
      <p className={`${styles.available}`}>Available TAs</p>

      <div className={`${styles.taGrid}`}>
        {taList.map((ta, index) => (
          <Box
            key={index}
            name={ta.name}
            year={ta.year}
            id={ta.id}
          />
        ))}
      </div>
    </div>
  );
}
