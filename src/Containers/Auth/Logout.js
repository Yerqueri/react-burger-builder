import React , {Component} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionIndex';
import {Redirect} from 'react-router-dom';

class Logout extends Component{
    componentDidMount=()=>{
        this.props.onLogOut();
    };

    render() {
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onLogOut : ()=>dispatch(actionTypes.logOut()),
    };
};

export default connect(null,mapDispatchToProps)(Logout);