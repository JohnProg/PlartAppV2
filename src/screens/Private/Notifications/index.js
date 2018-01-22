import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RefreshControl, FlatList, Text, View } from 'react-native';

// Components
import { SimpleLoader } from './../../../components/Loader/';
import { NotificationCeil } from './../../../components/Cells';

import styles from './styles';
import * as actions from './../../../actions/notificationActions';

class NotificationsScreen extends Component {
  componentDidMount() {
    if (this.props.hasInternet) {
      this.props.dispatch(actions.getNotifications());
    }
  }

  onSelectItem(item) {
    alert('nice!')
  }

  refreshAnnouncements = () => {
    this.props.dispatch(actions.getNotifications());
  }

  renderListItem(item) {
    return (
      <NotificationCeil
        key={item.id}
        onSelectItem={() => this.onSelectItem(item)}
        item={item}
      />
    );
  }

  renderList = () => {
    const { items } = this.props;
    if (items.length === 0) {
      return (
        <Text style={{ textAlign: 'center', color: 'white'}}>No tienes mensajes.</Text>
      );
    }
    return (
      <FlatList
        data={items}
        renderItem={({ item }) => this.renderListItem(item)}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.5}
      />
    );
  }

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
    const { isFetching } = this.props;
    return (
      <View style={styles.mainContainer}>
        { isFetching ? <SimpleLoader /> : this.renderList()}
      </View>
    );
  }
}


NotificationsScreen.propTypes = {
  hasInternet: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(({ app, notification }) => ({
  hasInternet: app.hasInternet,
  items: notification.items,
  isFetching: notification.isFetching,
  errors: notification.errors,
}))(NotificationsScreen);
