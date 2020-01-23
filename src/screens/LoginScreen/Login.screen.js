import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, assets} from '../../js/constants';
// import Icon from "react-native-vector-icons/Ionicons";
import LoginTextInput from '../../components/LoginTextInput';

const Login = () => {
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
          <LoginTextInput placeholder="Username" />
        </View>
        <View style={styles.inputBoxView}>
          <LoginTextInput placeholder="Password" />
        </View>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 18 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setToggleRememberMe(!valueToggleRememberMe)}>
              {valueToggleRememberMe ?
                <Icon color='#62757f' size={30} name="md-radio-button-on" /> :
                <Icon color='#62757f' size={30} name="md-radio-button-off" />}
            </TouchableOpacity>
            <Text style={{ marginLeft: 15, color: '#62757f' }}>Remember me</Text>
          </View>
          <Text style={{ color: '#62757f' }}>Forgot Password</Text>
        </View> */}
        <TouchableOpacity style={styles.touchableBtnLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        {/* <Text style={{ marginTop: 20, alignSelf: 'center', color: '#62757f' }}>Privacy and Terms</Text> */}
        <View />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colors.white},
  imageLogo: {width: '100%', height: 180, marginTop: 20},
  inputBoxesContainer: {flex: 1, paddingHorizontal: 25, marginTop: 30},
  inputBoxView: {marginVertical: 18},
  touchableBtnLogin: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#00768B',
    height: 45,
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {color: colors.white, fontSize: 16},
});
