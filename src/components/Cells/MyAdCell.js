import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

// 3rd Party Libraries
import Moment from 'moment';
import styles from './styles';

const MyAdCeil = ({ item, index, onSelectItem }) => (
  <TouchableHighlight
    style={[styles.button, (index === 0) ? { marginTop: 20 } : {}]}
    underlayColor='transparent'
    onPress={onSelectItem}
  >
    <View style={styles.cell_container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Image
          style={{ width: 60, height: 60, margin: 2, flex: .2 }}
          source={item.photo ? { uri: item.photo.replace('http', 'https') } : require('./../../img/adDefaultImage.jpg')}
        />
        <View style={{ flex: .8, marginLeft: 10 }}>
          <Text style={{ color: '#1a1917', fontSize: 14, fontWeight: 'bold', letterSpacing: 0.5, marginBottom: 2 }} numberOfLines={1}>{item.name.toUpperCase()}</Text>
          <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Pago: {item.currency} {item.budget}</Text>
          <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Fecha Límite: {Moment(item.date_finish).format('DD-MM-YYYY')}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Postulantes: </Text>
        {
          item.users.length === 0 ? <Text>No hay postulantes.</Text> : item.users.map((user, i) => {
            return (
              <Image
                key={i}
                style={{ width: 22, height: 22, margin: 2 }}
                source={user.photo ? { uri: user.photo.replace('http', 'https') } : require('./../../img/adDefaultImage.jpg')}
              />
            );
          })
        }
      </View>
    </View>
  </TouchableHighlight>
);

export default MyAdCeil;
