import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const LoginTextInput = props => {
  const [, onChangeText] = React.useState('');

  return (
    <TextInput
      style={styles.inputContainer}
      onChangeText={text => onChangeText(text)}
      placeholder={props.placeholder}
    />
  );
};

export default LoginTextInput;

const styles = StyleSheet.create({
  inputContainer: {height: 40, borderColor: '#F6F6F7', borderBottomWidth: 3},
});
