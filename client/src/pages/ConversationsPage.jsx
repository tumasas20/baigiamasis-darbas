import React, { useEffect, useState } from 'react'
import SingleConversation from '../components/SingleConversation';
import { Card } from '@mui/material';
import { useSelector } from 'react-redux';

const ConversationsPage = () => {
  const [conv, setConv] = useState([])
  const myUser = useSelector(store => store.data.value.myUser)

  useEffect(() => {

  fetch("http://localhost:8060/getConversations")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const found = data.chats.filter(x => x.participants.includes(myUser.username))
        console.log('tai ka radau', found);
        setConv(found)
      })
    }, [])

    console.log('gauta',conv);

  return (
    <Card sx={{ width: '900px', marginLeft: '150px' }}>
      {conv?.map((x, i) => <SingleConversation key={i} chat={x} />)}
    </Card>
  )
}

export default ConversationsPage;