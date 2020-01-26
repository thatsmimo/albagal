import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  // key and value are string 
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export let getData = async (key) => {
  try {
    let value = await AsyncStorage.getItem(key);
    console.log(value);
    

    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
    
  }
};

