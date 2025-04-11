import React, { useRef, useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import profileAvatar from '../assets/profileAvatar.webp'

const Registration = () => {
    const db = getDatabase();
    const auth = getAuth();
    const navigate = useNavigate()

    const [passwordShown, setPasswordShown] = useState(false)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleFullName = (e) => {
        setFullName(e.target.value)
        setNameError("")
    }
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
        if (!fullName) {
            setNameError("Name is required!");
            nameRef.current.focus()
        } else {
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
    }



    const handleSignup = () => {

        formValidation()

        if (fullName && email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 

                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            // Email verification sent!

                            updateProfile(auth.currentUser, {
                                displayName: fullName,
                                photoURL: profileAvatar
                            }).then(() => {
                                // Profile updated!


                                const user = userCredential.user;
                                console.log(user)


                                set(ref(db, 'users/' + user.uid), {
                                    name: fullName,
                                    email: email,
                                    profile_picture: profileAvatar
                                }).then(() => {
                                    // clear input fields & redirect to Login page
                                    setFullName("")
                                    setEmail("")
                                    setPassword("")


                                    toast.success('Account created successful!', {
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

                                    setTimeout(() => {
                                        navigate("/login")
                                    }, 2000);

                                }).catch((error) => {
                                    toast.error(error, {
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

                                })



                            }).catch((error) => {
                                toast.error(error, {
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
                            });
                        });

                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setEmailError(errorCode)
                });
        }
    }


    return (
        <div className="flex h-screen justify-center items-center bg-[#f1f1f1]">
        
            <div className='h-200 w-320 flex justify-center items-center gap-x-20 bg-white pl-16 shadow-2xl'>
                <div className=" font-poppins">
                    <h1 className='font-bold text-4xl text-[#11175D] whitespace-nowrap'>Get started with easily register</h1>
                    <p className='font-normal text-xl text-[#808080] mt-3 mb-10'>Free register and you enjoy it!</p>
                    <div className={`flex flex-col ${nameError || emailError || passwordError ? "gap-2" : "gap-y-8"}`}>

                        {/* ========================== FullName, Email & Password Inputs ========================== */}
                        <input ref={nameRef} onKeyUp={(e)=> e.key === "Enter" && emailRef.current.focus()} onChange={handleFullName} className={`py-6 px-8 text-xl border border-[#B8B9CE] rounded-lg ${nameError && "focus:border-red-500 focus:outline-none focus:border-2"}`} type="text" name="fullName" placeholder='Full Name' />
                        {nameError && <p className='text-red-500'>{nameError}</p>}

                        <input ref={emailRef} onKeyUp={(e)=> e.key === "Enter" && passwordRef.current.focus()} onChange={handleEmail} className={`py-6 px-8 text-xl border border-[#B8B9CE] rounded-lg ${emailError && "focus:border-red-500 focus:outline-none focus:border-2"}`} type="email" name="email" placeholder='Email Address' />
                        {emailError && <p className='text-red-500'>{emailError}</p>}

                        <div className='relative'>
                            <input ref={passwordRef} onKeyUp={(e)=> e.key === "Enter" && handleSignup()} onChange={handlePassword} className={`w-full py-6 px-8 text-xl border border-[#B8B9CE] rounded-lg ${passwordError && "focus:border-red-500 focus:outline-none focus:border-2"}`} type={passwordShown ? "text" : "password"} name="password" id="" placeholder='Password' />
                            <span onClick={() => setPasswordShown(!passwordShown)} className='text-3xl absolute right-9 top-1/2 -translate-y-1/2 bg-white cursor-pointer' >
                                {passwordShown ? <FiEye /> : <FiEyeOff />}
                            </span>
                        </div>
                        {passwordError && <p className='text-red-500'>{passwordError}</p>}

                    </div>

                    {/* ========================== Buttons ========================== */}
                    <button onClick={handleSignup} className='font-semibold text-xl w-full py-5 rounded-[86px] text-white bg-primary cursor-pointer mt-12 mb-8' type="submit">Sign Up</button>
                    <p className='font-normal text-sm text-center text-[#03014C]'>Already  have an account ? <Link to='/login' className='font-bold text-[#EA6C00]'>Log in</Link></p>
                </div>
                <div className='h-full w-full bg-[url(../src/assets/registrationImg.webp)] bg-no-repeat bg-cover bg-center'>
                </div>
            </div>
        </div>
    )
}

export default Registration