import { createStore } from 'redux';

const initialState = {
    user: {

    },
    allUsers: [],
}
function reducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_USER': return { user: action.value };
        case 'IS_AUTH': return { isAuth: action.value };
        case 'CHANGE_ROUTER': return { route: action.value };
        case 'ALL_USERS': return { allUsers: action.value };
        case 'NOT_AUTHED_USER': return { notAuthedUser: action.value };
        default: return state;
    }
}

const store = createStore(reducer);

export default store;