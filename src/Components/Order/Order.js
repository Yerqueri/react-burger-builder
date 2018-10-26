import React from 'react'
import classes from './Order.css'
import Card from 'material-ui/Card';

const order =(props)=>{
    const ingredients =[]
    for(let ingredientName in props.ingredients){
        ingredients.push({name:ingredientName,amount:props.ingredients[ingredientName]})
    }
    const ingredientOutput = ingredients.map(ingredient=>{
        return <span
            style={{textTransform:'capitalize',display:'inline-block',margin:'0 4px',border:'1px solid #ccc',padding:'5px',width:'80px'}}
                key={ingredient.name}>
                {ingredient.name} ({ingredient.amount})
            </span>;
    })
    return(
        <Card raised elevation={10} className={classes.CardProperties}>
            <div className={classes.Order}>
                <p>Ingredients:{ingredientOutput}</p>
                <p>price:<strong>$ {props.price.toFixed(2)}</strong></p>
            </div>
        </Card>
    );
};

export default order;