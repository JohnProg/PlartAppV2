import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimensions, Image, ScrollView, Text, TouchableHighlight, View } from 'react-native';

// 3rd Party Libraries
import Moment from 'moment';
import styles from './styles';

const { width } = Dimensions.get('window');

const MyAdDetailScreen = ({ item }) => (
  <View style={styles.mainContainer}>
    <ScrollView>
      <View style={styles.cell_container}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Image
            style={{ width, height: 200, margin: 2, flex: 1 }}
            source={item.photo ? { uri: item.photo.replace('http', 'https') } : require('./../../../img/adDefaultImage.jpg')}
          />
        </View>
        <Text style={{ color: '#1a1917', fontSize: 14, fontWeight: 'bold', letterSpacing: 0.5, marginBottom: 2 }} numberOfLines={1}>{item.name.toUpperCase()}</Text>
        <Text style={{ marginTop: 6, color: '#888888', fontSize: 12, fontStyle: 'italic' }} numberOfLines={4}>{item.description}</Text>
        <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Pago: {item.currency} {item.budget}</Text>
        <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Fecha Límite: {Moment(item.date_finish).format('YYYY-MM-DD')}</Text>
        <Text style={{ marginTop: 20, marginBottom: 5 }}>Postulantes:  </Text>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          {
          item.users.length === 0 ? <Text>No hay postulantes.</Text> : item.users.map((user, i) => {
            return <TouchableHighlight style={{ width: 59, height: 59, margin: 2 }} key={i} onPress={
              () => {
                navigator.push({
                  screen: 'plartApp.Login',
                  passProps: {
                    user,
                  }
                });
              }
            }
            >
            <Image
              style={{ width: 59, height: 59, margin: 2 }}
              source={user.photo ? { uri: user.photo.replace('http', 'https') } : require('./../../../img/adDefaultImage.jpg')}
            />
            </TouchableHighlight>
          })
        }
        </View>
      </View>
    </ScrollView>
  </View>
);

MyAdDetailScreen.propTypes = {
  hasInternet: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

MyAdDetailScreen.navigatorStyle = {
  tabBarHidden: true,
};

export default connect(({ app, ad }) => ({
  hasInternet: app.hasInternet,
  item: ad.item,
  isFetching: ad.isFetching,
  errors: ad.errors,
}))(MyAdDetailScreen);
