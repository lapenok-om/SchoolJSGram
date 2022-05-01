import React, { useEffect, useState } from 'react';

import api from './utils/Api';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Body } from './components/Body';
import { Item } from './components/Item';
import { CreatePost } from './components/CreatePost';
import { Routes, Route, Link } from "react-router-dom";

import './index.css';


export const App = () => { 
   
    const [user, setUser] = useState("?");

    useEffect(() => {
        api.getMyInfo()
        .then(data => setUser(data));

    },[]);
    
   
    return (
        
        <div className='appContainer'>
                <Header user={user} />
            
            <div className='content container '>
            <Routes>

                <Route path="/" element={<Body user={user}/>}/>
                <Route path="posts/:itemID" element={<Item />} />
                <Route path="posts/create" element={<CreatePost />} />
            </Routes>
            </div> 
              <Footer />
         </div>
    );
};
