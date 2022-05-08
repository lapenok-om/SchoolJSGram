import React, { useEffect, useState } from 'react';

import { useApi } from './hooks/useApi';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Body } from './components/Body';
import { Item } from './components/Item';
import { CreatePost } from './components/CreatePost';

import CustomModal from './components/CustomModal';
import { EditPost } from './components/EditPost';


import { Routes, Route, Link } from "react-router-dom";
import UserContext from './contexts/userContext';
import ModalContext from './contexts/modalContext';
import FormModalContext from './contexts/formModalContext';
import CardContext from './contexts/cardContext';
import FormModal from './components/FormModal';


import './index.css';
;


export const App = () => {
    const api = useApi();
    const [user, setUser] = useState("?");
    const [modalState, setModalState] = useState({ isOpen: false, msg: null, });
    const [modalFormState, setModalFormState] = useState({ isOpen: false, msg: null, });
    const [card, setCard] = useState(null);

    useEffect(() => {
        api.getMyInfo()
            .then(data => setUser(data));

    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }} >
            <ModalContext.Provider value={{ modalState, setModalState }}>
                <FormModalContext.Provider value={{ modalFormState, setModalFormState }}>
                   <CardContext.Provider value={{card, setCard}}>
                    <div className='appContainer'>
                        <Header />
                        <FormModal/>
                        <CustomModal/>
                        <div className='content container '>
                            <Routes>

                                <Route path="*" element={<Body />} />
                                <Route path="posts/:itemID" element={<Item />} />
                                <Route path="favourite/posts/:itemID" element={<Item />} />
                                <Route path="myPosts/posts/:itemID" element={<Item />} />
                                <Route path="posts/create" element={<CreatePost />} />
                                <Route path="posts/edit/:itemID" element={<EditPost />} />

                            </Routes>
                        </div>
                        <Footer />
                    </div>
                    </CardContext.Provider>
                </FormModalContext.Provider>
            </ModalContext.Provider>
        </UserContext.Provider>
    );
};
