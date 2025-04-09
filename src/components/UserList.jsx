import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { IoMdAdd } from 'react-icons/io';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const UserList = () => {

  const currentUserData = useSelector((state) => state.userInfo.value)
  const db = getDatabase();
  const [userList, setUserList] = useState([])
  const [friendRequestList, setFriendRequestList] = useState([])
  const [friendList, setFriendList] = useState([])
  const [blockList, setBlockList] = useState([])

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

  useEffect(() => {

    const userListRef = ref(db, 'users/');
    onValue(userListRef, (snapshot) => {

      let arr = []
      snapshot.forEach((item) => {

        if (currentUserData.uid != item.key) {
          arr.push({ ...item.val(), id: item.key })
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
      <div className='flex justify-between items-center font-semibold text-xl px-6 text-black '>
        <h2>User List</h2>
        <BsThreeDots className='text-primary text-2xl' />
      </div>
      <div className='h-82'>
        {userList.length > 0 ?
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
            <h2>No Friend is Available</h2>
          </div>
        }
      </div>

    </div>
  )

}

export default UserList