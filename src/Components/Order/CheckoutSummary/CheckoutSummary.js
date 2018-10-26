import React from 'react';
import Burger from '../../Burger/Burger'
import Button from 'material-ui/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary=(props)=>{
    return(
        <div className={classes.CheckoutSummary}>
        <h1>Hope it tastes well !</h1>
            <div style={{width:'100%',height:'300px',margin:'auto',alignContent:'center'}}>
                <Burger ingredients={props.ingredients}/>
                <Button variant="raised" color="primary" onClick={props.checkoutCancel} style={{margin:'0 10px',width:'50px'}}>
                    CANCEL
                </Button>
                <Button variant="raised" color="secondary" onClick={props.checkoutContinue} style={{margin:'0 10px',width:'50px'}}>
                    CONTINUE
                </Button>
            </div>
        </div>
    );
}

export default checkoutSummary;