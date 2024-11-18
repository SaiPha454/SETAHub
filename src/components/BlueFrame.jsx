import { FunctionComponent } from 'react';
import styles from './BlueFrame.module.css';
import ArrowIcon from '../assets/arrow-sm-right-svgrepo-com.png';
import { Link } from 'react-router-dom';

const Frame = () => {
  	return (
        <div className={`${styles.container}`}>
            <div className={`${styles.frameDiv}`}>
                <b className={`${styles.areYouA}`}>Are You a Senior?</b>
                <p className={`${styles.helpUsBuild}`}>
                    Help us build the SE community by sharing what you know!
                </p>
                <Link to={'/signup'} className={`${styles.registerParent}`}>
                    <b className={`${styles.register}`}>Register</b>
                    <img className={`${styles.arrowIcon}`} alt="Arrow icon" src={ArrowIcon} />
                </Link>
            </div>
        </div>
    ); 
};

export default Frame;