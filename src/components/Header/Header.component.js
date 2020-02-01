import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getData } from '../../js/Helper';
import { __ } from '../../js/constants';

const Header = props => {
  const [lang, setLang] = useState('');

  const getLang = async () => {
    let lang = await getData('language');

    if (lang == '' || typeof lang == 'undefined' || lang == 'undefined') {
      setLang('en');
      return;
    }
    setLang(lang);
  };

  useEffect(() => {
    getLang();
  }, []);

    return props.backBtn ? (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon
              style={styles.icon}
              name="md-arrow-back"
              size={35}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.headingText, styles.marginLeft]}>
            {__(props.title, lang)}
          </Text>
        </View>
      </View>
    ) : (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Icon style={styles.icon} name="ios-menu" size={35} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.headingText, styles.marginLeft]}>
              {__(props.title, lang)}
            </Text>
          </View>
        </View>
      );


};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#08768A',
    borderBottomColor: 'white',
    borderBottomWidth: 0.2,
  },
  textContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginLeft: { marginLeft: '-20%' },
  headingText: {
    fontSize: 20,
    fontFamily: 'proxima-bold',
    color: 'white',
  },
  iconContainer: {
    width: '20%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  icon: { marginLeft: 15 },
});

export default Header;
