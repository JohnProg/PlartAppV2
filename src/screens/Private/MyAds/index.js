import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RefreshControl, FlatList, Text, View } from 'react-native';

// Components
import { SimpleLoader } from './../../../components/Loader';
import { MyAdCell } from './../../../components/Cells';
import styles from './styles';
import * as actions from './../../../actions/adActions';

class MyAdsScreen extends Component {
  componentDidMount() {
    if (this.props.hasInternet) {
      this.props.dispatch(actions.getMyAdvertisements());
    }
  }

  onSelectItem(item) {
    const { dispatch, navigator } = this.props;
    dispatch(actions.setCurrentAd(item));
    navigator.push({
      screen: 'plartApp.MyAdDetail',
      title: item.name.toUpperCase(),
    });
  }

  refreshAnnouncements = () => {
    this.setState({ isRefreshing: true });
    this.getMyAdvertisements();
  }

  renderListItem = item => (
    <MyAdCell
      key={item.id}
      onSelectItem={() => this.onSelectItem(item)}
      item={item}
    />
  )

  renderList = () => {
    const { items } = this.props;
    if (items.length === 0) {
      return (
        <Text style={styles.emptyList}>No tienes anuncios.</Text>
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

MyAdsScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hasInternet: PropTypes.bool.isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(({ app, ad }) => ({
  hasInternet: app.hasInternet,
  errors: ad.errors,
  isFetching: ad.isFetching,
  items: ad.items,
}))(MyAdsScreen);
