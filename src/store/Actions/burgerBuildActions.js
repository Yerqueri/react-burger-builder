import * as actionTypes from '../actionTypes';
import axiosOrder from "../../axios-orders";

export const addIngredient=(ingredientName)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:ingredientName,
    }
};

export const removeIngredient=(ingredientName)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingredientName,
    }
};

const setIngredients=(ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients,
    }
};

const fetchIngredientsFailed=()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
    }
};

export const initIngredients=()=>{
    return (dispatch)=>{
        axiosOrder.get('ingredients.json')
            .then(response=>{
                //console.log(response);
                dispatch(setIngredients(response.data));
            }).catch(error=>{
            dispatch(fetchIngredientsFailed());
        })
    }
};