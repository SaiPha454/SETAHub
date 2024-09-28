import React, {useState} from 'react'
import styles from "./Profile.module.css"
import LogOutButton  from '../../components/ui/Button'
import FormInput from "../../components/ui/FormInput"
import JavaImg from "../../assets/demo/java.svg"
import CameraImg from "../../assets/camera.svg"
import EditButton from '../../components/ui/EditButton'
import ProfileTASession from '../../components/ProfileTASession'


export default function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [year, setYear] = useState(1)
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(false);
  const [yearEdit, setYearEdit] = useState(false);

  const onChangeName = (e)=>{
    if(!nameEdit) {
      return;
    }
    setName(e.target.value);
  }

  const onEditName = ()=>{
    if(nameEdit){
      console.log("Completed")
    }
    setNameEdit(!nameEdit);
  }

  const onChangeEmail = (e)=>{
    if(!emailEdit) {
      return;
    }
    setEmail(e.target.value);
  }

  const onEditEmail = ()=>{
    if(emailEdit){
      console.log("Completed")
    }
    setEmailEdit(!emailEdit);
  }

  const onChangeId = (e)=>{
    if(!idEdit){
      return;
    }
    setId(e.target.value);
  }

  const onEditId = () => {
    if (idEdit) {
      console.log('Eaint is so cute');
    }
    setIdEdit(!idEdit);

  }

  const onChangeYear = (e)=>{
    if(!yearEdit){
      return;
    }
    setYear(e.target.value)
  }

  const onEditYear = ()=>{
    if(yearEdit){
      console.log("Completed")
    }
    setYearEdit(!yearEdit)
  }

  const onClickEditAvailability= ()=>{
    console.log("Click to edit")
  }

  return (
    <div className={`${styles.profile}`}>
      <div className={`${styles.logout}`}>
        <LogOutButton text="Log Out" color='#E33B3B'  />
      </div>
      <div className={`${styles.content}`}>
        <div className={`${styles.imgContainer}`}>
          <img src={JavaImg} className={`${styles.profileImg}`} />
          <div className={`${styles.overlay}`}>
            <img src={`${CameraImg}`} className={`${styles.camera}`} />
          </div>
        </div>
        <div className={`${styles.profileForm}`}>
          <div className={`${styles.formGroup}`}>
            <FormInput onChange={onChangeName} label="Name" type="text" value={name} placeholder="Your name" />
            <EditButton onClick={onEditName} editMode={nameEdit}/>
          </div>
          <div className={`${styles.formGroup}`}>
            <FormInput onChange={onChangeEmail} label="Email" type="email" value={email} placeholder="seta@gmail.com" />
            <EditButton onClick={onEditEmail} editMode={emailEdit} />
          </div>
          <div className={`${styles.formGroup}`}>
            <FormInput onChange={onChangeId} label="Student ID" value={id} type="text" placeholder="660xxxxx" />
            <EditButton onClick={onEditId} editMode={idEdit}/>
          </div>
          <div className={`${styles.formGroup}`}>
            <FormInput onChange={onChangeYear} label="Year of Study" value={year} type="number" placeholder="2" />
            <EditButton onClick={onEditYear} editMode={yearEdit} />
          </div>
        </div>

        {/* TA Sessions */}
        <div className={`${styles.taSession}`}>
          <h3>Registered TA Sessions</h3>
          <div className={`${styles.sessionContainer}`}>
            <ProfileTASession
              onEdit={onClickEditAvailability}
              icon={JavaImg}
              title="Data Structure and Algorithm" />
            
            <ProfileTASession
              icon={JavaImg}
              onEdit={onClickEditAvailability}
              title="Data Structure and Algorithmn 2" />
            <ProfileTASession
              onEdit={onClickEditAvailability}
              icon={JavaImg}
              title="Data Structure and Algorithm" />
            
            <ProfileTASession
              icon={JavaImg}
              onEdit={onClickEditAvailability}
              title="Data Structure and Algorithm 3" />
                        <ProfileTASession
              icon={JavaImg}
              title="Data Structure and Algorithm" />
            <ProfileTASession
              icon={JavaImg}
              onEdit={onClickEditAvailability}
              title="Data Structure and Algorithm" />
            <ProfileTASession
              icon={JavaImg}
              onEdit={onClickEditAvailability}
              title="Data Structure and Algorithm" />
          </div>
        </div>
      </div>
    </div>
  )
}
