import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    // ingredients is an object
    // 1. create an array of the ingredient types
    // 2. loop through the array and for each ingredient item, create an array with as many places as there are of the 
    // given ingredient, for each of these spaces, create the ingredient.
    // * when outputting an array of components, each component needs a key!
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    });

    // reduce the array - need to check for the case if nothing is added yet
    const reducedIngredientsArr = transformedIngredients.reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (reducedIngredientsArr.length === 0) {
        transformedIngredients = "Add some ingredients!"
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;