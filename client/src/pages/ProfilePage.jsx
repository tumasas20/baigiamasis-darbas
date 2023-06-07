import { Card, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UpdateProfile from '../components/UpdateProfile';
import { useParams } from 'react-router-dom';
import { setProfile } from '../features/data';

const ProfilePage = () => {
  const disp = useDispatch()
  const profile = useSelector(store => store.data.value.profile)
  const { id } = useParams()
  console.log('my profile', profile);

  useEffect(() => {
    fetch("http://localhost:8060/userProfile/" + id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        disp(setProfile(data.user))
      })
  }, [])


  return (
    <Stack sx={{ margin: 2, gap: 4}}>
      <Card sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <img className='profile-img' src={profile?.image} alt="" />
        <Stack sx={{ gap: 1 }}>
        <Typography variant='h5' sx={{ color: 'black' }}>User name: {profile?.username}</Typography>
        <Typography variant='h5' sx={{ color: 'black' }}>Password: {profile?.password}</Typography>
        </Stack>
      </Card>
      <Card>
        <UpdateProfile />
      </Card>
    </Stack>
  )
}

export default ProfilePage;