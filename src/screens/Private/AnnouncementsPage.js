'use strict';

import React, { Component } from 'react';

import { Alert, AsyncStorage, Modal, Platform, RefreshControl, ScrollView, Text, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import Toast from '@remobile/react-native-toast';

// Components
import Slider from './../../Components/Announcement';
import { SimpleLoader } from './../../Components/Loader';

// Views
import CreateAnnouncementPage from './CreateAnnouncementPage';

// Utils
import api from './../../Utils/api';

export default class AdvertisementsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
      locations: [],
      professions: [],
      isRefreshing: false,
      areAnnouncementsLoading: false,
      areLocationsLoading: false,
      areProfessionsLoading: false,
      token: '',
      modal: false,
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);

      this.setState({ token: user_data['token'] });
      this.getAdvertisements(true);
    });

    AsyncStorage.getItem('professions')
      .then(professionsDataStorage => {
        if (!professionsDataStorage) this.getProfessions();
        else this.setState({ professions: JSON.parse(professionsDataStorage) });
      });

    AsyncStorage.getItem('locations')
      .then(locationsDataStorage => {
        if (!locationsDataStorage) this.getLocations();
        else this.setState({ locations: JSON.parse(locationsDataStorage) });
      });
  }

  getProfessions() {
    this.setState({ areProfessionsLoading: true });
    api.getProfessions()
      .then((responseData) => {
        AsyncStorage.setItem('professions', JSON.stringify(responseData));
        this.setState({ professions: responseData, areProfessionsLoading: false });
      });
  }

  getLocations() {
    this.setState({ areLocationsLoading: true });
    api.getLocations(this.state.token)
      .then((responseData) => {
        AsyncStorage.setItem('locations', JSON.stringify(responseData));
        this.setState({ locations: responseData, areLocationsLoading: false });
      });
  }

  refreshAnnouncements = () => {
    this.setState({ isRefreshing: true });
    this.getAdvertisements(false);
  }

  getAdvertisements(isInitial = false) {
    if (isInitial) this.setState({ areAnnouncementsLoading: true });
    api.getAdvertisements(this.state.token)
      .then((responseData) => {
        let announcements = [];

        if (responseData.results) {
          announcements = responseData.results.reverse();
          announcements = announcements.filter(element => element.apply === false);
        }

        this.setState({ announcements, areAnnouncementsLoading: false, isRefreshing: false });
      });
  }

  updateAnnouncements = (url, id, type) => {
    let data = { pk: id };
    if (type === 'apply') {
      api.postApplyAdvertisement(this.state.token, url)
        .then((responseData) => {
          console.log(responseData);
        });
    } else {
      api.postDeclineAdvertisement(this.state.token, url)
        .then((responseData) => {
          console.log(responseData);
        });
    }
    if (id > -1) {
      if (this.state.announcements.length > 1) {
        let announcements = [];

        announcements = this.state.announcements.filter(function (item) {
          return item.id != id;
        });
        this.setState({ announcements: announcements });
      } else {
        this.setState({ announcements: [] });
      }
    }
  }

  renderAnnouncements() {
    let { areAnnouncementsLoading, areLocationsLoading, areProfessionsLoading, announcements } = this.state;

    if (areAnnouncementsLoading || areLocationsLoading || areProfessionsLoading) {
      return <SimpleLoader color="#fff" />;
    } else {
      if (announcements && announcements.length > 0) {
        return (
          <Slider
            items={announcements}
            updateAnnouncements={this.updateAnnouncements}
          />
        )
      } else {
        return <Text style={{ color: 'white' }}>No hay anuncios.</Text>
      }
    }
  }

  renderRefreshControl = () => (
    <RefreshControl
      refreshing={this.state.isRefreshing}
      onRefresh={this.refreshAnnouncements}
      tintColor="#fff"
      title="Cargando..."
      titleColor="#fff"
    />
  )

  render() {
    let { modal, locations, professions, areAnnouncementsLoading, areLocationsLoading, areProfessionsLoading, announcements, isRefreshing, token } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "#673AB7", justifyContent: 'center', marginBottom: 40 }}>
        <ScrollView
          contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
          automaticallyAdjustContentInsets={false}
          refreshControl={this.renderRefreshControl()}
        >
          {this.renderAnnouncements()}
          {
            (areAnnouncementsLoading || areLocationsLoading || areProfessionsLoading) ? null :
              <ActionButton
                buttonColor="rgba(231,76,60,1)"
                icon={<Icon name="add" size={22} color="#fff" />}
                offsetY={40}
                offsetX={10}
                onPress={() => { this.setState({ modal: true }) }}
              />
          }
          <Modal
            animationType="slide"
            transparent={false}
            visible={modal}
            onRequestClose={() => { }}>
            <CreateAnnouncementPage
              token={token}
              locations={locations}
              professions={professions}
              onPress={(created) => {
                this.setState({ modal: false });
                if (created) {
                  setTimeout(() => {
                    Toast.showShortTop('Este anuncio pasará por un proceso de evaluación.')
                  }, 1000);
                }
              }}
            />
          </Modal>
        </ScrollView>
      </View>
    );
  }
}
