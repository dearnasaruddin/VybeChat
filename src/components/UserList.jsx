import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { IoMdAdd } from 'react-icons/io';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {

  const currentUserData = useSelector((state) => state.userInfo.value)
  const db = getDatabase();
  const [userList, setUserList] = useState([])

  useEffect(() => {

    const userListRef = ref(db, 'users/');
    onValue(userListRef, (snapshot) => {

      let arr = []
      snapshot.forEach((item) => {

        if (currentUserData.uid != item.key) {
          arr.push(item.val())
          setUserList(arr)
        }

      })
    });
  }, [])


  return (
    <div>
      <div className='flex justify-between items-center font-semibold text-xl px-6 text-black '>
        <h2>User List</h2>
        <BsThreeDots className='text-primary text-2xl' />
      </div>
      <ul className='mt-4 h-82 overflow-auto  mr-3'>
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
              <button className='bg-primary text-white p-2.5 rounded-lg cursor-pointer'>
                <IoMdAdd className='text-xl' />
              </button>
            </div>

          </li>

        })}
      </ul>
    </div>
  )
}

export default UserList