import React from 'react';
import { Card } from '../Card';
import './index.css';

export const List = ({ list, favorites, setFavorites, user, setPostList }) => {
   
    return (
        <div className="cards">
            {list?.map((item) => (
                <Card itemPost={item} key={item._id}
                    isInFavorites={item.likes.includes(user._id)}
                    setFavorites={setFavorites}
                    user={user}
                    setPostList={setPostList}
                />
            ))}
        </div>
    );
};
