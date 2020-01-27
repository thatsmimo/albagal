import AsyncStorage from '@react-native-community/async-storage';
import { Linking, ToastAndroid } from "react-native";

export const storeData = async (key, value) => {
  // key and value are string 
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log(e)
  }
};

export let getData = async (key) => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
    return "";
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}

//  universal method to redirect address to google map
export const openMap = (query) => {
  Linking.openURL(`https://www.google.com/maps/search/?api=1&query= ${query}`);
};

//  universal method to redirect phone to dialer screen in phone
export const openTelephone = (phoneNumber) => {
  Linking.openURL(`tel:${phoneNumber}`);
};

// universal method to show toast
export const showToast = (text) => {
  ToastAndroid.showWithGravityAndOffset(
    text,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    0,
    50,
  );
};