import React, { Component } from 'react';
import {
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LottieView from 'lottie-react-native';
import { Header, DashItem } from '../../components/index';
import Api from '../../js/service/api';
import { getData } from '../../js/Helper';
import { __ } from '../../js/constants';

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
      language: '',
      refreshingLoader: false
    };
    this.focusListener;
  }

  componentDidMount = async () => {
    this._getLang();
    this._getStatusList();
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      () => {
        this._getStatusList();
      });
  }

  _getLang = async () => {
    let lang = await getData('language');

    if (lang == '' || typeof lang == 'undefined' || lang == 'undefined') {
      lang = 'en';
    }

    let routes = this.state.routes;

    routes[0].title = __('Pending', lang);
    routes[1].title = __('Processing', lang);
    routes[2].title = __('Delivered', lang);
    this.setState({ routes, language: lang });
  }

  _getStatusList = async () => {
    try {
      let response = await Api.get('orders?searchCriteria[filter_groups][0][filters][0][field]=status&searchCriteria[filter_groups][0][filters][0][value]=pending', '');

      this.setState({ pendingList: response.items, loading: false });

      let processingResponse = await Api.get('orders?searchCriteria[filter_groups][0][filters][0][field]=status&searchCriteria[filter_groups][0][filters][0][value]=processing', '');

      let completedResponse = await Api.get('orders?searchCriteria[filter_groups][0][filters][0][field]=status&searchCriteria[filter_groups][0][filters][0][value]=complete', '');

      this.setState({
        processing: processingResponse.items,
        delivered: completedResponse.items,
        loading: false
      })
      console.log("completedResponseResponse", completedResponse);
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  _onRefresh = () => {
    this.setState({ refreshingLoader: true });
    this._getStatusList();
    this.setState({ refreshingLoader: false });
  };

  FirstRoute = () => {
    console.log(this.state.pendingList);
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={this.state.pendingList}
          extraData={this.state.pendingList}
          onRefresh={() => this._onRefresh()}
          refreshing={this.state.refreshingLoader}
          initialNumToRender={10}
          ListFooterComponent={<View style={{ height: 10 }} />}
          renderItem={({ item }) =>
            <DashItem
              currency={item.base_currency_code}
              totalPrice={item.base_grand_total}
              name={item.customer_firstname + ' ' + item.customer_lastname}
              itemCount={item.total_item_count}
              orderId={item.items[0].order_id}
              address={item.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.city + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.postcode}
              gMapQuery={item.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.city}
              phone={item.extension_attributes.shipping_assignments[0].shipping.address.telephone}
              status={item.status}
              onPress={() => this._onPressMoveToDetailsPage(item)}
              language={this.state.language}
              date={item.created_at}
            />
          }
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  SecondRoute = () => {
    if (this.state.processing.length == 0) {
      return <LottieView source={require('../../../assets/data.json')} autoPlay loop />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={this.state.processing}
          extraData={this.state.pendingList}
          onRefresh={() => this._onRefresh()}
          refreshing={this.state.refreshingLoader}
          initialNumToRender={10}
          ListFooterComponent={<View style={{ height: 10 }} />}
          renderItem={({ item }) =>
            <DashItem
              currency={item.base_currency_code}
              totalPrice={item.base_grand_total}
              name={item.customer_firstname + ' ' + item.customer_lastname}
              itemCount={item.total_item_count}
              orderId={item.items[0].order_id}
              address={item.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.city + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.postcode}
              gMapQuery={item.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.city}
              phone={item.extension_attributes.shipping_assignments[0].shipping.address.telephone}
              status={item.status}
              onPress={() => this._onPressMoveToDetailsPage(item)}
              language={this.state.language}
              date={item.created_at}
            />
          }
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  ThirdRoute = () => {
    if (this.state.delivered.length == 0) {
      return <LottieView source={require('../../../assets/data.json')} autoPlay loop />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={this.state.processing}
          extraData={this.state.delivered}
          onRefresh={() => this._onRefresh()}
          refreshing={this.state.refreshingLoader}
          initialNumToRender={10}
          ListFooterComponent={<View style={{ height: 10 }} />}
          renderItem={({ item }) =>
            <DashItem
              currency={item.base_currency_code}
              totalPrice={item.base_grand_total}
              name={item.customer_firstname + ' ' + item.customer_lastname}
              itemCount={item.total_item_count}
              orderId={item.items[0].order_id}
              address={item.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.city + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.postcode}
              gMapQuery={item.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' + item.extension_attributes.shipping_assignments[0].shipping.address.city}
              phone={item.extension_attributes.shipping_assignments[0].shipping.address.telephone}
              status={item.status}
              onPress={() => this._onPressMoveToDetailsPage(item)}
              language={this.state.language}
              date={item.created_at}
            />
          }
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
            processing: () => this.SecondRoute(),
            delivered: () => this.ThirdRoute(),
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
