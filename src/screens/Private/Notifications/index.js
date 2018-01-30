import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import { NotificationCeil } from './../../../components/Cells';
import List from './../../../components/List/';

import * as actions from './../../../actions/notificationActions';

class NotificationsScreen extends Component {
  static navigatorStyle = {
    drawUnderTabBar: true,
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    if (this.props.hasInternet) {
      this.props.dispatch(actions.getNotifications());
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
    Alert.alert(item.title);
  }

  onRefresh = () => {
    if (this.props.hasInternet) {
      this.props.dispatch(actions.getNotifications());
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
        emptyMessage="No tienes mensajes."
        isFetching={isFetching}
        isRefreshing={isRefreshing}
        onRefresh={this.onRefresh}
        isLoadingMore={isLoadingMore}
        onEndReached={this.onEndReached}
        navigator={navigator}
        renderItem={({ item }) => (
          <NotificationCeil
            key={item.id}
            onSelectItem={() => this.onSelectItem(item)}
            item={item}
          />
        )}
      />
    );
  }
}

NotificationsScreen.propTypes = {
  hasInternet: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  navigator: PropTypes.shape({
    toggleTabs: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    setOnNavigatorEvent: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(({ app, notification }) => ({
  hasInternet: app.hasInternet,
  items: notification.items,
  isFetching: notification.isFetching,
  isLoadingMore: notification.isLoadingMore,
  isRefreshing: notification.isRefreshing,
  errors: notification.errors,
}))(NotificationsScreen);
