import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/main/Dashboard"
import AvailableTAS from "./pages/main/AvailableTAS"
import Appointment from "./pages/main/Appointment"
import Bookings from "./pages/main/Bookings"
import Profile from "./pages/main/Profile"
import MyTASessions from "./pages/main/MyTASessions"
import ChatPage from "./pages/main/ChatPage"
import ProtectedRoute from "./ProtectedRoute"
import AuthProtectedRoute from "./AuthProtectedRoute"



export default function appRouter() {


  const router = createBrowserRouter([
    {
      path:"/",
      element: <AuthProtectedRoute><AuthLayout/></AuthProtectedRoute>,
      children:[
        {
          path:"",
          element: <Home/>
        },
        {
          path:"signup",
          element: <SignUp/>
        },
        {
          path:"signin",
          element: <SignIn/>
        },
        {
          path:"reset-password",
          element: <ResetPassword />
        }
      ]
    },
    {
      path:"/me",
      element: <ProtectedRoute><MainLayout/></ProtectedRoute>,
      children:[
        {
          path:"",
          element: <Dashboard/>
        },
        {
          path:"topics/:topicId/tas",
          element: <AvailableTAS/>
        },
        {
          path:"topics/:topicId/tas/:taId/booking",
          element: <Appointment/>
        },
        {
          path:"bookings",
          element: <Bookings/>
        },
        {
          path:"tasessions",
          element: <MyTASessions/>
        },
        {
          path:"profile",
          element: <Profile/>
        },
      ]
    },
    {
      path: "/me/chat/:userId",
      element: <ChatPage/>
    }

  ])

  return <RouterProvider router={router} />
}



