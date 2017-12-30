'use strict';

import React, { Component } from 'react';
import { Platform, ScrollView, TabBarIOS, Text, View } from 'react-native';

// 3rd Party Libraries
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import CustomTabBar from './CustomTabBar';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.selectedTab,
    }
  }

  onPressButton = tabIndex => this.setState({ selectedTab: tabIndex });

  handleChangeTab = ({ i, ref, from, }) => {
    this.props.structure[i].updateTitle ? this.props.structure[i].updateTitle() : null;
  }

  render() {
    let { structure, iconSize = 30, activeTintColor } = this.props;

    if (Platform.OS == 'android') {
      return (
        <ScrollableTabView
          locked={true}
          style={{ backgroundColor: '#FFFFFF' }}
          renderTabBar={() => <CustomTabBar />}
          onChangeTab={this.handleChangeTab}
          tabBarPosition="bottom">
          {
            structure.map((tabProps, tabIndex) =>
              <View
                style={{ flex: 1 }}
                tabLabel={tabProps.title + '!$#' + tabProps.iconName + '!$#' + iconSize}
                key={tabIndex}>
                {tabProps.renderContent()}
              </View>
            )
          }
        </ScrollableTabView>
      );
    } else {
      return (
        <TabBarIOS
          tintColor={activeTintColor}
          translucent={true}>
          {
            structure.map((tabProps, tabIndex) =>
              <Icon.TabBarItem
                title={tabProps.title}
                iconName={tabProps.iconName}
                iconSize={iconSize}
                selected={tabIndex == this.state.selectedTab}
                onPress={() => {
                  tabProps.updateTitle ? tabProps.updateTitle() : null;
                  this.onPressButton(tabIndex);
                }}
                key={tabIndex}>
                {tabProps.renderContent()}
              </Icon.TabBarItem>
            )
          }
        </TabBarIOS>
      );
    }

  }
}
