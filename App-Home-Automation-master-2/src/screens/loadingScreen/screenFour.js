import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';

export default class ScreenFour extends Component {
    static navigationOptions = { title: 'Sobre a empresa', header: null };

    constructor(props) {
        super(props);



    }

   // this.props.navigation.navigate('NomeDaTela')
    render() {
        const { navigate } = this.props.navigation;
        setTimeout(function () {
            navigate('ScreenOne')
        }, 2000)

        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', marginTop: 100 }}>
                    <Text style={{ color: '#fff', fontSize: 30 }}>Olá,</Text>
                    <Text style={{ color: '#fff', fontSize: 20 }}>Seja bem vindo(a)!
               </Text>
                </View>
                <View style={{ flex: 6, justifyContent: 'center' }}>
                    <Image source={require('../../img/logo2.png')} />
                </View>


                <View style={styles.img}>
                    <Image style={{ width: 110, height: 40 }}
                        source={require('../../img/lumenx3.png')} />
                    <Text style={{ color: '#fff', fontSize: 16, marginBottom: 5 }}>www.lumenx.com.br</Text>
                    <Text style={{ color: '#fff', fontSize: 16, marginBottom: 30 }}>Tel: (35)3473-0235</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#203864',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25
    }

});
