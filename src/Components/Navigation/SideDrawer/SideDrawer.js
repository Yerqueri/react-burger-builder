import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './SideDrawer.css';
const sideDrawer =(props)=>{
    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.sideDrawerState){
        attachedClasses =[classes.SideDrawer ,classes.Open];
    }
    return(
        <Auxiliary>
            <BackDrop show={props.sideDrawerState} clicked={props.clicked}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated}/>
                </nav>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;