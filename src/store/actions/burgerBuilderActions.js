// action creators for building the burger - adding and removing ingredients

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (type, ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredientName: ingredient
    };
};

export const removeIngredient = (type, ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientName: ingredient
    };
};

// action creator used by initIngredients once the async code has been executed
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
};

// use redux-thunk to execute async. code via new action creator
export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
};