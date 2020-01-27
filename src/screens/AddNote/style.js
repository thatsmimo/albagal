import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	mainContainer: { flex: 1 },
	productsContainer: { marginTop: 30, marginHorizontal: 30, flex: 1 },
	paymentHeading: { fontSize: 20, fontFamily: 'proxima-bold', color: '#08768A' },
	inputStyle: { borderColor: '#08768A', borderWidth: 1, padding: 15, fontSize: 18, maxHeight: 200, fontFamily: 'proxima-regular', marginTop: 15 },
	pickerStyle: { height: 50, width: '70%', fontSize: 30, fontFamily: 'proxima-regular', marginTop: 15 },
	btnStyle: {
		width: '100%',
		alignSelf: 'flex-start',
		backgroundColor: '#08768A',
		height: 45,
		marginTop: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnText: { color: '#fff', fontSize: 16, fontFamily: 'proxima-regular', },
})