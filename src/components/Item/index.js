import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import api from '../../utils/Api';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import dayjs from 'dayjs';


export const Item = () => {
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const params = useParams();
    const authorAvatar = '';


    useEffect(() => {
        api.getPosts(params.itemID).
        then((data) => setItem(data));

    }, []);
    

    const getInfo = (Id) => {
      api.getInfoAuthorComment(Id)
      .then((data) => authorAvatar=data.avatar)

    }
   
  return (
    <Container maxWidth="1000">
      <div>
        <Button variant="contained"  style={{marginBottom: '40px'}} onClick={() => navigate('/')} >Назад</Button>
      </div>
      
      <Paper elevation={2}>
      {item && 
      <Grid container alignItems="flex-start" style={{ backgroundColor: 'GhostWhite', minHeight: '50vh', padding:'20px' }}  >
        <Grid container  item xs={6} spacing={2}>
          <Grid item  xs={12} >
          
            <img
                  src={`${item.image}?w=162&auto=format`}
                  srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                  alt={item.title}
                
                  style={{
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    display: 'block',
                    maxHeight: 330,
                    maxWidth: 330,
                  }} />
              
            
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={2}>
            <Avatar alt="author" src={item.author!==null && item.author.avatar!==null ? item.author.avatar : ''}/>
            </Grid>
            <Grid container item direction="column" xs={10} >
            <Grid item >
            <Typography>{item.author?.name}</Typography>
            </Grid>
            <Grid item>
            <Typography>{item.author?.email}</Typography>
            </Grid>
            <Grid item>
            <Typography color="text.secondary">{dayjs(item.created_at).format('MMMM D, YYYY')}</Typography>
            </Grid>
            </Grid>
            
          </Grid>
        </Grid>
        
      <Grid item xs={6}>
        <Typography variant="h4">{item.title}</Typography>
        <Typography variant="body1" gutterBottom>{item.text}</Typography>
        
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
        {item.comments?.map((comment, i) => (
          <>
          <ListItem alignItems="flex-start" >
          <ListItemAvatar>
            <Avatar alt={i} src={getInfo(comment.author)} />
          </ListItemAvatar>
          <ListItemText s
          primary={comment.text}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ mt: 3 }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
      
               {dayjs(comment.created_at).format('MMMM D, YYYY')}
              </Typography>
         
            </React.Fragment>
          }
          
          
          />
         </ListItem>
          <Divider variant="inset" component="li" />
          </>
        ))}
        
        </List>
        
        

        
      </Grid>
      
      
    </Grid>    
      
      
      }
      </Paper>
     
     </Container>
  );
};
