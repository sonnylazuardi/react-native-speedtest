import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    TouchableOpacity
} from 'react-native';

class HistoryPage extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: 'History',
        }
    };

    render() {
        return (
            <Text>Hello</Text>
        );
    }
}

export default HistoryPage;