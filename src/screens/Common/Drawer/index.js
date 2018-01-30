import React from 'react';
import PropTypes from 'prop-types';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import imageDefault from './../../../img/job.png';
import styles from './styles';
import rootNavigator from './../../../app';
import { ImageLoader } from './../../../components/Loader/';
import * as actions from './../../../actions/authActions';
import { cleanUser } from './../../../actions/meActions';

const AVATAR_SIZE = 80;

const Drawer = ({ currentUser, dispatch, navigator }) => {
  const logout = () => {
    Alert.alert(
      'Alert Title',
      'Estas seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Si',
          onPress: async () => {
            navigator.toggleDrawer({
              side: 'left',
              animated: 'true',
              to: 'closed',
            });
            await dispatch(actions.logOut());
            await dispatch(cleanUser());
            rootNavigator.startAppWithScreen({ screen: 'plartApp.Intro' });
          },
        },
      ],
    );
  };
  const fullName = `${currentUser.first_name} ${currentUser.last_name}`;

  return (
    <ScrollView
      scrollsToTop={false}
      contentContainerStyle={styles.containerMenu}
    >
      <View style={{ alignItems: 'center' }}>
        <ImageLoader
          source={currentUser.photo ? { uri: currentUser.photo.replace('http', 'https') } : imageDefault}
          style={[styles.avatar, { width: AVATAR_SIZE, height: AVATAR_SIZE }]}
          indicatorStyle={{ flex: 1, backgroundColor: 'rgba(220, 213, 228, 0.54)' }} />
        <Text style={styles.sectionSpeakerText}>
          {fullName.length > 13 ? `${fullName.slice(0, 13)}...` : fullName}
        </Text>
        <Text style={styles.sectionTitleText}>
          {currentUser.username && currentUser.username.length > 13 ? `${currentUser.username.slice(0, 13)}...` : currentUser.username}
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.item}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => (
          navigator.push({
            screen: 'plartApp.DetailProfile',
          })
        )}
      >
        <Text style={styles.item}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigator.toggleDrawer({
            side: 'left',
            animated: 'true',
            to: 'closed',
          });
          navigator.push({
            screen: 'plartApp.AboutUs',
          });
        }}
      >
        <Text style={styles.item}>Acerca de nosotros</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => logout()}
      >
        <Text style={styles.item}>Salir</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


Drawer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({}).isRequired,
};


function mapStateToProps({ me }) {
  return {
    currentUser: me.currentUser,
  };
}

export default connect(mapStateToProps)(Drawer);
