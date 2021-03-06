import {
    GET_LOGS, 
    SET_LOADING, 
    LOGS_ERROR, 
    ADD_LOG, 
    DELETE_LOG, 
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_LOG,
    SEARCH_LOGS
} from './types';

//export const getLogs = () => {
    //i can use getState(if i won get any part of the state) in the bracket e.g return(dispatch, getState){};
   // return async (dispatch)=>{
    //    setLoading();

      //  res = await fetch('/logs');
       // const data = await res.json();

       // dispatch({
        //    type: GET_LOGS,
         //   payload: data
       // });
   // };

//}
//GET LOGS FROM SERVER
export const getLogs = () => async dispatch => {
    try {
        setLoading();

        const res = await fetch('/logs');
        const data = await res.json();


       dispatch({
            type: GET_LOGS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        });
    }
};

//ADD NEW LOG
export const addLog = (log) => async dispatch => {
    try {
        setLoading();

        const res = await fetch('/logs',{
            method: 'POST',
            body: JSON.stringify(log),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();


       dispatch({
            type: ADD_LOG,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        });
    }
};

//DELETE LOG FROM SERVER
export const deleteLog = (id) => async dispatch => {
    try {
        setLoading();

        await fetch(`/logs/${id}`, {
            method: 'DELETE'
        });


       dispatch({
            type: DELETE_LOG,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        });
    }
};

//UPDATE LOG
export const updateLog = (log) => async dispatch => {
    try {
        setLoading();

        const res = await fetch(`/logs/${log.id}`, {
            method: 'PUT',
            body: JSON.stringify(log),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();

       dispatch({
            type: UPDATE_LOG,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        });
    }
};

//SEARCH LOGS
export const searchLogs = (text) => async dispatch => {
    try {
        setLoading();

        const res = await fetch(`/logs?q=${text}`);

        const data = await res.json();


       dispatch({
            type: SEARCH_LOGS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        });
    }
};

//SET CURRENT
export const setCurrent = (log) => {
    return {
        type: SET_CURRENT,
        payload: log
    };
};
//CLEAR CURRENT
export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT
    };
}
//SET LOADING
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};