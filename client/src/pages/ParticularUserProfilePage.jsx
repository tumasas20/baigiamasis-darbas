import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ChatPage from './ChatPage';
import { Card, Stack, Typography } from '@mui/material';

const ParticularUserProfilePage = () => {
  const { username } = useParams()
  const users = useSelector(store => store.data.value.users)
  const myUser = useSelector(store => store.data.value.myUser)
  const nav = useNavigate()

  const oneUser = users.find(x => x.username === username)
  useEffect(()=>{
    console.log('');
  },[])

  const openChat = () => {
      const users = {
        userOne: myUser.username,
        userTwo: oneUser.username
      }
      console.log(users);
  
      const options = {
        method: "POST",
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify(users)
      }
  
      fetch("http://localhost:8060/openChat", options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        nav("/chat/"+data.chatId)
      })
    }
    
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Stack sx={{ gap: 2, flexDirection: 'column', alignItems: 'start', marginLeft: 3 }}>
        <img className='profile-img' src={oneUser.image} alt="" />
        <Typography variant='h5' sx={{ color: 'black' }}>{oneUser.username}</Typography>
      </Stack>
      <button onClick={openChat}>Send message</button>
    </Card>
  )
}

export default ParticularUserProfilePage;