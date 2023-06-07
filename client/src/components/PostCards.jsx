import { Card, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PostCards = ({ item }) => {
  const nav = useNavigate()
  
  return (
    <Card
      onClick={() => nav('/post/'+item._id)}
      sx={{
        width: '300px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <img className='picture' src={item.image} alt='' />

      <Stack sx={{ margin: 2, textAlign: 'left' }}>
        <Typography variant='h5' sx={{ color: 'black' }}>{item.title}</Typography>
        <Typography variant='h7' sx={{ color: 'black' }}>{item.description}</Typography>
      </Stack>
    </Card>
  )
}

export default PostCards