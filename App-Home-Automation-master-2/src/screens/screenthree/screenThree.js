import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableHighlight, Image } from 'react-native';
//import EnvironmentDAO from '../../models/database/environment'
import { Text as TextBase, Container, Left } from 'native-base'
import Environment from '../../components/environment'
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'native-base'

//var database = new EnvironmentDAO()

export default class ScreenThree extends Component {
    static navigationOptions = { title: 'Ambiente', header: null };

    constructor(props) {
        super(props);
        this.state = { nameAmb: '' };
    }

    _saveEnvironment(nameAmb) {
        database.register_environment(nameAmb, this.props)
    }

    _deleteEnvironment(nameAmb) {

        database.delete_environment(nameAmb, this.props)
        // remover o ambiente de todos os dispositivos também
    }

    _updateEnvironment(nameAmb) {
        database.update_environment(nameAmb, this.props)
        // atualizar o ambiente de todos os dispositivos também
    }

    _validateText() {
        if (this.state.nameAmb.length == 0) {
            Alert.alert(
                'Informação',
                'Campo do nome vazio!',
                [
                    {
                        text: 'Ok',
                        onPress: () => console.log('Campo do nome do ambiente vazio!'),
                    }
                ],
                { cancelable: false },
            );

            return false
        }
        return true
    }

    _confirmDeleteMessage(nameAmb) {

        if (this._validateText()) {
            Alert.alert(
                'Informação',
                'Deseja mesmo deletar o ambiente?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Operação cancelada!'),
                        style: 'cancel',
                    },
                    { text: 'Sim', onPress: () => this._deleteEnvironment(nameAmb) },
                ],
                { cancelable: false },
            );


        }



    }

    _confirmCreateMessage(nameAmb) {

        if (this._validateText()) {
            Alert.alert(
                'Informação',
                'Deseja mesmo criar o ambiente?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Operação cancelada!'),
                        style: 'cancel',
                    },
                    { text: 'Sim', onPress: () => this._saveEnvironment(nameAmb) },
                ],
                { cancelable: false },
            );
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <Container style={{
                    backgroundColor: '#001B2E', flexDirection: 'row', alignItems: 'center', height: 30

                }}>

                    <Left style={{ marginLeft: 10 }}>
                        <TouchableHighlight onPress={()=>this.props.navigation.goBack()}>
                            <Image style={{ width: 30, height: 30 }}
                                source={require('../../img/left.png')
                                } />
                        </TouchableHighlight>


                    </Left>
                </Container>

                <View style={styles.containerBody}>
                    <Text style={styles.txtTittle}>Novo ambiente</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            placeholder="Digite o nome..."
                            style={styles.txtInput}
                            maxLength={20}
                            onChangeText={(typedText) => this.setState({ nameAmb: typedText })}
                        />

                        <Icon
                            name="plus-square-o" size={20} color="#001321" onPress={() => this._confirmCreateMessage(this.state.nameAmb)}>
                        </Icon>

                        <Icon style={{ marginLeft: 10 }}
                            name="trash" size={22} color="#001321" onPress={() => this._confirmDeleteMessage(this.state.nameAmb)}>
                        </Icon>
                    </View>

                </View>
                <View style={{ flex: 2, alignItems: 'center', marginBottom: 15 }}>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#001B2E' }}>Ambientes cadastrados:</Text>
                    {
                        <Environment />
                    }

                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerBody: {
        flex: 4,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    txtTittle: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: '#001B2E',

    },
    txtInput: {
        margin: 40,
        padding: 10,
        fontSize: 18,
        width: 200
    },
    txtBtn: {
        fontSize: 22,
        backgroundColor: '#545D70',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
    },
    btn: {
        margin: 10,
        backgroundColor: '#545D70',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
    }
});
