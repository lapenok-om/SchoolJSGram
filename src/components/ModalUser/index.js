import React, { useContext, useState } from 'react'
import ModalContext from '../../contexts/modalContext';
import UserContext from '../../contexts/userContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';

import { useApi } from '../../hooks/useApi';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalUser = () => {
  const api = useApi();
  const { openModal, setOpenModal } = useContext(ModalContext);
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [about, setAbout] = useState(user.about);

  const handleClose = () => setOpenModal(false);

  const handleChangeAvatar = (event) => {
    setAvatar(event.target.value);
    
  };

  const changeProfile = (event) => {
    event.preventDefault();

    const {
      target: { name, about, avatar },
    } = event;

    api.changeAvatar(avatar.value);
    api.changeProfile(name.value, about.value).
      then(() => api.getMyInfo()).
      then(data => setUser(data));

    handleClose();
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={changeProfile}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Данные профиля
                </Typography>
              </Grid>
              <Grid item xs={10}>
               <TextField fullWidth label='Аватар' name="avatar" variant='outlined' required defaultValue={user.avatar} onInput={handleChangeAvatar}/>
              </Grid>
              <Grid item xs={2}>
                <Avatar alt="author" src={`${avatar}`} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Имя' name="name" variant='outlined' required defaultValue={user.name} value={name} />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label='Обо мне' name="about" variant='outlined' required defaultValue={user.about} value={about} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='e-mail'
                  variant='outlined'
                  InputProps={{
                    readOnly: true,
                  }}
                  value={user.email}
                />
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" onClick={handleClose}>OK</Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" type='submit'>Изменить</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
