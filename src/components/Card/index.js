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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
               onClick={() => navigate(`posts/${itemPost._id}`)}
               avatar={
                  <Avatar
                     sx={{ bgcolor: red[500] }}
                     aria-label="recipe"
                     src={itemPost.author ? itemPost.author.avatar : ''} />
               }
               title={itemPost.author.name}
               subheader={itemPost.author.about}
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

               {isAuthor ? (<Button onClick={handleClickOpen}>Удалить</Button>) : ('')}
               {isAuthor ? (<Button
                  onClick={() => {
                     navigate(`/posts/edit/${itemPost._id}`)
                     return setCard(itemPost)
                  }
                  }
               >
                  Редактировать
               </Button>) : ('')}
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

            {/* <CardActions>
            <Button sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
               <Link to={`posts/${itemPost._id}`}> {itemPost.title}</Link></Button>
         </CardActions>

         <Divider />
         <CardMedia
            component="img"
            height="194"
            image={itemPost.image}
            alt="imagepost"

         />
         {<CardHeader
            avatar={<Avatar alt="Remy Sharp" src={itemPost.author ? itemPost.author.avatar : ''} />}
            title={itemPost.author ? itemPost.author.email : ''}
         />}
         <CardContent>
            <Typography variant="body2">
               {itemPost.text}

            </Typography>
            <Typography sx={{ mt: 3 }} color="text.secondary">
               {dayjs(itemPost.created_at).format('MMMM D, YYYY')}
            </Typography>

         </CardContent>
         <CardActions disableSpacing>
            {isInFavorites ? (
               <IconButton aria-label="add to favorites" onClick={removeFavorite}>
                  {likesCount.length}
                  <FavoriteIcon color="error" />
               </IconButton>
            ) :
               (
                  <IconButton aria-label="add to favorites" onClick={addFavorite}>
                     {likesCount.length}
                     <FavoriteIcon />
                  </IconButton>
               )}

            {isAuthor ? (<Button onClick={handleClickOpen}>Delete</Button>) : ('')}

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

         </CardActions> */}
         </CardMui>
   
   );
};
