import React, { Component } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';
import { Alert } from 'react-native'
var db = openDatabase({ name: 'lumenx.db' });

export default class EnvironmentDAO extends Component {

    constructor(props) {
        super(props);
        this.state = {
            envi_name: '',
            envi_ip: ''
        };
    }

    create_table = () => {

        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='environment'",
                [],
                function (tx, res) {

                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS environment', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS environment(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(25) unique)',
                            []
                        );

                    }
                    else {
                        console.log('Tabela existente da posicao 0: ' + res.rows.item(0).name)
                    }
                }
            );
        });
    }

    register_environment = (envi_name, nav) => {

        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO environment (name) VALUES (?)',
                [envi_name],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Ambiente salvo com sucesso!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () =>
                                        nav.navigation.goBack(),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Erro ao salvar o ambiente!');
                    }
                }
            );
        });

    }

    viewAllEnvironment = (obj) => {
        var temp = []

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM environment', [], (tx, results) => {

                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));

                }

                obj.state.amb = temp;

            });

        })

    }

    delete_environment = (envi_name, nav) => {

        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE from environment where name = ?',
                [envi_name],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Ambiente deletado com sucesso!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () =>
                                        nav.navigation.goBack(),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Erro ao deletar o ambiente!');
                    }
                }
            );
        });

    }

    update_environment = (envi_new_name, envi_old_name) => {

        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE environment set name = ? where name = ?',
                [envi_new_name, envi_old_name],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Nome do ambiente atualizado com sucesso! Atualize a tela.',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => console.log('Nome do ambiente atualizado com sucesso!'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Erro ao atualizar o ambiente!');
                    }
                }
            );
        });

    }

    

    deleteAllEnvironments = () => {

        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE from environment',
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Ambiente(s) deletado(s) com sucesso!!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () =>
                                        console.log('Ambiente deletado com sucesso!'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Erro ao deletar o ambiente!');
                    }
                }
            );
        });

    }

}