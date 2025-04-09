import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';


const FriendRequest = () => {

  const db = getDatabase();
  const currentUserData = useSelector((state) => state.userInfo.value)
  const [friendRequestList, setFriendRequestList] = useState([])

  useEffect(() => {
    const userListRef = ref(db, 'friendRequest/');
    onValue(userListRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (currentUserData.uid === item.val().receiverID) {
          arr.push({ ...item.val(), id: item.key })
        }
      })
      setFriendRequestList(arr)

    });

  }, [])

  const handleAcceptRequest = (friendRequestData) => {
    set(push(ref(db, 'friendList/')), {
      ...friendRequestData
    }).then(() => {
      remove(ref(db, 'friendRequest/' + friendRequestData.id))
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleDeleteRequest = (friendRequestData) => {
    remove(ref(db, 'friendRequest/' + friendRequestData.id))

  }



  return (
    <div>
      <div className='flex justify-between items-center font-semibold text-xl px-6 text-black '>
        <h2>Friend Requests</h2>
        <BsThreeDots className='text-primary text-2xl' />
      </div>
      <div className='h-82'>

        {friendRequestList.length > 0 ?
          <ul className='mt-4 h-full overflow-auto  mr-3'>
            {/* Friend Item */}

            {friendRequestList.map((item, index) => {
              return <li key={index} className='flex gap-2.5 items-center py-4 border-b border-[#00000025] hover:bg-gray-200 pr-4 pl-6'>

                <div className='size-14 rounded-full overflow-hidden'>
                  <img src={item.senderImg} alt="profileImg" />
                </div>

                <div className='grow flex justify-between items-center'>
                  <div><h4 className='font-semibold text-sm'>{item.senderName}</h4>
                    <p className='font-medium text-xs text-[#4D4D4D75]'>{item.senderEmail}</p>
                  </div>
                  <div>
                    <button onClick={() => handleAcceptRequest(item)} type="button" className='font-medium bg-primary text-white px-3 py-1 rounded-md cursor-pointer'>Accept</button>
                    <button onClick={() => handleDeleteRequest(item)} type="button" className='font-medium bg-gray-400 text-white px-3 py-1 rounded-md ml-3 cursor-pointer'>Delete</button>
                  </div>
                </div>


              </li>

            })}
          </ul>

          :

          <div className='text-gray-500 flex justify-center items-center h-full'>
            <h2>No Friend Request is Available</h2>
          </div>
        }
      </div>
    </div>
  )
}

export default FriendRequest