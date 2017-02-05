import React from 'react';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import ScanPage from './components/ScanPage';
import HistoryPage from './components/HistoryPage';

import * as storage from 'redux-storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';

const AppNavigator = TabNavigator({
    Scan: {screen: ScanPage},
    History: {screen: HistoryPage}
}, {
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
});

const reducer = storage.reducer(combineReducers({
    nav: (state, action) => (
        AppNavigator.router.getStateForAction(action, state)
    ),
    ...reducers
}));

@connect(state => ({
    nav: state.nav,
}))
class AppWithNavigationState extends React.Component {
    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })} />
        );
    }
}

const engine = createEngine('speedtest');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware, thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

const load = storage.createLoader(engine);

load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}

export default App;