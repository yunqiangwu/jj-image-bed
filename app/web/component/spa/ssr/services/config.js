const CONSTANT_STORE_KEY = 'jjtc__';

const localStorageMap = {};
const localStorage = global.localStorage || {
  getItem: (key)=>{
    return localStorageMap[key];
  },
  setItem: (key,v)=>{
    localStorageMap[key] = v;
  }
}

export const getConfig = function (key = CONSTANT_STORE_KEY) {
  const str = localStorage.getItem(key);
  if (str) {
    try {
      return JSON.parse(str);
    } catch (e) {

    }
  }
  return null;
};

export const saveConfig = function (config={}, key=CONSTANT_STORE_KEY) {
  localStorage.setItem(key, JSON.stringify(config));
};