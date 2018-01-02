'use strict';

import React, { Component } from 'react';
import { AsyncStorage, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';

// Components
import CardModal from './../../Components/CardModal';

// Utils
import api from './../../Utils/api';

export default class MyApplicationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
      isRefreshing: false,
      isLoading: false,
      scroll: true,
      showHeader: true,
      currentPositionInY: 0
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    AsyncStorage.getItem('user').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);

      this.setState({ token: user_data['token'] });
      this.getAdvertisements();
    });
  }

  getAdvertisements() {
    api.getAdvertisements(this.state.token)
      .then((responseData) => {
        // var announcementsData = this.state.announcements;
        //
        // announcementsData = announcementsData.concat(responseData.results);
        this.setState({ announcements: responseData.results, isLoading: false, isRefreshing: false });
      })
      .catch((errorObj) => {
        this.setState({ isLoading: false, isRefreshing: false });
      });
  }

  _onRefresh = (type) => {
    if (this.state.scroll) {
      this.setState({ isRefreshing: true });
      this.getAdvertisements();
    }
  }

  didCardPressed(id) {
    if (!isNaN(id)) {
      this.hideInactiveCards(id);
      this.setState({ scroll: false });
    }
    else {
      this.showActiveCards();
      this.scrollView.scrollTo({ y: this.state.currentPositionInY, animated: false });
      this.setState({ scroll: true });
    }
  }

  showActiveCards = () => {
    this.state.announcements.map((announcement) => {
      announcement.visible = true;
      return announcement;
    })
  }

  hideInactiveCards = (id) => {
    this.state.announcements.map((announcement) => {
      announcement.visible = announcement.id === id;
      return announcement;
    })
  }

  handleScroll = (event) => {
    if (this.state.scroll) {
      this.setState({ currentPositionInY: event.nativeEvent.contentOffset.y, isRefreshing: false });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#673AB7' }}>
        <ScrollView
          ref={(ref) => this.scrollView = ref}
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{ flex: this.state.announcements.length > 0 ? 0 : 1, alignItems: 'center', justifyContent: 'center' }}
          onScroll={this.handleScroll}
          style={{ flex: 1, backgroundColor: '#673AB7', marginTop: this.state.showHeader ? 60 : 0, paddingTop: this.state.showHeader ? 20 : 0 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#fff"
              title="Cargando..."
              titleColor="#fff"
            />
          }>
          {this.state.announcements.length > 0 ?
            this.state.announcements.map((announcement, i) => {
              const dateToFinish = Moment(announcement.date_finish).format('YYYY-MM-DD');
              const imageUrl = announcement.photo ? { uri: announcement.photo } : require('./../../Images/adDefaultImage.jpg');

              if (announcement.visible == undefined) {
                announcement.visible = true;
              }
              return (
                !announcement.visible ? null : <CardModal title={announcement.name}
                  description={announcement.description}
                  id={announcement.id}
                  image={imageUrl}
                  key={i}
                  currentPositionInY={this.state.currentPositionInY}
                  color={'#0E48BE'}
                  onClick={(id) => this.didCardPressed(id)}
                  due={dateToFinish} />
              )
            })
            : <Text style={{ color: '#fff' }}>No hay postulaciones.</Text>
          }
        </ScrollView>
      </View>
    );
  }
}
