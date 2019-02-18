import React from 'react';
import classes from './BuildControls.css'
import  BuildControl from './BuildControl/BuildControl'
import Typography from 'material-ui/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from 'material-ui/Button';

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'},
    {label:'Cheese',type:'cheese'},
]

const buildControls=(props)=>{
    return(
        <div className={classes.BuildControls}>
            <Typography variant="display1" color='secondary' gutterBottom>Current Price: ${(props.currentPrice).toFixed(2)}</Typography>
            {controls.map((element)=>(
                <BuildControl
                    key={element.label}
                    label={element.label}
                    added={()=>props.ingredientAdded(element.type)}
                    removed={()=>props.ingredientRemoved(element.type)}
                    disabled={props.disabled[element.type]}
                />
            ))}
            <br/>
            <Button variant="raised" color="secondary" disabled={!props.purchasable} component="span" onClick={props.ordered} style={{width:200+'px'}}>
                {props.isAuthenticated ? <div>Checkout&nbsp;&nbsp;<ShoppingCartIcon/></div> : <div>Login To Checkout</div>}
            </Button>
        </div>
    );
};

export default buildControls;