import { Card, Stack, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Card sx={{
      width: '500px',
      height: '600',
      flexDirection: 'row',
      display: 'flex',
      marginLeft: '500px',
      borderRadius: 3,
      boxShadow: '1px 3px 3px 2px #80cbc4',
    }}>
      <Stack
        sx={{
          gap: '1rem',
          padding: '1rem',
          background: '#26c6da',
          width: "500px"
        }}>
        <Typography variant='h4' sx={{ color: 'white' }}>Welcome!</Typography>
        <Typography variant='h7' sx={{ color: 'white' }}>
          Please <Link to="/register">Register</Link>
        </Typography>
        <Typography variant='h7' sx={{ color: 'white' }}>
          Or <Link to="/login">Log in</Link>
          </Typography>
      </Stack>
    </Card>
  )
}

export default HomePage;