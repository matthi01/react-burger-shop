import React, { Component } from 'react';
import {connect} from 'react-redux';

import AuxHoc from '../../hoc/AuxHoc';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

// going to turn the layout component into a class (stateful) component to be able to handle the
// click events for the Toolbar and SideDrawer
class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        //in the setState method, don't refer to state again - asynchronous, might cause out of date issues
        //this.setState({showSideDrawer: !this.state.showSideDrawer});
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
        return (
            <AuxHoc>
                <Toolbar 
                    isAuth={this.props.isAuthenticated} 
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </AuxHoc>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token ? true : false
    };
};

export default connect(mapStateToProps)(Layout);