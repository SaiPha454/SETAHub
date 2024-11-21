import React, { useState, useEffect } from 'react';
import styles from './ProfileEditField.module.css';
import axios from 'axios';

const ProfileEditField = ({ 
    label, 
    value, 
    onChange, 
    type = "text",
    required = false,
    error,
    userId,
    setAuthUser
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [fieldValue, setFieldValue] = useState(value);
    const [valueChange, setValueChange] = useState(false);
    // Update local state when prop value changes
    useEffect(() => {
      setFieldValue(value);
    }, [value]);

    const handleChange = (e) => {
      const newValue = e.target.value;
      setFieldValue(newValue);
      if (onChange) {
        setValueChange(true)
        onChange(newValue);
      }
    };

    const handleSave = async () => {
      if (!error) {
        setIsEditing(false);
        if (onChange && valueChange) {
          try {
            console.log("New  value tosubmit :", fieldValue, " with field : ", label)
            // Save here
            let response = await axios.put(`http://localhost:8000/users/${userId}`,{
              [label]: fieldValue
            }, {withCredentials: true})
            
            setValueChange(false)
            onChange(fieldValue);
            setAuthUser(response.data.data)
          } catch (error) {
            
          }
        }
      }
    };

    return (
      <div className={styles.profileField}>
        <label>
          {label?.replace(/([A-Z])/g, ' $1')}
          {required && <span className={styles.required}>*</span>}
        </label>
        
        <div className={`${styles.inputWrapper} ${error ? styles.error : ''}`}>
          { label != "userbio" ? <input
            type={type}
            value={fieldValue || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`${!isEditing ? styles.readOnly : `${styles.editingInput} active`} ${styles.profileInput} `}
          /> : 
          <textarea
            maxLength={100}
            // rows={4}
            // cols={30}
            // style={{height: "25px"}}
            type={type}
            value={fieldValue || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`${!isEditing ? styles.readOnly : `${styles.editingInput} active`} ${styles.profileInput}  ${styles.textarea_wrap}`}
          />
          }
          <div
            className={styles.editIcon}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            title={isEditing ? 'Save' : 'Edit'}
          >
            {isEditing ? '✓' : '✎'}
          </div>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
      </div>
    );
};

export default ProfileEditField;