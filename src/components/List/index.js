import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, RefreshControl, FlatList, Text, View } from 'react-native';

import { SimpleLoader } from './../Loader';
import styles from './styles';

const DIRECTIONS = {
  DOWN: 'DOWN',
  UP: 'UP',
};

class List extends Component {
  state = {
    offset: 0,
    listHeight: 0,
  };

  onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = (currentOffset > (this.state.offset - 20)) &&
      (currentOffset > 0 && this.state.offset > 0) ? DIRECTIONS.DOWN : DIRECTIONS.UP;
    this.updateOffset(currentOffset);
    if (this.props.data > 1) {
      this.toggleTabBar(direction);
    }
  }

  onRefresh = () => {
    const { isRefreshing, onRefresh } = this.props;
    if (!isRefreshing && onRefresh) {
      onRefresh();
    }
  }

  onEndReached = () => {
    const {
      data, isLoadingMore, isRefreshing, onEndReached,
    } = this.props;
    if (data.length === 0) {
      return;
    }
    if (!isRefreshing && !isLoadingMore && onEndReached) {
      // onEndReached();
    }
  }

  toggleTabBar = (direction) => {
    if (direction === DIRECTIONS.DOWN) {
      this.props.navigator.toggleTabs({
        to: 'hidden',
        animated: true,
      });
    } else {
      this.props.navigator.toggleTabs({
        to: 'shown',
        animated: true,
      });
    }
  }

  updateOffset = (offset) => {
    this.setState({ offset });
  }

  renderFooter = () => {
    let footer = null;

    if (this.props.isLoadingMore) {
      footer = (
        <View style={styles.footerStyle}>
          <ActivityIndicator size="small" color="white" />
          <Text style={styles.footerText}>...</Text>
        </View>
      );
    }
    return footer;
  }

  renderEmptyView = () => (
    <View style={[styles.emptyListStyle, { height: this.state.listHeight }]}>
      <Text style={styles.emptyMessageStyle}>{this.props.emptyMessage}</Text>
    </View>
  );

  renderList = () => {
    const { data, isRefreshing, renderItem } = this.props;

    return (
      <FlatList
        data={data}
        updateOffset={this.updateOffset}
        keyExtractor={item => item.id}
        offset={this.state.offset}
        // onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            tintColor="#fff"
            title="Cargando..."
            titleColor="#fff"
            refreshing={isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
        onLayout={(e) => {
          const { height } = e.nativeEvent.layout;
          if (this.state.listHeight < height) {
            this.setState({ listHeight: height });
          }
        }}
        onScroll={this.onScroll}
        onEndReached={this.onEndReached}
        renderItem={renderItem}
        ListEmptyComponent={this.renderEmptyView}
        ListFooterComponent={this.renderFooter}
      />
    );
  }

  render() {
    const { isFetching, data } = this.props;
    return (
      <View style={styles.mainContainer}>
        {(isFetching && data.length === 0) ? <SimpleLoader /> : this.renderList()}
      </View>
    );
  }
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  emptyMessage: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  onEndReached: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    toggleTabs: PropTypes.func.isRequired,
  }).isRequired,
};

export default List;
