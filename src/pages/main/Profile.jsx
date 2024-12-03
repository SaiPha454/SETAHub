import React,{useEffect, useState, useContext} from 'react'
import styles from "./Profile.module.css"
import LogOutButton  from '../../components/ui/Button'
import ProfileAddSubjects from '../../components/ProfileAddSubjects'
import ProfileImage from '../../components/ProfileImage';
import ProfileEditField from '../../components/ProfileEditField';
import ProfileImg from '../../assets/profile.svg'
import { AuthContext } from '../../AuthContext';
import axios from 'axios';

export default function Profile() {

  const {authUser, setAuthUser} = useContext(AuthContext)
  const [profile, setProfile] = useState({
    name: authUser.name,
    email: authUser.email,
    student_id: authUser.student_id,
    year: authUser.year,
    userbio: authUser.userbio
  });

  const [errors, setErrors] = useState({});

  const fieldConfigs = {
    name: { 
      required: true, 
      type: "text",
      validate: (value) => {
        if (value.length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s]*$/.test(value)) return "Name can only contain letters and spaces";
        return "";
      }
    },
    email: { 
      required: true, 
      type: "email",
      validate: (value) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        return "";
      }
    },
    student_id: { 
      required: true, 
      type: "text",
      validate: (value) => {
        if (!/^\d{8}$/.test(value)) return "Student ID must be 8 digits";
        return "";
      }
    },
    year: { 
      required: true, 
      type: "number",
      validate: (value) => {
        const year = Number(value);
        if (isNaN(year) || year < 1 || year > 6) return "Year must be between 1 and 6";
        return "";
      }
    },
    userbio: { 
      required: false, 
      type: "text",
      validate: (value) => {
        if (value.length > 500) return "Bio must be less than 500 characters";
        return "";
      }
    }
  };

  const handleProfileChange = (field, value) => {
    // Validate the field
    const config = fieldConfigs[field];
    const error = config.validate(value);
    console.log("Handle change")
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    // Only update if there's no error
    if (!error) {
      
      setProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const onLogout = async () =>{
    try {
      let response = await axios.post('http://localhost:8000/users/logout', {}, {withCredentials: true})
      setAuthUser(null)
    } catch (error) {
      
    }
  }

  const hasErrors = Object.values(errors).some(error => error !== "");

  return (
    <div className={`${styles.profile}`}>
      <div className={`${styles.logout}`}>
        <LogOutButton onClick={onLogout} text="Log Out" color='#E33B3B'  />
      </div>

      <ProfileImage
        initialImage={`http://localhost:8000${authUser.image}`}
        userId = {authUser.id}
        setAuthUser={setAuthUser}
        // onImageChange={(newImage) => console.log('Image changed:', newImage)}
      />

      {hasErrors && (
        <div className={`${styles.globalError}`}>
          Please fix the errors before saving
        </div>
      )}

      <div className={`${styles.profileInfo}`}>
        {Object.entries(profile).map(([field, value]) => (
          <ProfileEditField
            key={field}
            label={field}
            value={value}
            type={fieldConfigs[field].type}
            required={fieldConfigs[field].required}
            error={errors[field]}
            onChange={(newValue) => handleProfileChange(field, newValue)}
            userId = {authUser.id}
            setAuthUser = {setAuthUser}
          />
        ))}
      </div>

      <div className={`${styles.coursesWrapper}`}>
        <ProfileAddSubjects />
      </div>
    </div>
  )
}
