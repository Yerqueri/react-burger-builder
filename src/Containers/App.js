import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muitheme from '../Assets/muitheme';
import {Route,Switch} from 'react-router-dom';
import classes from './App.css';
import Layout from '../hoc/Layout/Layout'
import Checkout from './Checkout/Checkout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Orders from './Orders/Orders'
import Auth from './Auth/auth'
import Logout from "./Auth/Logout";

import {connect} from 'react-redux';
import * as actions from '../store/actionIndex';

class App extends Component {

     // componentDidMount=()=>{
     //    this.props.onTryAutoSignUp();
     // };

    render() {
        return(
            <div>
                <MuiThemeProvider theme={muitheme}>
                    <Layout>
                        <div className={classes.Burger}>
                            <Switch>
                                <Route path={'/checkout/'} component={Checkout}/>
                                <Route path={'/orders/'} component={Orders}/>
                                <Route path={'/Auth/'} component={Auth}/>
                                <Route path={'/Logout/'} component={Logout}/>
                                <Route path={'/'} exact component={BurgerBuilder}/>
                            </Switch>
                        </div>
                    </Layout>
                </MuiThemeProvider>
            </div>
        );
    }
}

// const mapDispatchToProps=(dispatch)=>{
//     return{
//         onTryAutoSignUp:()=>dispatch(actions.authCheckState()),
//     }
// };

export default App;
