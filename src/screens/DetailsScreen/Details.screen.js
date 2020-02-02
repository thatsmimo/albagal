import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import { Header, ProductItem, NoteItem } from '../../components/index';
import { openMap, openTelephone, showToast, dateFormatter, getData } from '../../js/Helper';
import Api from '../../js/service/api';
import styles from './style';
import { __ } from '../../js/constants';

export class Details extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <Header title="Order List" navigation={navigation} backBtn={true} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      item: props.navigation.getParam('item'),
      products: [],
      notes: [],
      loading: true,
      showStatusModal: false,
      statusSelected: props.navigation.getParam('item').status,
      statusMessage: '',
      language: ''
    };
    console.log('item: ', props.navigation.getParam('item'));
  }

  changeStatus = async () => {

    let params = {
      statusHistory: {
        comment: this.state.statusMessage,
        created_at: "",
        parent_id: this.state.item.items[0].order_id,
        is_customer_notified: 0,
        is_visible_on_front: 0,
        status: this.state.statusSelected
      }
    }

    console.log('params: ', params);


    let response = await Api.post('orders/' + this.state.item.items[0].order_id + '/comments', JSON.stringify(params));
    if (response) {
      showToast(__('Updated', this.state.language));
      this.props.navigation.goBack();
    }
    this.setState({ showStatusModal: false });
    showToast('Something went wrong');
  }

  componentDidMount = async () => {
    this._getLang();
    console.log('item', this.state.item);
    let NotesResponse = await Api.get('orders/' + this.state.item.items[0].order_id + '/comments');
    console.log('notes', NotesResponse);
    var notes = [];
    if (NotesResponse.items.length) {
      NotesResponse.items.map((element) => {
        notes.push(element);
      });
      this.setState({ notes: notes });
    }

    var brandsList = await Api.get('products/attributes/brand/options');

    this.state.item.items.map(async (element, key) => {
      let productResponse = await Api.get('products/' + element.sku);
      if (productResponse.custom_attributes.findIndex((element) => element.attribute_code == 'image') != -1) {
        let image = productResponse.custom_attributes.findIndex((element) => element.attribute_code == 'image');
        element.image = 'https://albagal.com/ecommerce/pub/media/catalog/product/' + productResponse.custom_attributes[image].value;
      } else {
        element.image = '';
      }

      let brand = productResponse.custom_attributes.findIndex((element) => element.attribute_code == 'brand');
      let brandNameKey = brandsList.findIndex((element) => element.value == productResponse.custom_attributes[brand].value);
      element.brandName = brandsList[brandNameKey].label;

      console.log('product', element);
      let products = this.state.products;
      products.push(element);
      this.setState({ products: products });
      console.log(this.state.item.items.length, key + 1);
      if (this.state.item.items.length == key + 1) {
        this.setState({ loading: false });
      }
    });
  };

  _getLang = async () => {
    let lang = await getData('language');

    if (lang == '' || typeof lang == 'undefined' || lang == 'undefined') {
      lang = 'en';
    }

    this.setState({ language: lang });
  }

  render() {
    const { item, products, notes, loading, language } = this.state;
    if (loading) {
      return <LottieView source={require('../../../assets/data.json')} autoPlay loop />;
    }
    return (
      <ScrollView style={{ flex: 1,backgroundColor: 'white' }}>
        <View style={styles.topContainer}>
          <View style={styles.margin20}>
            <Text style={styles.orderIdText}>{__('Order Id', language)}</Text>
            <Text style={styles.orderIdValue}>{item.items[0].order_id}</Text>
          </View>
          <View>
            <View>
              <Text style={styles.dateAndPriceText}>{__('Delivery Date', language)}</Text>
              <Text style={styles.dateAndPriceValue}>{dateFormatter(item.created_at)}</Text>
            </View>
            <View style={styles.marginTop10}>
              <Text style={styles.dateAndPriceText}>{__('Price', language)}</Text>
              <Text style={styles.dateAndPriceValue}>{item.base_currency_code} {item.base_grand_total}</Text>
            </View>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{__('Status', language)} {item.status}</Text>
          <TouchableOpacity style={styles.btn} onPress={() => this.setState({ showStatusModal: true })}>
            <Text style={styles.btnText}>{__('Change Status', language)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.customerContainer}>
          <Text style={styles.customerHeading}>{__('Customer', language)}</Text>
          <Text style={styles.nameText}>{item.customer_firstname + ' ' + item.customer_lastname}</Text>
          <Text style={styles.emailText}>{item.customer_email}</Text>
        </View>
        <View style={styles.addressContainer}>
          <View>
            <Text style={styles.addressHeadingText}>{__('Address Information', language)}</Text>
            <View style={styles.marginLeft10}>
              <Text style={styles.shippingAddressText}>{__('Shipping Address', language)}:</Text>
              <TouchableOpacity
                style={styles.addressAndPhoneContainer}
                onPress={() => openMap(item.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.city)}>
                <Icon name="md-pin" size={25} color="#08768A" />
                <Text style={styles.addressText}>{item.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.city + ', Post Code : ' + item.extension_attributes.shipping_assignments[0].shipping.address.postcode}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addressAndPhoneContainer}
                onPress={() => openTelephone(item.extension_attributes.shipping_assignments[0].shipping.address.telephone)}>
                <Icon name="md-call" size={25} color="#08768A" />
                <Text style={styles.addressText}>{item.extension_attributes.shipping_assignments[0].shipping.address.telephone}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.productsContainer}>
          <Text style={styles.paymentHeading}>{__('Payment and Shipping Method', language)}</Text>
          <View style={{}}>
            <View style={styles.shippingElementContainer}>
              <Text style={styles.regularHeading}>{__('Payment Method', language)}: </Text>
              <Text style={styles.boldText}>{item.payment.additional_information[0]}</Text>
            </View>
            <View style={styles.shippingElementContainer}>
              <Text style={styles.regularHeading}>{__('Time Slot', language)}: </Text>
              <Text style={styles.boldText} />
            </View>
            <View style={styles.shippingElementContainer}>
              <Text style={styles.regularHeading}>{__('Delivery Date', language)}: </Text>
              <Text style={styles.boldText}>{item.created_at}</Text>
            </View>
          </View>
        </View>
        <Modal
          presentationStyle="overFullScreen"
          animationType={'fade'}
          transparent
          visible={this.state.showStatusModal}>
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            paddingHorizontal: 10,
            justifyContent: 'center'
          }}>
            <View style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.6)',
              backgroundColor: '#fff',
            }}>

              <Text style={styles.modalTitles}>{__('Change Status', language)}</Text>
              <TouchableOpacity onPress={() => this.setState({ statusSelected: 'pending', statusMessage: 'Pending' })}>
                <View style={{ height: 1, backgroundColor: '#ececec', width: '100%' }} />
                <View style={styles.modelItems}>
                  {
                    this.state.statusSelected == 'pending' ? <Icon size={25} name={"md-radio-button-on"} /> : <Icon size={25} name={"md-radio-button-off"} />
                  }

                  <Text style={styles.modalItemText}>{__('Pending', language)}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ statusSelected: 'holded', statusMessage: 'On Hold' })}>
                <View style={{ height: 1, backgroundColor: '#ececec', width: '100%' }} />
                <View style={styles.modelItems}>
                  {
                    this.state.statusSelected == 'holded' ? <Icon size={25} name={"md-radio-button-on"} /> : <Icon size={25} name={"md-radio-button-off"} />
                  }
                  <Text style={styles.modalItemText}>{__('On Hold', language)}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ statusSelected: 'processing', statusMessage: 'Processing' })}>
                <View style={{ height: 1, backgroundColor: '#ececec', width: '100%' }} />
                <View style={styles.modelItems}>
                  {
                    this.state.statusSelected == 'processing' ? <Icon size={25} name={"md-radio-button-on"} /> : <Icon size={25} name={"md-radio-button-off"} />
                  }
                  <Text style={styles.modalItemText}>{__('Processing', language)}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ statusSelected: 'complete', statusMessage: 'Completed' })}>
                <View style={{ height: 1, backgroundColor: '#ececec', width: '100%' }} />
                <View style={styles.modelItems}>
                  {
                    this.state.statusSelected == 'complete' ? <Icon size={25} name={"md-radio-button-on"} /> : <Icon size={25} name={"md-radio-button-off"} />
                  }
                  <Text style={styles.modalItemText}>{__('Completed', language)}</Text>
                </View>
              </TouchableOpacity>
              <View style={{ height: 1, backgroundColor: '#ececec', width: '100%' }} />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>

                <TouchableOpacity onPress={() => this.setState({ showStatusModal: false, statusSelected: this.props.navigation.getParam('item').status })} style={{ paddingHorizontal: 20, paddingVertical: 2 }}>
                  <Text style={styles.modalTitles}>{__('Cancel', language)}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.changeStatus} style={{ paddingHorizontal: 20, paddingVertical: 2 }}>
                  <Text style={styles.modalTitles}>{__('Save', language)}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.productsContainer}>
          <View style={styles.headingWrapper}>
            <Text style={styles.paymentHeading}>{__('Products', language)} ({products.length} {__('Items', language)})</Text>
          </View>
          {products.map((element, key) => {
            return (
              <ProductItem
                key={key}
                image={element.image}
                price={element.price_incl_tax}
                currency={item.base_currency_code}
                qty={element.qty_ordered}
                name={element.name}
                brand={element.brandName}
                language={language}
              />
            );
          })
          }
        </View>
        <View style={styles.productsContainer}>
          <View style={styles.headingWrapper}>
            <Text style={styles.paymentHeading}>{__('Notes', language)}</Text>
            <TouchableOpacity style={{ width: 100, alignItems: 'flex-end' }}
              onPress={() => this.props.navigation.navigate('AddNote', {
                'orderId': item.items[0].order_id,
                'status': item.status,
              })}
            >
              <View style={[styles.btnAdd, { flexDirection: 'row' }]}>
                <Icon size={30} name="md-add-circle-outline" color='#08768A' />
                <Text style={styles.btnText}>{__('Add Note', language)}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {notes.map((element, key) => {
            return (
              <NoteItem
                key={key}
                note={element.comment}
                time={element.created_at}
              />
            );
          })
          }
        </View>
        <View style={styles.btmHeight} />
      </ScrollView>
    );
  }
}

export default Details;
