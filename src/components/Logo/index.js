import React from "react";
import "./index.css";
import logo from "../../../public/assets/svg/logo.png";

const Logo = () => {
	return (
		<div className="logo">
            
			<img src={logo} alt="logo" className="logo_header"/>
            React Project
		</div>
	);
};

export default Logo;