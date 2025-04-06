import React, { useRef, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';


const Login = () => {
  const db = getDatabase();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [passwordShown, setPasswordShown] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailError("")
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setPasswordError("")
  }

  // ========================== Form Validation ==========================
  const formValidation = () => {
    if (!email) {
      setEmailError("Email is required!");
      emailRef.current.focus()
    } else if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(email)) {
      setEmailError("Invalid Email!")
      emailRef.current.focus()
    } else {
      if (!password) {
        setPasswordError("Password is required!");
        passwordRef.current.focus()
      }
    }
  }


  const handleLogin = () => {

    formValidation()

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          dispatch(userLoginInfo(user))
          localStorage.setItem("UserInfo", JSON.stringify(user))

          toast.success('Log in successful!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          })

          setTimeout(() => {
            navigate("/")
          }, 2000);

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Incorrect Email or Password!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          } else {
            toast.error(errorCode, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,

            });
          }
        })

    }
  }


  const handleGoogleLogin = () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        dispatch(userLoginInfo(user))
        localStorage.setItem("UserInfo", JSON.stringify(user))

        set(ref(db, 'users/' + user.uid), {
          name: user.displayName,
          email: user.email,
          profile_picture: user.photoURL
        })

        toast.success('Log in successful!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          navigate("/")
        }, 1000);


      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        toast.error(errorCode, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

      });

  }




  return (
    <div className="flex h-screen justify-center items-center bg-[#f1f1f1]">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className='h-200 w-320 flex justify-center items-center gap-x-28 bg-white pl-28 shadow-2xl'>
        <div className="font-poppins">
          <h1 className='font-bold text-4xl text-[#11175D] whitespace-nowrap'>Log in to your account!</h1>
          <p className='font-normal text-lg text-[#808080] mt-3 mb-10'>Log in to connect your friends and family</p>
          <div className={`flex flex-col ${emailError || passwordError ? "gap-4" : "gap-y-8"}`}>
            <input ref={emailRef} onKeyUp={(e) => e.key === "Enter" && passwordRef.current.focus()} onChange={handleEmail} className={`py-6 px-8 text-xl border border-[#B8B9CE] rounded-lg ${emailError && "focus:border-red-500 focus:outline-none focus:border-2"}`} type="email" name="email" placeholder='Email Address' />
            {emailError && <p className='text-red-500'>{emailError}</p>}
            <div className='relative'>
              <input ref={passwordRef} onKeyUp={(e) => e.key === "Enter" && handleLogin()} onChange={handlePassword} className={`w-full py-6 px-8 text-xl border border-[#B8B9CE] rounded-lg ${passwordError && "focus:border-red-500 focus:outline-none focus:border-2"}`} type={passwordShown ? "text" : "password"} name="password" placeholder='Password' />
              <span onClick={() => setPasswordShown(!passwordShown)} className='text-3xl absolute right-9 top-1/2 -translate-y-1/2 bg-white cursor-pointer' >
                {passwordShown ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {passwordError && <p className='text-red-500'>{passwordError}</p>}
          </div>
          <button onClick={handleLogin} className='font-semibold text-xl w-full py-5 rounded-lg text-white bg-primary cursor-pointer mt-12 mb-6' type="submit">Log in</button>
          <button onClick={handleGoogleLogin} className='font-semibold text-lg w-full py-4 rounded-lg border border-[#B8B9CE] cursor-pointer mb-6 flex justify-center items-center gap-x-3' type="submit"><FcGoogle className='text-3xl' /> Log in with Google</button>
          <p className='font-normal text-sm text-center text-[#03014C]'>Haven't any account ? <Link to='/registration' className='font-bold text-[#EA6C00]'>Sign up</Link></p>
        </div>
        <div className='h-full w-full bg-[url(../src/assets/loginImg.webp)] bg-no-repeat bg-cover bg-center'>
        </div>
      </div>
    </div>
  )
}

export default Login