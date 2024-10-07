import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavBar from '../components/MainNavBar'
import Footer from "./Footer"
import globalClasses from "../styles/global.module.css"
import styles from "./MainLayout.module.css"
import FooterLink from '../components/ui/FooterLink'

export default function AuthLayout() {
  return (
    <div className={`${styles.layout}`}>
      <MainNavBar/>

      
      <div className={`${globalClasses.container} `}>
        <div className={`${styles.layoutContainer}`}>
          <Outlet/>
        </div>
      </div>


      <Footer>
          <FooterLink text='Dashboard' url='/me' />
          <FooterLink text='My Bookings' url='/me/bookings' />
          <FooterLink text='My TA Session' url='/me/tasessions' />
          <FooterLink text='My  Profile' url='/me/profile' />
          <FooterLink text='Message' url='/me/chat/123456'/>
      </Footer>
    </div>
  )
}
