import React, {Component} from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import classes from './App.css';
import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Logout from "./Auth/Logout";

import {connect} from 'react-redux';
import * as actions from '../store/actionIndex';

import asyncComponent from '../hoc/AsyncComponent/asyncComponent';

const asyncCheckout= asyncComponent(()=>{
    return import('./Checkout/Checkout');
});
const asyncOrders= asyncComponent(()=>{
    return import('./Orders/Orders');
});
const asyncAuth= asyncComponent(()=>{
    return import('./Auth/auth');
});


class App extends Component {

    componentDidMount=()=>{
        this.props.onTryAutoSignUp();
    };

    render() {
        let routes = (
            <Switch>
                <Route path={'/Auth/'} component={asyncAuth}/>
                <Route path={'/'} exact component={BurgerBuilder}/>
                <Redirect to={'/'}/>
            </Switch>
         );

        if(this.props.isAuthenticated){
            routes=(
                <Switch>
                    <Route path={'/checkout/'} component={asyncCheckout}/>
                    <Route path={'/orders/'} component={asyncOrders}/>
                    <Route path={'/Auth/'} component={asyncAuth}/>
                    <Route path={'/Logout/'} component={Logout}/>
                    <Route path={'/'} exact component={BurgerBuilder}/>
                </Switch>
            );
        }

        return(
            <div>
                <Layout>
                    <div className={classes.Burger}>
                        {routes}
                    </div>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:state.auth.token !==null,
    }
};

const mapDispatchToProps=(dispatch)=>{
    return{
        onTryAutoSignUp:()=>dispatch(actions.authCheckState()),
    }
};

export default withRouter( connect(mapStateToProps,mapDispatchToProps)(App));
