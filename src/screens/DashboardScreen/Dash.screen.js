import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Header, DashItem } from '../../components/index';
import Api from '../../js/service/api';


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#2d768a' }}
    activeColor="#ea3149"
    labelStyle={{ fontSize: 15, fontFamily: 'proxima-regular' }}
    indicatorStyle={{ backgroundColor: '#ea3149', height: 3 }}
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
      let response = await Api.get('orders?searchCriteria[filter_groups][0][filters][0][field]=status& searchCriteria[filter_groups][0][filters][0][value]=pending', '');
      this.setState({ pendingList: response.items, loading: false })
      console.log(response);
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
            processing: this.FirstRoute,
            delivered: this.FirstRoute,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={renderTabBar}
          scrollEnabled={true}
        />
      );
    } else {
      return <View />;
    }
  }
}
