import React from 'react';

import { View, Text, TouchableOpacity, TextInput } from 'react-native'

//import Icon from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'native-base'

import DeviceDAO from '../models/database/device'

export default class EditablePlus extends React.Component {

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

    atualizarAmbNoBD() {
        var ambientes = this.props.ambientes;
        var achou = false;

        this.dbDevice = new DeviceDAO()

        for(i=0; i<ambientes.length; i++)
        {
            console.log('Name = '+this.state.name+', Name2 = '+ambientes[i].name)
            if(this.state.name == ambientes[i].name)
            {
                achou = true;
                this.dbDevice.updateAmbDevice(this.state.name, this.props.item.mac, this)
                break;
            }
        }
        
        if(achou == false)
            alert('Nome do ambiente inválido!')
    }

    render() {

        return (

            <View marginHorizontal={30}>

                <TouchableOpacity

                    onPress={() => {

                        this.setState({ edited: !this.state.edited })

                    }}

                >

                    {

                        this.state.edited ? <TextInput

                            style={{ fontSize: this.props.fontSize, color: this.props.color, width: this.props.width, textAlign: this.props.textAlign, borderBottomColor: this.props.borderBottomColor, borderBottomWidth: this.state.Validate.err ? this.props.borderBottomWidth : 0 }}

                            value={this.props.value}

                            onChangeText={(val) => {

                                this.setState({ name: val })

                            }}

                            onSubmitEditing={() => this.atualizarAmbNoBD()}

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

                        /> : <Icon
                            name="plus-square-o" size={25} color="#001321">
                            </Icon>

                    }

                </TouchableOpacity>

                <Text style={{ color: 'red' }}>{this.state.Validate.msg}</Text>

            </View>

        )

    }

};