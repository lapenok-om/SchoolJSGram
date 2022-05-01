import React from 'react'
import Avatar from '@mui/material/Avatar';

import './index.css';

export const AboutMe = ({userInfo}) => {
  return (
    <div className='about'>
       { <Avatar src={userInfo.avatar} /> }
        {userInfo.name}
    </div>
  )
}
