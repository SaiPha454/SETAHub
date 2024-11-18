import React from 'react'
import styles from "./ChatContent.module.css"
import LinkProfile from "./ui/LinkProfile"

function ChatContent({profileImg=null, name, message, msgT}) {
    console.log(profileImg)
  return (
    <div >
        {
            msgT == "sender" ? 
            <div className={`${styles.senderColumn}`}>
                <span className={`${styles.senderName}`}>{name}</span>
                <div className={`${styles.profileAndMsgBox}`}>
                    <LinkProfile img={profileImg} url="me/profile" className={`${styles.ppImg}`}/>
                    <div className={`${styles.senderBox}`}>{message}</div>
                </div>
            </div>
            :
            <div className={`${styles.meColumn}`}>
                <div className={`${styles.meBox}`}>{message}</div>
            </div>
        }


    </div>
    
  )
}

export default ChatContent
