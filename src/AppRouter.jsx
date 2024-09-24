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

export default function appRouter() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <AuthLayout/>,
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
      element: <MainLayout/>,
      children:[
        {
          path:"",
          element: <Dashboard/>
        },
        {
          path:"topics",
          element: <h1>Topics</h1>
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
          path:"ta-sessions",
          element: <h1>My TA Session</h1>
        },
        {
          path:"profile",
          element: <Profile/>
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}



