import { Box, Card, Stack } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPosting } from '../features/data';
import PostUpload from '../components/PostUpload';
import PostCards from '../components/PostCards';

const PostsPage = () => {
  const posts = useSelector(store => store.data.value.posting)
  const dis = useDispatch()

  useEffect(() => {
    fetch("http://localhost:8060/getPosts")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dis(setPosting(data.allPosts))
      })
  }, [])

  return (
    <Box sx={{ flexDirection: 'row', gap: 2, display: 'flex' }}>
      <Stack sx={{ width: '400px' }}>
        <PostUpload />
      </Stack>
      <Stack sx={{ width: '800px', height: 'auto' }}>
        <Card sx={{ padding: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {posts.map((x) => <PostCards item={x} key={x._id} />)}
        </Card>
      </Stack>
    </Box>
  )
}

export default PostsPage;