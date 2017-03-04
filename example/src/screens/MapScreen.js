import React from 'react';
import Exponent from 'exponent';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    TouchableOpacity,
    Alert
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';

const {MapView} = Exponent.Components;

@connect(state => ({
    scan: state.scan
}), dispatch => (
    bindActionCreators(actions, dispatch)
))
class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Map',
        tabBar: {
            label: 'Map',
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <MapView 
                    style={{flex: 1}}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    />
            </View>
        );
    }
}

export default MapScreen;