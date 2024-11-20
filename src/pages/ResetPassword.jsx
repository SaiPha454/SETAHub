import React, { useState } from 'react'
import globalStyles from "../styles/global.module.css"
import styles from "./ResetPassword.module.css"
import FormInput from '../components/ui/FormInput'
import SignUpButton from "../components/ui/Button"
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function ResetPassword() {
  const [email,setEmail] = useState('');
  const [emailError, setEmailError] = useState("");
  const [touched, setTouched] = useState(false);
  const [resetMessage , setResetMessage] = useState("")

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

  const handleSubmit = async (e) => {
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
    
    try {
      
      let response = await axios.post("http://localhost:8000/auth/reset-password", email, {
        withCredentials:true
      })
      console.log(response.data)
      setResetMessage(`Your new password was sent to ${email}. Please login with the new password ! `)
      setEmail("")
      
    } catch (error) {
      setEmailError(error.response.data.message)
    }
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
                    
                </div> 
                <div className={`${styles.buttonWrapper}`}>
                  <SignUpButton 
                    text="Reset" 
                    type="submit"
                    className={`${styles.resetButton}`}
                    onClick={handleSubmit}
                  />
                </div>
                <div>
                  <Link to="/signin">Back to Log In</Link>
                </div>
            </form>
        </div>
        <p className={styles.resetMessage} >{resetMessage}</p>
      </div>
      
    </div>
  ) 
}