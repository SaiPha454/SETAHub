import React, {useState} from 'react'
import CrossImg from '../assets/removeCross.png'
import styles from './CoursesCard.module.css'
import EditAvailabilityModal from './ModalComponent'

export default function CoursesCard({img, title, onRemove, courseId, topicId, taId}) {
    const [isHover, setIsHover] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);    


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const handleShowCross = () => {
        setIsHover(prev => !prev);
    }

    return (
        <>
            <div className={`${styles.cardContainer}`} onClick={handleShowCross} >
                
                {isHover && (
                    <div className={`${styles.crossWrapper}`}>
                        <img src={CrossImg} className={`${styles.remove}`} alt="crossImage" onClick={onRemove} />
                    </div>
                )}
                <div className={`${styles.cardContent}`}>
                    <div className={`${styles.nameTitle}`}>
                        <img src={img} className={`${styles.courseImg}`} alt="course Img" />
                        <p className={`${styles.courseTitle}`}> {title}</p>
                    </div>
                    <button className={styles.button} onClick={openModal}>
                        Edit Availability
                    </button>            
                </div>
            </div>
            {isModalOpen && (
                <div className={`${styles.modalOverlay}`}>
                    <div className={`${styles.modalComponent}`}
                          onClick ={(e) => e.stopPropagation()}  //to prevent clicking modal component close modal
                    >
                        <div className={`${styles.modalTWrap}`}>
                            <p className={`${styles.modalTitle}`}> {title}</p>
                            <div className={`${styles.modalTitleWeapper}`}>
                                <img src={CrossImg} className={`${styles.closeBtn}`} alt="crossImage" onClick={closeModal} />
                            </div>
                        </div>
                        <EditAvailabilityModal 
                        topicId={topicId}
                        taId = {taId}
                        courseId={courseId} closeModal={closeModal}></EditAvailabilityModal>
                    </div>
                </div>
            )}

        </>
    )
}
