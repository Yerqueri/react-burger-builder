import * as actionTypes from '../actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSucess =(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData,
    }
};

const purchaseBurgerFailed=(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error,
    }
};

const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger=(orderData,token)=>{
    console.log("inside purchase burger action creator");
    return (dispatch)=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
            .then(response=>{
                console.log(response);
                dispatch(purchaseBurgerSucess(response.data.name,orderData));
            }).catch(error=>{
                console.log(error);
                dispatch(purchaseBurgerFailed(error));
            });
    };
};

export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT,
    }
};

const fetchOrderSuccess=(fetchedOrders)=>{
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        fetchedOrders:fetchedOrders,
    }
};

const fetchedOrderFailed=(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAILED,
        error:error
    }
};

export const fetchOrdersStart=()=>{
    return{
        type:actionTypes.FETCH_ORDER_START,
    }
};

export const fetchOrders=(token,userId)=>{
    let fetchedOrders=[];
    return (dispatch)=>{
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId+'"')
            .then(res=>{
                for(let key in res.data){
                    fetchedOrders.push({...res.data[key],id:key});
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(err=>{
                dispatch(fetchedOrderFailed(err));
            })
    }
};