import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import axios from 'axios';

export default class ScreenTwo extends Component {
    static navigationOptions = { title: 'Atualizar dispositivo', header: null };

    constructor(props) {
        super(props);
        this.state = { newname: '' };
    }
    _backScreen(nameChanged) {
        if (nameChanged) {
            Alert.alert(
                'Informação',
                'Nome do ambiente atualizado com sucesso!',
                [
                    {
                        text: 'Ok',
                        onPress: () => this.props.navigation.goBack(),
                    },
                ],
                { cancelable: false }
            );
        }
        else {
            Alert.alert(
                'Erro',
                'Nome do ambiente não foi atualizado, tente novamente!',
                [
                    {
                        text: 'Ok',
                    },
                ],
                { cancelable: false }
            );
        }
    }
    _changeName(name, ip) {


        axios.get(`http://${ip}/deviceName?name=${name}`)
            .then(response => {
                this.setState({ newname: response.data });
                this._backScreen(true)
                //this.props.navigation.navigate('ScreenOne', { name });
            })
            .catch(() => {
                console.log('Error');
                this._backScreen(false)
            }
            );

    }

    _back = () => {
        this.props.navigation.navigate('ScreenOne');
    };

    render() {
        const { navigation } = this.props;
        const ip = navigation.getParam('ip', '');

        return (
            <View style={styles.container}>

                <View style={styles.containerBody}>
                    <Text style={styles.txtTittle}>Atualizar Nome</Text>
                    <TextInput
                        placeholder="Nome do dispositivo.."
                        style={styles.txtInput}
                        maxLength={20}
                        onChangeText={(typedText) => this.setState({ name: typedText })}
                    />

                    <View style={{ flexDirection: 'row' }}>

                        <TouchableHighlight
                            style={styles.btn}
                            onPress={() => this._changeName(this.state.name, ip)}>
                            <Text style={styles.txtBtn}>Alterar</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.btn}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Text style={styles.txtBtn}>Voltar</Text>
                        </TouchableHighlight>
                    </View>
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
        flex: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    txtTittle: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtInput: {
        margin: 40,
        padding: 10,
        fontSize: 18,
        width: 300
    },
    txtBtn: {
        fontSize: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        margin: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
