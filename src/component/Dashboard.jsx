import React, { useEffect, useState } from 'react'
import { app } from '../Firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import PaymentBtn from '../payment/PaymentBtn'
import { Toaster, toast } from 'sonner'
import AsideBar from './AsideBar'
import Building from './Building'
import Vehicle from './Vehicle'


const Dashboard = () => {

  const [userEmail, setuserEmail] = useState("")

  const navigate = useNavigate();
  const location = useLocation()

  const [section, setSection] = useState('vehicle');

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {
        console.log("yes login", user)

        setuserEmail(user.email)
      } else {
        console.log("not logged in")


      }
    })
    return () => unsubscribe()

  }, [])







  return (
    <>
      {/* 
      <Toaster richColors position="bottom-center" />
      <h1 className='text-center text-[25px] mt-10'>Dashboard ( private route ) </h1>

      <div className='mx-auto mt-4 border-2 border-gray-500 rounded-[6px] p-6 flex flex-col items-center justify-center w-[269px] sm:w-[90vw] md:w-[50vw] lg:w-[24%]'>

        <p className='my-2'>Email : <b>{userEmail}</b></p>
        <PaymentBtn email={userEmail}></PaymentBtn>
      </div> 
      */}

      <div className='flex w-full'>
        <AsideBar section={section} setSection={setSection}></AsideBar>
        <div className='bg-gray-100 w-full ml-2 mr-7 my-2 min-h-[600px] rounded-xl shadow-3xl overflow-hidden'>
          {(section) === '' && <center>Please select a section from Aside Bar</center>}
          {(section === 'vehicle' && <Vehicle />)}
          {(section === 'building' && <Building />)}
        </div>
      </div>
    </>
  )
}

export default Dashboard