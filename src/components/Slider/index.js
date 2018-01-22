import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

// 3rd Party Libraries
import Moment from 'moment';
import Carousel from 'react-native-snap-carousel';

// Utils
import styles from './styles';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.7;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const Slider = ({ items, updateAnnouncements }) => {
  const renderItem = ({ item }) => (
    <Announcement
      {...item}
      key={item.id}
      updateAnnouncements={updateAnnouncements}
    />
  );
  return (
    <Carousel
      data={items}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
      enableMomentum={false}
      removeClippedSubviews={false}
    />
  );
};

const Announcement = ({ id, name, budget, currency, date_finish, description, links, photo, company_logo, updateAnnouncements }) => {
  const urlApply = links.apply;
  const urlReject = links.remove_apply;
  const dateToFinish = Moment(date_finish).format('YYYY-MM-DD');
  const imageUrl = photo ? { uri: photo.replace('http', 'https') } : require('./../../img/adDefaultImage.jpg');
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ height: slideHeight, width: itemWidth }}>
      <View style={{ flex: 1, backgroundColor: '#888888', overflow: 'hidden', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
        <Image source={imageUrl} style={styles.image} />
      </View>
      <View style={{ justifyContent: 'center', paddingVertical: 20, paddingHorizontal: 16, backgroundColor: 'white', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
        <View style={{ paddingBottom: 10 }}>
          <Text style={{ color: '#1a1917', fontSize: 13, fontWeight: 'bold', letterSpacing: 0.5 }} numberOfLines={2}>{name.toUpperCase()}</Text>
          <Text style={{ marginTop: 6, color: '#888888', fontSize: 12, fontStyle: 'italic' }} numberOfLines={4}>{description}</Text>
          <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Pago: {currency} {budget}</Text>
          <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Fecha Límite: {dateToFinish}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={[styles.buttonCard, styles.buttonCardType2]}
            onPress={() => updateAnnouncements(urlReject, id, 'reject')}
            underlayColor="white"
          >
            <Text style={[styles.buttonTextCard, { color: '#673AB7' }]}>Rechazar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => updateAnnouncements(urlApply, id, 'apply')}
            style={[styles.buttonCard, styles.buttonCardType1]}
            underlayColor="white"
          >
            <Text style={styles.buttonTextCard}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Slider;
