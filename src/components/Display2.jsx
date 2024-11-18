import { FunctionComponent } from 'react';
import styles from './Display2.module.css';
import { Link } from 'react-router-dom';
import Mentors from '../assets/hello6.png';

const Display = () => {
    return (
        <div className={`${styles.container}`}>
            <p className={`${styles.title}`}>
                Ready to connect with a mentor or start mentoring? Join SETAHub now and become part of a community dedicated to helping SE students succeed
            </p>
            <img className={`${styles.image}`} src={Mentors} alt="mentors image" />
        </div>
    );
};

export default Display;