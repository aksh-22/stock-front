import React from 'react';
import classes from './Header.module.css';

function Header() {
	return (
		<div className={classes.header}>
			<p>
				Quikie <span>Apps</span>
			</p>
		</div>
	);
}

export default Header;
