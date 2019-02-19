import React,{Component} from 'react';
import Order from '../../Components/Order/Order'
import axiosOrders from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actionIndex';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component{

    componentDidMount=()=>{
        this.props.onFetchOrderRequest(this.props.token,this.props.userId);
    };
    render() {
        console.log(this.props.orders);
        let orderList =this.props.orders.map(order=>(
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}
            />
        ));
        if(this.props.loading){
            orderList=<Spinner/>;
        }
        return (
            <div style={{marginTop:'80px'}}>
                {orderList}
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        orders:state.orderState.orders,
        loading:state.orderState.loading,
        token:state.auth.token,
        userId:state.auth.userId,
    }
};

const mapDispatchToProps=(dispatch)=>{
    return{
        onFetchOrderRequest:(token,userId)=>dispatch(actionTypes.fetchOrders(token,userId)),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axiosOrders));