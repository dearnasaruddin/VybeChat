import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockList = () => {
  const db = getDatabase();
  const currentUserData = useSelector((state) => state.userInfo.value)
  const [blockList, setBlockList] = useState([])

  useEffect(() => {
    const blockListRef = ref(db, 'blockList/');
    onValue(blockListRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {

        if (currentUserData.uid == item.val().blockByID) {
          arr.push({ ...item.val(), id: item.key })
        }

      })
      setBlockList(arr)

    });

  }, [])

  return (
    <div>
      <div className='flex justify-between items-center font-semibold text-xl px-6 text-black '>
        <h2>Block List</h2>
        <BsThreeDots className='text-primary text-2xl' />
      </div>
      <ul className='mt-4 h-82 overflow-auto  mr-3'>
        {/* Friend Item */}

        {blockList.map((item, index) => {
          return <li key={index} className='flex gap-2.5 items-center py-4 border-b border-[#00000025] hover:bg-gray-200 pr-4 pl-6'>

            <div className='size-14 rounded-full overflow-hidden'>
              <img src={item.blockedImg} alt="profileImg" />
            </div>

            <div className='grow flex justify-between'>
              <div><h4 className='font-semibold text-sm'>{item.blockedName}</h4>
                <p className='font-medium text-xs text-[#4D4D4D75]'>{item.blockedEmail}</p>
              </div>
              <div>
                <button className='font-medium text-white bg-primary px-3 py-0.5 rounded-md'>Unblock</button>
              </div>
            </div>

          </li>

        })}
      </ul>
    </div>
  )
}

export default BlockList