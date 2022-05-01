import React, { useEffect, useState } from 'react';

import { List } from '../List';
import { TextArea } from '../TextArea';
import Pagination from '@mui/material/Pagination';

import api from '../../utils/Api';
import './index.css';

export const Body = ( {user} ) => {
    const [postList, setPostList] = useState(null);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

    useEffect(() => {
        api.getPosts()
        .then((data) => data.sort(function(a,b){return new Date(b.created_at) - new Date(a.created_at);}))
        .then((data) => {
            setPageCount(Math.ceil(data.length / 12));
            setPostList(data.slice(12*(page - 1), 12*(page - 1) +12))});

    },[page, favorites]);


  return (
    <div>
            <TextArea />
            <div className='content__cards'>
            <List list={postList} favorites={favorites} setFavorites={setFavorites} user={user} setPostList={setPostList} />
            </div>
            <Pagination sx={{ mb: 3, mt: 3, ml: 45 }}
                    count={pageCount}
                    page={page}
                    onChange={(_,number) => setPage(number)}
                 />   


    </div>
  )
}
