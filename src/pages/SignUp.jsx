import React, { useContext, useState } from 'react'
import globalStyles from "../styles/global.module.css"
import styles from "./SignUp.module.css"
import FormInput from '../components/ui/FormInput'
import SignUpButton from "../components/ui/Button"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../AuthContext'


export default function SignUp() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    year: '',
    studentId: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    year: '',
    studentId: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    year: false,
    studentId: false,
    password: false
  });

  const {authUser, setAuthUser} = useContext(AuthContext)

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return "";

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return "Email is required";
        if (!emailRegex.test(value)) return "Please enter a valid email";
        return "";

      case 'year':
        const yearNum = Number(value);
        if (!value) return "Year of study is required";
        if (yearNum < 1 || yearNum > 6 || !Number.isInteger(yearNum)) {
          return "Please enter a valid year (1-6)";
        }
        return "";

      case 'studentId':
        if (!value) return "Student ID is required";
        if (value.length < 6) return "Student ID must be at least 6 characters";
        if (!/^\d+$/.test(value)) return "Student ID must contain only numbers";
        return "";

      case 'password':
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
        if (!/\d/.test(value)) return "Password must contain at least one number";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, values[name])
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all fields and collect errors
    const newErrors = {};
    Object.keys(values).forEach((key) => {
      newErrors[key] = validateField(key, values[key]);
    });
  
    // Update the errors state
    setErrors(newErrors);
  
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      year: true,
      studentId: true,
      password: true
    });
  
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
  
    if (!hasErrors) {
      console.log("Form submitted:", values);
      try {
        
        const response = await axios.post("http://localhost:8000/auth/register", {
          "name": values.name,
          "email": values.email,
          "year": values.year,
          "student_id": values.studentId,
          "password": values.password
        }, {withCredentials: true})
        console.log(response.data)

        const login = await axios.post("http://localhost:8000/auth/login", {
          'email': values.email,
          'password': values.password
        }, {withCredentials: true})


        setAuthUser(login.data.data)
      } catch (error) {
        console.log(error.response.data)
        setErrors(prev => ({
          ...prev,
          submit: error.response.data.message || 'An error occurred during creating your account. Please try again.'
        }));
      }
    }
  };

  return (
    <div className={`${styles.signupPage}`}>
      <div className={`${globalStyles.container}`}>
        <div className={styles.formContainer}>
            <h3 >Create Account</h3>
            <form onSubmit={handleSubmit} className={`${styles.formContent}`}>
              {errors.submit && (
                <div className={styles.submitError} role="alert">
                  {errors.submit}
                </div>
              )}
                <div>
                    <FormInput 
                      label="Full Name" 
                      type="text"
                      placeholder='Enter your full name'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={touched.name ? errors.name : ""}
                      name="name"
                    />
                </div>
                <div>
                    <FormInput 
                      label="Email" 
                      type="email"
                      placeholder='Enter your email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={touched.email ? errors.email : ""}
                      name="email"
                      autoComplete="off"
                    />
                </div>
                <div>
                    <FormInput 
                      label="Year of study" 
                      type="number"
                      placeholder='Enter year of study'
                      value={values.year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={touched.year ? errors.year : ""}
                      name="year"
                    />
                </div>
                <div>
                    <FormInput 
                      label="Student ID" 
                      type="text"
                      placeholder='Enter your Student ID'
                      value={values.studentId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={touched.studentId ? errors.studentId : ""}
                      name="studentId"
                      autoComplete="off"
                    />
                </div>
                <div>
                  <FormInput 
                        label="Password" 
                        type="password"
                        placeholder='Enter your password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorMessage={touched.password ? errors.password : ""}
                        name="password"
                        autoComplete="off"
                      />
                </div>
                <div>
                  <SignUpButton text="Register" type="submit" onClick={handleSubmit}/>
                </div>
                <div>
                  <span className={`${styles.toLoginText}`}>Already have account ? <Link to="/signin">Log In</Link></span>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}
 