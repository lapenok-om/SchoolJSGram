import React from "react";
import "./index.css";
import logo from "../../../public/assets/svg/logo.png";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
	const navigate = useNavigate();
	return (
		<div className="logo">
            
			<img src={logo} alt="logo" className="logo_header"/>
            <Link underline="hover" component="button" onClick={() => navigate('/')} >React Project</Link>
		</div>
	);
};

export default Logo;