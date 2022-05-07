import React, { useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import UserContext from '../../contexts/userContext';
import ModalContext from '../../contexts/modalContext';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ModalUser } from '../ModalUser';

import './index.css';

export const AboutMe = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    handleClose();
    setOpenModal(true);
  }
  const handleCloseModal = () => setOpenModal(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {user} = useContext(UserContext);
  
  
 


  return (
    <ModalContext.Provider value={{openModal, setOpenModal}}>
    <div className='about'>
       { <Avatar src={user.avatar} /> }
       <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {user.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenModal}>Мой профиль</MenuItem>
        <MenuItem onClick={handleClose}>Выйти</MenuItem>
      </Menu>
        
      <ModalUser />

    </div>
    </ModalContext.Provider>
  )
}
