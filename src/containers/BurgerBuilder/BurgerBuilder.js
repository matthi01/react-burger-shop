import React, { Component } from 'react';
import {connect} from 'react-redux';

import AuxHoc from '../../hoc/AuxHoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index';
import axios from '../../axios-orders';


export class BurgerBuilder extends Component {

    state = {
        purchaseMode: false
    }

    //get the ingredients dynamically
    componentDidMount() {
        this.props.onInitIngredients();
    }


    purchaseContinueHandler = () => {
        this.props.onPurchaseInit(); // will set purchased state to false
        this.props.history.push('/checkout');
    }


    purchaseCancelHandler = () => {
        this.setState({purchaseMode: false});
    } 

    // if the user isn't authenticated - redirect
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchaseMode: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
        
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map((igKey) => {
            return ingredients[igKey];
        }).reduce((loopSum, el) => {
            return loopSum + el;
        }, 0);

        return sum > 0;
    }


    render () {
        // add a check to disable the Less button if ingredient already has 0
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        // getting ingredients dynamically, stop order summary from blowing up when loading the application
        let orderSummary = null;

        // running into a similar problem with the burger itself. Now grabbing the ingredients dynamically, once
        // the app loads, the ingredients are not there yet. Use spinner if ingredients haven't arrived from get request yet
        let burger = this.props.error ? <p>Ingredients can't be loaded... we're fucked!</p> : <Spinner />

        if  (this.props.ings) {
            burger =    <AuxHoc>
                            <Burger 
                                ingredients={this.props.ings} />
                            <BuildControls 
                                ingredientAdded={this.props.onAddIngredient}
                                ingredientRemoved={this.props.onRemoveIngredient}
                                disabled={disabledInfo} 
                                totalPrice={this.props.price} 
                                purchasable={this.updatePurchaseState(this.props.ings)}
                                ordered={this.purchaseHandler} 
                                isAuth={this.props.isAuthenticated} />
                        </AuxHoc>;
            
            //same goes for the order summary
            orderSummary =  <OrderSummary 
                                ingredients={this.props.ings} 
                                purchaseCanceled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                totalPrice={this.props.price}/>
        }

        return (
            <AuxHoc>
                <Modal show={this.state.purchaseMode} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </AuxHoc>
        );
    }
}

// redux functions:
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token ? true : false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => dispatch(actionCreators.addIngredient(actionTypes.ADD_INGREDIENT, ingredient)),
        onRemoveIngredient: (ingredient) => dispatch(actionCreators.removeIngredient(actionTypes.REMOVE_INGREDIENT, ingredient)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    }
}

// wrapping the export with the error handler to give the ability to show the error modal at any point
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));