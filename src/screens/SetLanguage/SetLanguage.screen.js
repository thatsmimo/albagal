import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, NativeModules } from 'react-native';
import { Header } from '../../components/index';
import { colors } from '../../js/constants';
import { __ } from '../../js/constants';
import { storeData, getData } from '../../js/Helper';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SetLanguage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <Header title="Change Language" navigation={navigation} backBtn={true} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
    }
  }

  componentDidMount() {
    this.checkLanguage();
  }

  getLanguage = async () => {
    let lang = await getData('language');
    if (lang == '' || typeof lang == 'undefined' || lang == 'undefined') {
      lang = 'en';
    }

    this.setState({ language: lang });
  }

  checkLanguage = async () => {
    await this.getLanguage();
  }

  changeLanguage = async (lang) => {
    if (this.state.language !== lang) {
      await storeData('language', lang)
      NativeModules.DevSettings.reload();
    }
  }

  render() {
    const { language } = this.state;
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            this.changeLanguage('en')
          }}
          style={styles.touchable}>
          <Text style={styles.text}>English</Text>
          {
            language == 'en' ? <Icon size={25} name={"md-radio-button-on"} /> : <Icon size={25} name={"md-radio-button-off"} />
          }
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.changeLanguage('ar')
          }}
          style={styles.touchable}>
          <Text style={styles.text}>{__('Arabic', language)} (Arabic)</Text>
          {
            language == 'ar' ? <Icon size={25} name={"md-radio-button-on"} /> : <Icon size={25} name={"md-radio-button-off"} />
          }
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: colors.white },
  text: { fontSize: 18, fontFamily: 'proxima-regular', marginLeft: 15 },
  touchable: { flexDirection: 'row', padding: 15, justifyContent: 'space-between', }
});
