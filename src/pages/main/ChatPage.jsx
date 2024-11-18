import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatPage.module.css';
import ChatNavBar from '../../components/ChatNavBar';
import globalStyles from "../../styles/global.module.css"
import ChatFooter from '../../components/ChatFooter'
import ChatContent from '../../components/ChatContent';
import ChatImg from '../../components/ChatImg';


export default function ChatPage() {

  const [messages, setMessages] = useState([
    {
      name:"Eaint Eaint",
      profile_img: "https://thumbs.dreamstime.com/b/stunning-camel-close-up-exquisite-hasselblad-h-d-c-style-artwork-edited-photoshop-depicted-png-format-against-white-291165843.jpg",
      msgT: "sender",
      message: "Hi I am Eaint",
      isImage: false,
    },
    {
      name:"Eaint Eaint",
      img_src: "https://thumbs.dreamstime.com/b/stunning-camel-close-up-exquisite-hasselblad-h-d-c-style-artwork-edited-photoshop-depicted-png-format-against-white-291165843.jpg",
      msgT: "sender",
      isImage: true,
      profile_img: "https://thumbs.dreamstime.com/b/stunning-camel-close-up-exquisite-hasselblad-h-d-c-style-artwork-edited-photoshop-depicted-png-format-against-white-291165843.jpg"
    },
    {
      name:"Eaint Eaint",
      profile_img: "https://thumbs.dreamstime.com/b/stunning-camel-close-up-exquisite-hasselblad-h-d-c-style-artwork-edited-photoshop-depicted-png-format-against-white-291165843.jpg",
      msgT: "sender",
      message: "Hi I am Eaint",
      isImage: false,
    },
    {
      name:"Eaint Eaint",
      img_src: "https://thumbs.dreamstime.com/b/stunning-camel-close-up-exquisite-hasselblad-h-d-c-style-artwork-edited-photoshop-depicted-png-format-against-white-291165843.jpg",
      msgT: "me",
      isImage: true,
      profile_img: "https://thumbs.dreamstime.com/b/stunning-camel-close-up-exquisite-hasselblad-h-d-c-style-artwork-edited-photoshop-depicted-png-format-against-white-291165843.jpg"
    }
  ]); // Store messages


  //to appear messages immediately
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const imageCount = messages.filter(msg => msg.isImage).length;
    if (imagesLoaded === imageCount) {
      scrollToBottom();
    }
  }, [messages, imagesLoaded]);

  const handleImagesLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  const handleSendMessages = (text) => {
    let newMsg = {
      name:"Eaint Eaint",
      profile_img: "https://thumbs.dreamstime.com/b/stunning-camel-close-up-exquisite-hasselblad-h-d-c-style-artwork-edited-photoshop-depicted-png-format-against-white-291165843.jpg",
      msgT: "me",
      message: text,
      isImage: false,
    }
    setMessages([...messages, newMsg])
 
  };

  const handleSendImages = (sent_img) => {
    let new_img = {
      name:"Eaint Eaint",
      img_src: sent_img,
      msgT: "me",
      isImage: true,
      profile_img: "https://thumbs.dreamstime.com/b/stunning-camel-close-up-exquisite-hasselblad-h-d-c-style-artwork-edited-photoshop-depicted-png-format-against-white-291165843.jpg",
    }
    setMessages([...messages, new_img])
    setImagesLoaded(0);
  }
    
  return (
    <div className={`${styles.layout}`}>
        <ChatNavBar name="Eaint Kay Khaing Kyaw" />
        <div className={`${styles.chatPageContent} ${globalStyles.container}`}>
          <div className={`${styles.messagesContainer}`}>

            {
              messages.map((msg, index) => (
                msg.isImage ? 
                <ChatImg
                  key={index}
                  msgImg={msg.img_src} 
                  name={msg.name} 
                  msgT={msg.msgT}
                  onLoad={handleImagesLoad}
                />
                 : 
                 <ChatContent
                  key={index}
                  profileImg={msg.profile_img}
                  name={msg.name}
                  message={msg.message}
                  msgT={msg.msgT}
                />
              ))
            }
            <div ref={messagesEndRef} />
          </div>
          <div className={`${styles.chatFooter}`}>
            <ChatFooter onSendImage={handleSendImages} onSendMessage={handleSendMessages}/>
          </div>
        </div>
    </div>

  );
};
