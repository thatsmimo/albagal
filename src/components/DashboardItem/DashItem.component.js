import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, T } from 'react-native';
import { Card } from '../Card/Card.component';
import Icon from 'react-native-vector-icons/Ionicons';


const DashItem = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.TouchableOpacity}>
      <Card >
        <View style={styles.container} />
        <View style={styles.leftBorder}>
          <Text style={styles.priceText}>{props.currency} {props.totalPrice}</Text>
          <Text style={styles.dateText}>22 Jan, 2020</Text>
        </View>
        <View style={styles.rightDiv}>
          <Text style={styles.nameText}>{props.name}</Text>
          <View style={styles.addressDiv}>
            <Icon name="md-pin" size={30} color='#08768A' />
            <Text style={styles.addressText}>
              {props.address}
            </Text>
          </View>
          <View style={styles.phoneDiv}>
            <Icon name="md-call" size={30} color='#08768A' />
            <Text style={styles.phoneText}>{props.phone}</Text>
          </View>
          <View style={styles.rightButtomDiv}>
            <View>
              <Text style={styles.rightBtmItemHeadText}>Order Id</Text>
              <Text style={styles.rightBtmItemitemText}>{props.orderId}</Text>
            </View>
            <View>
              <Text style={styles.rightBtmItemHeadText}>Item</Text>
              <Text style={styles.rightBtmItemitemText}>{props.itemCount}</Text>
            </View>
            <View>
              <Text style={styles.rightBtmItemHeadText}>Status</Text>
              <Text style={styles.rightBtmItemitemText}>{props.status}</Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#c5203e',
    width: '2%',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  TouchableOpacity: { flex: 1, marginVertical: 10, backgroundColor: 'white' },
  leftBorder: {
    width: '25%',
    borderRightColor: 'grey',
    borderRightWidth: 0.5,
    marginVertical: 10,
    justifyContent: 'space-around',
  },
  priceText: {
    fontFamily: 'proxima-regular',
    fontSize: 22,
    textAlign: 'center',
    color: '#424040',
  },
  dateText: {
    fontFamily: 'proxima-regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#424040',
  },
  rightDiv: { width: '74%', margin: 10 },
  nameText: {
    width: '70%',
    fontSize: 20,
    fontFamily: 'proxima-bold',
    marginLeft: 10,
    marginTop: 5,
  },
  addressDiv: {
    width: '80%',
    marginLeft: 10,
    marginTop: 8,
    flexDirection: 'row',
  },
  addressText: {
    marginLeft: 10,
    fontFamily: 'proxima-regular',
    fontSize: 15,
  },
  phoneDiv: {
    width: '80%',
    marginLeft: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    marginLeft: 10,
    fontFamily: 'proxima-regular',
    fontSize: 15,
  },
  rightButtomDiv: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  rightBtmItemHeadText: {
    fontFamily: 'proxima-regular',
    color: '#40454a',
    fontSize: 15,
    textAlign: 'center',
  },
  rightBtmItemitemText: {
    fontFamily: 'proxima-bold',
    fontSize: 15,
    color: '#646a6f',
    textAlign: 'center',
  },
});

export default DashItem;
