import { Box, Card, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const nav = useNavigate();
    const usernameRef = useRef();
    const pass1Ref = useRef();
    const pass2Ref = useRef();

    const [error, setError] = useState('');

    const validateUsername = (username) => {
        const re = /^.{4,20}$/;
        return re.test(username);
    }

    function auth() {
        const user = {
            username: usernameRef.current.value,
            passOne: pass1Ref.current.value,
            passTwo: pass2Ref.current.value,
        }
        console.log(user.passOne);

        const usernameValid = validateUsername(user.username);

        if (!usernameValid) return setError('USERNAME LENGTH MUST BE 4-20 LETTERS');
        if (user.passOne !== user.passTwo) return setError('PASSWORD NOT MATCH');
        if (!/^.{4,20}$/.test(user.passOne)) return setError('BAD PASSWORD LENGHT (4-20 LETTERS)');
        if (!/[A-Z]/.test(user.passOne)) return setError('NEED ATLEAST ONE UPPERCASE LETTER');
        if (!/([!@#$%^&*_+])\w+/.test(user.passOne)) return setError('PASSWORD NEED ONE SPECIAL SYMBOL');


        setError('');

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        fetch('http://localhost:8060/register', options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    nav('/login')
                }
            })
    }

    return (
        <div className=' mb-3'>
            <Card
                sx={{
                    width: '500px',
                    height: '600',
                    flexDirection: 'row',
                    display: 'flex',
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
                    <Typography variant='h5' sx={{ color: 'white' }}>Hello, friend!</Typography>
                    <input type='email' ref={usernameRef} placeholder='enter username'></input>
                    <input type='text' ref={pass1Ref} placeholder='enter your password'></input>
                    <input type='text' ref={pass2Ref} placeholder='repeat your password'></input>
                    {error && <div className='err'>{error}</div>}
                    <button onClick={auth}>Register</button>
                </Stack>
                <Box
                    sx={{
                        width: '100%',
                        height: '300px',
                        backgroundColor: '#80deea',
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}>
                    <Typography variant='h5' sx={{ color: 'white' }}>Glad to see you!</Typography>
                    <Typography variant='subtitle' sx={{ color: 'white' }}>Register to see other users</Typography>
                </Box>
            </Card>
        </div>
    )
}

export default RegisterPage;