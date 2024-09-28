import styles from './Button.module.css'


const Button = ({text, width = null, color='#0056d2', onClick}) => {
  	return (
        <div onClick={onClick} className={`${styles.button}`} style={{width: width? width : 'auto',backgroundColor: color}}>
            <b className={styles.joinUs}>{text}</b>
        </div>
    );
};

export default Button;
