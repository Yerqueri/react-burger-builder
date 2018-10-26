import React from 'react';
import classes from './Burger.css';
import {withRouter} from 'react-router-dom';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import PropTypes from 'prop-types';


const burger=(props)=>{
    // console.log(props);
    let transformedIngredients= Object.keys(props.ingredients).map((igkey)=>{
        return [...Array(props.ingredients[igkey])].map((_,index)=>{
            return(
                <BurgerIngredient type={igkey} key={igkey+index}/>
            );
        });
    }).reduce((arr,el)=>{
            return arr.concat(el);
        },[]
    );

    if(transformedIngredients.length===0){
        transformedIngredients=<div> Please add some ingredients here</div>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'}/>
            {transformedIngredients}
            <BurgerIngredient type={'bread-bottom'}/>
        </div>
    );
}

burger.propTypes={
    ingredients:PropTypes.object.isRequired,
}

export default withRouter(burger);