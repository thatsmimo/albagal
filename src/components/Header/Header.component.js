import React from 'react';
import {View, Text} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Order List</Text>
    </View>
  );
};

const styles = {
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d768a',
    borderBottomColor: 'white',
    borderBottomWidth: 0.2,
  },
  headingText: {
    fontSize: 19,
    fontFamily: 'proxima-nov',
    fontWeight: '700',
    color: 'white',
  },
};

export default Header;
