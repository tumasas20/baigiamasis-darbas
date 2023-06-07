import { Box, Card } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const SingleConversation = ({ chat }) => {
  const myUser = useSelector(store => store.data.value.myUser)
  const users = useSelector(store => store.data.value.users)
  
  // const filteredUsers = users.filter(x => x.username !== myUser.username)
  // const found = filteredUsers.filter(x => x.username === chat.participants[1])
  const nav = useNavigate()
  
  const userOne = users.filter(x => x.username === chat.participants[0])
  const userTwo = users.filter(x => x.username === chat.participants[1])
  
  // console.log('chato id', chat._id);

  const deleteChat = () => {
      const del = {
        id: chat._id
      }
      console.log('delete',del);
  
      const options = {
        method: "DELETE",
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify(del)
      }
  
      fetch(`http://localhost:8060/deleteChat/${del.id}`, options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        nav('/conversations')
      })
    }
    const msg = chat?.messages.length-1 
    const message = msg === -1 ? msg +1 : msg 
    const last = chat?.messages[message]?.value
    // console.log('last', last);
    
    // const message = caht.messages ? chat?.messages[0].value : chat?.messages[1]
    
    

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: 1 }}>
      <Box onClick={() => nav('/chat/' + chat._id)} sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: 1, width: '85%' }}>
        <img className='conversation-img' src={userOne[0]?.image} alt="" />
        <img className='conversation-img' src={userTwo[0]?.image} alt="" />
        <h2>{chat?.participants[1]}</h2>
        <h2>-</h2>
        <h2>{chat?.participants[0]}</h2>
        <p>{last}</p>
      </Box>
      <button onClick={deleteChat}>Delete</button>
    </Card>
  )
}

export default SingleConversation;