import { Link } from 'react-router-dom';
import styles from './LinkButton2.module.css';


const LinkButton = ({text, url, bgColor='#fff'}) => {
    return (
        <Link style={{backgroundColor: bgColor}} className={styles.button} to={url}>
            <b className={styles.joinUs}>{text}</b>
        </Link>
    );
};

export default LinkButton;