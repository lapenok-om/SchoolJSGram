import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import UserContext from '../../contexts/userContext';

import './index.css';

export const AboutMe = () => {
  const {user} = useContext(UserContext);
  
  return (
    <div className='about'>
       { <Avatar src={user.avatar} /> }
        {user.name}
    </div>
  )
}
