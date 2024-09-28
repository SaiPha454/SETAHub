import React from 'react';
import styles from "./EditButton.module.css"
import EditSvg from "../../assets/edit.svg"
import DoneSvg from "../../assets/done.svg"

const EditButton = ({onClick, editMode}) => {

  return (
    <button onClick={onClick} style={{backgroundColor : editMode ? '#15A736':'#3071FF'}} className={`${styles.button}`}>
        {editMode ? <img src={DoneSvg} className={`${styles.icon}`} /> :
                    <img src={EditSvg} className={`${styles.icon}`} />
        }
        <span className={`${styles.text}`}> {editMode ? 'Done' : 'Edit'} </span>
    </button>
  );
}

export default EditButton;
