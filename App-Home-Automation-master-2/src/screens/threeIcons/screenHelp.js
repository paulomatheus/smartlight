import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Text as TextBase, Icon as IconTwo, Container } from 'native-base'
import { Right, Left } from 'native-base';

export default class ScreenHelp extends Component {

    constructor(props) {
        super(props);



    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Container style={{
                        backgroundColor: '#002540', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30
                    }}>

                        <Image style={{ width: 80, height: 30, marginHorizontal: 100 }}
                            source={require('../../img/logo-tok.png')} />

                    </Container>
                </View>

                <View style={{ flex: 6, backgroundColor: 'white' }}>
                <Image style={{ width: 110, height: 40,marginLeft: 120 }}
                  source={require('../../img/lumenx2.png')} />
                    <Text style={{marginTop:30}}>A Lumenx Indústria e Comércio de Produtos Eletrônicos LTDA é uma empresa focada no desenvolvimento de soluções tecnológicas para segurança e automação residencial, preza pela inovação de seus produtos e a qualidade com que realiza seus trabalhos, 
                    pois estas ações têm sido o fio condutor de atuação da empresa desde a sua constituição no ano de 2012, especificamente na incubadora de empresas do Instituto Nacional de Telecomunicações - Inatel.
               A Empresa se diferencia não apenas pela qualidade, mas também pelas funcionalidades dos produtos e ganhou notoriedade no mercado pelo desenvolvimento de interruptores inteligentes com tecnologia touch, sensível ao toque e com conexões sem fio, projetados para atender clientes que prezam pela tecnologia de ponta, design diferenciado e durabilidade dos produtos.Seja bem vindo para sentir, controlar e vivenciar novas experiências com a Lumenx!
 </Text>
    

                    <Text style={{marginTop:30}}>
                        Contato:
                        (35) 3473 – 0235
                        </Text>
                        <Text style={{marginTop:10}}>
                        www.Lumenx.com.br
                        </Text>
                        <Text style={{marginTop:10}}>
                        contato@lumenx.com.br
                        </Text>
                        <Text style={{marginTop:10}}>
                        vendas@lumenx.com.br
                        </Text>



                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({


});
