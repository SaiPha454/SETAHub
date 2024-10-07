import React, { useState } from 'react';
import styles from './ChatPage.module.css';
import ChatNavBar from '../../components/ChatNavBar';
import globalStyles from "../../styles/global.module.css"
import ChatContent from '../../components/ChatContent'


export default function ChatPage() {

  const [messages, setMessages] = useState([]); // Store messages
  const [newMessage, setNewMessage] = useState(''); // Store the new message

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add the new message to the messages array
      setMessages([...messages, newMessage]);
      setNewMessage(''); // Clear the input after sending
    }
  };
    
  return (
    <div className={`${styles.layout}`}>
        <ChatNavBar name="Eaint Kay Khaing Kyaw" />
        <div className={`${styles.chatPageContent} ${globalStyles.container}`}>
          <div className={`${styles.messagesContainer}`}>
            
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
          </div>
          <div className={`${styles.chatFooter}`}>
            <ChatContent/>
          </div>
        </div>
    </div>

  );
};
