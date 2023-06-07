import React, { useEffect } from 'react'
import SingleUser from '../components/SingleUser';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../features/data';

const UsersPage = () => {
  const disp = useDispatch()
  const users = useSelector(store => store.data.value.users)
  const myUser = useSelector(store => store.data.value.myUser)

  useEffect(() => {
    if(!myUser) return
    fetch("http://localhost:8060/getUsers")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const filteredUsers = data.users.filter(x => x.username !== myUser.username)
        disp(setUsers(filteredUsers))
      })

  }, [])

  return (
    <div className='row'>
        {users.map((x, i) => <SingleUser user={x} key={i} />)}
    </div>
  )
}

export default UsersPage;