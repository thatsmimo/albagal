import React from 'react';
import { View } from 'react-native';

const Card = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = {
  container: {
    flexDirection: 'row',
    height: '100%',
    backgroundColor: 'white',
    marginHorizontal: 7,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 0,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
};

export default Card;
