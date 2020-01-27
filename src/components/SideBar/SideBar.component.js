import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { __ } from "../../js/constants";
import {getData, removeData} from '../../js/Helper'

const SideBar = (props) => {

  const [language, setLanguage] = useState({
    lang: '',
    loader: true
  });
  const [name, setName] = useState('')

  const getLanguage = async () => {
    setLanguage({ lang: await getData('language'), loader: false });
  }

  const getUserDetails = async () => {
    let userDetails = JSON.parse(await getData('userDetails'));
    setName(userDetails.firstname+' '+userDetails.lastname);
  }

  useEffect(() => {
    getUserDetails()
    getLanguage();
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Icon size={60} name="md-contact" color={'white'} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.menuItemsContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.menuEachView}>
            <Text style={styles.menuItemText}>{__('Order', language.lang)}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.menuEachView}>
            <Text style={styles.menuItemText}>{__('Change Language', language.lang)}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={async() => {
          await removeData('userDetails');
          props.navigation.navigate('Login');
        }}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.menuEachView}>
            <Text style={styles.menuItemText}>{__('Logout', language.lang)}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: 'white' },
  header: { backgroundColor: '#08768A', height: 150, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  name: { fontSize: 20, fontFamily: 'proxima-regular', marginLeft: 18, color: 'white' },
  menuItemsContainer: { marginVertical: 20 },
  menuEachView: { height: 50, justifyContent: 'center', paddingHorizontal: 25 },
  menuItemText: { fontSize: 20, fontFamily: 'proxima-regular' },
});
