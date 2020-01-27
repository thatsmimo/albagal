import React, { Component } from 'react';
import { Text, View, ToastAndroid, TextInput, TouchableOpacity, Picker, KeyboardAvoidingView } from 'react-native';
import { Header, ProductItem, NoteItem } from '../../components/index';
import Api from '../../js/service/api';
import styles from './style';

export class AddNote extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation;
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
    }
    console.log(props.navigation.getParam('orderId'), props.navigation.getParam('status'));
  }

  _onPressAddNote = async () => {

    if (this.state.text == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please add your note.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50,
      );
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
      ToastAndroid.showWithGravityAndOffset(
        'Note added.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50,
      );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.productsContainer}>
          <Text style={styles.paymentHeading}>Note</Text>
          <TextInput
            placeholder="Add note"
            multiline
            numberOfLines={5}
            textAlignVertical={'top'}
            style={{ borderColor: '#08768A', borderWidth: 1, padding: 15, fontSize: 18, maxHeight: 200, fontFamily: 'proxima-regular', marginTop: 15 }}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text} />

          <Picker
            selectedValue={this.state.isVisiblePublic}
            style={{ height: 50, width: '70%', fontSize: 30, fontFamily: 'proxima-regular', marginTop: 15 }}
            onValueChange={(itemValue, itemIndex) =>{
              console.log(itemValue, itemIndex);
              this.setState({ isVisiblePublic: itemValue })
            }
            }>
            <Picker.Item label="Private" value="0" />
            <Picker.Item label="Public" value="1" />
          </Picker>

          <TouchableOpacity
            onPress={() => this._onPressAddNote()}
            style={{
              width: '100%',
              alignSelf: 'flex-start',
              backgroundColor: '#08768A',
              height: 45,
              marginTop: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'proxima-regular', }}>Add</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


export default AddNote;
