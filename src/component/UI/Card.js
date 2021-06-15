import React from 'react';
import classes from './Card.module.css';

const Card = (props) => {
	return (
		<div className={classes.card}>
			<p className={classes.text}>{props.name}</p>
			<div className={classes.logo}>
				{/* <img src={google_logo} alt='amazon'></img> */}
				<img src={props.logo} alt={props.name}></img>
			</div>
			<p className={classes.price}>{props.price} USD</p>
		</div>
	);
}

export default Card;
