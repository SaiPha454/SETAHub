import React from "react";
import styles from "./BlueFrame.module.css";
import ArrowIcon from "../assets/arrow-sm-right-svgrepo-com.png";
import HoverArrow from "../assets/right-arrow.png";
import { Link } from "react-router-dom";

const Frame  = () => {
  return (
    <div className={styles.container}>
      <div className={styles.frameDiv}>
        <b className={styles.areYouA}>Are You a Senior?</b>
        <p className={styles.helpUsBuild}>
          Help us build the SE community by sharing what you know!
        </p>
        <Link
          to={"/signup"}
          className={styles.registerParent}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <b className={styles.register}>Register</b>
          <img
            className={styles.arrowIcon}
            alt="Arrow icon"
            src={ArrowIcon} // Default arrow icon
          />
          <img
            className={styles.hoverArrowIcon}
            alt="Hover Arrow Icon"
            src={HoverArrow} // Hover arrow icon
          />
        </Link>
      </div>
    </div>
  );
};

export default Frame;
