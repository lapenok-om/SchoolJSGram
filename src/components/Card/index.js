import React, { useState } from 'react';

import api from '../../utils/Api';
import CardMui from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import './index.css';


export const Card = ({ itemPost, isInFavorites, setFavorites, user, setPostList }) => {

   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
       setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   let isAuthor = false;
   if(itemPost.author !== null){
      if(itemPost.author._id == user._id){
         isAuthor = true; 
      }
   }

   const likesCount = itemPost.likes

   const writeLS = (key, value) => {
      const storage = JSON.parse(localStorage.getItem(key)) || [];
      storage.push(value);
      localStorage.setItem(key, JSON.stringify(storage));
   };

   const removeLS = (key, value) => {
      const storage = JSON.parse(localStorage.getItem(key));
      const filterStorage = storage.filter((itemID) => value !==itemID);
      localStorage.setItem(key, JSON.stringify(filterStorage));
   };

   const addFavorite = () => {
      writeLS('favorites', itemPost._id);
      setFavorites((prevState) => [...prevState, itemPost._id]);
      api.addLike(itemPost._id);
      alert("Пост добавлен в избранное");
   };

   const removeFavorite = () => {
      removeLS('favorites', itemPost._id);
      setFavorites((prevState) => prevState.filter((itemID) => itemPost._id !== itemID));
      api.deleteLike(itemPost._id);
      alert("Пост удален из избранного");
   };

   const removePost = () => {
      setPostList((prevState) => prevState.filter((item) => itemPost._id !== item._id));
      api.deletePost(itemPost._id);
      setOpen(false);
           
   };

   
   return (
   <CardMui sx={{ maxWidth: 345 }}>
       <CardActions>
      <Button sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
      <Link to={`posts/${itemPost._id}`}> {itemPost.title}</Link></Button>
        
      
    </CardActions>
   
      <Divider />
      <CardMedia
        component="img"
        height="194"
        image={itemPost.image}
        alt="imagepost"
        
      />
   { <CardHeader
        avatar={<Avatar alt="Remy Sharp" src={itemPost.author? itemPost.author.avatar : ''}/>}
        title={itemPost.author? itemPost.author.email : ''}
    /> }
    <CardContent>
      <Typography variant="body2">
         {itemPost.text}
        
      </Typography>
       
           
      <Typography sx={{ mt: 3}} color="text.secondary">
      {dayjs(itemPost.created_at).format('MMMM D, YYYY')}
        </Typography>
      
      
      
      
    </CardContent>
    <CardActions disableSpacing>
       {isInFavorites ? (
          <IconButton aria-label="add to favorites" onClick={removeFavorite}>
             {likesCount.length}
          <FavoriteIcon  color="error" />
       </IconButton>
       ) : 
       (
         <IconButton aria-label="add to favorites" onClick={addFavorite}>
            {likesCount.length}
            <FavoriteIcon />
         </IconButton>
       )}

   {isAuthor? (<Button onClick={handleClickOpen}>Delete</Button>) : ('')}
    
   <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Удаление"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Вы действительно хотите удалить этот пост?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Нет</Button>
          <Button onClick={removePost} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
     
    </CardActions>
   </CardMui>

   );
};
