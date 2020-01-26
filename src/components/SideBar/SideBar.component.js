import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { __ } from "../../js/constants";

const SideBar = (props) => {

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Icon size={60} name="md-contact" color={'white'} />
        <Text style={styles.name}>John Doe</Text>
      </View>
      <View style={styles.menuItemsContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.menuEachView}>
            <Text style={styles.menuItemText}>{__('Order', 'ar')}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.menuEachView}>
            <Text style={styles.menuItemText}>{__('Change Language', 'ar')}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => props.navigation.navigate('Login')}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.menuEachView}>
            <Text style={styles.menuItemText}>{__('Logout', 'ar')}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: 'white' },
  header: { backgroundColor: '#08768A', height: 150, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  name: { fontSize: 20, fontFamily: 'proxima-regular', marginLeft: 18, color: 'white' },
  menuItemsContainer: { marginVertical: 20 },
  menuEachView: { height: 50, justifyContent: 'center', paddingHorizontal: 25 },
  menuItemText: { fontSize: 20, fontFamily: 'proxima-regular' },
});
