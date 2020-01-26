import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = props => {
  return props.backBtn ? (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon style={styles.icon} name="md-arrow-back" size={30} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.headingText, styles.marginLeft]}>
          {props.title}
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>{props.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
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
    fontSize: 19,
    fontFamily: 'proxima-bold',
    color: 'white',
  },
  iconContainer: {
    width: '20%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  icon: {marginLeft: 10},
});

export default Header;
