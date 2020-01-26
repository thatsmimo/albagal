import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Header, DashItem } from '../../components';


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
  // static navigationOptions = {
  //   header: () => <Header title="Order List" backBtn={false} />,
  // };

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
    };
  }

  FirstRoute = () => {
    return (
      <View style={{ flex: 1 }}>
        <DashItem onPress={this._onPressMoveToDetailsPage} />
        <DashItem onPress={this._onPressMoveToDetailsPage} />
      </View>
    );
  };

  _onPressMoveToDetailsPage = () => {
    this.props.navigation.navigate('Details');
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          pending: this.FirstRoute,
          processing: this.FirstRoute,
          delivered: this.FirstRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
