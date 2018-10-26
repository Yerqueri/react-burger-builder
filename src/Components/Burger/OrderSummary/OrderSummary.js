import React from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const orderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingredients).map((igkey)=>{
        return(
            <Aux key={igkey}>
                <tr>
                    <td style={{width:100+'px',textAlign:'right'}}>
                        <span style={{textTransform:'capitalize'}}>{igkey}</span>
                    </td>
                    <td>
                        :{props.ingredients[igkey]}
                    </td>
                </tr>
            </Aux>
        );
    });
    return(
        <Aux>
            <Typography variant="title" gutterBottom>
                Your Burger
            </Typography>
            <Typography variant="body2" gutterBottom>
                A delicious burger with following ingredients:
            </Typography>
            <table >
                <tbody>
                {ingredientSummary}
                </tbody>
            </table>
            <p>Your burger costs <strong>${props.totalPrice.toFixed(2)}</strong>. Continue to checkout ?</p>
            <Button variant="fab" color="primary" aria-label="add" onClick={props.aprooveOrder}>
                <DoneIcon />
            </Button> &nbsp;&nbsp;
            <Button variant="fab" color="secondary" aria-label="add" onClick={props.cancelOrder}>
                <ClearIcon />
            </Button>
        </Aux>
    );
}
export default orderSummary;