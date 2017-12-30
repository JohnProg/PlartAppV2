import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

// 3rd Party Libraries
import Moment from 'moment';

const MyAdCeil = ({ item, onSelectItem }) => (
  <TouchableHighlight
    style={styles.button}
    underlayColor='transparent'
    onPress={onSelectItem}>
    <View style={styles.cell_container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Image
          style={{ width: 60, height: 60, margin: 2, flex: .2 }}
          source={item.photo ? { uri: item.photo } : require('./../../Images/adDefaultImage.jpg')}
        />
        <View style={{ flex: .8, marginLeft: 10 }}>
          <Text style={{ color: '#1a1917', fontSize: 14, fontWeight: 'bold', letterSpacing: 0.5, marginBottom: 2 }} numberOfLines={1}>{item.name.toUpperCase()}</Text>
          <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Pago: {item.currency} {item.budget}</Text>
          <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Fecha Límite: {Moment(item.date_finish).format('DD-MM-YYYY')}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Postulantes:  </Text>
        {
          item.users.length > 0 && item.users.map((user, i) => {
            return <Image
              key={i}
              style={{ width: 22, height: 22, margin: 2 }}
              source={user.photo ? { uri: user.photo } : require('./../../Images/adDefaultImage.jpg')}
            />
          })
        }
      </View>
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  button: {
    marginTop: 11,
  },
  cell_container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 5,
    borderRadius: 3,
  },
});

export default MyAdCeil;