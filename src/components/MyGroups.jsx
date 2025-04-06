import React from 'react'
import { BsThreeDots } from "react-icons/bs";


const MyGroups = () => {

  const myGroupListData = [
    {
      name: "Friends Reunion",
      designation: "Hi Guys, What's up?",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Friends Forever",
      designation: "Good to see you.",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Crazy Cousins",
      designation: "What plans today?",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Friends Reunion",
      designation: "Hi Guys, What's up?",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Friends Forever",
      designation: "Good to see you.",
      imgUrl: "https://picsum.photos/200",
    },
    {
      name: "Crazy Cousins",
      designation: "What plans today?",
      imgUrl: "https://picsum.photos/200",
    },

  ]
  return (
    <div>
      <div className='flex justify-between items-center font-semibold text-xl px-6 text-black '>
        <h2>My Groups</h2>
        <BsThreeDots className='text-primary text-2xl' />
      </div>
      <ul className='mt-4 h-82 overflow-auto  mr-3'>
        {/* Friend Item */}

        {myGroupListData.map((item, index) => {
          return <li key={index} className='flex gap-2.5 items-center py-4 border-b border-[#00000025] hover:bg-gray-200 pr-4 pl-6'>

            <div className='size-14 rounded-full overflow-hidden'>
              <img src={item.imgUrl} alt="profileImg" />
            </div>

            <div>
              <div><h4 className='font-semibold text-sm'>{item.name}</h4>
                <p className='font-medium text-xs text-[#4D4D4D75]'>{item.designation}</p>
              </div>
            </div>

          </li>

        })}
      </ul>
    </div>
  )
}

export default MyGroups