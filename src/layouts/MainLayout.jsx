import React, {useContext, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import MainNavBar from '../components/MainNavBar'
import Footer from "./Footer"
import globalClasses from "../styles/global.module.css"
import styles from "./MainLayout.module.css"
import FooterLink from '../components/ui/FooterLink'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
export default function AuthLayout() {

  const location = useLocation()
  const { authUser, messageSocket } = useContext(AuthContext)

  useEffect(()=>{

    if (messageSocket){
        messageSocket.onmessage = (event) => {
          console.log("Current path : ", location.pathname)
          console.log("WebSocket message received:", event.data);
      };


          // Optional cleanup to avoid re-assigning multiple listeners
      return () => {
        messageSocket.onmessage = null;
      };
    }

  }, [authUser, messageSocket, location])

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
