import React,{useState} from 'react'
import styles from "./Profile.module.css"
import LogOutButton  from '../../components/ui/Button'
import ProfileAddSubjects from '../../components/ProfileAddSubjects'
import ProfileImage from '../../components/ProfileImage';
import ProfileEditField from '../../components/ProfileEditField';
import ProfileImg from '../../assets/profile.svg'


export default function Profile() {

  const [profile, setProfile] = useState({
    Name: "Student",
    Email: "student@gmail.com",
    StudentId: "66000000",
    YearOfStudy: "2",
    Bio: "Enter your bio"
  });

  const [errors, setErrors] = useState({});

  const fieldConfigs = {
    Name: { 
      required: true, 
      type: "text",
      validate: (value) => {
        if (value.length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s]*$/.test(value)) return "Name can only contain letters and spaces";
        return "";
      }
    },
    Email: { 
      required: true, 
      type: "email",
      validate: (value) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        return "";
      }
    },
    StudentId: { 
      required: true, 
      type: "text",
      validate: (value) => {
        if (!/^\d{8}$/.test(value)) return "Student ID must be 8 digits";
        return "";
      }
    },
    YearOfStudy: { 
      required: true, 
      type: "number",
      validate: (value) => {
        const year = Number(value);
        if (isNaN(year) || year < 1 || year > 6) return "Year must be between 1 and 6";
        return "";
      }
    },
    Bio: { 
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

  const hasErrors = Object.values(errors).some(error => error !== "");

  return (
    <div className={`${styles.profile}`}>
      <div className={`${styles.logout}`}>
        <LogOutButton text="Log Out" color='#E33B3B'  />
      </div>

      <ProfileImage
        initialImage={ProfileImg}
        onImageChange={(newImage) => console.log('Image changed:', newImage)}
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
          />
        ))}
      </div>

      <div className={`${styles.coursesWrapper}`}>
        <ProfileAddSubjects />
      </div>
    </div>
  )
}
