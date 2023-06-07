import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setChat } from '../features/data'
import FavoriteIcon from '@mui/icons-material/Favorite';

const ChatPage = () => {
    // const [chat, setChat] = useState(null)
    const myUser = useSelector(store => store.data.value.myUser)
    const chat = useSelector(store => store.data.value.chat)
    const users = useSelector(store => store.data.value.users)

    const msgRef = useRef()
    const {id} = useParams()
    const disp = useDispatch()

    useEffect(() => {
        
        fetch("http://localhost:8060/getChat/"+id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            disp(setChat(data.chat))
            // setChat(data.chat)
        })
    }, [])

    const sendMessage = () => {
        

        const data = {
            id,
            message: {
                value: msgRef.current.value,
                user: myUser.username,
                time: new Date(Date.now()).toLocaleString(),
                img: myUser.image
            }
        }

        msgRef.current.value = ''

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
        }
        fetch("http://localhost:8060/addMessage", options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                disp(setChat(data.chat))
                // setChat(data.chat)
            })
    }

    const find = chat?.participants.find(x => x !== myUser.username)
    const chatUser = users?.filter(x => x.username === find)
    
    const [isCliked, setIsCliked] = useState(false)
    const onClick = () => {
        setIsCliked(!isCliked)
    }

  return (
    <div className='chat-card'>
        <div className='username'>
            <img className='prof-img2' src={chatUser[0]?.image} alt="" />
            <div>{chatUser[0]?.username}</div>
        </div>
        <div className='chat'>
            <div className='ml-2'>
                {chat?.messages.map((x, i) =>  <div className='message' key={i}>
                    <b>{<div className='chat-div'><img className='prof-img' src={x.img} alt="" />{x.user}</div>}</b>
                     {x.value.includes('http') ? <img className='img' src={x.value}/> : x.value}
                     <p className='time'>{x.time}</p>
                     {x.user.includes(find) ? <div className='like' onClick={onClick}>
                        {isCliked ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteIcon sx={{ color: 'grey' }} />}</div> : null}
                     
                </div>)}
            </div>
            {/* <div className='flex1 mr-2'>
            {chat?.messages.map((x, i) => x.user.includes(myUser.username) ? null : <div className='message' key={i}>
                    <b>{x.user.includes(myUser.username) ? null : <div className='chat-div'><img className='prof-img' src={x.img} alt="" />{x.user}</div>}
                    </b> {x.value.includes('http') ? <img className='img' src={x.value}/> : x.value}
                    <p>{x.time}</p>
                </div>)}
            </div> */}
        </div>
        <div className='chat-input'>
            <input ref={msgRef} type="text" placeholder='type message...' />
            <button onClick={sendMessage}>Send</button>
        </div>

    </div>
  )
}

export default ChatPage;