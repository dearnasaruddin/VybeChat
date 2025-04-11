import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Skeleton from './Skeleton';

const FriendList = () => {
  const db = getDatabase();
  const currentUserData = useSelector((state) => state.userInfo.value)
  const [friendList, setFriendList] = useState([])
  const [activeUserOptionIndex, setActiveUserOptionIndex] = useState(false)
  const [loading, setLoading] = useState(true)
  // const [activeUserOptions, setActiveUserOptions] = useState(false)




  const handleBlock = (targetedUserData) => {
    if (currentUserData.uid == targetedUserData.senderID) {

      set(push(ref(db, 'blockList/')), {
        blockByName: targetedUserData.senderName,
        blockByEmail: targetedUserData.senderEmail,
        blockByID: targetedUserData.senderID,
        blockByImg: targetedUserData.senderImg,
        blockedName: targetedUserData.receiverName,
        blockedEmail: targetedUserData.receiverEmail,
        blockedID: targetedUserData.receiverID,
        blockedImg: targetedUserData.receiverImg
      }).then(() => {
        remove(ref(db, 'friendList/' + targetedUserData.id))
      }).catch((error) => {
        console.log(error)
      })

    } else {

      set(push(ref(db, 'blockList/')), {
        blockByName: targetedUserData.receiverName,
        blockByEmail: targetedUserData.receiverEmail,
        blockByID: targetedUserData.receiverID,
        blockByImg: targetedUserData.receiverImg,
        blockedName: targetedUserData.senderName,
        blockedEmail: targetedUserData.senderEmail,
        blockedID: targetedUserData.senderID,
        blockedImg: targetedUserData.senderImg,
      }).then(() => {
        remove(ref(db, 'friendList/' + targetedUserData.id))
      }).catch((error) => {
        console.log(error)
      })
    }
    setActiveUserOptionIndex(false)
  }

  useEffect(() => {
    const friendListRef = ref(db, 'friendList/');
    onValue(friendListRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (currentUserData.uid === item.val().senderID || currentUserData.uid === item.val().receiverID) {
          arr.push({ ...item.val(), id: item.key })
        }
        setLoading(false)
        setFriendList(arr)
      })
    });

  }, [])

  return (
    <div>
      <div className='flex justify-between items-center font-semibold text-xl px-6 text-black '>
        <h2>Friend List</h2>
        <BsThreeDots className='text-primary text-2xl' />
      </div>

      <div className='h-82'>

        {loading ?

          <Skeleton />

          :

          friendList.length > 0 ?

            <ul className='mt-4 h-full overflow-auto  mr-3'>
              {/* Friend Item */}
              {friendList.map((item, index) => {
                return <li key={index} className='flex gap-2.5 items-center py-4 border-b border-[#00000025] hover:bg-gray-200 pr-4 pl-6'>

                  <div className='size-14 rounded-full overflow-hidden'>
                    {currentUserData.uid === item?.senderID ?
                      <img src={item.receiverImg} alt="profileImg" />
                      :
                      <img src={item.senderImg} alt="profileImg" />
                    }
                  </div>

                  <div className='grow flex justify-between relative'>
                    {currentUserData.uid === item?.senderID ?
                      <div>
                        <h4 className='font-semibold text-sm'>{item.receiverName}</h4>
                        <p className='font-medium text-xs text-[#4D4D4D75]'>{item.receiverEmail}</p>
                      </div>
                      :
                      <div>
                        <h4 className='font-semibold text-sm'>{item.senderName}</h4>
                        <p className='font-medium text-xs text-[#4D4D4D75]'>{item.senderEmail}</p>
                      </div>
                    }

                    <button className='cursor-pointer' onClick={() => setActiveUserOptionIndex(index)} >
                      <BsThreeDots className='text-lg' />
                    </button>
                    {activeUserOptionIndex === index &&

                      <ul onMouseLeave={() => setActiveUserOptionIndex(null)} className='bg-gray-400 w-1/2 absolute top-8 right-0 rounded-lg p-2 shadow-[2px_15px_25px_rgba(0,0,0,0.25)]'>
                        <li onClick={() => handleBlock(item)} className='flex items-center text-lg text-white gap-x-3 px-3 py-1.5 rounded-md cursor-pointer hover:bg-black/50 duration-300'><MdBlock />Block</li>
                      </ul>
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

    </div >
  )
}

export default FriendList