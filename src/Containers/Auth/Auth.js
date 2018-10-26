import React,{Component} from 'react';
import Button from 'material-ui/Button';
import classes from './Auth.css'
import Input from '../../Components/UI/Input/Input';
import Typography from 'material-ui/Typography';
import Card from 'material-ui/Card'



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
        }
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
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

    render(){
        const formsElementArray=[];
        for(let key in this.state.controls){
            formsElementArray.push({
                id:key,
                config:this.state.controls[key],
            });
            console.log(formsElementArray);
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
                <Button variant="raised" color="secondary"  type={'submit'} style={{margin:'0 10px',width:'50px'}}>
                    Submit
                </Button>
            </form>
        );
        return(
            <div>
                <Card className={classes.ContactData}>
                <Typography gutterBottom variant="headline" component="h2">
                    Login
                </Typography>
                {form}
                <br/>
                </Card>
            </div>
        );
    }
}

export default Auth