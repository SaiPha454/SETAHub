import React, { useState, useRef } from 'react';
import styles from './ChatFooter.module.css'; // Create a CSS file for styling if needed
import sendBtn from '../assets/chatSendBtn.svg'
import imgIcon from '../assets/img_icon.svg'
import globalStyles from "../styles/global.module.css"

const ChatFooter = ({onSendMessage, onSendImage}) => {
    const [message, setMessage] = useState(''); //to change the msg

    const fileInputRef = useRef(null); // Create a reference for the file input

    const handleIconClick = () => {
        fileInputRef.current.click(); 
    };


    // Function to handle sending the message
    const handleOnSendMessage = (e) => {
        if (message.trim()) {
            onSendMessage(message)
            setMessage(''); // Clear the input after sending
            
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
             onSendImage(imageUrl);
        }
        fileInputRef.current.value=null;

    }
  
    return (
        <div className={`${styles.chatContainer}`}>

            <div className={`${styles.chatFooter} `}>
                <div className={`${globalStyles.container} ${styles.footerContent}`}>
                    
                    <div className={`${styles.inputContainer}`}>
                        <div>
                            <img 
                                src={imgIcon} 
                                alt="img icon" 
                                className={`${styles.imgIcon}`} 
                                onClick={handleIconClick} />

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef} // Reference to trigger the click
                                style={{ display: 'none' }} 
                                onChange={handleImageChange} 
                            />
                        </div>

                        <input className={`${styles.input_chat}`}
                            type="text"
                            placeholder="Enter your message ..."
                            onChange={(e) => setMessage(e.target.value)}
                            value={message} />
                    </div>

                    <button className={`${styles.send_Btn}`} onClick={handleOnSendMessage}>
                        <img src={sendBtn} className={`${styles.send_img}`} alt="Send Button Icon" />
                        </button>
                </div>

                </div>
            </div>
    )
};

export default ChatFooter;
