import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';
import axios from 'axios';
import { Switch } from 'native-base';


export default class TestExtra extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ip: '',
            value: ''
        }
    }

    componentWillMount() {
        this.setState({ value: this.props.item.value, ip: this.props.item.ip });
    }

    changeName() {
        var value;

        if (this.state.value == "ON") {
            this.state.value = "OFF"
            value = 'OFF';

        }
        else {
            this.state.value = "ON"
            value = 'ON';
        }

        axios.get(`http://${this.state.ip}/deviceValue?value=${value}`)
            .then(() => {
                console.log('Chegou a resposta.')
            })
            .catch(() => { console.log('Error'); })


        this.forceUpdate()

    }

    render() {

        return (
            <View style = {{flexDirection: 'row'}}>
                {/* <Text>..............</Text>  */}
                <Text style={this.state.value == "ON" ? { color: 'green' } : { color: 'red' }} onPress={() => this.changeName()}>{this.state.value}</Text>
            </View>

        );

    }

    onStateChange(ip, newValue) {

        var value;

        if (newValue === "ON") {
            console.log('ONLINE')
            value = 'ON'
        }
        else {
            console.log('OFE')
            value = 'OFF'
        }

        console.log('Valores')
        console.log(ip)
        console.log(newValue)

    }

}

