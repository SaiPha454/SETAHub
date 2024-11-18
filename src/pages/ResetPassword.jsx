import React, { useState } from 'react'
import globalStyles from "../styles/global.module.css"
import styles from "./ResetPassword.module.css"
import FormInput from '../components/ui/FormInput'
import SignUpButton from "../components/ui/Button"
import { Link } from 'react-router-dom'


export default function ResetPassword() {
  const [email,setEmail] = useState('');
  const [emailError, setEmailError] = useState("");
  const [touched, setTouched] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (touched) {
      if (!value) {
        setEmailError('This field is required');
      } else if (!validateEmail(value)) {
        setEmailError('Invalid email address');
      } else {
        setEmailError('');
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (!email) {
      setEmailError('This field is required');
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    
    if (!email) {
      setEmailError('This field is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }
    
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
  };

  return (
    <div className={`${styles.resetpasswordPage}`}>
      <div className={`${globalStyles.container}`}>
        <div className={`${styles.formContainer}`}>
            <h3 >Reset Password</h3>
            <form onSubmit={handleSubmit} className={`${styles.formContent}`}>
                <div>
                    <FormInput 
                      label="Enter your email"
                      type="email"
                      placeholder='Enter your email'
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={handleBlur}
                      errorMessage={emailError}
                      name="email"
                    />
                    {/* {emailError && (
                      <div className={styles.errorMessage}>
                        {emailError}
                      </div>
                    )} */}
                </div> 
                  
                <div className={`${styles.buttonWrapper}`}>
                  <SignUpButton 
                    text="Reset" 
                    type="submit"
                    className={`${styles.resetButton}`}
                  />
                </div>
                <div>
                  <Link to="/">Back to Log In</Link>
                </div>
            </form>
        </div>
      </div>
    </div>
  ) 
}