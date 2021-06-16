import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

function Header() {
	return (
		<div className={classes.header}>
			<p>
				Quikie <span>Apps</span>
			</p>
			<div className={classes.nav}>
				<NavLink to='/home' activeClassName={classes.active}>Home</NavLink>
				<NavLink to='/view' activeClassName={classes.active}>Collection</NavLink>
			</div>
		</div>
	);
}

export default Header;
