import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import styleClasses from './Appbar.css';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
};

function ButtonAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="fixed" style={{zIndex:498}} color="primary">
                <Toolbar>
                    <div className={styleClasses.menuButton}>
                        <IconButton  color="inherit" aria-label="Menu" onClick={props.clicked}>
                            <MenuIcon/>
                        </IconButton>
                    </div>
                    <IconButton>
                        <Logo height={"40px"}/>
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        <span>Burger Builder</span>
                    </Typography>
                    <nav className={styleClasses.MobileOnly}>
                        <NavigationItems isAuthenticated={props.isAuthenticated}/>
                    </nav>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);