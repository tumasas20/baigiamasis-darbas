import { Card, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setPost } from '../features/data'
import UpdatePost from './UpdatePost'

const SinglePostPage = () => {
  const { id } = useParams()
  const disp = useDispatch()
  const post = useSelector(store => store.data.value.post)
  
  useEffect(() => {
    fetch("http://localhost:8060/post/" + id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        disp(setPost(data.post))
      })
  }, [])

  return (
    <Stack sx={{ flexDirection: 'column', gap: 3 }}>
      <Card sx={{ display: 'flex' }}>
        <img className='picture' src={post?.image} alt="" />
        <Stack sx={{ margin: 2, textAlign: 'left' }}>
          <Typography variant='h5' sx={{ color: 'black' }}>{post?.title}</Typography>
          <Typography variant='h7' sx={{ color: 'black' }}>{post?.description}</Typography>
        </Stack>
      </Card>
        <UpdatePost />
    </Stack>
  )
}

export default SinglePostPage