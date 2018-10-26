import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muitheme from '../Assets/muitheme';
import {Route,Switch} from 'react-router-dom';
import classes from './App.css';
import Layout from '../hoc/Layout/Layout'
import Checkout from './Checkout/Checkout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Orders from './Orders/Orders'
import Auth from'../Containers/Auth/Auth'

class App extends Component {
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
                                <Route path={'/'} exact component={BurgerBuilder}/>
                            </Switch>
                        </div>
                    </Layout>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
