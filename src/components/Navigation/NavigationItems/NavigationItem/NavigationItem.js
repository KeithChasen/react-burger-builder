import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css'

const navigationItem = props => (
    <li className={classes.NavigationItem}>
        {/*
            just because react creates class names in runtime
            our .active class will be different, but we can
            force "active class name"
        */}
        <NavLink activeClassName={classes.active} to={props.link} exact={props.exact}>
            {props.children}
        </NavLink>
    </li>
)

export default navigationItem