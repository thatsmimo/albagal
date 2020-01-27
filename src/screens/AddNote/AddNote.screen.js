import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Picker, KeyboardAvoidingView } from 'react-native';
import { Header } from '../../components/index';
import Api from '../../js/service/api';
import styles from './style';
import { showToast } from "../../js/Helper";

export class AddNote extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <Header title="Order List" navigation={navigation} backBtn={true} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      orderId: props.navigation.getParam('orderId'),
      text: '',
      isVisiblePublic: 0,
      status: props.navigation.getParam('status'),
    };
  }

  _onPressAddNote = async () => {

    if (this.state.text == '') {
      showToast('Please add your note.');
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
      showToast('Note added.');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.mainContainer} behavior="padding">
        <View style={styles.productsContainer}>
          <Text style={styles.paymentHeading}>Note</Text>
          <TextInput
            placeholder="Add note"
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
            <Picker.Item label="Private" value="0" />
            <Picker.Item label="Public" value="1" />
          </Picker>

          <TouchableOpacity
            onPress={() => this._onPressAddNote()}
            style={styles.btnStyle}
          >
            <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


export default AddNote;
