import React from 'react'
import { View, Text, Image } from 'react-native'

const ProductItem = (props) => {
	return (
		<View style={{ width: '90%', borderRadius: 8, borderWidth: 0.3, borderColor: '#867f7f', flexDirection: 'row', marginTop: 10, minHeight: 110 }}>
			<View style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: '#e0aa7b', width: 10, height: '100%' }}></View>
			<View style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row' }}>
				<Image style={{ height: 80, width: 80 }} resizeMode='center' source={{uri: props.image}}></Image>
				<View style={{ width: '65%' }}>
					<Text style={{ fontSize: 20, fontFamily: 'proxima-regular', marginLeft: 10 }} ellipsizeMode='tail' numberOfLines={2}>{props.name}</Text>
					<View style={{ flexDirection: 'row', marginLeft: 10, justifyContent: 'space-between', marginTop: 10 }}>
						<Text style={{ fontSize: 16, fontFamily: 'proxima-regular' }}>{props.currency} {props.price}</Text>
						<Text style={{ fontSize: 16, fontFamily: 'proxima-regular' }}>Qty :{props.qty}</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

export default ProductItem
