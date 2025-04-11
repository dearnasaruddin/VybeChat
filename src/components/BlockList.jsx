import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Skeleton from './Skeleton';

const BlockList = () => {
  const db = getDatabase();
  const currentUserData = useSelector((state) => state.userInfo.value)
  const [blockList, setBlockList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const blockListRef = ref(db, 'blockList/');
    onValue(blockListRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {

        if (currentUserData.uid == item.val().blockByID) {
          arr.push({ ...item.val(), id: item.key })
        }

      })
      setLoading(false)
      setBlockList(arr)

    });

  }, [])


  const handleUnblock = (targetedUserData) => {

    if (currentUserData.uid == targetedUserData.blockByID) {

      set(push(ref(db, 'friendList/')), {
        senderName: targetedUserData.blockByName,
        senderEmail: targetedUserData.blockByEmail,
        senderID: targetedUserData.blockByID,
        senderImg: targetedUserData.blockByImg,
        receiverName: targetedUserData.blockedName,
        receiverEmail: targetedUserData.blockedEmail,
        receiverID: targetedUserData.blockedID,
        receiverImg: targetedUserData.blockedImg,
      }).then(() => {
        remove(ref(db, 'blockList/' + targetedUserData.id))
      })
    }
  }


  return (
    <div>
      <div className='flex justify-between items-center font-semibold text-xl px-6 text-black '>
        <h2>Block List</h2>
        <BsThreeDots className='text-primary text-2xl' />
      </div>
      <div className='h-82'>
        {loading ?
         
         <Skeleton/>

          :

          blockList.length > 0 ?
            <ul className='mt-4 h-full overflow-auto  mr-3'>
              {/* Friend Item */}

              {blockList.map((item, index) => {
                return <li key={index} className='flex gap-2.5 items-center py-4 border-b border-[#00000025] hover:bg-gray-200 pr-4 pl-6'>

                  <div className='size-14 rounded-full overflow-hidden'>
                    <img src={item.blockedImg} alt="profileImg" />
                  </div>

                  <div className='grow flex justify-between items-center'>
                    <div><h4 className='font-semibold text-sm'>{item.blockedName}</h4>
                      <p className='font-medium text-xs text-[#4D4D4D75]'>{item.blockedEmail}</p>
                    </div>

                    <button onClick={() => handleUnblock(item)} className='font-medium text-sm text-white bg-primary px-3 py-1.5 rounded-md cursor-pointer'>Unblock</button>

                  </div>

                </li>

              })}
            </ul>
            :
            <div className='text-gray-500 flex justify-center items-center h-full'>
              <h2>No Blocked User is Available</h2>
            </div>
        }
      </div>
    </div>
  )
}

export default BlockList