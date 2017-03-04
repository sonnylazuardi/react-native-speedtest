import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Font } from 'exponent';

import ScanScreen from './screens/ScanScreen';
import HistoryScreen from './screens/HistoryScreen';
import MapScreen from './screens/MapScreen';

import * as storage from 'redux-storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import Loader from './components/Loader';

const AppNavigator = TabNavigator({
    Scan: {screen: ScanScreen},
    History: {screen: HistoryScreen},
    Map: {screen: MapScreen}
}, {
    tabBarOptions: {
        showLabel: false,
        style: {
            backgroundColor: '#0f151e'
        }
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
    state = {
        fontLoaded: false
    }
    componentDidMount() {
        Font.loadAsync({
            'bebas-neue': require('./assets/fonts/BebasNeue.ttf'),
        }).then(() => this.setState({fontLoaded: true}))
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                {!this.state.fontLoaded ?
                    <Loader />
                    : 
                    <AppNavigator navigation={addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav,
                    })} />}
            </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161f2b',
    }
})

export default App;