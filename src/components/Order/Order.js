import React from 'react';
import classes from './Order.css';

const order = (props) => {

    // ingredients in props is coming through as an object, need array of objects
    const ingredientsArr = [];
    for (let ingredientName in props.ingredients) {
        ingredientsArr.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredientsArr.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <b>${props.price.toFixed(2)}</b></p>
        </div>
    );
}

export default order;