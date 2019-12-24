import React from 'react'

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
    <ul className={classes.NavigationItems}>
        {/*active - such syntax works for boolean*/}
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {
            props.isAuthenticated ?
                <NavigationItem link='/orders'>Orders</NavigationItem> :
                null
        }
        {
            props.isAuthenticated ?
            <NavigationItem link='/logout'>Logout</NavigationItem> :
            <NavigationItem link='/auth'>Authenticate</NavigationItem>
        }
    </ul>
)

export default navigationItems