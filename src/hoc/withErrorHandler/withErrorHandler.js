import React,{Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler=(WrappedComponent, axios)=>{
    return class extends Component{
        constructor(props){
            super(props);
            this.state={
               error:null
            }
            this.requestInterceptor=null;
            this.responseInterceptor=null;
        }

        componentWillMount =()=>{
            this.requestInterceptor=axios.interceptors.request.use(request=>{
                this.setState({error:null});
                return request;
            });
            this.responseInterceptor=axios.interceptors.response.use(response=>response,error=>{
                this.setState({error:error});
            });
        };

        componentWillUnmount =()=>{
            axios.interceptors.response.eject(this.responseInterceptor);
            axios.interceptors.request.eject(this.requestInterceptor);
        }

        clearErrorHandler=()=>{
            this.setState({error:null});
        }

        render(){
            return(
                <Auxiliary>
                    <Modal show={this.state.error}
                       backdropclicked={this.clearErrorHandler}>
                        {this.state.error ? this.state.error.message :null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler