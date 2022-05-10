import React, { useContext, useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import CardMui from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import UserContext from '../../contexts/userContext';
import PostContext from '../../contexts/postContext';
import CardContext from '../../contexts/cardContext';
import ModalContext from "../../contexts/modalContext";
import TagsContext from '../../contexts/tagsContext';

import { useApi } from '../../hooks/useApi';

import './index.css';


export const Card = ({ itemPost, isInFavorites, setFavorites }) => {
   const api = useApi();
   const navigate = useNavigate();
   const { setTags } = useContext(TagsContext);
   const [open, setOpen] = useState(false);

   const { user } = useContext(UserContext);
   const { setPostList, setPostListFull } = useContext(PostContext);
   const { modalState, setModalState } = useContext(ModalContext);
   const { setCard } = useContext(CardContext);

   const { writeLS, removeLS } = useLocalStorage();



   const [anchorEl, setAnchorEl] = useState(null);
   const openIconMenu = Boolean(anchorEl);
   const handleClickIcon = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleCloseMenu = () => {
     setAnchorEl(null);
   };

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   let isAuthor = false;
   if (itemPost.author !== null) {
      
      if (itemPost.author._id == user._id) {
         isAuthor = true;
      }
   }

   const likesCount = itemPost.likes
   const commentCount = itemPost.comments

   const addFavorite = () => {
      writeLS('favorites', itemPost._id);
      setFavorites((prevState) => [...prevState, itemPost._id])
      api.addLike(itemPost._id)
         .then((addedItem) => {
            setModalState(() => {
               console.log('----->');
               return { isOpen: true, msg: `"${addedItem.title}" добавлен в избраное`, }
            })
         })
         .catch(() => {
            setModalState(() => {
               return { isOpen: true, msg: `не удалось добавить в избранное "${addedItem.title}"`, }
            })
         });
   }


   const removeFavorite = () => {
      removeLS('favorites', itemPost._id);
      setFavorites((prevState) => prevState.filter((itemID) => itemPost._id !== itemID))
      api.deleteLike(itemPost._id)
         .then((removedItem) => {
            setModalState(() => {
               return { isOpen: true, msg: `"${removedItem.title}" удален из избраного`, }
            });
         })
         .catch(() => {
            setModalState(() => {
               return { isOpen: true, msg: `не удалось удалить из изборанного "${removedItem.title}" `, }
            });
         });
   }

   const removePost = () => {
      setPostList((prevState) => prevState.filter((item) => itemPost._id !== item._id));
      setPostListFull((prevState) => prevState.filter((item) => itemPost._id !== item._id));
      api.deletePost(itemPost._id);
      setOpen(false);

   };

   return (
      

         <CardMui sx={{ maxWidth: 400, minWidth: 400 }} className='post_card' >
           
            <CardHeader 
               
               avatar={
                  <Avatar
                     sx={{ bgcolor: red[500] }}
                     aria-label="recipe"
                     src={itemPost.author ? itemPost.author.avatar : ''} />
               }
               title={itemPost.author.name}
               subheader={itemPost.author.about}
               

               action ={
                     <IconButton 
                      aria-label="settings"
                      id="long-button"
                      aria-controls={openIconMenu ? 'long-menu' : undefined}
                      aria-expanded={openIconMenu ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClickIcon}
                      >
                     {isAuthor? ( <MoreVertIcon />) : ('')}
                   </IconButton>
                   }
                  
            />

            <CardMedia
               onClick={() => navigate(`posts/${itemPost._id}`)}
               component="img"
               height="194"
               image={itemPost.image}
               alt="Paella dish"
            />
            <CardContent className='card_content' onClick={() => navigate(`posts/${itemPost._id}`)}>
               <Typography variant="h6" className='thypografy1'>
                  {itemPost.title}
               </Typography>
            </CardContent>
            <CardContent className='card_text' onClick={() => navigate(`posts/${itemPost._id}`)}>
               <Typography paragraph className='thypografy'>
                  {itemPost.text}
               </Typography>
               <Typography color="text.secondary">{dayjs(itemPost.created_at).format('MMMM D, YYYY')}</Typography>
               
            </CardContent>

            <CardContent>
            {itemPost.tags.map((item, index) => 
               <Button onClick={() => {
                  navigate('/tags');
                  setTags(item)
               }} key={index}>
                  <Typography variant="OVERLINE" paragraph>
                     {'#'+item}
                  </Typography>
               </Button>)}
           </CardContent>



            <CardActions disableSpacing className='like'>
               {isInFavorites ? (
                  <IconButton aria-label="add to favorites" size="small" onClick={removeFavorite}>
                     <FavoriteIcon color="error" />
                     {likesCount.length}
                  </IconButton>
               ) : (
                  <IconButton aria-label="add to favorites" size="small" onClick={addFavorite}>
                     <FavoriteBorderOutlinedIcon />
                     {likesCount.length}
                  </IconButton>
               )}
               
               <ModeCommentOutlinedIcon className='icon' color="action"/>
               {commentCount.length}
               
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
            <Menu
            id="menu"
            MenuListProps={{
             'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={openIconMenu}
            onClose={handleCloseMenu}
            PaperProps={{
                style: {
                maxHeight: 48 * 4.5,
               width: '20ch',
             },
             }}
            >
          
          <MenuItem key='del' onClick={handleClickOpen}>Удалить</MenuItem>
          <MenuItem key='edit' onClick={() => {
                     navigate(`/posts/edit/${itemPost._id}`)
                     return setCard(itemPost)
                  }}>Редактировать</MenuItem>
          
              
          
       
         </Menu>
           
         </CardMui>

   );
};
