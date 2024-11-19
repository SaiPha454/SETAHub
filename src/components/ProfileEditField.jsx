import React, { useState, useEffect } from 'react';
import styles from './ProfileEditField.module.css';

const ProfileEditField = ({ 
    label, 
    value, 
    onChange, 
    type = "text",
    required = false,
    error
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

    const handleSave = () => {
      if (!error) {
        setIsEditing(false);
        if (onChange && valueChange) {
          console.log("New  value tosubmit :", fieldValue)
          setValueChange(false)
          onChange(fieldValue);
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
          <input
            type={type}
            value={fieldValue || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`${!isEditing ? styles.readOnly : `${styles.editingInput} active`} ${styles.profileInput} `}
          />
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