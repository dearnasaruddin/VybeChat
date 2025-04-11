import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { IoMdAdd } from 'react-icons/io';
import groupAvatar from '../assets/groupAvatar.webp'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import Skeleton from './Skeleton';

const MyGroups = () => {
  const db = getDatabase()
  const auth = getAuth()
  const [createGroupModal, setCreateGroupModal] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [groupList, setGroupList] = useState([])
  const [groupNameError, setGroupNameError] = useState("")
  const [loading, setLoading] = useState(true)
  const groupInputRef = useRef()

  const handleActiveGroupModal = () => {
    setCreateGroupModal(true)
  }

  useEffect(() => {
    const groupListRef = ref(db, 'groupList/');
    onValue(groupListRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().creatorID) {
          arr.push({ ...item.val(), id: item.key })
        }
        setLoading(false)
        setGroupList(arr)
      })
    });

  }, [])

  const handleGroupName = (e) => {
    setGroupName(e.target.value)
    setGroupNameError("")
  }

  const handleCreateGroup = () => {
    if (!groupName) {
      setGroupNameError("Group Name is required!");
      groupInputRef.current.focus()
    } else {
      set(push(ref(db, 'groupList/')), {
        groupName: groupName,
        groupImg: groupAvatar,
        creatorName: auth.currentUser.displayName,
        creatorID: auth.currentUser.uid
      }).then(() => {
        setCreateGroupModal(false)
      })
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center font-semibold text-xl px-6 text-black '>
        <h2>My Groups</h2>
        <div className='flex items-center gap-x-3 text-primary'>
          <span onClick={handleActiveGroupModal} className={`text-2xl p-1 cursor-pointer ${createGroupModal && "bg-primary text-white"}`}>
            <IoMdAdd />
          </span>
          <BsThreeDots className=' text-2xl' />
        </div>
      </div>




      <div className='h-82'>
        {loading ?

          <Skeleton />

          :

          createGroupModal ?

            <div className='h-full flex flex-col justify-center items-center px-6'>
              < h2 className='text-2xl mb-4'>Create Your Group</h2>
              <input ref={groupInputRef} onKeyUp={(e) => e.key === "Enter" && handleCreateGroup()} onChange={handleGroupName} type="text" placeholder='Group Name' className={`px-4 py-2 text-xl ${groupNameError ? "border-red-500 border-2 outline-none" : "border"}`} />
              {groupNameError && <p className='text-red-500 mt-2'>{groupNameError}</p>}
              <div className='mt-4'>
                <button onClick={handleCreateGroup} className='min-w-24 py-1 rounded-lg text-xl text-white bg-primary cursor-pointer'>Start</button>
                <button onClick={() => setCreateGroupModal(false)} className='min-w-24 py-1 rounded-lg ml-3 text-xl text-white bg-gray-500 cursor-pointer'>Cencel</button>
              </div>
            </div>

            :

            groupList.length > 0 ?

              <ul className='mt-4 h-full overflow-auto  mr-3'>
                {/* Friend Item */}

                {groupList.map((item, index) => {
                  return <li key={index} className='flex gap-2.5 items-center py-4 border-b border-[#00000025] hover:bg-gray-200 pr-4 pl-6'>

                    <div className='size-14 rounded-full overflow-hidden'>
                      <img src={item.groupImg} alt="groupImg" />
                    </div>

                    <div>
                      <div><h4 className='font-semibold text-sm'>{item.groupName}</h4>
                        <p className='font-medium text-xs text-[#4D4D4D75]'>{item.creatorName}</p>
                      </div>
                    </div>
                    <button className='cursor-pointer text-lg ml-auto' >
                      <BsThreeDots />
                    </button>
                  </li>

                })}
              </ul>

              :

              <div className='text-gray-500 flex justify-center items-center h-full'>
                <h2>No Group is Available</h2>
              </div>
        }

      </div >
    </div >
  )
}

export default MyGroups