import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Header } from '../../components/index';
import Icon from 'react-native-vector-icons/Ionicons';

export class Details extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation;
		return {
			header: () => <Header title="Order List" navigation={navigation} backBtn={true} />,
		};
	};
	render() {
		return (
			<ScrollView style={{ flex: 1 }}>
				<View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
						<View style={{marginTop:20}}>
							<Text style={{ fontSize: 20, fontFamily: 'proxima-regular', color: '#464141' }}>Order Id</Text>
							<Text style={{ fontSize: 36, fontFamily: 'proxima-bold' }}>1126</Text>
						</View>
						<View>
						<View>
							<Text style={{ fontSize: 16, fontFamily: 'proxima-regular', color: '#464141' }}>Delivery Date</Text>
							<Text style={{ fontSize: 19, fontFamily: 'proxima-bold' }}>26 Jan 2020</Text>
						</View>
						<View style={{marginTop:10}}>
							<Text style={{ fontSize: 16, fontFamily: 'proxima-regular', color: '#464141' }}>Price</Text>
							<Text style={{ fontSize: 19, fontFamily: 'proxima-bold' }}>Sar 500</Text>
						</View>
						</View>
					</View>
					<View style={{ marginLeft: 35, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={{ color: '#f2893c', fontSize: 22, fontFamily: 'proxima-regular' }}>Status pending</Text>
						<View style={{ marginRight: 32, borderColor: '#000', borderWidth: 1, borderRadius: 5 }} >
							<Text style={{ fontFamily: 'proxima-regular', padding: 5 }}>Change Status</Text>
						</View>
					</View>
					<View style={{ marginTop: 25, marginLeft: 35 }}>
						<Text style={{ fontSize: 22, fontFamily: 'proxima-bold', color: '#2d768a' }}>Customer :</Text>
						<Text style={{ fontSize: 24, fontFamily: 'proxima-regular', marginLeft: 10 }}>Jhon Doe</Text>
						<Text style={{ fontSize: 22, fontFamily: 'proxima-regular', color: '#5b93af', marginLeft: 10 }}>jhon.doe@gmail.com</Text>
					</View>
					<View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 30 }}>
						<View>
							<Text style={{ fontSize: 20, fontFamily: 'proxima-bold', color: '#2d768a' }}>Address Information</Text>
							<View style={{ marginLeft: 10 }}>
								<Text style={{ fontSize: 16, fontFamily: 'proxima-bold', color: '#5e5961', marginTop: 10 }}>Shipping Address:</Text>
								<View style={{ flexDirection: 'row', marginTop: 10, }}>
									<Icon name="md-pin" size={25} color="#1d65d2" />
									<Text style={{ fontSize: 18, fontFamily: 'proxima-regular', width: '90%', marginLeft: 10 }}>3633 Meadowcrest Lane</Text>
								</View>
								<View style={{ flexDirection: 'row', marginTop: 10, }}>
									<Icon name="md-call" size={25} color="#1d65d2" />
									<Text style={{ fontSize: 18, fontFamily: 'proxima-regular', width: '90%', marginLeft: 10 }}>89347239847</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={{ marginTop: 30, marginLeft: 30 }}>
						<Text style={{ fontSize: 20, fontFamily: 'proxima-bold', color: '#2d768a' }}>Payment and Shipping Method</Text>
						<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
							<Text style={{ fontSize: 18, fontFamily: 'proxima-regular' }}>Payment Method:	</Text>
							<Text style={{ fontSize: 18, fontFamily: 'proxima-bold' }}>Pay on Delivery</Text>
						</View>
						<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
							<Text style={{ fontSize: 18, fontFamily: 'proxima-regular' }}>Time Slot:	</Text>
							<Text style={{ fontSize: 18, fontFamily: 'proxima-bold' }}>11 am</Text>
						</View>
						<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
							<Text style={{ fontSize: 18, fontFamily: 'proxima-regular' }}>Delivery Date:	</Text>
							<Text style={{ fontSize: 18, fontFamily: 'proxima-bold' }}>26 Jan 2020</Text>
						</View>
					</View>
					<View style={{ marginTop: 30, marginLeft: 30 }}>
						<View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
							<Text style={{ fontSize: 20, fontFamily: 'proxima-bold', color: '#2d768a' }}>Products (2 Items)</Text>
						</View>
						<View style={{ width: '90%', borderRadius: 8, borderWidth: 0.3, borderColor: '#867f7f', flexDirection: 'row', marginTop: 10, minHeight:110 }}>
							<View style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: '#e0aa7b', width: 10, height: '100%' }}></View>
							<View style={{ marginLeft: 10, marginTop: 10, flexDirection:'row'}}>
								<Image style={{height:80,width:80}} resizeMode='center' source={require('../../../assets/images/image2.jpg')}></Image>
								<View style={{width:'65%' }}> 
									<Text style={{ fontSize: 20, fontFamily: 'proxima-regular',marginLeft:10}} ellipsizeMode='tail' numberOfLines={2}>Hershey's Milk Choco</Text>
									<View style={{flexDirection:'row', marginLeft:10, justifyContent:'space-between',marginTop:10}}>
										<Text style={{ fontSize: 16, fontFamily: 'proxima-regular'}}>Sar 150</Text>
										<Text style={{ fontSize: 16, fontFamily: 'proxima-regular'}}>Qty : 4</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={{ width: '90%', borderRadius: 8, borderWidth: 0.3, borderColor: '#867f7f', flexDirection: 'row', marginTop: 10, minHeight:110 }}>
							<View style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: '#e0aa7b', width: 10, height: '100%' }}></View>
							<View style={{ marginLeft: 10, marginTop: 10, flexDirection:'row'}}>
								<Image style={{height:80,width:80}} resizeMode='center' source={require('../../../assets/images/image1.jpg')}></Image>
								<View style={{width:'65%' }}> 
									<Text style={{ fontSize: 20, fontFamily: 'proxima-regular',marginLeft:10}} ellipsizeMode='tail' numberOfLines={2}>Nuttela</Text>
									<View style={{flexDirection:'row', marginLeft:10, justifyContent:'space-between',marginTop:10}}>
										<Text style={{ fontSize: 16, fontFamily: 'proxima-regular'}}>Sar 200</Text>
										<Text style={{ fontSize: 16, fontFamily: 'proxima-regular'}}>Qty : 2</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
					<View style={{ marginTop: 30, marginLeft: 30 }}>
						<View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
							<Text style={{ fontSize: 20, fontFamily: 'proxima-bold', color: '#2d768a' }}>Notes</Text>
							<View style={{ marginRight: 32, borderColor: '#000', borderWidth: 1, borderRadius: 5 }} >
								<Text style={{ fontFamily: 'proxima-regular', padding: 5 }}>Add Notes</Text>
							</View>
						</View>
						<View style={{ width: '90%', borderRadius: 8, borderWidth: 0.3, borderColor: '#867f7f', flexDirection: 'row', marginTop: 10 }}>
							<View style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: '#e0aa7b', width: 10, height: '100%' }}></View>
							<View style={{ marginLeft: 10, marginTop: 10 }}>
								<Text style={{ fontSize: 20, fontFamily: 'proxima-bold' }}>Notes this a note</Text>
								<View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
									<Text style={{ fontSize: 18, fontFamily: 'proxima-regular' }}>By</Text>
									<Text style={{ fontSize: 20, fontFamily: 'proxima-bold', marginLeft: 10 }}>Admin</Text>
								</View>
								<View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', marginBottom: 5 }}>
									<Text style={{ fontSize: 18, fontFamily: 'proxima-regular' }}>On</Text>
									<Text style={{ fontSize: 18, fontFamily: 'proxima-bold', marginLeft: 10 }}>26 Jan 2020</Text>
								</View>
							</View>
						</View>
						<View style={{ width: '90%', borderRadius: 8, borderWidth: 0.3, borderColor: '#867f7f', flexDirection: 'row', marginTop: 10 }}>
							<View style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: '#e0aa7b', width: 10, height: '100%' }}></View>
							<View style={{ marginLeft: 10, marginTop: 10 }}>
								<Text style={{ fontSize: 20, fontFamily: 'proxima-bold' }}>Notes this a note</Text>
								<View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
									<Text style={{ fontSize: 18, fontFamily: 'proxima-regular' }}>By</Text>
									<Text style={{ fontSize: 20, fontFamily: 'proxima-bold', marginLeft: 10 }}>Admin</Text>
								</View>
								<View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', marginBottom: 5 }}>
									<Text style={{ fontSize: 18, fontFamily: 'proxima-regular' }}>On</Text>
									<Text style={{ fontSize: 18, fontFamily: 'proxima-bold', marginLeft: 10 }}>26 Jan 2020</Text>
								</View>
							</View>
						</View>
						<View style={{ width: '90%', borderRadius: 8, borderWidth: 0.3, borderColor: '#867f7f', flexDirection: 'row', marginTop: 10 }}>
							<View style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: '#e0aa7b', width: 10, height: '100%' }}></View>
							<View style={{ marginLeft: 10, marginTop: 10 }}>
								<Text style={{ fontSize: 20, fontFamily: 'proxima-bold' }}>Notes this a note</Text>
								<View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
									<Text style={{ fontSize: 18, fontFamily: 'proxima-regular' }}>By</Text>
									<Text style={{ fontSize: 20, fontFamily: 'proxima-bold', marginLeft: 10 }}>Admin</Text>
								</View>
								<View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', marginBottom: 5 }}>
									<Text style={{ fontSize: 18, fontFamily: 'proxima-regular' }}>On</Text>
									<Text style={{ fontSize: 18, fontFamily: 'proxima-bold', marginLeft: 10 }}>26 Jan 2020</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View style={{ height: 30 }}></View>
			</ScrollView>
		);
	}
}

export default Details;
