import React from 'react';
import style from './style.module.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { AboutMe } from '../AboutMe';


import Logo from '../Logo';

export const Header = () => {
    const navigate = useNavigate();
    
      return (
        <div className={style.header}>
            <div className="container">
                <div className={style.header__wrapper}>
                    <div><Logo /></div>
                    <div><AboutMe /></div>
                    <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" component="button" onClick={() => navigate('/')} >
                        Главная
                        </Link>
                        <Link underline="hover" component="button" onClick={() => navigate('/favourite')}>
                        Избранное
                        </Link>
                        <Link underline="hover" href="https://github.com/lapenok-om/SchoolProject">
                        GitHub
                        </Link>
                    </Breadcrumbs>
                           
                    </div>
                </div>
            </div>
        </div>
    );
};
