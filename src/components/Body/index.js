import React, { useEffect, useState, useContext } from 'react';

import { List } from '../List';
import { TextArea } from '../TextArea';
import Pagination from '@mui/material/Pagination';
import PostContext from '../../contexts/postContext';
import UserContext from '../../contexts/userContext';
import { Routes, Route} from "react-router-dom";
import api from '../../utils/Api';
import './index.css';

export const Body = () => {
    const [postList, setPostList] = useState(null);
    const [postListFull, setPostListFull] = useState(null);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const {user} = useContext(UserContext);

    useEffect(() => {
        api.getPosts()
        .then((data) => data.sort(function(a,b){return new Date(b.created_at) - new Date(a.created_at);}))
        .then((data) => {
            setPageCount(Math.ceil(data.length / 12));
            setPostList(data.slice(12*(page - 1), 12*(page - 1) +12))});

    },[page, favorites]);

    useEffect(() => {
      api.getPosts()
      .then((data) => data.sort(function(a,b){return new Date(b.created_at) - new Date(a.created_at);}))
      .then((data) => {setPostListFull(data)});

  },[favorites]);


  return (
    <PostContext.Provider value={{postList, setPostList, setPostListFull}}>
      <Routes>

        <Route path="/" element={
          <div>
            
          <TextArea />
          <div className='content__cards'>
          <List setFavorites={setFavorites} postList={postList} />
          </div>
          <Pagination sx={{ mb: 3, mt: 3, ml: 45 }}
                  count={pageCount}
                  page={page}
                  onChange={(_,number) => setPage(number)}
               />   


          </div>
        }/>
        <Route path="favourite" element={
          <>
          <div className='textarea_favourite'>
            <h2 className='text'>Понравившиеся посты</h2>
          </div>
          <div className='content__cards'>
          <List setFavorites={setFavorites} postList={postListFull?.filter((item) => (item.likes.includes(user._id)))} />
          </div>
          </>
        } />
        
    </Routes>
    </PostContext.Provider>
  )
}
