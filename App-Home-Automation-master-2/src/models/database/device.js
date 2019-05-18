import React, { Component } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';
import { Alert } from 'react-native'
var db;

export default class DeviceDAO extends Component {

    constructor(props) {
        super(props);
        this.state = {
            device_id: '',
            device_name: '',
            device_ip: '',
            device_state: '',
            device_enviroment: ''
        };

        db = openDatabase({ name: 'lumenx.db' });
    }

    create_table = () => {

        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='device'",
                [],
                function (tx, res) {

                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS device', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS device(mac VARCHAR(50) NOT NULL PRIMARY KEY, name VARCHAR(50), ip VARCHAR(30), value VARCHAR(5), amb varchar(30))',
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

    // mac, name, ip, value, amb

    register_device = (newDevice,environment, nav) => {

        //alert('MAC = '+newDevice.mac+', Name = '+newDevice.name)
        
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO device(mac,name, ip, value,amb) VALUES (?,?,?,?,?)',
                [newDevice.name, newDevice.name, newDevice.ip, newDevice.value, environment],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    
                    if (results.rowsAffected > 0) {
                        console.log('Device salvo no banco com sucesso!')
                    } else {
                        console.log('Erro ao salvar o device no banco!')
                    }
                }
            );
        });

    }

    viewAllDevices = () => {

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM device', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }

                return temp;
                
            });
        })

    }

    searchDeviceForMac = (dev_mac) => {

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM device where mac = ?', [dev_mac], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }

                return temp;
            });
        })

    }

    updateAmbDevice = (newAmbDevice, device_mac, nav) => {

        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE device set amb = ? where mac = ?',
                [newAmbDevice, device_mac],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Ambiente do dispositivo atualizado com sucesso!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => console.log('Ambiente do device atualizado com sucesso!'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Erro ao atualizar o ambiente do dispositivo!');
                    }
                }
            );
        });

    }

    updateNameDevice = (newNameDevice, device_mac) => {

        console.log('Nome = '+newNameDevice+', MAC = '+device_mac)

        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE device set name = ? where mac = ?',
                [newNameDevice, device_mac],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Nome do dispositivo atualizado com sucesso! Atualize a tela.',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => console.log('Nome atualizado do device!'),
                                },
                            ],
                            { cancelable: false }
                        );
                      
                    } else {
                        alert('Erro ao atualizar o ambiente do dispositivo!');
                    }
                }
            );
        });

    }

    deleteDevice = (macDevice) => {

        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE from device where mac = ?',
                [macDevice],
                (tx, results) => {
                
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Dispositivo deletado com sucesso!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => console.log('Ambiente do device atualizado com sucesso!'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Erro ao deletar o dispositivo!');
                    }
                }
            );
        });

    }
}