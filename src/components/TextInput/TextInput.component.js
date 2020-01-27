import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const LoginTextInput = props => {

  return (
    <TextInput
      style={styles.inputContainer}
      onChangeText={text => props.onChangeText(text)}
      placeholder={props.placeholder}
      secureTextEntry={props.secure}
      KeyboardType={props.type}
      ReturnKeyType={props.ReturnKeyType}
    />
  );
};

export default LoginTextInput;

const styles = StyleSheet.create({
  inputContainer: {height: 40, borderColor: '#F6F6F7', borderBottomWidth: 3,fontFamily: 'proxima-regular'},
});
