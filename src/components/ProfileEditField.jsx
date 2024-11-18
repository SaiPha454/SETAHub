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

  // Update local state when prop value changes
  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setFieldValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSave = () => {
    if (!error) {
      setIsEditing(false);
      if (onChange) {
        onChange(fieldValue);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
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
          onBlur={handleSave}
          onKeyPress={handleKeyPress}
          readOnly={!isEditing}
          className={!isEditing ? styles.readOnly : ''}
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