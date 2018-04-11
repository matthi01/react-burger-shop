import React from 'react';

import AuxHoc from '../../../hoc/AuxHoc';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return  <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
    });
    return (
        <AuxHoc>
            <h3>Your Order</h3>
            <p>Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><b>Total Price: {props.totalPrice.toFixed(2)}</b></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </AuxHoc>
    );
}

export default orderSummary;