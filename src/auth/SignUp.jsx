import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../Firebase'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Toaster, toast } from 'sonner'

import SyncLoader from "react-spinners/SyncLoader";

const SignUp = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState(null)

  // const setEmailState =  useAuthStore((state) => state.setEmail);
  // const setEmailVerified = useAuthStore((state) => state.setEmailVerified);

  const [isSignUpLoading, setIsSignUpLoading] = useState(false)

  const [isUserAlreadyExist, setIsUserAlreadyExist] = useState(null)

  const [isSignUpGoogleLoading, setIsSignUpGoogleLoading] = useState(false)


  const navigate = useNavigate()


  const handleSignUp = () => {

    setIsSignUpLoading(true)

    console.log(email, password)
    const auth = getAuth(app)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        console.log(res.user)
        console.log(res.user.emailVerified)

        // setEmailState(res.user.email);
        // setEmailVerified(res.user.emailVerified);

        await sendEmailVerification(res.user)
        // toast.info("Email verification sent")
        console.log('email sent')
        setIsSignUpLoading(false)
        navigate('/login', { state: { isEmailVerificationSent: true } })

      })
      .catch(err => {
        console.log(err.message)
        setIsSignUpLoading(false)
        toast.error(err.message.substring(10))
      })
  }


  const handleSignUpWithGoogle = () => {

    setIsSignUpGoogleLoading(true)
    const auth = getAuth(app)

    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (res) => {
        console.log(res.user)
        console.log("the user is created")

        try {

          const checkUser = await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/check-user`, { email: res.user.email })
          console.log(checkUser.data)
          setIsUserAlreadyExist(checkUser.data.user)
          console.log(isUserAlreadyExist)


        } catch (error) {
          console.log(error)
        }

        if (!isUserAlreadyExist) {

          console.log("the user is new and signed in with google")
          try {
            await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/save-user-mongodb`, {
              email: res.user.email,
              userId: res.user.uid,
            });
            navigate('/dashboard', { state: { isNewUser: true } }); // Redirect to dashboard after successful verification and saving
          } catch (error) {
            console.error('Failed to save user:', error);
          }

        }

        setIsSignUpGoogleLoading(false)
        navigate('/dashboard')

      })
      .catch(err => {
        setIsSignUpGoogleLoading(false)
        console.log(err)
      })


  }

  return (
    <>
      <>
        <Toaster richColors position='bottom-center'></Toaster>
        {/* source:https://codepen.io/owaiswiz/pen/jOPvEPB */}
        <div className="h-screen items-center bg-gray-200 text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 my-auto bg-gray-50">
              <div>
                {/* <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
            className="w-32 mx-auto"
          /> */}
              </div>
              <div className="mt-6 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-bold">Sign up</h1>
                <div className="w-full flex-1 mt-8">
                  <div className="flex flex-col items-center">


                  </div>

                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleSignUp} className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 custorm-btn-color w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      {isSignUpLoading ? (<SyncLoader size={8} color="#ffffff" />) :
                        (
                          <>
                            <svg
                              className="w-6 h-6 -ml-2"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                              <circle cx="8.5" cy={7} r={4} />
                              <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Sign Up</span>
                          </>)
                      }
                    </button>

                    <Link to="/login"><p className='mt-3 cursor-pointer text-blue-700 custorm-text-color font-semibold'>Already have an Account ?</p></Link>

                    <p className="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by {` `}
                      <a href="https://merchant.razorpay.com/policy/OGIvXKXYd4U1Av/terms" className="border-b border-gray-500 border-dotted">
                        Terms of Service {" "}
                      </a>
                      {/* and its {` `}
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </a> */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1  text-center hidden lg:flex">
              <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("/IMC2.png")'
                }}
              ></div>
            </div>
          </div>
        </div>
      </>

    </>
  )
}

export default SignUp