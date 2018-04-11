import React, {Component} from 'react';

import classes from './Modal.css';
import AuxHoc from '../../../hoc/AuxHoc';
import Backdrop from '../Backdrop/Backdrop';

// turning modal into class component to access LifeCycle Hooks - don't need to re-render the 
// modal window each time a change is made

class Modal extends Component {

    // only update modal if it has to - performance upgrade
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    //componentWillUpdate() {
    //    console.log('[Modal] WillUpdate');
    //}

    render() {
        return(
            <AuxHoc>
                <Backdrop show={this.props.show} click={this.props.modalClosed} />
                <div 
                    className={classes.Modal} 
                    style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.show ? '1' : '0'}}>
                    {this.props.children}
                </div>
            </AuxHoc>
        );
    }
}

export default Modal;