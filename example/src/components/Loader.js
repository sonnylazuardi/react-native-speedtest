import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    TouchableOpacity,
    Alert
} from 'react-native';
var speedAnim = require('../assets/animations/SpeedAnim.json');
import { DangerZone } from 'exponent';
const { Lottie: Animation } = DangerZone;


class Loader extends React.Component {
    setAnim = (anim) => {
        this.anim = anim;
    }
    componentDidMount() {
        this.anim.play();
    }
    render() {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    marginVertical: 10,
                }}
                >
                <Animation
                    ref={this.setAnim}
                    style={{
                        width: 300,
                        height: 300
                    }}
                    source={speedAnim}
                    loop={true}
                    />
            </View>
        );
    }
}

export default Loader;