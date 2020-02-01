import React from 'react'
import { View, Text } from 'react-native'

const NoteItem = (props) => {
  return (
    <View style={{ width: '90%', borderRadius: 8, borderWidth: 0.3, borderColor: '#867f7f', flexDirection: 'row', marginTop: 10 }}>
      <View style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: '#e0aa7b', width: 10, height: '100%' }}></View>
      <View style={{ marginLeft: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 20, fontFamily: 'proxima-bold' }}>{props.note}</Text>
        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', marginBottom: 5 }}>
          <Text style={{ fontSize: 18, fontFamily: 'proxima-regular' }}>On</Text>
          <Text style={{ fontSize: 18, fontFamily: 'proxima-bold', marginLeft: 10 }}>{props.time}</Text>
        </View>
      </View>
    </View>
  )
}

export default NoteItem
