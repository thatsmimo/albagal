import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Picker, KeyboardAvoidingView } from 'react-native';
import { Header } from '../../components/index';
import Api from '../../js/service/api';
import styles from './style';
import { showToast, getData } from "../../js/Helper";
import { __ } from '../../js/constants';
import LottieView from 'lottie-react-native';

export class AddNote extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <Header title="Add Note" navigation={navigation} backBtn={true} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      orderId: props.navigation.getParam('orderId'),
      text: '',
      isVisiblePublic: 0,
      status: props.navigation.getParam('status'),
      language: '',
      loading: true
    };
  }

  componentDidMount = () => {
    this._getLang();
  }
  _onPressAddNote = async () => {

    if (this.state.text == '') {
      showToast(__('Please add your note.', this.state.language));
      return;
    }

    let params = {
      statusHistory: {
        comment: this.state.text,
        created_at: "",
        parent_id: this.state.orderId,
        is_customer_notified: 0,
        is_visible_on_front: this.state.isVisiblePublic, // 0 -> private
        status: this.state.status
      }
    }

    let response = await Api.post('orders/' + this.state.orderId + '/comments', JSON.stringify(params));
    if (response) {
      showToast(__('Note added.', this.state.language));
    }
  };

  _getLang = async () => {
    let lang = await getData('language');

    if (lang == '' || typeof lang == 'undefined' || lang == 'undefined') {
      lang = 'en';
    }

    this.setState({ language: lang, loading: false });
  }

  render() {
    const { language } = this.state;
    if (this.state.loading) {
      return <LottieView source={require('../../../assets/data.json')} autoPlay loop />;
    } else {
      return (
        <KeyboardAvoidingView style={styles.mainContainer} behavior="padding">
          <View style={styles.productsContainer}>
            <Text style={styles.paymentHeading}>{__('Note', language)}</Text>
            <TextInput
              placeholder={__('Add note', language)}
              multiline
              numberOfLines={5}
              textAlignVertical={'top'}
              style={styles.inputStyle}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text} />

            <Picker
              selectedValue={this.state.isVisiblePublic}
              style={styles.pickerStyle}
              onValueChange={(itemValue) => {
                this.setState({ isVisiblePublic: itemValue })
              }
              }>
              <Picker.Item label={__('Private', language)} value="0" />
              <Picker.Item label={__('Public', language)} value="1" />
            </Picker>

            <TouchableOpacity
              onPress={() => this._onPressAddNote()}
              style={styles.btnStyle}
            >
              <Text style={styles.btnText}>{__('Add', language)}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}


export default AddNote;
