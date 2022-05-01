import React from 'react';
import style from './style.module.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { AboutMe } from '../AboutMe';


import Logo from '../Logo';

export const Header = () => {
    
      return (
        <div className={style.header}>
            <div className="container">
                <div className={style.header__wrapper}>
                    <div><Logo /></div>
                    <div><AboutMe /></div>
                    <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" href="/">
                        Home
                        </Link>
                        <Link underline="hover" href="https://github.com/lapenok-om/ProjectPost">
                        GitHub
                        </Link>
                    </Breadcrumbs>
                           
                    </div>
                </div>
            </div>
        </div>
    );
};
