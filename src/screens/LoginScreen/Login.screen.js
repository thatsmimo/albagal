import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors, assets } from '../../js/constants';
import { TextInput } from "../../components";
import { __ } from '../../js/constants';
import { storeData, getData, showToast } from '../../js/Helper';
import Api from '../../js/service/api'

const Login = props => {

  const [language, setLanguage] = useState({
    lang: 'en',
    loader: true
  });
  const [username, setUsername] = useState('kazhasanali@gmail.com');
  const [password, setPassword] = useState('hasan900');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const getLanguage = async () => {
    let lang = await getData('language');
    if (lang == '' || typeof lang == 'undefined' || lang == 'undefined') {
      setLanguage({ lang: 'en', loader: false });
    } else {
      setLanguage({ lang, loader: false });
    }
  }

  const checkUser = async () => {
    setLoader(true);
    try {
      let userDetails = await getData('userDetails');
      console.log('checkUser: ', userDetails);
      if (userDetails == '' || typeof userDetails == 'undefined' || userDetails == 'undefined') {
        await getLanguage();
        setLoader(false);
      } else {
        props.navigation.navigate('Dashboard');
      }
    } catch (e) {
      console.log('error in login : ', e);
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
      showToast(__('Invalid Credentials', language));
    } else {
      let userDetails = await Api.getUserDetails('customers/me', response);
      await storeData('userDetails', JSON.stringify(userDetails));
      props.navigation.navigate('Dashboard');
      setLoader(false);
    }
  }

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
            <TextInput value={username} placeholder={__('Username', language.lang)} type='email-address' onChangeText={(text) => setUsername(text)} />
          </View>
          <View style={styles.inputBoxView}>
            <TextInput value={password} secure={true} ReturnKeyType='done' placeholder={__('Password', language.lang)} onChangeText={(text) => setPassword(text)} />
          </View>
          <TouchableOpacity
            style={styles.touchableBtnLogin}
            onPress={() => hitApi()}>
            <Text style={styles.loginText}>{__('Login', language.lang)}</Text>
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