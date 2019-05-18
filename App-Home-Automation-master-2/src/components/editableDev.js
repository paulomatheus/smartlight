import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

import EnvironmentDAO from '../models/database/environment'

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

    atualizarAmbienteNoBD() {
        this.dbEnvironment = new EnvironmentDAO()
        if (this.state.name.length >= 3) {
            this.dbEnvironment.update_environment(this.state.name,this.props.amb.name)
        }
        else
            alert('Nome do ambiente pequeno! Mínimo 3 caracteres.')
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
                                <Icon style={{ marginLeft: 5 }}
                                    name="pencil" size={22} color="#001321">
                                </Icon>
                                <TextInput

                                    style={{ fontSize: this.props.fontSize, color: this.props.color, width: this.props.width, textAlign: this.props.textAlign, borderBottomColor: this.props.borderBottomColor, borderBottomWidth: this.state.Validate.err ? this.props.borderBottomWidth : 0 }}

                                    value={this.props.value}

                                    onChangeText={(val) => {

                                        this.setState({ name: val })

                                    }}

                                    onSubmitEditing={() => this.atualizarAmbienteNoBD()}

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
                                    <Icon style={{ marginLeft: 5}}
                                        name="pencil" size={22} color="#001321">
                                    </Icon>
                                    <Text style={{ marginLeft: 15 }}>{this.props.amb.name}</Text>
                                </View>
                            )

                    }

                </TouchableOpacity>

                <Text style={{ color: 'red' }}>{this.state.Validate.msg}</Text>

            </View>

        )

    }

};