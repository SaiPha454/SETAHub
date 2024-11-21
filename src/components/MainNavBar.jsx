
import styles from './MainNavBar.module.css';
import JoinButton from "./ui/LinkButton"
import globalStyles from "../styles/global.module.css"
import { Link } from 'react-router-dom';
import Logo from './ui/Logo';
import LinkProfile from './ui/LinkProfile';
import ProfileIcon from "../assets/profile.svg"
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';


const Navbar = () => {

    const {authUser} = useContext(AuthContext)
    
  	return (
    		<div className={`${styles.navbar}`}>
                <div className={`${globalStyles.container} `}>
                    <div className={`${styles.navbarContent}`}>
                        <Logo url="/me"/>
                        <div className={`${styles.leftSide}`}>
                            <div>
                                <Link className={styles.navLink} to="/me/bookings">My Bookings</Link>
                                <Link className={styles.navLink} to="/me/tasessions">My TA Sessions</Link>
                            </div>
                            <LinkProfile img={`http://localhost:8000${authUser.image}`} url="/me/profile" />
                            
                        </div>
                    </div>
                </div>
    		</div>
    );
};

export default Navbar;
