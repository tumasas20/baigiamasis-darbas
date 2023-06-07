import { Button, Card, Stack, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setProfile } from '../features/data'
import { setMyUser } from '../features/data'

const UpdateProfile = () => {
  const nameRef = useRef()
  const imgRef = useRef()
  const passRef = useRef()
  const { id } = useParams()
  const disp = useDispatch()
  const allusers = useSelector(store => store.data.value.users)
  const [errName, setErrName] = useState('')
  const [errPass, setErrPass] = useState('')

  const updateUsername = () => {
    const item = {
      id: id,
      username: nameRef.current.value
    }
    console.log(item);

    nameRef.current.value = ''

    const findUsername = allusers.find(x => x.username === item.username)
    console.log('find username', findUsername);
    if(findUsername) return setErrName('USERNAME ALLREADY EXIST')

    setErrName('')

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(item)
    }

    fetch("http://localhost:8060/updateUserName", options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        disp(setProfile(data.user))
        disp(setMyUser(data.user))
      })
  }

  const updatePhoto = () => {
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

    fetch("http://localhost:8060/updateProfileImage", options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        disp(setProfile(data.user))
        disp(setMyUser(data.user))
      })
  }

  const updatePassword = () => {
    const item = {
      id: id,
      password: passRef.current.value
    }
    console.log(item);

    if (!/^.{4,20}$/.test(item.password)) return setErrPass('BAD PASSWORD LENGHT (4-20 LETTERS)');
    if (!/[A-Z]/.test(item.password)) return setErrPass('NEED ATLEAST ONE UPPERCASE LETTER');
    if (!/([!@#$%^&*_+])\w+/.test(item.password)) return setErrPass('PASSWORD NEED ONE SPECIAL SYMBOL');
    
    passRef.current.value = ''
    setErrPass('')

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(item)
    }

    fetch("http://localhost:8060/updateUserPass", options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        disp(setProfile(data.user))
        disp(setMyUser(data.user))
      })
  }

  return (
    <Stack sx={{ flexDirection: 'row', gap: 1 }}>
        <Card sx={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}>
          <TextField inputRef={imgRef} id="filled-basic" label="Image link" variant="filled" />
          <Button onClick={updatePhoto} variant='outlined' color='warning'>Change Photo</Button>
        </Card>
        <Card sx={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}>
          <TextField inputRef={nameRef} id="filled-basic" label="Username" variant="filled" />
          {errName && <div className='err'>{errName}</div>}
          <Button onClick={updateUsername} variant='outlined' color='warning'>Change username</Button>
        </Card>
        <Card sx={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}>
          <TextField inputRef={passRef} id="filled-basic" label="Password" variant="filled" />
          {errPass && <div className='err'>{errPass}</div>}
          <Button onClick={updatePassword} variant='outlined' color='warning'>Change password</Button>
        </Card>
      </Stack>
  )
}

export default UpdateProfile