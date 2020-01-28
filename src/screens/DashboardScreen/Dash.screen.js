import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LottieView from 'lottie-react-native';
import { Header, DashItem } from '../../components/index';
import Api from '../../js/service/api';


const renderTabBar = props => (
  <TabBar
    {...props}
    style={{ backgroundColor: '#08768A' }}
    activeColor="white"
    labelStyle={{ fontSize: 15, fontFamily: 'proxima-regular', }}
    indicatorStyle={{ backgroundColor: 'white', height: 3 }}
  />
);

export default class DashBoard extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation;
    return {
      header: () => <Header title="Order List" navigation={navigation} backBtn={false} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'pending', title: 'Pending' },
        { key: 'processing', title: 'Processing' },
        { key: 'delivered', title: 'Delivered' },
      ],
      pendingList: [],
      processing: [],
      delivered: [],
      loading: true,
    };
  }

  componentDidMount = async () => {
    try {
      let response = await Api.get('orders?searchCriteria[filter_groups][0][filters][0][field]=status&searchCriteria[filter_groups][0][filters][0][value]=pending', '');
      
      this.setState({ pendingList: response.items, loading: false });

      let processingResponse = await Api.get('orders?searchCriteria[filter_groups][0][filters][0][field]=status&searchCriteria[filter_groups][0][filters][0][value]=processing', '');

      let completedResponse = await Api.get('orders?searchCriteria[filter_groups][0][filters][0][field]=status&searchCriteria[filter_groups][0][filters][0][value]=complete', '');
      
      this.setState({
        processing: processingResponse.items,
        delivered: completedResponse.items
      })
      console.log("completedResponseResponse",completedResponse);
    } catch (error) {
      console.log(error);
    }

  }

  FirstRoute = () => {
    console.log(this.state.pendingList);
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          {this.state.pendingList.map((element, key) => {
            return (
              <DashItem
                key={key}
                currency={element.base_currency_code}
                totalPrice={element.base_grand_total}
                name={element.customer_firstname + ' ' + element.customer_lastname}
                itemCount={element.total_item_count}
                orderId={element.items[0].order_id}
                address={element.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + element.extension_attributes.shipping_assignments[0].shipping.address.city + ', ' + element.extension_attributes.shipping_assignments[0].shipping.address.postcode}
                gMapQuery={element.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + element.extension_attributes.shipping_assignments[0].shipping.address.city}
                phone={element.extension_attributes.shipping_assignments[0].shipping.address.telephone}
                status='Pending'
                onPress={() => this._onPressMoveToDetailsPage(element)}
              />
            )
          })
          }
        </View>
      </ScrollView>
    );
  };

  SecondRoute = () => {
    if(this.state.processing.length == 0){
      return <LottieView source={require('../../../assets/data.json')} autoPlay loop />;
    }
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          {this.state.processing.map((element, key) => {
            return (
              <DashItem
                key={key}
                currency={element.base_currency_code}
                totalPrice={element.base_grand_total}
                name={element.customer_firstname + ' ' + element.customer_lastname}
                itemCount={element.total_item_count}
                orderId={element.items[0].order_id}
                address={element.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + element.extension_attributes.shipping_assignments[0].shipping.address.city + ', ' + element.extension_attributes.shipping_assignments[0].shipping.address.postcode}
                phone={element.extension_attributes.shipping_assignments[0].shipping.address.telephone}
                status='Pending'
                onPress={() => this._onPressMoveToDetailsPage(element)}
              />
            )
          })
          }
        </View>
      </ScrollView>
    );
  }


  ThirdRoute = () => {
    if(this.state.delivered.length == 0){
      return <LottieView source={require('../../../assets/data.json')} autoPlay loop />;
    }
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          {this.state.delivered.map((element, key) => {
            return (
              <DashItem
                key={key}
                currency={element.base_currency_code}
                totalPrice={element.base_grand_total}
                name={element.customer_firstname + ' ' + element.customer_lastname}
                itemCount={element.total_item_count}
                orderId={element.items[0].order_id}
                address={element.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + element.extension_attributes.shipping_assignments[0].shipping.address.city + ', ' + element.extension_attributes.shipping_assignments[0].shipping.address.postcode}
                phone={element.extension_attributes.shipping_assignments[0].shipping.address.telephone}
                status='Pending'
                onPress={() => this._onPressMoveToDetailsPage(element)}
              />
            )
          })
          }
        </View>
      </ScrollView>
    );
  }



  _onPressMoveToDetailsPage = (element) => {
    this.props.navigation.navigate('Details', { item: element });
  };

  render() {
    if (this.state.loading != true) {
      return (
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            pending: () => this.FirstRoute(),
            processing:() => this.SecondRoute(),
            delivered:() => this.ThirdRoute(),
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={renderTabBar}
          scrollEnabled={true}
        />
      );
    } else {
      return <LottieView source={require('../../../assets/data.json')} autoPlay loop />;
    }
  }
}
