import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
const navigationItems=(props)=>(
    <Auxiliary>
        <ul className={classes.NavigationItems}>
            <NavigationItem link={"/"}>Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link={"/orders"}>Orders</NavigationItem>:''}
            {!props.isAuthenticated ? <NavigationItem link={"/Auth/"}>Login</NavigationItem>:<NavigationItem link={"/Logout/"}>Logout</NavigationItem>}
        </ul>
    </Auxiliary>
);
export default navigationItems;