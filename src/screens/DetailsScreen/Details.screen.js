import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Header } from '../../components/index';

//Address information
//shipping details

export class Details extends Component {
	static navigationOptions = {
		header: () => <Header title="Order Details" backBtn={true} />,
	};
	render() {
		return (
			<ScrollView>
				<View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
						<View>
							<Text style={{ fontSize: 20, fontFamily: 'proxima-regular', color: '#464141' }}>Order Id</Text>
							<Text style={{ fontSize: 36, fontFamily: 'proxima-bold' }}>1126</Text>
						</View>
						<View>
							<Text style={{ fontSize: 18, fontFamily: 'proxima-regular', color: '#464141' }}>Delivery Date</Text>
							<Text style={{ fontSize: 22, fontFamily: 'proxima-regular' }}>26 Jan 2020</Text>
						</View>
					</View>
					<View style={{marginLeft:35,marginTop:20}}>
						<Text style={{color:'#f2893c',fontSize: 22, fontFamily: 'proxima-regular'}}>Status pending</Text>
					</View>
					<View style={{ marginTop: 25, marginLeft: 35 }}>
						<Text style={{ fontSize: 20, fontFamily: 'proxima-regular', color: '#464141' }}>Customer</Text>
						<Text style={{ fontSize: 24, fontFamily: 'proxima-regular' }}>Jhon Doe</Text>
						<Text style={{ fontSize: 22, fontFamily: 'proxima-regular', color: '#115194' }}>jhon.doe@gmail.com</Text>
					</View>
					<View style={{flexDirection:'row',marginHorizontal:35,marginTop:20}}>
						<View>
						<Text>Address Information</Text>
						<View>
						<Text>Shipping Details</Text>
						</View>
						</View>

						<View>
						<Text>Address Information</Text>
						<View>
						<Text>Shipping Details</Text>
						</View>
						</View>
						

					</View>
				</View>
			</ScrollView>
		);
	}
}

export default Details;
