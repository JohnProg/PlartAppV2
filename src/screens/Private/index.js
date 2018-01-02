'use strict';

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import TabBar from './../../Components/TabBar';
import { SidebarContainer, Menu } from './../../Components/SideMenu';
import Header from './../../Components/Header';
// import PushConfig from './../../Config/PushConfig';

// Pages
import AboutUsPage from './../Account/AboutUsPage';
import AnnouncementsPage from './AnnouncementsPage';
import MyAnnouncementsPage from './MyAnnouncementsPage';
import NotificationsPage from './NotificationsPage';
import ProfilePage from './../Account/ProfilePage';

// Utils
import api from './../../Utils/api';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      headerTitle: 'Anuncios',
      showHeader: true,
    };
  }

  componentDidMount() {
    if (this.props.getCurrentUser() === null || Object.keys(this.props.getCurrentUser()).length == 0) {
      AsyncStorage.getItem('user').then((user_data_json) => {
        let token = JSON.parse(user_data_json)['token'];
        api.getProfile(token)
          .then((userData) => {
            userData.token = token;
            this.props.setCurrentUser(userData);
          });
      });
    }
  }

  updateMenuState = isOpen => this.setState({ isOpen });

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  updateTitle = (headerTitle) => {
    if (headerTitle) this.setState({ headerTitle, showHeader: true });
    else this.setState({ showHeader: false });
  }

  render() {
    const menu = <Menu getCurrentUser={this.props.getCurrentUser}
      setCurrentUser={this.props.setCurrentUser}
      toggle={this.toggle}
      navigator={this.props.navigator} />

    return (
      <SidebarContainer menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        {
          !this.state.showHeader ? null :
            <Header
              title={this.state.headerTitle}
              leftText={<Icon name="menu" size={20} color="#333" />}
              rightText={<Icon name="info-outline" size={20} color="#333" />}
              onLeftPress={() => this.toggle()}
              onRightPress={() => this.props.navigator.push({ component: AboutUsPage })} />
        }
        <TabBar
          structure={
            [
              {
                title: 'Anuncios',
                iconName: 'home',
                updateTitle: () => this.updateTitle('Anuncios'),
                renderContent: () => {
                  return (
                    <AnnouncementsPage toggle={this.toggle}
                      navigator={this.props.navigator} />
                  );
                }
              },
              {
                title: 'Mis anuncios',
                iconName: 'check',
                updateTitle: () => this.updateTitle('Mis anuncios'),
                renderContent: () => {
                  return (
                    <MyAnnouncementsPage toggle={this.toggle}
                      navigator={this.props.navigator} />
                  );
                }
              },
              {
                title: 'Mensajes',
                iconName: 'inbox',
                updateTitle: () => this.updateTitle('Mis mensajes'),
                renderContent: () => {
                  return (
                    <NotificationsPage toggle={this.toggle}
                      navigator={this.props.navigator} />
                  );
                }
              },
              {
                title: 'Perfil',
                iconName: 'person',
                updateTitle: () => this.updateTitle(''),
                renderContent: () => {
                  return (
                    <ProfilePage getCurrentUser={this.props.getCurrentUser}
                      setCurrentUser={this.props.setCurrentUser}
                      navigator={this.props.navigator} />
                  );
                }
              }
            ]
          }
          activeTintColor="#673AB7"
          iconSize={25}
          selectedTab={0}
        />
        

        {/*<PushConfig onChangeToken={deviceKey => console.log(deviceKey) }/>*/}
      </SidebarContainer>
    );
  }
}
