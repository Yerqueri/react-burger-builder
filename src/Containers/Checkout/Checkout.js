import React , {Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';
import Card from 'material-ui/Card';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{
    state={
        enableForm:false,
    };

    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    };

    checkoutContinueHandler=()=>{
        this.setState({enableForm:true})
        this.props.history.replace('/checkout/contact-data/');
    };

    render(){
        console.log(this.props);
        let summary=<Redirect to={"/"}/>;
        let form =(
            <Card raised elevation={10} className={classes.CardProperties}>
                <Route path={this.props.match.path + 'contact-data/'}
                       component={ContactData}
                />
            </Card>
        );
        if(!this.state.enableForm){
            form=null
        }
        if(this.props.ings){
            const purchasedRedirect=this.props.purchased ?<Redirect to={"/"}/>:null
            summary=<div style={{marginTop:'80px'}}>
                {purchasedRedirect}
                <Card raised elevation={10} className={classes.CardProperties}>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancel={this.checkoutCancelledHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                    />
                </Card>
                {form}
            </div>;
        }
        return summary;
    }
}

const mapStateToProps=(state)=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        purchased:state.orderState.purchased,
    }
};
export default connect(mapStateToProps,null)(Checkout);