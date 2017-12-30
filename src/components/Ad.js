// 'use strict';

// import React, { Component } from 'react';
// import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
// var CardSwiper = require('@remobile/react-native-card-swiper');

// // 3rd Party Libraries
// import Moment from 'moment';
// import Carousel from 'react-native-snap-carousel';

// // Utils
// import helpers from './../Utils/helpers'
// import styles from '../Styles/announcement.style.js';

// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

// function wp(percentage) {
//     const value = (percentage * viewportWidth) / 100;
//     return Math.round(value);
// }

// const slideHeight = (viewportHeight / 1.4);
// const slideWidth = wp(75);

// export const sliderWidth = viewportWidth;
// export const itemHorizontalMargin = wp(2);
// export const itemWidth = slideWidth + itemHorizontalMargin * 2;

// const Slider = ({ firstItem, items, updateAnnouncements }) => {
//     const renderRow = (obj, index) => {
//         return (
//             <Announcement
//                 {...obj}
//                 key={index}
//                 updateAnnouncements={updateAnnouncements}
//             />
//         )
//     }
//     const onPressRow = (obj, index) => {
//         // console.warn('onPressRow', obj, index);
//     }
//     const onChange = (obj, index) => {
//         // console.warn('onChange', obj, index);
//     }
//     return (
//         <CardSwiper
//             list={items}
//             vertical={false}
//             width={sliderWidth}
//             height={slideHeight}
//             loop={false}
//             onPress={onPressRow}
//             onChange={onChange}
//             renderRow={renderRow}
//         />
//     );
// }

// const Announcement = ({ id, name, budget, currency, date_finish, description, links, photo, company_logo, updateAnnouncements }) => {
//     const urlApply = links.apply;
//     const urlReject = links.remove_apply;
//     const dateToFinish = Moment(date_finish).format('YYYY-MM-DD');
//     const imageUrl = photo ? { uri: photo } : require('./../Images/adDefaultImage.jpg');
//     return (
//         <TouchableOpacity
//             activeOpacity={0.9}
//             style={{ height: slideHeight }}>
//             <View style={{ flex: 1, backgroundColor: '#888888', overflow: 'hidden', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
//                 <Image source={imageUrl} style={styles.image} />
//             </View>
//             <View style={{ justifyContent: 'center', paddingVertical: 20, paddingHorizontal: 16, backgroundColor: 'white', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
//                 <View style={{ paddingBottom: 10 }}>
//                     <Text style={{ color: '#1a1917', fontSize: 13, fontWeight: 'bold', letterSpacing: 0.5 }} numberOfLines={2}>{name.toUpperCase()}</Text>
//                     <Text style={{ marginTop: 6, color: '#888888', fontSize: 12, fontStyle: 'italic' }} numberOfLines={4}>{description}</Text>
//                     <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Pago: {currency} {budget}</Text>
//                     <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Fecha Límite: {dateToFinish}</Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                     <TouchableOpacity
//                         style={[styles.buttonCard, styles.buttonCardType2]}
//                         onPress={() => updateAnnouncements(urlReject, id, 'reject')}
//                         underlayColor="white">
//                         <Text style={[styles.buttonTextCard, { color: '#673AB7' }]}>Rechazar</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         onPress={() => updateAnnouncements(urlApply, id, 'apply')}
//                         style={[styles.buttonCard, styles.buttonCardType1]}
//                         underlayColor="white">
//                         <Text style={styles.buttonTextCard}>Aceptar</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// }

// export default Slider;
