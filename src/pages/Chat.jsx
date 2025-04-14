import React, { useEffect, useRef, useState } from 'react'
import FriendList from '../components/FriendList'
import MyGroups from '../components/MyGroups'
import { BsThreeDotsVertical, BsEmojiSmileFill } from 'react-icons/bs'
import { GrEmoji } from "react-icons/gr";
import { TbSend2 } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from 'moment';
import EmojiPicker from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = () => {
  const db = getDatabase()
  const auth = getAuth()
  const msgRef = useRef()
  const msgInfo = useSelector((state) => state.msgInfo.value)
  const currentUserData = useSelector((state) => state.userInfo.value)
  const [msg, setMsg] = useState("")
  const [msgError, setMsgError] = useState("")
  const [chatList, setChatList] = useState([])
  const [shownTimeIndex, setShownTimeIndex] = useState(null)
  const [toggleTime, setToggleTime] = useState(false)
  const [emojiModal, setEmojiModal] = useState(false)

  const handleMsgInput = (e) => {
    setMsg(e.target.value)
    setMsgError("")
  }
  const handleSendMsg = () => {
    if (msg) {

      set(push(ref(db, 'chats/')), {
        senderName: auth.currentUser.displayName,
        senderID: auth.currentUser.uid,
        receiverName: msgInfo.userName,
        receiverID: msgInfo.id,
        message: msg,
        time: ` ${new Date().getFullYear()} ${new Date().getMonth() + 1}  ${new Date().getDate()}  ${new Date().getHours()} ${new Date().getMinutes()}`
      }).then(() => {
        setMsg("")
      })
    } else {
      setMsgError("Write Something")
      msgRef.current.focus()
    }
  }

  const handleEmoji = (e) => {
    setMsg((prev) => prev + e.emoji)
  }

  // useEffect(() => ,[])
  useEffect(() => {
    const chatListRef = ref(db, 'chats/');
    onValue(chatListRef, (snapshot) => {
      let arr = []

      snapshot.forEach((item) => {

        if (
          currentUserData.uid == item.val().senderID && msgInfo.id == item.val().receiverID ||
          currentUserData.uid == item.val().receiverID && msgInfo.id == item.val().senderID
        ) {
          arr.push({ ...item.val(), id: item.key })
        }
        setShownTimeIndex(null)
        setChatList(arr)
      })
    });

  }, [msgInfo])


  return (

    // <div className='w-full h-screen py-9 pr-8 gap-5 grid grid-cols-2 font-poppins'>
    <div className='w-full h-screen py-9 pr-8 gap-5 flex divide-x divide-gray-400 font-poppins'>
      <div className='h-full flex flex-col gap-y-8 grow pr-5'>
        <input type="text" className='border border-gray-400 px-5 py-3 text-xl rounded-2xl mx-4' placeholder='Search by Name' />
        <FriendList height={"h-[50vh]"} clickEvent={true} optBtn={"hidden"} />
        <MyGroups height={"h-[20vh]"} createGroupBtn={"hidden"} optBtn={"hidden"} />
      </div>
      <div className='h-full grow-5'>
        {msgInfo ?
          <>
            <div className='flex justify-between items-center border-b border-gray-400 pb-3'>
              <div className='flex gap-x-5 items-center'>
                <div className='size-16 rounded-full overflow-hidden'>
                  <img src={msgInfo.img} alt="profilImg" />
                </div>
                <div>
                  <h3 className='font-semibold text-2xl'>{msgInfo.userName}</h3>
                  <p className='font-normal text-sm text-black/85'>Online</p>
                </div>
              </div>
              <BsThreeDotsVertical className='text-primary text-3xl cursor-pointer' />
            </div>
            <ScrollToBottom className='h-[82%] my-3 pr-1'>
              {chatList.length > 0 ?

                chatList.map((item, index) => (
                  <>
                    <div className={`flex ${currentUserData.uid == item.senderID ? "justify-end" : "justify-start"}`}>
                      <div className='flex gap-x-1 items-end '>
                        {currentUserData.uid == item.receiverID &&
                          <div className='size-10 my-2 border border-gray-600 rounded-full overflow-hidden'><img src={msgInfo.img} alt="msgInfo.img" /></div>
                        }
                        <div onClick={() => {
                          setToggleTime(!toggleTime)
                          if (toggleTime) {
                            setShownTimeIndex(index)
                          } else {
                            setShownTimeIndex(null)
                          }
                        }} className='mb-2'>
                          {shownTimeIndex === index && <span className='text-xs text-gray-500'>{moment(item.time, "YYYYMMDD h:mm:ss").fromNow()}</span>}
                          <p className={`max-w-[600px] py-2 px-4 ${currentUserData.uid == item.senderID ? "bg-primary text-white rounded-s-2xl ml-auto" : "bg-gray-200 rounded-e-2xl mr-auto"}`}>{item.message}</p>

                        </div>
                      </div>
                    </div>
                  </>
                ))

                :
                <div className='h-full flex justify-center items-center'>
                  <h2 className='text-gray-400'>Send Message to Start Conversation</h2>
                </div>}
            </ScrollToBottom>
            <div className='flex items-center gap-x-3 relative'>
              {emojiModal && <div className='absolute z-10 bottom-16 right-14'><EmojiPicker emojiStyle="facebook" onEmojiClick={handleEmoji} /></div>}
              <div className='grow relative'>
                <input onChange={handleMsgInput} onKeyUp={(e)=>e.key == "Enter" && handleSendMsg()} ref={msgRef} value={msg} type="text" className={`w-full border border-gray-400 rounded-2xl pl-5 pr-14 py-3 text-xl ${msgError && "border-red-400 outline-none border-2"}`} placeholder='Write your text' />
                <span onClick={() => setEmojiModal(!emojiModal)} className='absolute text-4xl text-primary bg-white right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
                  {
                    emojiModal ?
                      <BsEmojiSmileFill />
                      :
                      <GrEmoji />
                  }
                </span>
              </div>
              <span onClick={handleSendMsg} className='text-[40px] text-primary cursor-pointer'>
                <TbSend2 />
              </span>
            </div>
          </>
          :
          <div className='text-gray-500 h-full w-full flex justify-center items-center'>
            <h2>Select a friend or a Group to Start Chatting</h2>
          </div>
        }
      </div>
    </div >
  )
}

export default Chat