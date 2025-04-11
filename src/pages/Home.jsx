import React from 'react'
import Sidebar from '../components/Sidebar'
import FriendList from '../components/FriendList';
import MyGroups from '../components/MyGroups';
import FriendRequest from '../components/FriendRequest';
import UserList from '../components/UserList';
import BlockList from '../components/BlockList';
import GroupList from '../components/GroupList';

const Home = () => {



  return (
    // <div className='w-full h-screen py-9 pr-8 gap-5 flex flex-wrap justify-between content-between font-poppins'>
    <div className='w-full h-screen py-9 pl-8 pr-8 gap-5 grid lg:grid-cols-2 xl:grid-cols-3 font-poppins'>
      {/* Search bar & Group list */}
      <div className='h-full bg-white rounded-[20px] pt-5 shadow-[0px_4px_4px_0px_#00000040]'>
        <GroupList />
      </div>



      {/* Friends list */}
      <div className='h-full bg-white rounded-[20px]  py-5 shadow-[0px_4px_4px_0px_#00000040]'>
        <FriendList />
      </div>



      {/* User list */}
      <div className='h-full bg-white rounded-[20px]  pt-5 shadow-[0px_4px_4px_0px_#00000040]'>
        <UserList />
      </div>



      {/* Friend Request list */}
      <div className='h-full bg-white rounded-[20px] pt-5 shadow-[0px_4px_4px_0px_#00000040]'>
        <FriendRequest />
      </div>



      {/* My Group list */}
      <div className='bg-white rounded-[20px]  pt-5 shadow-[0px_4px_4px_0px_#00000040]'>
        <MyGroups />
      </div>



      {/* Block list */}
      <div className='h-full bg-white rounded-[20px]  pt-5 shadow-[0px_4px_4px_0px_#00000040]'>
        <BlockList />
      </div>

    </div>

  )
}

export default Home