import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css';


const LinkButton = ({text, url, bgColor='#0056d2'}) => {
  	return (
        <Link style={{backgroundColor: bgColor}} className={styles.button} to={url}>
            <b className={styles.joinUs}>{text}</b>
        </Link>
    );
};

export default LinkButton;
