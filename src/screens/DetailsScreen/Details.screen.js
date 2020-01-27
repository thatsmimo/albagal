import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Header, ProductItem, NoteItem } from '../../components/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Api from '../../js/service/api';
import styles from './style';

export class Details extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation;
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
    }
    console.log(props.navigation.getParam('item'));

  }

  componentDidMount = async () => {
    console.log('item', this.state.item);
    let NotesResponse = await Api.get('orders/' + this.state.item.items[0].order_id + '/comments');
    console.log("notes", NotesResponse);
    var notes = [];
    if (NotesResponse.items.length) {
      NotesResponse.items.map((element) => {
        notes.push(element);
      });
      this.setState({ notes: notes });
    }

    this.state.item.items.map(async (element) => {
      let productResponse = await Api.get('products/' + element.sku + '/media');
      if (productResponse.length) {
        element.image = 'https://albagal.com/ecommerce/pub/media/catalog/product/' + productResponse[0].file;
      }
      console.log("product", element);
      let products = this.state.products;
      products.push(element);
      this.setState({ products: products });
    })

  }

  render() {
    const { item, products, notes } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <View style={styles.margin20}>
            <Text style={styles.orderIdText}>Order Id</Text>
            <Text style={styles.orderIdValue}>{item.items[0].order_id}</Text>
          </View>
          <View>
            <View>
              <Text style={styles.dateAndPriceText}>Delivery Date</Text>
              <Text style={styles.dateAndPriceValue}>26 Jan 2020</Text>
            </View>
            <View style={styles.marginTop10}>
              <Text style={styles.dateAndPriceText}>Price</Text>
              <Text style={styles.dateAndPriceValue}>{item.base_currency_code} {item.base_grand_total}</Text>
            </View>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Status {item.status}</Text>
          <View style={styles.btn} >
            <Text style={styles.btnText}>Change Status</Text>
          </View>
        </View>
        <View style={styles.customerContainer}>
          <Text style={styles.customerHeading}>Customer :</Text>
          <Text style={styles.nameText}>{item.customer_firstname + ' ' + item.customer_lastname}</Text>
          <Text style={styles.emailText}>{item.customer_email}</Text>
        </View>
        <View style={styles.addressContainer}>
          <View>
            <Text style={styles.addressHeadingText}>Address Information</Text>
            <View style={styles.marginLeft10}>
              <Text style={styles.shippingAddressText}>Shipping Address:</Text>
              <View style={styles.addressAndPhoneContainer}>
                <Icon name="md-pin" size={25} color="#08768A" />
                <Text style={styles.addressText}>{item.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.city + ', Post Code : ' + item.extension_attributes.shipping_assignments[0].shipping.address.postcode}</Text>
              </View>
              <View style={styles.addressAndPhoneContainer}>
                <Icon name="md-call" size={25} color="#08768A" />
                <Text style={styles.addressText}>{item.extension_attributes.shipping_assignments[0].shipping.address.telephone}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.productsContainer}>
          <Text style={styles.paymentHeading}>Payment and Shipping Method</Text>
          <View style={styles.shippingElementContainer}>
            <Text style={styles.regularHeading}>Payment Method:	</Text>
            <Text style={styles.boldText}>{item.payment.additional_information[0]}</Text>
          </View>
          <View style={styles.shippingElementContainer}>
            <Text style={styles.regularHeading}>Time Slot:	</Text>
            <Text style={styles.boldText}></Text>
          </View>
          <View style={styles.shippingElementContainer}>
            <Text style={styles.regularHeading}>Delivery Date:	</Text>
            <Text style={styles.boldText}>{item.created_at}</Text>
          </View>
        </View>
        <View style={styles.productsContainer}>
          <View style={styles.headingWrapper}>
            <Text style={styles.paymentHeading}>Products ({products.length} Items)</Text>
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
              />
            )
          })
          }
        </View>
        <View style={styles.productsContainer}>
          <View style={styles.headingWrapper}>
            <Text style={styles.paymentHeading}>Notes</Text>
            <TouchableOpacity style={{ marginRight: 35, width: 100, alignItems: 'flex-end' }}
            // onPress={() => this.props.navigation.navigate('AddNote', { "orderId": item.items[0].order_id, "status": item.status })}
            >
              <View style={[styles.btnAdd, { flexDirection: 'row' }]} >
                <Icon size={30} name="md-add-circle-outline" color='#08768A' />
                <Text style={styles.btnText}>Add Note</Text>
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
            )
          })
          }
        </View>
        <View style={styles.btmHeight}></View>
      </ScrollView >
    );
  }
}

export default Details;
