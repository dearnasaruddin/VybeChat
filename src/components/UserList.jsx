import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { IoMdAdd } from 'react-icons/io';
import { FiSearch } from "react-icons/fi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Skeleton from './Skeleton';

const UserList = () => {

  const currentUserData = useSelector((state) => state.userInfo.value)
  const db = getDatabase();
  const [userList, setUserList] = useState([])
  const [activeSearch, setActiveSearch] = useState(false)
  const [searchUserList, setSearchUserList] = useState([])
  const [friendRequestList, setFriendRequestList] = useState([])
  const [friendList, setFriendList] = useState([])
  const [blockList, setBlockList] = useState([])
  const [loading, setLoading] = useState(true)
  const searchInput = useRef()

  const handleFriendRequest = (targetedUserData) => {
    set(push(ref(db, 'friendRequest/')), {
      senderName: currentUserData.displayName,
      senderEmail: currentUserData.email,
      senderID: currentUserData.uid,
      senderImg: currentUserData.photoURL,
      receiverName: targetedUserData.name,
      receiverEmail: targetedUserData.email,
      receiverID: targetedUserData.id,
      receiverImg: targetedUserData.profile_picture
    }).then(() => {

      toast.success('Request Sent successful!', {
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

    }).catch((error) => {

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
      })

    })
  }

  const toggleActiveSearch = () => {
    setActiveSearch(!activeSearch)
    searchInput.current.focus()
  }
  const handleSearch = (e) => {
    const searchResult = userList.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearchUserList(searchResult)
  }

  useEffect(() => {

    const userListRef = ref(db, 'users/');
    onValue(userListRef, (snapshot) => {

      let arr = []
      snapshot.forEach((item) => {

        if (currentUserData.uid != item.key) {
          arr.push({ ...item.val(), id: item.key })
          setLoading(false)
          setUserList(arr)
        }

      })
    });
  }, [])



  useEffect(() => {
    const userListRef = ref(db, 'friendRequest/');
    onValue(userListRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push(item.val().senderID + item.val().receiverID)
      })
      setFriendRequestList(arr)
    });

  }, [])


  useEffect(() => {
    const userListRef = ref(db, 'friendList/');
    onValue(userListRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push(item.val().senderID + item.val().receiverID)
      })
      setFriendList(arr)
    });

  }, [])



  useEffect(() => {
    const userListRef = ref(db, 'blockList/');
    onValue(userListRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push(item.val().blockByID + item.val().blockedID)
      })
      setBlockList(arr)
    });

  }, [])



  return (
    <div>
      <div className='flex justify-between items-center font-semibold text-xl px-6 text-black '>
        <h2 className='w-1/3'>User List</h2>
        <div className='flex items-center text-2xl text-primary gap-x-2 relative'>
          <input ref={searchInput} onChange={handleSearch} className={`${activeSearch && 'w-60 py-1.5 px-3 border border-black/50'} w-0 p-0 text-base text-black placeholder-black/30 font-normal duration-300 absolute right-20 top-1/2 -translate-y-1/2`} placeholder='Search by Name' type="text" />
          <span onClick={toggleActiveSearch} className={`${activeSearch && 'bg-primary !text-white'} p-1.5 duration-300 cursor-pointer`}>
            <FiSearch />
          </span>
          <BsThreeDots />
        </div>
      </div>
      <div className='h-82'>

        {loading ?
        
          <Skeleton />

          :

          searchUserList.length > 0 ?
            <ul className='mt-4 h-full overflow-auto  mr-3'>
              {/* Friend Item */}

              {searchUserList.map((item, index) => {
                return <li key={index} className='flex gap-2.5 items-center py-4 border-b border-[#00000025] hover:bg-gray-200 pr-4 pl-6'>

                  <div className='size-14 rounded-full overflow-hidden'>
                    <img src={item.profile_picture} alt="profileImg" />
                  </div>

                  <div className='grow flex justify-between items-center'>
                    <div><h4 className='font-semibold text-sm'>{item.name}</h4>
                      <p className='font-medium text-xs text-[#4D4D4D75]'>{item.email}</p>
                    </div>
                    {
                      friendList.includes(currentUserData.uid + item.id) ||
                        friendList.includes(item.id + currentUserData.uid) ||
                        blockList.includes(currentUserData.uid + item.id) ||
                        blockList.includes(item.id + currentUserData.uid) ||
                        friendRequestList.includes(currentUserData.uid + item.id) ||
                        friendRequestList.includes(item.id + currentUserData.uid) ?
                        <button className='bg-gray-300 text-gray-500 p-2.5 rounded-lg cursor-not-allowed'>
                          <IoMdAdd className='text-xl' />
                        </button>
                        :
                        <button onClick={() => handleFriendRequest(item)} className='bg-primary text-white p-2.5 rounded-lg cursor-pointer'>
                          <IoMdAdd className='text-xl' />
                        </button>
                    }
                  </div>

                </li>

              })}
            </ul>

            :

            userList.length > 0 ?
              <ul className='mt-4 h-full overflow-auto  mr-3'>
                {/* Friend Item */}

                {userList.map((item, index) => {
                  return <li key={index} className='flex gap-2.5 items-center py-4 border-b border-[#00000025] hover:bg-gray-200 pr-4 pl-6'>

                    <div className='size-14 rounded-full overflow-hidden'>
                      <img src={item.profile_picture} alt="profileImg" />
                    </div>

                    <div className='grow flex justify-between items-center'>
                      <div><h4 className='font-semibold text-sm'>{item.name}</h4>
                        <p className='font-medium text-xs text-[#4D4D4D75]'>{item.email}</p>
                      </div>
                      {
                        friendList.includes(currentUserData.uid + item.id) ||
                          friendList.includes(item.id + currentUserData.uid) ||
                          blockList.includes(currentUserData.uid + item.id) ||
                          blockList.includes(item.id + currentUserData.uid) ||
                          friendRequestList.includes(currentUserData.uid + item.id) ||
                          friendRequestList.includes(item.id + currentUserData.uid) ?
                          <button className='bg-gray-300 text-gray-500 p-2.5 rounded-lg cursor-not-allowed'>
                            <IoMdAdd className='text-xl' />
                          </button>
                          :
                          <button onClick={() => handleFriendRequest(item)} className='bg-primary text-white p-2.5 rounded-lg cursor-pointer'>
                            <IoMdAdd className='text-xl' />
                          </button>
                      }
                    </div>

                  </li>

                })}
              </ul>

              :

              <div className='text-gray-500 flex justify-center items-center h-full'>
                <h2>No User is Available</h2>
              </div>
        }
      </div>

    </div>
  )

}

export default UserList