import { FunctionComponent } from 'react'; 
import styles from './Display.module.css';
import { Link } from 'react-router-dom';
import arrow from '../assets/navigation_arrow.png';
import Step1 from '../assets/step1 1.png';
import Step2 from '../assets/step2 2.png';
import Step3 from '../assets/bookandmessage 1.png';

const Frame = () => {
    return (
        <div className={`${styles.homeContent}`}>
            <p className={`${styles.heading}`}>How to find your TAs on SETAHub</p>
            <div className={`${styles.cards}`}>
                <div className={`${styles.card}`}>
                    <img className={`${styles.images}`} src={Step1} alt="Step 1 signing up" />
                    <h3 className={`${styles.title}`}>Step 1: Sign Up </h3>
                    <div className={`${styles.explain}`}>Create your account on SETAHub to unlock access to our network of talented TAs.</div>
                </div>
                <div className={`${styles.card2}`}>
                    <img className={`${styles.arrow}`} src={arrow} alt='navigation arrow'/>
                </div>
                <div className={`${styles.card}`}>
                    <img className={`${styles.images}`} src={Step2} alt="Step 2 browse TAs"/>
                    <h3 className={`${styles.title}`}>Step 2: Browse Available TAs</h3>
                    <div className={`${styles.explain}`}>Explore a list of available TAs by subject or course. Review their profiles to find a match that fits your learning needs.</div>
                </div>
                <div className={`${styles.card2}`}>
                    <img className={`${styles.arrow}`} src={arrow} alt='navigation arrow'/>
                </div>
                <div className={`${styles.card}`}>
                    <img className={`${styles.images}`} src={Step3} alt="Step 3 book and message"/>
                    <h3 className={`${styles.title}`}>Step 3: Book and Message</h3>
                    <div className={`${styles.explain}`}>Select your favorite TA, book a session, and start chatting! Reach out to discuss your questions and schedule your mentoring sessions.</div>
                </div>
            </div>
            <div className={`${styles.button_container}`}>
                <button className={`${styles.button}`}>Become a TA</button>
            </div>
        </div>
    );
};

export default Frame;