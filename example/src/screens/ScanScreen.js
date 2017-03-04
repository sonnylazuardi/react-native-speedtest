import Exponent from 'exponent';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    TouchableOpacity,
    Button
} from 'react-native';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Loader from '../components/Loader';

import Speedtest from '../../dist/index';

const Svg = Exponent.Components.Svg;
const {Path} = Svg;

@connect(state => ({
    scan: state.scan
}), dispatch => (
    bindActionCreators(actions, dispatch)
))
class ScanScreen extends React.Component {
    static navigationOptions = {
        title: 'Scan',
        tabBar: {
            label: 'Scan',
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            ping: 0,
            download: 0,
            upload: 0,
            status: 'Scanning',
            speed: 0,
            metric: '...',
            chartDownload: '',
            chartUpload: '',
            speedUnit: 'Kbps',
            speedoValue: 0,
            provider: '',
            location: '',
            scanning: false
        }
    }
    onUpdateValue = ({ping, download, upload, status, speed, metric, speedoValue, chartDownload, chartUpload, provider, location}) => {
        this.setState({ping, download, upload, status, speed, metric, speedoValue, chartDownload, chartUpload, provider, location, scanning: true});
    };
    onFinishScan = () => {
        const {ping, download, upload, status, speed, metric, speedoValue, provider, location} = this.state;
        this.setState({
            scanning: false
        }, () => {
            this.props.addScan({
                timestamp: Date.now(),
                ping,
                download,
                upload,
                provider,
                location
            })
        });
    }
    startScan = () => {
        this.setState({
            scanning: true
        }, () => {
            this.speedtest.startScan();
        });
    }
    stopScan = () => {
        this.setState({
            scanning: false
        }, () => {
            this.speedtest.stopScan();
        });
    }
    
    render() {
        const {ping, download, upload, status, speed, metric, speedoValue, provider, location} = this.state;
        return (
            <View style={styles.container}>
                <Speedtest 
                    ref={(c) => {this.speedtest = c;}}
                    onUpdateValue={this.onUpdateValue}
                    onFinishScan={this.onFinishScan}
                    />
                <Text style={styles.text}>ping: {ping}</Text>
                <Text style={styles.text}>download: {download}</Text>
                <Text style={styles.text}>upload: {upload}</Text>
                <Text style={styles.text}>status: {status}</Text>
                <Text style={styles.text}>speed: {speed}</Text>
                <Text style={styles.text}>metric: {metric}</Text>
                <Text style={styles.text}>speedoValue: {speedoValue}</Text>
                <Text style={styles.text}>provider: {provider}</Text>
                <Text style={styles.text}>location: {location}</Text>

                {!this.state.scanning ?
                    <Button 
                        title="Scan"
                        onPress={this.startScan}
                        />
                    :
                    <Button 
                        title="Stop"
                        onPress={this.stopScan}
                        />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161f2b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff'
    }
});

export default ScanScreen;