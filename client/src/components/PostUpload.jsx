import { Button, Card, TextField } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setPosting } from '../features/data';

const PostUpload = () => {
  const [err, setErr] = useState('')
  const titleRef = useRef()
  const descRef = useRef()
  const imgRef = useRef()

  const disp = useDispatch()

  function post() {
    const postData = {
      title: titleRef.current.value,
      description: descRef.current.value,
      image: imgRef.current.value,
    }

    console.log(postData);
    const reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

    if (!/^.{3,20}$/.test(postData.title)) return setErr('title must be more than 3 symbols')
    if (!reg.test(postData.image)) return setErr('image must be url')
    if (!/^.{1,500}$/.test(postData.description)) return setErr('description must be more than 1 symbols')

    setErr('')
    titleRef.current.value = ''
    descRef.current.value = ''
    imgRef.current.value = ''

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    }

    fetch('http://localhost:8060/posts', options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        disp(setPosting(data.allPosts))
      })
  }

  return (
    <Card sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField inputRef={titleRef} id="filled-basic" label="Title" variant="filled" />
      <TextField inputRef={imgRef} id="filled-basic" label="Image link" variant="filled" />
      <TextField
        inputRef={descRef}
        id="filled-multiline-static"
        label="Description"
        multiline
        rows={4}
        variant="filled"
      />
      {err && <div>{err}</div>}
      <Button onClick={post} variant='outlined' color='success'>ADD POST</Button>
    </Card>
  )
}

export default PostUpload