import React from 'react';
import classes from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

// keep in mind.. need to import the image instead of hard coding the path.
// this would work in development, but the structure will get messed up when the app is shipped

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} />
        </div>
    );
}

export default logo;