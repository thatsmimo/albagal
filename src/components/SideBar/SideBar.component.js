import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SideBar = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ backgroundColor: 'gray', height: 150, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <Icon size={60} name="md-contact" />
        <Text style={{ fontSize: 20, fontFamily: 'proxima-regular', marginLeft: 18 }}>John Doe</Text>
      </View>


      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontFamily: 'proxima-regular', marginVertical: 15 }}>Order</Text>
        <Text style={{ fontSize: 20, fontFamily: 'proxima-regular', marginVertical: 15 }}>Change Language</Text>
        <Text style={{ fontSize: 20, fontFamily: 'proxima-regular', marginVertical: 15 }}>Logout</Text>
      </View>
    </View>
  );
};

export default SideBar;
