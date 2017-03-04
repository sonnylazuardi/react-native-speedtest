const initialState = {
    history: []
};

const scan = (state = initialState, action = {}) => {
    const {payload} = action;
    switch(action.type) {
        case 'ADD_SCAN':
            return {...state, history: [...state.history, payload.scan]};
        case 'REMOVE_SCAN':
            return {...state, history: state.history.filter(history => history.timestamp !== payload.timestamp)};
        default:
            return state;
    }
}

export default scan;