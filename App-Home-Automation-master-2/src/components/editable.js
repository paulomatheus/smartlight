import React from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'native-base'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

import DeviceDAO from '../models/database/device'

export default class EditableText extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            edited: false,

            name: '',

            Validate: {

                err: false,

                msg: ''

            },

        }

    }

    atualizarDeviceNoBD() {
        this.dbDevice = new DeviceDAO()
        if (this.state.name.length >= 3) {
            this.dbDevice.updateNameDevice(this.state.name, this.props.item.mac, this)
        }
        else
            alert('Nome do dispositivo muito pequeno! Mínimo 3 caracteres.')
    }

    render() {

        return (

            <View marginHorizontal={15}>

                <TouchableOpacity

                    onPress={() => {

                        this.setState({ edited: !this.state.edited })

                    }}

                >

                    {

                        this.state.edited ? (

                            <View style={{flexDirection:'row'}}>
                                <Icon style={{ marginLeft: 5}}

                                    name="pencil" size={22} color='#001321'>
                                </Icon>
                                <TextInput

                                    style={{ fontSize: this.props.fontSize, color: this.props.color, width: this.props.width, textAlign: this.props.textAlign, borderBottomColor: this.props.borderBottomColor, borderBottomWidth: this.state.Validate.err ? this.props.borderBottomWidth : 0 }}

                                    value={this.props.value}

                                    onChangeText={(val) => {

                                        this.setState({ name: val })

                                    }}

                                    onSubmitEditing={() => this.atualizarDeviceNoBD()}

                                    onBlur={() => {

                                        if (this.state.Validate.err) {

                                            return;

                                        }

                                        this.setState({ edited: false })

                                    }}

                                    autoFocus={this.state.edited}

                                    multiline={this.props.multiline}
                                    maxLength={40}
                                    width={150}
                                    numberOfLines={this.props.numberOfLines}

                                />
                            </View>

                        ) : (
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon style={{ marginLeft: 5 }}
                                        name="pencil" size={22} color="#001321">
                                    </Icon>
                                    <Text style={{ marginLeft: 15 }}>{this.props.item.name}</Text>
                                </View>
                            )

                    }

                </TouchableOpacity>

                <Text style={{ color: 'red' }}>{this.state.Validate.msg}</Text>

            </View>

        )

    }

};