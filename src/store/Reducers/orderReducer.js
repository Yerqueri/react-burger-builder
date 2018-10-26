import * as actionTypes from '../actionTypes';

const initialState={
    orders:[],
    loading:false,
    purchased:false
};

const orderReducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased:false,
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const order={
                ...action.orderData,
                id:action.orderId,
            };
            return {
                ...state,
                loading:false,
                orders:state.orders.concat(order),
                purchased:true,
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                loading:false,
            };
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading:true,
            };
        case actionTypes.FETCH_ORDER_START:
            return{
                ...state,
                orders:[],
                loading:true,
            };
        case actionTypes.FETCH_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                orders:state.orders.concat(action.fetchedOrders),
            };
        case actionTypes.FETCH_ORDER_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error,
            };
        default:
            return state;
    }
};

export default orderReducer;