import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';

import * as actions from './../../../actions/adActions';
import { getLocations } from './../../../actions/locationActions';
import { getProfessions } from './../../../actions/professionActions';

// Components
import Slider from './../../../components/Slider';
import { SimpleLoader } from './../../../components/Loader';
import styles from './styles';

class AdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentWillMount() {
    const { hasInternet } = this.props;
    if (hasInternet) {
      this.props.dispatch(actions.getAdvertisements());
      this.props.dispatch(getLocations());
      this.props.dispatch(getProfessions());
    }
  }

  onNavigatorEvent = (event) => {
    if (event.id === 'menu') {
      this.props.navigator.toggleDrawer({
        side: 'left',
      });
    }
    if (event.id === 'search') {
      alert('search very soon');
    }

    if (event.id === 'filters') {
      alert('filters very soon');
    }
  }

  refreshAnnouncements = async () => {
    this.setState({ isRefreshing: true });
    await this.props.dispatch(actions.getMyAdvertisements());
    this.setState({ isRefreshing: false });
  }

  updateAnnouncements = async (url, id, type) => {
    const { dispatch } = this.props;
    if (type === 'apply') {
      // await dispatch(actions.applyAd());
    } else {
      // await dispatch(actions.declineAd());
    }
    dispatch(actions.removeAdById(id));
  }

  renderList() {
    const { items } = this.props;

    if (items.length > 0) {
      return (
        <Slider
          items={items}
          updateAnnouncements={this.updateAnnouncements}
        />
      );
    }
    return (
      <Text style={styles.textWhite}>No hay anuncios.</Text>
    );
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
    const { isFetching } = this.props;
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          automaticallyAdjustContentInsets={false}
          refreshControl={this.renderRefreshControl()}
        >
          {isFetching ? <SimpleLoader /> : this.renderList()}
          {
            isFetching ? null :
              <ActionButton
                buttonColor="rgba(231,76,60,1)"
                icon={<Icon name="add" size={22} color="#fff" />}
                offsetY={40}
                offsetX={10}
                onPress={() => {
                  this.props.navigator.showModal({
                    title: 'Crear Anuncio',
                    screen: 'plartApp.CreateAd',
                    animated: true,
                    animationType: 'slide-up',
                  });
                }}
              />
          }
        </ScrollView>
      </View>
    );
  }
}

AdScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hasInternet: PropTypes.bool.isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    setOnNavigatorEvent: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(({ app, ad }) => ({
  hasInternet: app.hasInternet,
  errors: ad.errors,
  isFetching: ad.isFetching,
  items: ad.items,
}))(AdScreen);
