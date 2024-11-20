import React, { useState, useContext } from 'react';
import globalStyles from "../styles/global.module.css";
import styles from "./SignIn.module.css";
import FormInput from '../components/ui/FormInput';
import SignUpButton from "../components/ui/Button";
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    submit: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authUser, setAuthUser} = useContext(AuthContext);

  // Validate email format
  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Please enter a valid email address';
  };

  // Validate password
  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  // Handle field blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    const value = formData[name];
    const validationFunction = name === 'email' ? validateEmail : validatePassword;
    const error = validationFunction(value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If field has been touched, validate on change
    if (touched[name]) {
      const validationFunction = name === 'email' ? validateEmail : validatePassword;
      const error = validationFunction(value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
        submit: '' // Clear submit error when user makes changes
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true
    });

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
      submit: ''
    });

    // If there are any errors, don't submit
    if (emailError || passwordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Your actual API call would go here

      const response = await axios.post("http://localhost:8000/auth/login", {
        'email': formData.email,
        'password': formData.password
      }, {withCredentials: true})

      setAuthUser(response.data.data)
      // Clear form on success
      setFormData({ email: '', password: '' });
      setTouched({ email: false, password: false });
      
    } catch (error) {
      error = error.response.data.error
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'An error occurred during sign in. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${styles.signinPage}`}>
      <div className={`${globalStyles.container}`}>
        <div className={styles.formContainer}>
          <h3>Sign In</h3>
          <form onSubmit={handleSubmit} className={`${styles.formContent}`}>
            {errors.submit && (
              <div className={styles.submitError} role="alert">
                {errors.submit}
              </div>
            )}
            <div>
              <FormInput
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={touched.email ? errors.email : ''}
              />
            </div>
            <div>
              <FormInput
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={touched.password ? errors.password : ''}
              />
            </div>
            <div>
              <SignUpButton 
                text={isSubmitting ? "Signing in..." : "Log In"} 
                disabled={isSubmitting}
                onClick={handleSubmit}
              />
            </div>
            <div>
              <Link to="/reset-password">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}