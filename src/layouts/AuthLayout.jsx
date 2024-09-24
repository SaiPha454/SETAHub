import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthNavBar from '../components/AuthNavBar'
import globalClasses from "../styles/global.module.css"
import Footer from './Footer'
import styles from "./AuthLayout.module.css"
import FooterLink from '../components/ui/FooterLink'

export default function AuthLayout() {
  return (
    <div className={`${styles.layout}`}>
      <AuthNavBar/>
      <div className={`${globalClasses.container} `}>
        <div className={`${styles.layoutContainer}`}>
          <Outlet/>
        </div>
      </div>
      <Footer>
          <FooterLink text='Home' url='/' />
          <FooterLink text='Create Account' url='/signup' />
          <FooterLink text='Log In' url='/signin' />
          <FooterLink text='About Us' url='/aboutus' />
          <FooterLink text='Contact Us' url='/contactus' />
      </Footer>
    </div>
  )
}
