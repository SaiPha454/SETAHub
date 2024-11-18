import React, { useState } from 'react'
import styles from './ChatImg.module.css'
import LinkProfile from './ui/LinkProfile'

export default function ChatImg({img=null, msgImg, msgT, name, onLoad}) {
  //for individual image load
  const [imageLoaded, setImageLoaded] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(0);    //for image bigger and clear modal

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad();
  };

  //to open modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {msgT === "sender" ? (
        <div className={`${styles.senderColumn}`}>
          <span className={`${styles.senderName}`}>{name}</span>
          <div className={`${styles.imgContainer}`}>
            <LinkProfile img={img} url="me/profile" className={styles.ppImg}/>
            {/* for image loading condition */}
            {!imageLoaded && <div className={styles.imagePlaceholder}>Loading...</div>}
            <img 
              src={msgImg} 
              alt="sent img" 
              className={`${styles.msgImg} ${imageLoaded ? styles.loaded : styles.loading}`}
              onLoad={handleImageLoad}
              onClick={openModal}   //Open modal on click
            />
          </div>
        </div>
      ) : (
        <div className={`${styles.meColumn}`}>
          {!imageLoaded && <div className={styles.imagePlaceholder}>Loading...</div>}
          <img 
            src={msgImg} 
            alt="sent img" 
            className={`${styles.msgImg} ${imageLoaded ? styles.loaded : styles.loading}`}
            onLoad={handleImageLoad}
            onClick={openModal}
          />
        </div>
      )}

      {isModalOpen && (
        <div className={`${styles.modalOverlay}`} onClick={closeModal}>
          <div className={`${styles.modalContent}`}>
            <img src={msgImg} alt="Full Size of Img" className={`${styles.modalImage}`}/>
          </div>
        </div>
      )}
    </div>
  )
}