import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = props => {
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
          {props.title}
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
          {props.title}
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
    backgroundColor: '#2d768a',
    borderBottomColor: 'white',
    borderBottomWidth: 0.2,
  },
  textContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginLeft: {marginLeft: '-20%'},
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
  icon: {marginLeft: 15},
});

export default Header;
