import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, ScrollView} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Header, DashItem} from '../../components';

const FirstRoute = () => {
  return (
    <View style={{flex:1}}>
      <DashItem />
      <DashItem />
      <DashItem />
    </View>
  );
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'white'}}
    style={{backgroundColor: '#2d768a'}}
    activeColor="#ea3149"
    labelStyle={{fontSize: 15, fontFamily: 'proxima-semibold'}}
    indicatorStyle={{backgroundColor: '#ea3149', height: 3}}
  />
);

export default class DashBoard extends Component {
  static navigationOptions = {
    header: () => <Header title="Order List" backBtn={false} />,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'pending', title: 'Pending'},
        {key: 'processing', title: 'Processing'},
        {key: 'delivered', title: 'Delivered'},
      ],
    };
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          pending: FirstRoute,
          processing: FirstRoute,
          delivered: FirstRoute,
        })}
        onIndexChange={index => this.setState({index})}
        initialLayout={{width: Dimensions.get('window').width}}
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
