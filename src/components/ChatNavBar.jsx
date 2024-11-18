import styles from './ChatNavBar.module.css'
import globalStyles from '../styles/global.module.css'
import Logo from './ui/Logo'
import Profile from '../pages/main/Profile'
import { useNavigate } from 'react-router-dom'; //to backpage
import LinkProfile from './ui/LinkProfile';
import backIcon from "../assets/backicon.svg"




const ChatNavBar = ({img = null, name}) => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to go back to the previous page
    const goBack = () => {
        navigate(-1); // Go back to the previous page in history
    };

    return (
        <div className={`${styles.navbar}`}>
            <div className={`${globalStyles.container}`}>
                <div className={`${styles.navbarContent}`}>
                    <div className={`${styles.rightSide}`}>
                         <button className={`${styles.backBtn}`} onClick={goBack}>
                            <img src={backIcon} className={`${styles.backBtn}`} />
                        </button>
                        <Logo url="/me/" />
                    </div>
                    <div className={`${styles.leftSide}`}>
                        <LinkProfile img={img} url="/me/profile" />
                        <span className={`${styles.profileName}`}>{name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatNavBar;

