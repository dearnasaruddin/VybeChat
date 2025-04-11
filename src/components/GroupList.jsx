import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import Skeleton from './Skeleton';

const GroupList = () => {
  const auth = getAuth()
  const db = getDatabase()
  const [groupList, setGroupList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const groupListRef = ref(db, 'groupList/');
    onValue(groupListRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (auth.currentUser.uid != item.val().creatorID) {
          arr.push({ ...item.val(), id: item.key })
        }
        setLoading(false)
        setGroupList(arr)
      })
    });

  }, [])
  return (
    <div>
      <div className='flex justify-between items-center font-semibold text-xl px-6 text-black '>
        <h2>Group List</h2>
        <BsThreeDots className='text-primary text-2xl' />
      </div>

      <div className='h-82'>

        {
          loading ?

            <Skeleton />

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
                    <button type="button" className='bg-primary text-white px-4 py-1 rounded-lg ml-auto cursor-pointer'>Join</button>
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

export default GroupList