import * as actions from  '../actionTypes';
import {updateObject} from "../../utility";

const initialState={
    token: null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/',
};

const reducer =(state=initialState,action)=>{
    switch (action.type) {
        case actions.AUTH_SUCCESSFUL:return updateObject(state,{token:action.idToken,userId:action.userId,error:null,loading:false});
        case  actions.AUTH_FAILED: return updateObject(state,{loading:false, error:action.error,});
        case actions.AUTH_START: return updateObject(state,{error:null,loading:true});
        case actions.AUTH_LOGOUT: return updateObject(state, {token:null,userId:null});
        case actions.CLEAR_ERROR:return updateObject(state,{error:null});
        case actions.SET_AUTH_REDIRECT_PATH:return updateObject(state,{authRedirectPath: action.path});
        default: return state;
    }
};

export default reducer;