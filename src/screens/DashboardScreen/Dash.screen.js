import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Header} from '../../components';

const FirstRoute = () => {
  return (
    <View style={[styles.scene, {backgroundColor: '#fff'}]}>
      <View
        style={{
          height: '35%',
          backgroundColor: 'white',
          marginHorizontal: 7,
          marginVertical: 5,
          borderRadius: 3,
          borderWidth: 0,
          borderColor: 'black',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 9,
        }}
      />
    </View>
  );
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'white'}}
    style={{backgroundColor: '#2d768a'}}
    activeColor="#f2893c"
    labelStyle={{fontSize: 15, fontFamily: 'Roboto'}}
    indicatorStyle={{backgroundColor: '#f2893c', height: 3}}
  />
);

export default class DashBoard extends Component {
  static navigationOptions = {
    header: () => <Header />,
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
