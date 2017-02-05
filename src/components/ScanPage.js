import Exponent from 'exponent';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    TouchableOpacity
} from 'react-native';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
const Svg = Exponent.Components.Svg;
const {Path} = Svg;

class ScanPage extends React.Component {
    static navigationOptions = {
        title: 'SPEEDTEST - Scan',
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
            finished: false,
            speedoValue: 0,
            provider: '',
            location: ''
        }
    }
    handleNavigationChange = (navState) => {
        if (navState.title) {
            var data = navState.title.split('|')
            if (data.length > 2) {
                console.log(data);
                var ping = parseFloat(data[0]) || 0;
                var download = parseFloat(data[1]) || 0;
                var upload = parseFloat(data[2]) || 0;
                var status = data[3];
                var speed = parseFloat(data[4]);
                var metric = data[5];
                var speedoValue = parseFloat(data[6]);
                var chartDownload = data[7];
                var chartUpload = data[8];
                var provider = data[9];
                var location = data[10];
                this.setState({ping, download, upload, status, speed, metric, speedoValue, chartDownload, chartUpload, provider, location});
            }
        }
    };
    scanAgain() {
        console.log(this.refs['webview']);
        this.refs['webview'].reload();
    }
    render() {
        // let percentage = 0;
        // if (this.state.speedUnit == 'Kbps') {
        //     percentage = this.state.speed / 1000 * 100;
        // } else {
        //     percentage = this.state.speed / 30 * 100; 
        // }
        
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.scanAgain.bind(this)}>
                    <Text>Scan Again</Text>
                </TouchableOpacity>
                <Text>Open up main.js to start working on your app!</Text>
                <Text>{this.state.ping} {this.state.download} {this.state.upload}</Text>
                <Text>{this.state.status} {this.state.speed} {this.state.metric}</Text>
                <Text>{this.state.provider} {this.state.location}</Text>
                <Svg
                    height="200"
                    width="200"
                >
                    <Path d={this.state.chartDownload} />
                </Svg>
                <Svg
                    height="200"
                    width="200"
                >
                    <Path d={this.state.chartUpload} />
                </Svg>
                
                <AnimatedGaugeProgress
                  size={250}
                  width={15}
                  rotation={90}
                  cropDegree={90}
                  fill={this.state.speedoValue}
                  tintColor="#00e0ff"
                  backgroundColor="#3d5875" />
                <View style={{position: 'absolute', top: 0, left: 0}}>
                    <WebView
                        ref="webview"
                        source={{uri: 'http://myspeed.today'}}
                        style={{height: 0, width: 0}}
                        onNavigationStateChange={this.handleNavigationChange}
                        injectedJavaScript={`
                            var ceki = function() {
                                var value = document.getElementById('speed-value').innerHTML;
                                var speedUnit = document.getElementById('speed-units').innerHTML;
                                var finished = document.getElementById('speed-progress-indicator-icon').classList.contains('oc-icon-refresh');
                                document.title = value + '|' + speedUnit + '|' + finished;
                                window.location.hash = ++i;
                                if (finished) return timer = null;
                            };

                            var checkValue = setInterval(function() {
                                var ping = document.getElementById('speedo-ping').getElementsByClassName('time')[0].innerHTML;
                                var download = document.getElementById('speedo-down').getElementsByClassName('data')[0].innerHTML;
                                var upload = document.getElementById('speedo-up').getElementsByClassName('data')[0].innerHTML;
                                var realTimeDescription = document.getElementById('tool-status').getElementsByTagName('span')[0].innerHTML;
                                var realTimeValue = document.getElementById('tool-speed').innerHTML;
                                var realTimeUnit = document.getElementById('tool-metrics').getElementsByTagName('span')[0].innerHTML;
                                var chartDownload = document.getElementById('highcharts-0').getElementsByClassName('highcharts-series-0')[0].getElementsByTagName('path')[0].getAttribute('d');
                                var chartUpload = document.getElementById('highcharts-5').getElementsByClassName('highcharts-series-0')[0].getElementsByTagName('path')[0].getAttribute('d');
                                var speedoValueSplit1 = document.getElementById('speedo-arrow').getAttribute('style').split('rotate(');
                                var speedoValueSplit2 = speedoValueSplit1[1].split('deg);');
                                var speedoValue = (parseFloat(speedoValueSplit2[0]) + 48) / 278 * 100;
                                var provider = document.getElementById('speedo-provider').getElementsByClassName('link')[0].getElementsByTagName('a')[0].innerHTML;
                                var locationSplit = document.getElementsByClassName('location')[0].getElementsByClassName('data')[0].innerHTML.split('</i>');
                                var location = locationSplit[1];
                                document.title = ping + '|' + download + '|' + upload + '|' + realTimeDescription + '|' + realTimeValue + '|' + realTimeUnit + '|' + speedoValue + '|' + chartDownload + '|' + chartUpload + '|' + provider + '|' + location;
                                window.location.hash = ++i;
                            }, 500);

                            var checkLoaded = setInterval(function() {
                                var finished = document.getElementById('speedo-start').getAttribute('style') != 'display: none;'
                                
                                if (finished) {
                                    alert('hoi')
                                    document.getElementById('speedo-start').click();
                                    clearInterval(checkLoaded);
                                }
                            }, 1000);

                            var i = 0;
                            
                        `}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ScanPage;