import React, { useState } from 'react';
import classes from './Hero.module.css';
import amazon_logo from '../../Assets/AMZN.svg';
import google_logo from '../../Assets/GOOGL.png';
import fb_logo from '../../Assets/FB.png';
import Card from '../UI/Card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const cardData = [
	{ id: 'google', name: 'GOOGLE', logo: google_logo, price: 1515 },
	{ id: 'fb', name: 'FB', logo: fb_logo, price: 266 },
	{ id: 'amzn', name: 'AMZN', logo: amazon_logo, price: 3116 }
];

const Hero = () => {

	const [cards, setCards] = useState(cardData)

	const onDragEndHandler = (result) => {
		if (!result.destination) {
			return
		}
		// console.log(result)
		const items = Array.from(cards)
		const reOrderedItems = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reOrderedItems[0])
		// console.log(reOrderedItems[0])
		setCards(items)
		// console.log(items)
	}

	return (
		<DragDropContext onDragEnd={onDragEndHandler}>
			<Droppable droppableId='card' direction='horizontal'>
				{(provided) => (
					<ul
						className={classes.hero}
						{...provided.droppableProps}
						ref={provided.innerRef}
						provided={provided}
					>
						{cards.map((li, index) => {
							return (
								<Draggable key={li.id} draggableId={li.id} index={index}>
									{(provided) => (
										<li {...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}>
											<Card
												name={li.name}
												logo={li.logo}
												price={li.price}
											/>
										</li>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default Hero;