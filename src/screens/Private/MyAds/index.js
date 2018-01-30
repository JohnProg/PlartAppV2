import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

import { MyAdCell } from './../../../components/Cells';
import List from './../../../components/List/';

import * as actions from './../../../actions/adActions';

class MyAdsScreen extends Component {
  static navigatorStyle = {
    drawUnderTabBar: true,
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    if (this.props.hasInternet) {
      this.props.dispatch(actions.getMyAdvertisements());
    }
  }

  onNavigatorEvent = (event) => {
    if (event.id === 'menu') {
      this.props.navigator.toggleDrawer({
        side: 'left',
      });
    }
  }

  onSelectItem = (item) => {
    const { dispatch, navigator } = this.props;
    dispatch(actions.setCurrentAd(item));
    navigator.push({
      screen: 'plartApp.MyAdDetail',
      title: item.name.toUpperCase(),
    });
  }

  onRefresh = () => {
    if (this.props.hasInternet) {
      this.props.dispatch(actions.getMyAdvertisements());
    } else {
      Alert.alert('Necesitas internet para refrescar cambios.');
    }
  }

  onEndReached = () => {
    Alert.alert('loading more');
  }

  render() {
    const {
      isFetching, isLoadingMore, isRefreshing, items, navigator,
    } = this.props;
    return (
      <List
        data={items}
        emptyMessage="No tienes anuncios creados."
        isFetching={isFetching}
        isRefreshing={isRefreshing}
        onRefresh={this.onRefresh}
        isLoadingMore={isLoadingMore}
        onEndReached={this.onEndReached}
        navigator={navigator}
        renderItem={({ item, index }) => (
          <MyAdCell
            key={item.id}
            index={index}
            onSelectItem={() => this.onSelectItem(item)}
            item={item}
          />
        )}
      />
    );
  }
}

MyAdsScreen.propTypes = {
  hasInternet: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    setOnNavigatorEvent: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(({ app, ad }) => ({
  hasInternet: app.hasInternet,
  errors: ad.errors,
  isFetching: ad.isFetchingMyAds,
  isLoadingMore: ad.isLoadingMore,
  isRefreshing: ad.isRefreshing,
  items: ad.myItems,
}))(MyAdsScreen);
