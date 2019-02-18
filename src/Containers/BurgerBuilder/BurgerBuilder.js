import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Card from 'material-ui/Card';
import classes from './BurgerBuilder.css'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummay from '../../Components/Burger/OrderSummary/OrderSummary'
import axiosOrder from '../../axios-orders';
import withfErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../Components/UI/Spinner/Spinner'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionIndex'

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state={
            purchasable:false,
            totalPrice:4,
            purchasing:false,
            loading:false,
        };
    }

    updatePurchaseState=(updatedIngredients)=>{
        const ingredients={
            ...updatedIngredients
        };
        const sum =Object.keys(ingredients).map(igkey=>ingredients[igkey]).reduce((sum,el)=>{
                return sum+el;
            },0
        );
        return sum>0;
    };

    purchaseHandler=()=>{
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };
    purchaseCancelHandler=()=>(this.setState({purchasing:false}));
    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push({
            pathname:'/checkout/',
        });
    };

    componentDidMount =()=>{
        this.props.onInitIngredient();
    };

    render(){
        // console.log(this.props);
        const disabledInfo={
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0;
        }
        let orderSummary =null;
        let burgerData=(this.props.error ? <p style={{marginTop:'60vh',paddingRight:'30%'}}> there was a trouble connecting to server<br/> Please try again after some time</p> :<div style={{marginTop:'50vh',paddingRight:'30%'}}><Spinner/></div>);
        if(this.props.ings){
            burgerData =(
                <Aux>
                    <Card className={classes.CardProperties} style={{marginTop:80+'px'}} elevation={10}>
                        <Burger ingredients={this.props.ings}/>
                    </Card>
                    <Card className={classes.CardProperties} elevation={10}>
                        <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            currentPrice={this.props.price}
                            disabled={disabledInfo}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}
                            isAuthenticated={this.props.isAuthenticated}
                        />
                    </Card>
                </Aux>
            );

            orderSummary = <OrderSummay
                ingredients={this.props.ings}
                totalPrice={this.props.price}
                cancelOrder={this.purchaseCancelHandler}
                aprooveOrder={this.purchaseContinueHandler}
            />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} backdropclicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerData}
            </Aux>
        );
    }
}
const  mapStateToProps=(state)=>{
    // console.log(state.ingredients);
    return{
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        onIngredientAdded:(ingredientName)=>dispatch(actionTypes.addIngredient(ingredientName)),
        onIngredientRemoved:(ingredientName)=>dispatch(actionTypes.removeIngredient(ingredientName)),
        onInitIngredient:()=>dispatch(actionTypes.initIngredients()),
        onInitPurchase:()=>dispatch(actionTypes.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actionTypes.setAuthRedirectPath(path)),
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(withfErrorHandler(BurgerBuilder,axiosOrder));