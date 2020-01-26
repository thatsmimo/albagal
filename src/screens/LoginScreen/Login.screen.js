import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, assets } from '../../js/constants';
import { TextInput } from "../../components";

const Login = props => {
  // const [valueToggleRememberMe, setToggleRememberMe] = React.useState(false);

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.imageLogo}
        resizeMode={'center'}
        source={assets.logo}
      />
      <View style={styles.inputBoxesContainer}>
        <View style={styles.inputBoxView}>
          <TextInput placeholder="Username" />
        </View>
        <View style={styles.inputBoxView}>
          <TextInput placeholder="Password" />
        </View>
        <TouchableOpacity
          style={styles.touchableBtnLogin}
          onPress={() => props.navigation.navigate('Dashboard')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <View />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: colors.white },
  imageLogo: { width: '100%', height: 180, marginTop: 20 },
  inputBoxesContainer: { flex: 1, paddingHorizontal: 25, marginTop: 30 },
  inputBoxView: { marginVertical: 18 },
  touchableBtnLogin: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#08768A',
    height: 45,
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: { color: colors.white, fontSize: 16, fontFamily: 'proxima-regular', },
});
