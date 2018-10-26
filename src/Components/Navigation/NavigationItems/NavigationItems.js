import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
const navigationItems=()=>(
    <Auxiliary>
        <ul className={classes.NavigationItems}>
            <NavigationItem link={"/"}>Burger Builder</NavigationItem>
            <NavigationItem link={"/orders"}>Orders</NavigationItem>
            <NavigationItem link={"/Auth/"}>Login</NavigationItem>
        </ul>
    </Auxiliary>
);
export default navigationItems;