import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const logOut=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTH_LOGOUT,
    }
};

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START,
    };
};

export const authFailed=(error)=>{
    return{
        type:actionTypes.AUTH_FAILED,
        error:error
    };
};

export const authSuccessful=(idToken,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESSFUL,
        userId:userId,
        idToken:idToken,
    };
};

export const checkAuthTimeOut=(expirationTime)=>{
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch({
                type:actionTypes.AUTH_LOGOUT,
            })
        },expirationTime*1000)
    };
};

export const clearError=()=>{
    return {
        type:actionTypes.CLEAR_ERROR,
    }
};

export const auth=(emailId, password,isSignUp)=>{
    return (dispatch)=>{
        dispatch(authStart());
        const authData={
            email:emailId,
            password:password,
            returnSecureToken:true,
        };
        let url ='';
        if(isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAVKxwuH_uWtpFEZSF56KdZ637h_AZpqhI';
        }else{
            url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAVKxwuH_uWtpFEZSF56KdZ637h_AZpqhI';
        }
        axios.post(url,authData)
            .then(response=>{
               // console.log(response);
                const expirationDate =new Date( new Date().getTime() +response.data.expiresIn *1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',response.data.localId);
                dispatch(authSuccessful(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            }).catch(error=> {
                    console.log(error);
                    dispatch(authFailed(error.response.data.error));
                }
            )
    }
};

export const setAuthRedirectPath=(path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path,
    }
};

export const authCheckState=()=>{
    return (dispatch)=>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logOut());
        }else{
            const expirationTime= new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            if(expirationTime>new Date()){
                dispatch(authSuccessful(token,userId));
            }else{
                dispatch(logOut());
                dispatch(checkAuthTimeOut((expirationTime.getTime()-new Date().getTime())/1000));
            }

        }
    }
};