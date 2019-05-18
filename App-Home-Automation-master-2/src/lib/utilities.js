////////////// Lib/Utilities.js
export const multicastIP = '239.1.1.10';
export const multicastPort = 7123;
export const tcpPort = 8888;

export const update = (obj: Object, updates: Object) => {
  return Object.assign({}, obj, updates);
};

export const updateItem = (obj: Object, id, data: Object) => {
  return update(obj, { [id]: data });
};

export const removeItem = (obj: Object, id) => {
  const newObj = Object.assign({}, obj);
  delete newObj[id];
  return newObj;
};

export const hasItem = (obj: Object, id) => {
  return obj.hasOwnProperty(id);
};

export const size = (obj: Object) => {
  return Object.keys(obj).length;
};

export const toByteArray = (obj: Object) => {
  const uint = new Uint8Array(obj.length);
  for (var i = 0, l = obj.length; i < l; i++) {
    uint[i] = obj.charCodeAt(i);
  }
  return new Uint8Array(uint);
};
