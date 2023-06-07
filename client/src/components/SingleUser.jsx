import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SingleUser = ({user}) => {
  // const myUser = useSelector(store => store.data.value.myUser)
  const nav = useNavigate()

  // const openChat = () => {
  //   const users = {
  //     userOne: myUser.username,
  //     userTwo: user.username
  //   }
  //   console.log(users);

  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "content-type":"application/json"
  //     },
  //     body: JSON.stringify(users)
  //   }

  //   fetch("http://localhost:8060/openChat", options)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //     nav("/chat/"+data.chatId)
  //   })
  // }


  return (
    <div onClick={() => nav('/user/'+user.username)} className='single-user-card'>
      <div>
        <img className='chat-img' src={user.image} alt="" />
      </div>
        <h3>{user.username}</h3>
    </div>
  )
}

export default SingleUser;