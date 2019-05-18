import dgram from 'dgram';
import axios from 'axios';

import {
    toByteArray,
    multicastIP,
    multicastPort
} from './utilities';

this.state = { deviceDataList: [] };

export const scan = () => {
  const buf = toByteArray('D');
  console.log('SCAN FOR DISCOVERY');
  sendMessage(buf);
}
export const sendMessage = (msg) => {
    console.log("msg", msg);
    this.multicastClient.send(msg, 0, msg.length, multicastPort, multicastIP, function (err) {
      if (err) throw err;
      console.log('Multicast sent: ', msg);
    });
  }


export const getData = () => {

  for (var i = 0; i < this.amountIp; i++) {
    axios.get(`http://${this.state.arrayip[i]}/deviceData`)
    .then(response => {
        this.state.deviceDataList.push(response.data);
        this.setState({ deviceDataList:  this.state.deviceDataList});
        console.log('deviceDataList: ', this.state.deviceDataList.length, this.state.deviceDataList);
      })
      .catch(() => { console.log('Error'); })
  }
  return this.state.deviceDataList
}

export const startMulticast = () => {
  this.setState({ deviceDataList: [] });
  if (this.multicastClient) {
    console.log('Multicast already started...');
    this.scan();
    this.setState({ arrayip: [] })
    return this.multicastClient;
  }
  this.multicastClient = dgram.createSocket('udp4');
  this.multicastClient.bind(multicastPort);

  this.multicastClient.on('message', (data, info) => {
    const dataString = String.fromCharCode.apply(null, data);
    this.amountIp = this.state.arrayip.push(dataString);
    console.log(this.amountIp, this.state.arrayip);
    this.getData();
  });
}