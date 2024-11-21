import React, { useState, useEffect, useRef, useContext } from 'react';
import styles from './ChatPage.module.css';
import ChatNavBar from '../../components/ChatNavBar';
import globalStyles from "../../styles/global.module.css"
import ChatFooter from '../../components/ChatFooter'
import ChatContent from '../../components/ChatContent';
import ChatImg from '../../components/ChatImg';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'
import TypingIndicator from '../../components/ui/TypingIndicator';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { isFilePath } from '../../utils/isFilePath';
import { isValidImageUrl } from '../../utils/isValidImageUrl';

export default function ChatPage() {

  const {userId :to_user_id } = useParams()

  const { authUser, messageSocket } = useContext(AuthContext)
  const [typing, setTyping ] = useState(false)
  const [messages, setMessages] = useState([]); // Store messages
  let typingTimeout = null;
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const peerName = queryParams.get("peer_name")

  console.log("Page is rendereing...")
  useEffect(()=>{
    if (authUser){
      const fetchMessages = async () => {
        try {
        
          let response = await axios.get(`http://localhost:8000/messages/${authUser.id}/with/${to_user_id}`, {withCredentials: true})
          let data = response.data.data.map((msg)=> {
            let message = {
              "from_user_id": msg.from_user_id,
              "to_user_id": msg.to_user_id ,
              "message": msg.message,
              "timestamp": msg.timestamp,
              "status": msg.status
            }

            if(msg.from_user_id == authUser.id){
              // Message that I send
              message.msgT = "sent"
            }else{
              // Message that is sent to me
              message.msgT = "received"
            }

            if (isValidImageUrl(msg.message)) {
              message.img_src = msg.message
              message.isImage = true
            }else if (isFilePath(msg.message)){
              message.img_src = `http://localhost:8000${msg.message}`
              message.isImage = true
            }
            return message
          })
          console.log("Fetching New Data fro server : ",data)
          setMessages(data)
        } catch (error) {
          
        }
      }

      fetchMessages()
    }
  }, [])
  useEffect(()=>{

    if (messageSocket && authUser){
        messageSocket.onmessage = (event) => {
          event = JSON.parse(event.data)

          if (event.data && event.data.from_user_id == to_user_id){

            if (event.type == "typing") {
              // Clear the previous timeout if any
              if (typingTimeout) {
                clearTimeout(typingTimeout);
              }
  
              // Set typing to true and debounce the timeout
              setTyping(true);
              typingTimeout = setTimeout(() => {
                setTyping(false);
              }, 1000);
            }else if (event.type == "message"){
              let messageData = {
                name: event.data.from_user.name,
                profile_img: "https://thumbs.dreamstime.com/b/stunning-camel-close-up-exquisite-hasselblad-h-d-c-style-artwork-edited-photoshop-depicted-png-format-against-white-291165843.jpg",
                msgT: "received",
                message: event.data.message,
                isImage: false,
                timestamp : event.data.timestamp
              }
  
              if (isValidImageUrl(event.data.message)) {
                messageData.isImage = true
                messageData.img_src = event.data.message
                messageData.message = event.data.message
              }
              
              setMessages(prevMessages => [...prevMessages, messageData])
              
            }
          }
          
          console.log("WebSocket message received on Chat Page:", event);
      };

      // Optional cleanup to avoid re-assigning multiple listeners
      return () => {
        messageSocket.onmessage = null;
      };
    }

  }, [ messageSocket])


  //to appear messages immediately
  const [imagesLoaded, setImagesLoaded] = useState(null);
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

  const handleSendMessages = async (message) => {

    if (messageSocket){

      try {
        let response = await axios.post(`http://localhost:8000/messages/${authUser.id}/to/${to_user_id}`, {
          "type": "message",
          "data": {
            "from_user_id": authUser.id,
            "to_user_id": to_user_id ,
            "msg_type": "text",
            "message": message
          }
        }, {withCredentials:true})

        let data = response.data.data.data
        console.log("New Message : ", data)
        let newMessage ={
          "from_user_id": authUser.id,
          "to_user_id": to_user_id,
          "message": data.message,
          "timestamp": data.timestamp,
          "status": data.status,
          "msgT": "sent",
        }

        if(isValidImageUrl(data.message)){
          newMessage.img_src = data.message
          newMessage.isImage = true
        }
        console.log(newMessage)
        setMessages([...messages, newMessage])
      } catch (error) {
        console.log(error.response)
      }
    }
  };

  const handleSendImages = async (sent_img) => {
    console.log("Send Iamge file : ", sent_img)

    if (messageSocket){

      const messageFormData = new FormData()
      messageFormData.append("from_user_id",authUser.id)
      messageFormData.append("to_user_id",to_user_id)
      messageFormData.append("image", sent_img)

      try {
        let response = await axios.post(`http://localhost:8000/messages/${authUser.id}/to/${to_user_id}/images`, messageFormData, {withCredentials:true})

        let data = response.data.data.data
        console.log("New Message : ", data)
        let newMessage ={
          "from_user_id": authUser.id,
          "to_user_id": to_user_id,
          "message": data.message,
          "timestamp": data.timestamp,
          "status": data.status,
          "msgT": "sent",
        }

        if(isValidImageUrl(data.message)){
          newMessage.img_src = data.message
          newMessage.isImage = true
        }
        console.log(newMessage)
        setMessages([...messages, newMessage])
        
      } catch (error) {
        console.log(error.response)
      }
    }
    setImagesLoaded(null);

  }

  const onTyping = () => {

    if (messageSocket){
      messageSocket.send(JSON.stringify(
        {
          "type":"typing",
          "data":{
            "from_user_id": authUser.id,
            "to_user_id": to_user_id
          }
        }
      ))
    }
  }
    
  return (
    <div className={`${styles.layout}`}>
        <ChatNavBar name={peerName} />
        <div className={`${styles.chatPageContent} ${globalStyles.container}`}>
          <div className={`${styles.messagesContainer}`}>

            {
              messages.map((msg, index) => (
                msg.isImage ? 
                <ChatImg
                // img={}
                  key={index}
                  msgImg={msg.img_src} 
                  name={msg.name} 
                  msgT={msg.msgT}
                  onLoad={handleImagesLoad}
                />
                 : 
                 <ChatContent
                  key={index}
                  // profileImg={msg.profile_img}
                  name={msg.name}
                  message={msg.message}
                  msgT={msg.msgT}
                />
              ))
            }
            <div ref={messagesEndRef} />
            <div className={`${styles.typingIndicatorContainer}`}>
              { typing && <TypingIndicator /> }
            </div>
          </div>

          <div className={`${styles.chatFooter}`}>
            
            <ChatFooter 
            onTyping =  { onTyping}
            onSendImage={handleSendImages} 
            onSendMessage={handleSendMessages}/>
          </div>
        </div>
    </div>

  );
};
