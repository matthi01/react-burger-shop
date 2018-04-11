import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

// instead of hard-coding the controls - create an array of available controls
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <b>{props.totalPrice.toFixed(2)}</b></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)} 
                    disabled={props.disabled[ctrl.type]} />
            ))}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    );
};

export default buildControls;