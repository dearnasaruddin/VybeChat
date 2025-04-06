import React from 'react'
import { BsThreeDots } from "react-icons/bs";


const FriendList = () => {

    const friendListData = [
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
                <h2>Friend List</h2>
                <BsThreeDots className='text-primary text-2xl' />
            </div>
            <ul className='mt-4 h-82 overflow-auto  mr-3'>
                {/* Friend Item */}

                {friendListData.map((item, index) => {
                    return <li key={index} className='flex gap-2.5 items-center py-4 border-b border-[#00000025] hover:bg-gray-200 pr-4 pl-6'>

                        <div className='size-14 rounded-full overflow-hidden'>
                            <img src={item.imgUrl} alt="profileImg" />
                        </div>

                        <div className='grow flex justify-between'>
                            <div><h4 className='font-semibold text-sm'>{item.name}</h4>
                                <p className='font-medium text-xs text-[#4D4D4D75]'>{item.designation}</p>
                            </div>
                            <div>
                                <p className='font-medium text-[10px] text-[#00000050]'>{item.time}</p>
                            </div>
                        </div>

                    </li>

                })}
            </ul>
        </div>
    )
}

export default FriendList