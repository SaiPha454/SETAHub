import React, { useState, useRef } from 'react';
import styles from './ChatContent.module.css'; // Create a CSS file for styling if needed
import sendBtn from '../assets/chatSendBtn.svg'
import imgIcon from '../assets/img_icon.svg'
import globalStyles from "../styles/global.module.css"

const ChatContent = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [image,setImages] = useState(null);

    const fileInputRef = useRef(null); // Create a reference for the file input

    const handleIconClick = () => {
        fileInputRef.current.click(); 
    };


    // Function to handle sending the message
    const handleSendMessage = (e) => {
        if (message.trim() || image) {
            // Add the new message to the messages array
            setMessages([...messages, { text: message}]);
            setMessage(''); // Clear the input after sending
            setImages(null)
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImages(URL.createObjectURL(file)); // Create a preview URL for the selected image
        }

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

                    <button className={`${styles.send_Btn}`} onClick={handleSendMessage}>
                        <img src={sendBtn} className={`${styles.send_img}`} alt="Send Button Icon" />
                        </button>
                </div>

                </div>
            </div>
    )
};

export default ChatContent;
