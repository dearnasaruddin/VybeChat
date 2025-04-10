import React, { useEffect, useState } from 'react'
import { CiPower } from "react-icons/ci";
import { SlHome, SlSettings } from "react-icons/sl";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { userLoginInfo } from '../slices/userSlice';

const Sidebar = () => {

    const dispatch = useDispatch()
    const auth = getAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const userData = useSelector((state) => state.userInfo.value)
    const [activeLogOutPopUp, setActiveLogOutPopUp] = useState(false)


    const handleLogOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success('Log Out Successful!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })

            localStorage.removeItem("UserInfo")
            dispatch(userLoginInfo(null))
            setTimeout(() => {
                navigate("/login")
            }, 1000);


        }).catch((error) => {
            // An error happened.
            toast.error(error, {
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

    useEffect(() => {
        if (!userData) {
            navigate("/login")
        }
    }, [])

    return (


        <div className='xl:h-screen py-9 pl-8'>

            {/* <div className='h-full w-46 py-9.5 flex flex-col justify-between items-center text-white bg-primary rounded-[20px] font-poppins '> */}
            <div className='h-full w-fit py-9.5 flex flex-col justify-between items-center text-white bg-primary rounded-[20px] font-poppins relative'>
                <div>
                    <div>
                        <div className='size-14 xl:size-25 rounded-full overflow-hidden border-white border-4 mx-auto'>
                            <img src={userData?.photoURL && userData.photoURL} alt="profileImg" />
                        </div>

                        <h2 className='text-center mt-2.5 text-lg'>{userData?.displayName}</h2>

                    </div>
                    <ul className='text-4xl w-auto xl:w-[186px] flex flex-col justify-center items-center gap-y-3 mt-20'>
                        <Link to="/" className={`cursor-pointer w-full h-20 place-content-center place-items-center ${location.pathname == "/" ? "activeMenu" : "hover:text-gray-400"}`}><SlHome /></Link>
                        <Link to="/chat" className={`cursor-pointer w-full h-20 place-content-center place-items-center ${location.pathname == "/chat" ? "activeMenu" : "hover:text-gray-400"}`}><IoChatbubbleEllipsesOutline /></Link>
                        <Link to="/notification" className={`cursor-pointer w-full h-20 place-content-center place-items-center ${location.pathname == "/notification" ? "activeMenu" : "hover:text-gray-400"}`}><IoMdNotificationsOutline className='text-[44px]' /></Link>
                        <Link to="/settings" className={`cursor-pointer w-full h-20 place-content-center place-items-center ${location.pathname == "/settings" ? "activeMenu" : "hover:text-gray-400"}`}><SlSettings /></Link>
                    </ul>
                </div>
                <span >
                    <CiPower onClick={() => setActiveLogOutPopUp(true)} className='text-4xl hover:text-red-400 cursor-pointer' />
                </span>
            </div>
            {activeLogOutPopUp &&
                <div className='w-2/7 h-1/4 font-poppins rounded-2xl border-gray-300 border flex flex-col justify-center items-center gap-14 absolute top-1/2 left-1/2 -translate-1/2 bg-[#2c2c2c] z-10'>
                    <h2 className='text-white text-2xl'>Are you sure you want to log out?</h2>
                    <div>
                        <button onClick={handleLogOut} type="button" className='text-xl px-10 py-2 rounded-xl cursor-pointer bg-gray-300'>Yes</button>
                        <button onClick={() => setActiveLogOutPopUp(false)} type="button" className='text-xl px-10 py-2 rounded-xl cursor-pointer bg-primary text-white ml-5'>No</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Sidebar