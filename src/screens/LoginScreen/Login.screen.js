import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors, assets } from '../../js/constants';
import { TextInput } from "../../components";
import { __ } from '../../js/constants';
import { storeData, getData } from '../../js/Helper';
import Api from '../../js/service/api'


let language = 'en';

const Login = props => {

  const [language, setLanguage] = useState({
    lang: '',
    loader: true
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(true);


  const getLanguage = async () => {
    setLanguage({ lang: await getData('language'), loader: false });
    setLoader(false);
  }

  const checkUser = async () => {
    let userDetails = await getData('userDetails');
    console.log(userDetails);
    if (userDetails == '' || typeof userDetails == 'undefined' || userDetails == 'undefined') {
      getLanguage();
    } else {
      props.navigation.navigate('Dashboard');
    }
  }

  const hitApi = async () => {
    let payload = {
      username: username,
      password: password
    }
    setLoader(true)
    let response = await Api.post('integration/customer/token', JSON.stringify(payload));
    if (typeof response == 'object') {
      setLoader(false);
      ToastAndroid.showWithGravityAndOffset(
        'Invalid Credentials',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50,
      );
    } else {
      setLoader(false);
      console.log(response);
      let userDetails = await Api.getUserDetails('customers/me', response);
      storeData('userDetails', JSON.stringify(userDetails));
    }
  }

  useEffect(() => {
    checkUser();
  });

  if (loader) {
    return <LottieView source={require('../../../assets/data.json')} autoPlay loop />;
  } else {
    return (
      <View style={styles.mainContainer}>
        <Image
          style={styles.imageLogo}
          resizeMode={'center'}
          source={assets.logo}
        />
        <View style={styles.inputBoxesContainer}>
          <View style={styles.inputBoxView}>
            <TextInput placeholder={__('Username', language)} onChangeText={(text) => setUsername(text)} />
          </View>
          <View style={styles.inputBoxView}>
            <TextInput placeholder={__('Password', language)} onChangeText={(text) => setPassword(text)} />
          </View>
          <TouchableOpacity
            style={styles.touchableBtnLogin}
            // onPress={() => props.navigation.navigate('Dashboard')}>
            onPress={() => hitApi()}>
            <Text style={styles.loginText}>{__('Login', language)}</Text>
          </TouchableOpacity>
          <View />
        </View>
      </View>
    );
  }
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
