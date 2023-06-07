import React, { useRef, useState } from 'react'
import { Box, Card, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMyUser } from '../features/data';
import { setUsers } from '../features/data';

const LoginPage = () => {
    const nav = useNavigate();
    const disp = useDispatch();
    const usernameRef = useRef();
    const passRef = useRef();

    const [users, setUsers1] = useState([]);
    const [error, setError] = useState('');

    const validateUsername = (username) => {
        const re = /^.{4,20}$/;
        return re.test(username);
    }

    function auth() {
        const user = {
            username: usernameRef.current.value,
            pass: passRef.current.value,
        }

        fetch("http://localhost:8060/getUsers")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                disp(setUsers(data.users))
                const pass = data.users.find(x => x.password === user.pass)
                setUsers1(pass)
            })

        const usernameValid = validateUsername(user.username);

        if (!usernameValid) return setError('USERNAME LENGTH MUST BE 4-20 LETTERS');
        if (!/^.{4,20}$/.test(user.passOne)) return setError('BAD PASSWORD LENGHT (4-20 LETTERS)');
        if (!/[A-Z]/.test(user.pass)) return setError('NEED ATLEAST ONE UPPERCASE LETTER');
        
        setError('');

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch("http://localhost:8060/login", options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.success) {
                    return setError('USER NOT FOUND')
                }
                if (data.user.password !== user.pass){
                    return setError('INCORECT PASSWORD');  
                } 

                disp(setMyUser(data.user))
                nav('/profile/'+data.user._id)
            }) 
    }

    return (
        <div className='mb-3'>
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
                    <Typography variant='h5' sx={{ color: 'white' }}>Welcome!</Typography>
                    <input type='text' ref={usernameRef} placeholder='enter your username'></input>
                    <input type='text' ref={passRef} placeholder='enter your password'></input>
                    {error && <div className='err'>{error}</div>}
                    <button onClick={auth}>Log In</button>
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
                    <Typography variant='subtitle' sx={{ color: 'white' }}>Lets get started</Typography>
                </Box>
            </Card>
        </div>
    )
}

export default LoginPage;
