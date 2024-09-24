
import styles from './AuthNavBar.module.css';
import JoinButton from "./ui/LinkButton"
import globalStyles from "../styles/global.module.css"
import { Link } from 'react-router-dom';
import Logo from './ui/Logo';

const Navbar = () => {
  	return (
    		<div className={`${styles.navbar}`}>
                <div className={`${globalStyles.container} `}>
                    <div className={`${styles.navbarContent}`}>
                        <Logo url="/" />
                        <div className={`${styles.leftSide}`}>
                            <Link className={styles.signIn} to="signin">Sign In</Link>
                            <JoinButton text="Join Us" url="signup"/>
                        </div>
                    </div>
                </div>
    		</div>
    );
};

export default Navbar;
