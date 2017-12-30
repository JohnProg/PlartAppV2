'use strict';

import React, { Component } from 'react';

import { AsyncStorage, RefreshControl, ListView, Text, View } from 'react-native';

// Components
import Message from './../../Components/Message';
import { SimpleLoader } from './../../Components/Loader';
import { MyAdCeil } from './../../Components/Cells';

// Views
import AboutUsPage from './../Account/AboutUsPage';
import MyAnnouncementDetailPage from './MyAnnouncementDetailPage';

// Utils
import api from './../../Utils/api';

export default class MyAnnouncementsPage extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: dataSource,
      announcements: [],
      isRefreshing: false,
      areAnnouncementsLoading: true,
      token: ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);

      this.setState({ token: user_data['token'] });
      this.getMyAdvertisements();
    });
  }

  getMyAdvertisements() {
    this.setState({ areAnnouncementsLoading: true });
    api.getMyAdvertisements(this.state.token)
      .then((responseData) => {
        let announcements = responseData.length > 0 ? responseData.reverse() : [];

        this.setState({ announcements, dataSource: this.state.dataSource.cloneWithRows(announcements), areAnnouncementsLoading: false, isRefreshing: false });
      });
  }

  renderAnnouncements() {
    let { areAnnouncementsLoading, announcements, dataSource } = this.state;

    if (areAnnouncementsLoading) {
      return <SimpleLoader />;
    } else {
      return (
        <ListView
          contentContainerStyle={{
            flex: announcements.length > 0 ? 0 : 1,
            justifyContent: announcements.length > 0 ? 'flex-start' : 'center',
            alignItems: announcements.length > 0 ? 'stretch' : 'center',
          }}
          ref="listView"
          renderRow={this.renderRow}
          renderFooter={() => {
            return announcements.length > 0 ? <View style={{ height: 50 }} /> : <Text style={{ color: 'white' }}>No tienes anuncios creados.</Text>
          }}
          enableEmptySections={true}
          dataSource={dataSource}
          refreshControl={this.renderRefreshControl()}
        />
      )
    }
  }

  refreshAnnouncements = () => {
    this.setState({ isRefreshing: true });
    this.getMyAdvertisements();
  }

  onSelectItem(item) {
    this.props.navigator.push({
      component: MyAnnouncementDetailPage,
      passProps: {
        item,
      }
    });
  }

  renderRow = (item, sectionID, rowID) => (
    <MyAdCeil
        key={item.id}
        onSelectItem={() => this.onSelectItem(item)}
        item={item} />
  );

  renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this.refreshAnnouncements}
        tintColor="#fff"
        title="Cargando..."
        titleColor="#fff"
      />);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#673AB7", marginBottom: 40 }}>
        {this.renderAnnouncements()}
      </View>
    );
  }
}
