import React ,{Component} from 'react';
import Button from 'material-ui/Button';
import classes from './ContactData.css';
import axiosOrder from '../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actionIndex';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';


class ContactData extends Component{
    constructor(props){
        super(props);
        this.state={
            orderForm:{
                name: {
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name',
                    },
                    value:'',
                    validation:{
                        required:true,
                    },
                    valid:false,
                    touched:false,
                },
                street:{
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street Name',
                    },
                    value:'',
                    validation:{
                        required:true,
                    },
                    valid:false,
                    touched:false,
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Zip Code',
                    },
                    value:'',
                    validation:{
                        required:true,
                    },
                    valid:false,
                    touched:false,
                },
                country:{
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Country',
                    },
                    value:'',
                    validation:{
                        required:true,
                    },
                    valid:false,
                    touched:false,
                },
                email:{
                    elementType: 'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your Email',
                    },
                    value:'',
                    validation:{
                        required:true,
                    },
                    valid:false,
                    touched:false,
                },
                deliveryMethod:{
                    elementType: 'select',
                    elementConfig:{
                        placeholder:'Delivery Method',
                        options:[
                            {value:'Fastest',displayValue:'Fastest'},
                            {value:'Cheapest',displayValue:'Cheapest'},
                        ]
                    },
                    value:'Fastest',
                },
            },
            formisvalid:false,
            loading:false,
        }
    }



    orderHandler=(event)=>{
        event.preventDefault();
        const formData={};
        for(let elementIdentifier in this.state.orderForm ){
            formData[elementIdentifier] =this.state.orderForm[elementIdentifier].value;
        }
        const order={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData,
            userId:this.props.userId,
        };
        console.log(order);
        this.props.onPlaceOrder(order,this.props.token);
    };

    checkValidityHandler=(value,rules)=>{
        let isValid = false;
        if(rules.required){
            isValid= value.trim()!=='';
        }
        return isValid;
    };

    inputChangedHandler=(event,inputIdentifier)=>{
        //console.log(event.target.value);
        const updatedFormData={...this.state.orderForm};
        const updatedFormElement={...updatedFormData[inputIdentifier]};
        updatedFormElement.value=event.target.value;
        updatedFormElement.touched=true;
        if(updatedFormElement.validation){
            updatedFormElement.valid=this.checkValidityHandler(updatedFormElement.value,updatedFormElement.validation);
        }
        //updatedFormElement.validation ? updatedFormElement.valid=this.checkValidityHandler(updatedFormElement.value,updatedFormElement.validation) :null;
        updatedFormData[inputIdentifier]=updatedFormElement;
        let formisValid =true;
        for(let inputIdentifier in updatedFormData){
            if(updatedFormData[inputIdentifier].valid!==undefined) {
                formisValid = updatedFormData[inputIdentifier].valid && formisValid
            }
        }
        this.setState({orderForm:updatedFormData,formisvalid:formisValid});
    };

    render(){
        const formsElementArray=[];
        for(let key in this.state.orderForm){
            formsElementArray.push({
                id:key,
                config:this.state.orderForm[key],
            });
        }
        let form =(
            <form onSubmit={this.orderHandler} className={classes.Container}>
                {formsElementArray.map(formelement => (
                    <Input
                        key={formelement.id}
                        elementType={formelement.config.elementType}
                        elementConfig={formelement.config.elementConfig}
                        value={formelement.config.value}
                        changed={(event)=>this.inputChangedHandler(event,formelement.id)}
                        invalid={!formelement.config.valid}
                        touched={formelement.config.touched}
                        shouldvalidate={formelement.config.validation}
                    />
                ))}
                <Button variant="raised" color="secondary"  disabled={!this.state.formisvalid} type={'submit'} style={{margin:'0 10px',width:'50px'}}>
                    Submit
                </Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4> Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.orderState.loading,
        token:state.auth.token,
        userId:state.auth.userId,
    }
};

const mapDispatchToProps=(dispatch)=>{
    return{
        onPlaceOrder:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axiosOrder));