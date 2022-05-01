import React, { useContext } from 'react';
import { Card } from '../Card';
import UserContext from '../../contexts/userContext';
import PostContext from '../../contexts/postContext';
import './index.css';

export const List = ({ setFavorites }) => {

    const {user} = useContext(UserContext);
    const {postList} = useContext(PostContext);
   
    return (
        <div className="cards">
            {postList?.map((item) => (
                <Card itemPost={item} key={item._id}
                    isInFavorites={item.likes.includes(user._id)}
                    setFavorites={setFavorites}
                    
                />
            ))}
        </div>
    );
};
