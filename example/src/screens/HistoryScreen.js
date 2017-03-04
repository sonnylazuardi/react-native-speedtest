import React from 'react';
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

@connect(state => ({
    scan: state.scan
}), dispatch => (
    bindActionCreators(actions, dispatch)
))
class HistoryScreen extends React.Component {
    static navigationOptions = {
        title: 'History',
        tabBar: {
            label: 'History',
        }
    };

    onDelete (scan) {
        Alert.alert(`Speed Test`, `Are you sure wanna delete?`, [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'Yes', onPress: () => {
                this.props.removeScan(scan.timestamp);
            }},
        ]);
    }

    render() {
        return (
            <View>
                {this.props.scan.history.map(scan => {
                    return (
                        <View key={scan.timestamp}>
                            <Text>
                                {scan.ping} {scan.download} {scan.upload} {scan.location} {scan.provider}
                            </Text>
                            <Text onPress={this.onDelete.bind(this, scan)}>DELETE</Text>
                        </View>
                    );
                })}
            </View>
        );
    }
}

export default HistoryScreen;