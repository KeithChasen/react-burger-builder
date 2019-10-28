import React, { Component } from 'react'

import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        //Modal wraps Order summary
        //so in case Order summary is not shown
        // not to let it be rerendered
        // any time some state value changed such as price or ingredient
        //we need to check its show property
        // so basically in this case:
        // currently show is FALSE and next show is true
        return nextProps.show !== this.props.show ||
            // if we change order summary to spinner while sending data to server
            // we should check it as well
            nextProps.children !== this.props.children
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Modal] DidUpdate')
    }

    render() {
        return (
            <Aux>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div className={classes.Modal} style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}



export default Modal
