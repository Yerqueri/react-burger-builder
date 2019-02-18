import React,{Component} from 'react';
import Button from 'material-ui/Button';
import classes from './auth.css'
import Input from '../../Components/UI/Input/Input';
import Typography from 'material-ui/Typography';
import Card from 'material-ui/Card'
import Spinner from '../../Components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../../store/actionIndex';
import {Redirect} from 'react-router-dom';


class Auth extends Component{
    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your email id',
                },
                value:'',
                validation:{
                    required:true,
                    email:true,
                },
                valid:false,
                touched:false,
            },

            password: {
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Enter your password',
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                },
                valid:false,
                touched:false,
            },
        },
        loginEnabled:false,
    };

    checkValidityHandler=(value,rules)=>{
        let isValid = false;
        // need to handle all validations together.
        if(rules.required){
            isValid= value.trim()!=='';
        }
        if(rules.minLength){
            isValid=value.length>=6;
        }
        if(rules.email){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid=re.test(value);
        }
        return isValid;
    };

    inputChangedHandler=(event,controlName)=>{
        const updatedControls={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidityHandler(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls:updatedControls});
    };

    submitAuthHandler=(event)=>{
        event.preventDefault(); // avoids reloading of page
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,!this.state.loginEnabled);
    };

    switchAuth=(event)=>{
        event.preventDefault();
        this.setState({loginEnabled:!this.state.loginEnabled});
        this.props.clearError();
    };

    componentDidMount=()=>{
        if(!this.props.isBuildingBurger && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath('/');
        }
    };

    render(){
        const formsElementArray=[];
        for(let key in this.state.controls){
            formsElementArray.push({
                id:key,
                config:this.state.controls[key],
            });
            //console.log(formsElementArray);
        }

        let loginbutton = <Button onClick={this.switchAuth} color="primary"  type={'submit'} style={{margin:'0 10px'}}>
            {!this.state.loginEnabled ? 'Switch To Login' :'Login'}
        </Button>;
        let signupbutton=<Button onClick={this.switchAuth} color="primary"  type={'submit'} style={{margin:'0 10px'}}>
            {this.state.loginEnabled ? 'Switch To Sign Up' :'Sign Up'}
        </Button>;

        let errorMessage=null;
        if(this.props.error){
            console.log(this.state.error);
            errorMessage=<div><p style={{color:'red'}}>{this.props.error.message}</p></div>
        }
        let form =(
            <form className={classes.Container}>
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
                {errorMessage}
                <Button onClick={this.submitAuthHandler} variant="raised" color="secondary"  type={'submit'} style={{margin:'0 10px'}}>
                    {!this.state.loginEnabled ? 'Sign Up' :'Login'}
                </Button>

                {
                    !this.state.loginEnabled ? <div> <br/>{loginbutton} </div>: <div><br/> {signupbutton}</div>
                }
            </form>
        );

        return(
            <div>
                {this.props.isAuthenticated ?<Redirect to={this.props.authRedirectPath}/> :
                    <Card className={classes.ContactData}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {this.state.loginEnabled ? 'login' : 'Sign Up'}
                    </Typography>
                        {this.props.loading ?<Spinner/> :<div>{form}</div>}
                        <br/>
                    </Card>
                }
            </div>
        );
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        onAuth: (email, password,isSignUp) => dispatch(actions.auth(email, password,isSignUp)),
        clearError:()=>dispatch(actions.clearError()),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path)),
    }
};

const mapStateToProps=(state)=>{
    return {
        loading: state.auth.loading,
        error:state.auth.error,
        isAuthenticated: state.auth.token !== null,
        isBuildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath,
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);