import React, { useState } from 'react'
import globalStyles from "../styles/global.module.css"
import styles from "./SignUp.module.css"
import FormInput from '../components/ui/FormInput'
import SignUpButton from "../components/ui/Button"
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email,setEmail] = useState('')
  const [year, setYear] = useState(1)
  const [password, setpassword] = useState('')
  const [studentId, setStudentId] = useState('')

  return (
    <div className={`${styles.signupPage}`}>
      <div className={`${globalStyles.container}`}>
        <div className={styles.formContainer}>
            <h3 >Create Account</h3>
            <div className={`${styles.formContent}`}>
                <div>
                    <FormInput 
                      label="Full Name" 
                      type="text"
                      placeholder='Enter your full name'
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div>
                    <FormInput 
                      label="Email" 
                      type="email"
                      placeholder='Enter your email'
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <FormInput 
                      label="Year of study" 
                      type="number"
                      placeholder='Enter year of study'
                      value={year}
                      onChange={(e)=>setYear(e.target.value)}
                    />
                </div>
                <div>
                    <FormInput 
                      label="Student ID" 
                      type="text"
                      placeholder='Enter your Student ID'
                      value={studentId}
                      onChange={(e)=>setStudentId(e.target.value)}
                    />
                </div>
                <div>
                  <FormInput 
                        label="Password" 
                        type="password"
                        placeholder='Enter your full name'
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                      />
                </div>
                <div>
                  <SignUpButton text="Register" />
                </div>
                <div>
                  <span className={`${styles.toLoginText}`}>Already have account ? <Link to="/signin">Log In</Link></span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
