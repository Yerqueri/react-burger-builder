import React ,{Component} from 'react';
import Appbar from '../../Components/Navigation/Appbar/Appbar';
import {connect} from 'react-redux';

import classes from './Layout.css'
import Aux from '../Auxiliary/Auxiliary';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    constructor(props){
        super(props);
        this.state={
            showSideDrawer:false,
        }
    }

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    };
    toggleSideDrawer=()=>{
        this.setState({showSideDrawer:!this.state.showSideDrawer});
    };

    render(){
        return(
            <Aux>
                <Appbar
                    clicked={this.toggleSideDrawer}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <SideDrawer
                    clicked={this.sideDrawerClosedHandler}
                    sideDrawerState={this.state.showSideDrawer}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:state.auth.token != null,
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{

    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Layout);