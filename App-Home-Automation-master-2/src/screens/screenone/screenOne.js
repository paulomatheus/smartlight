import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Picker,
  Platform
} from 'react-native';
import dgram from 'dgram';
import axios from 'axios';

import { Text as TextBase,Container } from 'native-base'
import {
  toByteArray,
  multicastIP,
  multicastPort
} from '../../lib/utilities';

// database
//import EnvironmentDAO from '../../models/database/environment'
//import DeviceDAO from '../../models/database/device'
import Spinner from 'react-native-loading-spinner-overlay';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Right, Left, ListItem, Separator } from 'native-base';
import TextExtra from '../../components/textExtra'
//import Icon from 'react-native-vector-icons/FontAwesome';
//import { openDatabase } from 'react-native-sqlite-storage';
import EditableText from '../../components/editable';
import EditablePlus from '../../components/editablePlus'
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";

var db;
var table_envi;
var table_dev;
var ambientes;
var nome_amb = "Todos";

function verifyEnvironment(deviceMac, deviceAmb) {

  achou = false

  for (i = 0; i < ambientes.length; i++) {
    if (ambientes[i].name == deviceAmb) {
      achou = true
      table_dev.updateAmbDevice(deviceAmb, deviceMac)
      break;
    }
  }

  if (achou == false) {
    alert('Ambiente inválido!')
  }
}


function deletarDispositivo(macDevice) {

  Alert.alert(
    'Informação',
    'Deseja excluir o dispositivo?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Errou'),
        style: 'cancel',
      },
      { text: 'Sim', onPress: () => deletarDispositivoDoBanco(macDevice) },
    ],
    { cancelable: false },
  );
}

function deletarDispositivoDoBanco(macDevice) {
  var achou = false;

  var dbDevice = new DeviceDAO()

  dbDevice.deleteDevice(macDevice)

}

export default class ScreenOne extends Component {

  static environment = ''

  constructor(props) {

    super(props);

    //db = openDatabase({ name: 'lumenx.db' });

    // verificando a criação do banco e tabelas
    //table_envi = new EnvironmentDAO()
    //table_envi.create_table()

    //table_dev = new DeviceDAO()
    //table_dev.create_table()

    this.multicastClient = null;
    this.arrayip = [];
    this.amountIp = null;
    this.amountObj = null;
    this.state = {
      deviceDataList: [],
      arrayip: [],
      amb: [],
      spinner: true,
      amb_name: '',
      devices: [],
      search: '',
      showIcons: true,
      digitando: false,
      iconePrincipal: 0
    };

    this.changeName = this.changeName.bind(this);
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  static navigationOptions = { title: 'Home', header: null };

  initTest() {
    const ob = { "id": 1, "ipdevice": "111.111.111.111", "name": "Teste", "value": "OFF", "environment": "Sala" }
    const ob2 = { "id": 2, "ipdevice": "222.222.222.222", "name": "Teste 2", "value": "ON", "environment": "Cozinha" }

    this.listaDeTeste = []
    this.listaDeTeste.push(ob)
    this.listaDeTeste.push(ob2)

  }



  componentWillMount() {
    //this.startMulticast()
    //table_envi.viewAllEnvironment(this)
    //this.state.devices = this.searchAllDevices()

    this.initTest()


    setTimeout(() => {

      this.setState({
        amb_name: 'Todos',
        spinner: false,
        color: '#001B2E'

      });

      this.state.amb.push({ id: 0, name: 'Novos dispositivos' })

      this.state.amb.sort(this.dynamicSort("name"))

      ambientes = this.state.amb;

      //this.startMulticast()

      this.forceUpdate()


    }, 2000);
  }

  componentWillReceiveProps() {
  //  this.startMulticast()
  }

  changeName = (ip) => {
    this.props.navigation.navigate('ScreenThree', { ip });
  }

  addVar = () => {
    this.props.navigation.navigate('ScreenThree');
  }

  sendMessage(msg) {
    console.log(msg);
    try {

      this.multicastClient.send(msg, 0, msg.length, multicastPort, multicastIP, function (err) {
        if (err) {

          Alert.alert(
            'Informação',
            'Problema de conexão',
            [
              {
                text: 'Ok',
                onPress: () => console.log('Erro da internet'),
              },
            ],
            { cancelable: false }
          );
        }
        console.log('Multicast sent: ', msg);
      });

    } catch (error) {
      console.log('Erro = ' + error)
    }
  }
  scan() {
    const buf = toByteArray('D');
    console.log('SCAN FOR DISCOVERY');
    this.sendMessage(buf);
  }

  getData() {
    for (var i = 0; i < this.amountIp; i++) {
      axios.get(`http://${this.state.arrayip[i]}/deviceData`)
        .then(response => {
          this.state.deviceDataList.push(response.data);
          this.setState({ deviceDataList: this.state.deviceDataList });
          console.log('deviceDataList: ', this.state.deviceDataList.length, this.state.deviceDataList);

        })
        .catch(() => { console.log('Error'); })
    }

    return this.state.deviceDataList
  }

  // startMulticast() {
  //   this.setState({ deviceDataList: [] });
  //   if (this.multicastClient) {
  //     console.log('Multicast already started...');
  //     this.scan();
  //     this.setState({ arrayip: [] })
  //     return this.multicastClient;
  //   }
  //   this.multicastClient = dgram.createSocket('udp4');
  //   this.multicastClient.bind(multicastPort);

  //   this.multicastClient.on('message', (data, info) => {
  //     const dataString = String.fromCharCode.apply(null, data);
  //     this.amountIp = this.state.arrayip.push(dataString);
  //     console.log(this.amountIp, this.state.arrayip);
  //     this.getData();
  //   });

  // }

  removeDuplicates(arr) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) == -1) {
        unique_array.push(arr[i])
      }
    }
    return unique_array
  }

  verify() {
    //this.startMulticast()
    //this.searchAllDevices()

  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  updatePicker(op) {
    ScreenOne.environment = op;
    this.setState({ amb_name: op })
  }

  removeDuplicatesTwo(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  DevicesFoundMessage() {
    Alert.alert(
      'Informação',
      'Nenhum dispositivo encontrado!',
      [
        {
          text: 'Ok',
          onPress: () => console.log(
            'Nenhum device encontrado!'),
        },
      ],
      { cancelable: false }
    );
  }

  searchAllDevices() {

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM device', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }

        this.state.devices = temp;

        this.forceUpdate()


      });
    })

  }

  validate() {

    var resp = -1;

    var devicesDaRede = this.state.deviceDataList;

    if (this.state.devices == undefined) {
      this.state.devices = []
    }

    var qtd_devices_rede = devicesDaRede.length;
    var qtd_devices_bd = this.state.devices.length;

    console.log('BD = ' + qtd_devices_bd + ', Rede = ' + qtd_devices_rede)

    // verificando se alguem dos dados da lista estão no banco
    for (i = 0; i < devicesDaRede.length; i++) {

      for (j = 0; j < this.state.devices.length; j++) {

        //alert('Name = '+devicesDaRede[i].name+', MAC = '+this.state.devices[j].mac)
        if (devicesDaRede[i].name == this.state.devices[j].mac) {
          resp = 0;
          break;
        }

      }
      if (resp == -1) {
        table_dev.register_device(devicesDaRede[i], '*Novos dispositivos*', this.props)
      }
    }

  }

  changeIps() {

    for (i = 0; i < this.state.deviceDataList.length; i++) {
      for (j = 0; j < this.state.devices.length; j++) {
        if (this.state.deviceDataList[i].name == this.state.devices[j].mac) {
          this.state.devices[j].ip = this.state.deviceDataList[i].ipdevice;
          this.state.devices[j].value = this.state.deviceDataList[i].value;
          break;
        }
      }
    }

  }

  esconde() {
    if (this.state.showIcons == false) {
      this.setState({ showIcons: true })
    }
    else {
      this.setState({ showIcons: false })
    }
  }


  updateSearch = search => {
    this.setState({ search })
    this.setState({ digitando: true })
    //busca = this.state.search
    this.forceUpdate()

  }

  ajudaSenhor() {
    this.setState({ digitando: false })
    this.forceUpdate()
  }

  atualizarAmbNoBD() {
    var ambientes = this.props.ambientes;
    var achou = false;

    this.dbDevice = new DeviceDAO()


    for (i = 0; i < ambientes.length; i++) {
      console.log('Name = ' + this.state.name + ', Name2 = ' + ambientes[i].name)
      if (this.state.name == ambientes[i].name) {
        achou = true;
        this.dbDevice.updateAmbDevice(this.state.name, this.props.item.mac, this)
        break;
      }
    }

    if (achou == false)
      alert('Nome do ambiente inválido!')
  }
  MudarTela (numeroTela){

    if (numeroTela == 1){
      this.props.navigation.navigate('ScreenLampada');
    }
    else if (numeroTela == 2){
      this.props.navigation.navigate('ScreenHome');
    }
    else {
      this.props.navigation.navigate('ScreenHelp');
    }

  }

 /*  render() {

    const { search } = this.state;

    const newList = this.removeDuplicatesTwo(this.state.deviceDataList, "name")
    this.state.deviceDataList = newList;

    // verifica quem está novo na rede e salva no banco sem ambiente
    //this.validate()

    //this.changeIps()

    return (


       <View style={styles.mainContainer}>
        {this.state.spinner == false ? (

          <View style={{ flex: 1 }} >
            <Container style={{
              backgroundColor: '#002540', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30
            }}>

           {/*    <Left>
                <Icon style={{ marginLeft: 15, color: 'white' }} name="menu" onPress={() => this.esconde()} />
              </Left> 

              <Image style={{ width: 80, height: 30, marginHorizontal: 100 }}
                source={require('../../img/logo.png')} />

              <Right>
                <Icon style={{ marginRight: 15, color: 'white' }} name="refresh" onPress={() => this.verify()} />
              </Right>
 
            </Container>
            
    {/*         <View>
              {this.state.showIcons == true &&
                // <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                //   <Left style={{ marginLeft: 60 }}>
                //     <Icon style={{ color: '#203864' }} size={50} name="lightbulb-o" onPress = {()=> this.MudarTela(1)} />
                //   </Left>
                //   <Icon style={{ color: '#203864' }} size={50} name="home" onPress = {()=> this.MudarTela(2)} />
                //   <Right style={{ marginRight: 60 }}>
                //     <Icon style={{ color: '#203864' }} size={50} name="question-circle-o" onPress = {()=> this.MudarTela(3)}/>

                //   </Right>
                // </View>
              

            </View> 

        

              <SearchBar
                placeholder="Digite..."
                lightTheme
                round
                onChangeText={this.updateSearch}
                value={search}
                autoCorrect={false}
                onClear={() => this.ajudaSenhor()}
              />

              <View style={{ flex: 6, marginTop: 15 }}>

                <View style={{ backgroundColor: '#fff', height: 6 }} />

                <ScrollView>

                  {this.state.amb.map((amb) => {

                    return (

                      <View >
                        {this.state.digitando == false ? (
                          <Collapse key={amb.name}>
                            <CollapseHeader>
                              <Separator style={{ height: 50, backgroundColor: 'white' }} bordered >
                                <View style={{ flexDirection: 'row' }}>

                                  {/* <Icon style={{ marginLeft: 15 }}
                                    name="cog" size={20} color="#001321">
                                  </Icon> 
                                  <Text style={{ marginLeft: 15, color: '#203864', fontSize: 20, fontWeight: 'bold' }}>{amb.name}</Text>
                                                                 
                                <Right>
                                  <Icon style={{ marginRight: 30 }}
                                    name="angle-down" size={20} color="#001321">
                                  </Icon>
                                </Right> 

                                </View>
                              </Separator>
                            </CollapseHeader>
                            <CollapseBody>
                              {this.state.devices.map(function (item) {
                                return (
                                  <View>
                                    {amb.name == item.amb ? (


                                      <ListItem style={{ marginLeft: 10}}>
                                        <View style={{ flexDirection: 'row' }}>
                                         {/*  <Icon
                                            name="trash" size={22} color="#001321" onPress={() => deletarDispositivo(item.mac)}>
                                          </Icon> 
                                          
                                            <Icon style={{ marginLeft: 30 }}
                                          name="pencil" size={30} color="#001321">
                                        </Icon> 
                                          // <Text style={{ marginHorizontal: 30 }}>{item.ip} 
                                          {/* </Text> 
                                          <EditableText style={{ marginHorizontal: 30 }} item={item} />
                                          <TextExtra style={{ marginHorizontal: 20 }} item={item} />
                                          {/* <EditablePlus item={item} ambientes={ambientes} /> 
                                        </View>

                                      </ListItem>
                                    ) : null}
                                  </View>
                                )
                              })
                              }

                            </CollapseBody>

                          </Collapse>
                        ) : (
                            <View>
                              {this.state.search == amb.name && (
                                <Collapse key={amb.name}>
                                  <CollapseHeader>
                                    <Separator style={{ height: 50, backgroundColor: 'white' }} bordered >
                                      <View style={{ flexDirection: 'row' }}>

                                        {/* <Icon style={{ marginLeft: 15 }}
                                          name="cog" size={20} color="#001321">
                                        </Icon> 
                                        <Text style={{ marginLeft: 15, color: '#203864', fontSize: 20, fontWeight: 'bold' }}>{amb.name}</Text>
                                        {/* <Right>
                                        <Icon style={{ marginRight: 30 }}
                                          name="angle-down" size={20} color="#001321">
                                        </Icon>
                                      </Right> 

                                      </View>
                                    </Separator>
                                  </CollapseHeader>
                                  <CollapseBody>
                                    {this.state.devices.map(function (item) {
                                      return (
                                        <View>
                                          {amb.name == item.amb ? (


                                            <ListItem style={{ marginLeft: 10 }}>
                                              <View style={{ flexDirection: 'row' }}>
                                               {/*  <Icon style={{ marginLeft: 10 }}
                                                  name="trash" size={22} color="#001321" onPress={() => deletarDispositivo(item.mac)}>
                                                </Icon> 
                                                {/*    <Icon style={{ marginLeft: 10 }}
                                                name="pencil" size={20} color="#001321">
                                              </Icon> 
                                                 // <Text style={{ marginHorizontal: 30 }}>{item.ip} 
                                                 </Text> 
                                                <EditableText style={{ marginHorizontal: 30 }} item={item} />
                                                <TextExtra style={{ marginHorizontal: 20 }} item={item} />
                                                {/* <EditablePlus item={item} ambientes={ambientes} /> 
                                              </View>

                                            </ListItem>
                                          ) : null}
                                        </View>
                                      )
                                    })
                                    }

                                  </CollapseBody>

                                </Collapse>
                              )}
                            </View>)}

                      </View>
                    )
                  })}
                </ScrollView>

              </View>

              <View style={styles.img}>
                <Image style={{ width: 110, height: 40 }}
                  source={require('../../img/lumenx2.png')} />
              </View>
            </View>

            ) : (

            <View style={{
              flex: 1,
              backgroundColor: '#203864',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={{ flex: 1, justifyContent: 'center', marginTop: 100 }}>
                <Text style={{ color: '#fff', fontSize: 30 }}>Olá,</Text>
                <Text style={{ color: '#fff', fontSize: 20 }}>Seja bem vindo(a)!
                 </Text>
              </View>
              <View style={{ flex: 6, justifyContent: 'center' }}>
                <Image source={require('../../img/logo2.png')} />
              </View>


              <View style={[styles.img, { marginBottom: 15 }]}>
                <Image style={{ width: 110, height: 40 }}
                  source={require('../../img/lumenx3.png')} />
                <Text style={{ color: '#fff', fontSize: 16, marginBottom: 5 }}>www.lumenx.com.br</Text>
                <Text style={{ color: '#fff', fontSize: 16, marginBottom: 30 }}>Tel: (35)3473-0235</Text>
              </View>

            </View>

            )
     
          }
          </View>  
            ) 

} */

  render(){
    
    const { search } = this.state;

    //const newList = this.removeDuplicatesTwo(this.state.deviceDataList, "name")
    //this.state.deviceDataList = newList;

    // verifica quem está novo na rede e salva no banco sem ambiente
    //this.validate()

    //this.changeIps()

    return (
      <View style={styles.mainContainer}>
     

        <View style={{ flex: 1 }} >
          <Container style={{
            backgroundColor: '#002540', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30
          }}>

            {/* <Left>
              <Icon style={{ marginLeft: 15, color: 'white' }} name="menu" onPress={() => this.esconde()} />
            </Left>   */}

            <Image style={{ width: 80, height: 30, marginHorizontal: 100 }}
              source={require('../../img/logo.png')} />
 
            {/* <Right>
              <Icon style={{ marginRight: 15, color: 'white' }} name="refresh" onPress={() => this.verify()} />
            </Right> */}
 
          </Container>
          
     
        </View>

          <View>
              {this.state.showIcons == true &&
                 <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                 
                <Text>oi</Text>
                 
                 </View>
              }

            </View> 

             {/* <SearchBar
              platform = "ios"
              placeholder="Digite..."
            
              onChangeText={this.updateSearch}
              value={search}
              autoCorrect={false}
              onClear={() => this.ajudaSenhor()}
            />  */}

            <View style={{ flex: 6, marginTop: 15 }}>

              <View style={{ backgroundColor: '#fff', height: 6 }} />

              <ScrollView>

                
              </ScrollView>

            </View>

            <View style={styles.img}>
              <Image style={{ width: 110, height: 40 }}
                source={require('../../img/lumenx2.png')} />
            </View>
          </View>
    )
    
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  second: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    height: 40,
    // width: 350
    marginTop: 0,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 10,
  },
  txtScan: {
    fontSize: 20,
    color: '#1E90FF',
    fontWeight: "100",
    fontWeight: 'bold',
  },
  img: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff'
  },
  titleApp: {
    color: 'white',
    fontSize: 30,
    marginLeft: 75

  },
  headerApp: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuDrawer: {
    marginLeft: 10
  }
})