import { Button, Card, Stack, TextField } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setPost } from '../features/data'

const UpdatePost = () => {
  const inpRef = useRef()
  const imgRef = useRef()
  const descRef = useRef()
  const { id } = useParams()
  const disp = useDispatch()

  const updateTitle = () => {
    const item = {
      id: id,
      title: inpRef.current.value
    }
    console.log(item);

    inpRef.current.value = ''

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(item)
    }

    fetch("http://localhost:8060/updatePost", options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        disp(setPost(data.post))
      })
  }

  const updateImage = () => {
    const item = {
      id: id,
      image: imgRef.current.value
    }
    console.log(item);

    imgRef.current.value = ''

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(item)
    }

    fetch("http://localhost:8060/updateImage", options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        disp(setPost(data.post))
      })
  }

  const updateDesc = () => {
    const item = {
      id: id,
      description: descRef.current.value
    }
    console.log(item);

    descRef.current.value = ''

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(item)
    }

    fetch("http://localhost:8060/updateDesc", options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        disp(setPost(data.post))
      })
  }

  return (
    <Stack sx={{ flexDirection: 'row', gap: 1 }}>
        <Card sx={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}>
          <TextField inputRef={inpRef} id="filled-basic" label="Title" variant="filled" />
          <Button onClick={updateTitle} variant='outlined' color='warning'>Update title</Button>
        </Card>
        <Card sx={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}>
          <TextField inputRef={imgRef} id="filled-basic" label="Image link" variant="filled" />
          <Button onClick={updateImage} variant='outlined' color='warning'>Update Image</Button>
        </Card>
        <Card sx={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}>
          <TextField inputRef={descRef} id="filled-basic" label="Description" variant="filled" />
          <Button onClick={updateDesc} variant='outlined' color='warning'>Update Description</Button>
        </Card>
      </Stack>
  )
}

export default UpdatePost