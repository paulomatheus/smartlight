import React, { Component } from 'react';
import { Switch } from 'react-native-switch'
import { Text, Button, View,TouchableHighlight } from 'react-native'
import axios from 'axios';


export default class DeviceItems extends Component {

    constructor(props) {
        super(props)
    }
    verify()
    {
        var value = this.props.item.value;
        
        if(value == "OFF")
           this.props.item.value = "ON";
        else
           this.props.item.value = "OFF"; 
           
        this.forceUpdate()   
    }
    render() {
        return (
            <View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 120, height: 70, backgroundColor: '#A9A9A9', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>{this.props.item.name}</Text>
                        <View style={{ backgroundColor: '#A9A9A9', height: 6 }} />

                    </View>
                    <View style={{ width: 120, height: 70, backgroundColor: '#A9A9A9', alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>{this.props.item.environment}</Text>
                        <View style={{ backgroundColor: '#A9A9A9', height: 6 }} />
                    </View>
                    <View style={{ width: 120, height: 70, flexDirection: 'column' }}>
                        <TouchableHighlight
                            onPress={() => this.verify()}>
                            <Text style={this.props.item.value == "ON" ? {color:'green', fontWeight:'bold'} : {color:'red',fontWeight:'bold'}} >{this.props.item.value}</Text>
                        </TouchableHighlight>
 
                    </View>


                </View>
                <View style={{ backgroundColor: '#C71585', height: 6 }} />

            </View>
        )
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

        axios.get(`http://${ip}/deviceValue?value=${value}`)
            .then(() => {
                console.log('Chegou a resposta.')

            })
            .catch(() => { console.log('Error'); })
    }
}
