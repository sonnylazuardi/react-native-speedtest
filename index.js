'use strict';

import React from 'react';
import {
    WebView,
    View
} from 'react-native';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

class Speedtest extends React.Component {
    state = {
        scanning: false,
        speedoValue: 0
    };
    stripTags(str) {
        return str.replace(/(<([^>]+)>)/ig,"");
    }
    handleNavigationChange = (navState) => {
        if (navState.title) {
            var data = navState.title.split('|');
            if (data.length > 2 && this.state.scanning) {
                var ping = parseFloat(data[0]) || 0;
                var download = parseFloat(data[1]) || 0;
                var upload = parseFloat(data[2]) || 0;
                var status = this.stripTags(data[3]);
                var speed = parseFloat(data[4]);
                var metric = data[5];
                var speedoValue = parseFloat(data[6]);
                var provider = this.stripTags(data[7]);
                var location = data[8];
                var chartDownload = data[9];
                var chartUpload = data[10];

                this.props.onUpdateValue({
                    ping,
                    download,
                    upload,
                    status,
                    speed,
                    metric,
                    speedoValue,
                    provider,
                    location,
                    chartDownload,
                    chartUpload,
                });

                this.setState({
                    speedoValue
                });

                if (status == 'Ready') {
                    this.setState({
                        scanning: false
                    }, () => {
                        this.props.onFinishScan();
                    })
                }
            }
        }
    };
    startScan() {
        this.setState({
            scanning: true
        }, () => {
            // this.refs['webview'].reload();
        });
    }
    stopScan() {
        this.setState({
            scanning: false
        }, () => {
            this.props.onFinishScan();
        });
    }
    render() {
        return (
            <View>
                <AnimatedGaugeProgress
                    size={this.props.size}
                    width={this.props.width}
                    rotation={this.props.rotation}
                    cropDegree={this.props.cropDegree}
                    fill={this.state.speedoValue}
                    tintColor={this.props.tintColor}
                    backgroundColor={this.props.backgroundColor} />
                {this.state.scanning ?
                    <View style={{position: 'absolute', top: 0, left: 0, height: 0, width: 0}}>
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
                                    var provider = document.getElementById('speedo-provider').innerHTML;
                                    var locationSplit = document.getElementsByClassName('location')[0].getElementsByClassName('data')[0].innerHTML.split('</i>');
                                    var location = locationSplit[1];
                                    document.title = ping + '|' + download + '|' + upload + '|' + realTimeDescription + '|' + realTimeValue + '|' + realTimeUnit + '|' + speedoValue + '|' + provider + '|' + location + '|' + chartDownload + '|' + chartUpload;
                                    window.location.hash = ++i;

                                    if (realTimeDescription == 'Ready') {
                                        clearInterval(checkValue);
                                    }
                                }, 100);

                                var checkLoaded = setInterval(function() {
                                    var finished = document.getElementById('speedo-start').getAttribute('style') != 'display: none;'
                                    
                                    if (finished) {
                                        document.getElementById('speedo-start').click();
                                        clearInterval(checkLoaded);
                                    }
                                }, 1000);

                                var i = 0;
                                
                            `}
                        />
                    </View>    
                    : null}
            </View>
        )
    }
};

Speedtest.propTypes = {
    onUpdateValue: React.PropTypes.func,
    onFinishScan: React.PropTypes.func,
    size: React.PropTypes.number,
    width: React.PropTypes.number,
    rotation: React.PropTypes.number,
    cropDegree: React.PropTypes.number,
    tintColor: React.PropTypes.string,
    backgroundColor: React.PropTypes.string
};

Speedtest.defaultProps = {
    onUpdateValue: () => {},
    onFinishScan: () => {},
    size: 250,
    width: 15,
    rotation: 90,
    cropDegree: 90,
    tintColor: '#00e0ff',
    backgroundColor: '#3d5875'
};

export default Speedtest;
