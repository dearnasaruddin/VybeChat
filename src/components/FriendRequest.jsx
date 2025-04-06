import React from 'react'
import { BsThreeDots } from "react-icons/bs";


const FriendRequest = () => {

  const friendRequestListData = [
    {
      name: "Raghav",
      designation: "Sure!",
      time: "Today, 8:56pm",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Kiran",
      designation: "Hi.....",
      time: "Today, 2:31pm",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Raghav",
      designation: "Sure!",
      time: "Today, 8:56pm",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Tejeshwini",
      designation: "I will call him today.",
      time: "Yesterday, 6:22pm",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Marvin McKinney",
      designation: "Sure!",
      time: "Today, 8:56pm",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Raghav",
      designation: "Sure!",
      time: "Yesterday, 6:22pm",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Swathi",
      designation: "Dinner?",
      time: "Today, 8:56pm",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Raghav",
      designation: "Sure!",
      time: "Yesterday, 6:22pm",
      imgUrl: "https://picsum.photos/200",
    },
  ]

  return (
    <div>
      <div className='flex justify-between items-center font-semibold text-xl px-6 text-black '>
        <h2>Friend Requests</h2>
        <BsThreeDots className='text-primary text-2xl' />
      </div>
      <ul className='mt-4 h-82 overflow-auto  mr-3'>
        {/* Friend Item */}

        {friendRequestListData.map((item, index) => {
          return <li key={index} className='flex gap-2.5 items-center py-4 border-b border-[#00000025] hover:bg-gray-200 pr-4 pl-6'>

            <div className='size-14 rounded-full overflow-hidden'>
              <img src={item.imgUrl} alt="profileImg" />
            </div>

            <div className='grow flex justify-between items-center'>
              <div><h4 className='font-semibold text-sm'>{item.name}</h4>
                <p className='font-medium text-xs text-[#4D4D4D75]'>{item.designation}</p>
              </div>
              <div>
                <button type="button" className='font-medium bg-primary text-white px-3 py-1 rounded-md'>Accept</button>
                <button type="button" className='font-medium bg-gray-400 text-white px-3 py-1 rounded-md ml-3'>Delete</button>
              </div>
            </div>


          </li>

        })}
      </ul>
    </div>
  )
}

export default FriendRequest