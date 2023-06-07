import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Toolbar = () => {
  const user = useSelector(store => store.data.value.profile)
  
  return (
    <div className='toolbar'>
      <div>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Log in</Link>
        {user && <Link to={`/profile/${user._id}`}>Profile</Link>}
        {user && <Link to="/allusers">All Users</Link>}
        {user && <Link to="/conversations">Conversations</Link>}
        {/* <Link to="/posts">POSTS</Link> */}
      </div>
      <div className='toolbar-user'>
        {user && <img className='toolbar-img' src={user.image} alt='' />}
        <div>{user?.username}</div>
        
      </div>

    </div>
  )
}

export default Toolbar;