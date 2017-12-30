'use strict';

import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/MaterialIcons';

// Utils
import colors from './../../Utils/colors';

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#e3e3e3'
  },
  labelText: {
    fontSize: 10
  }
});

const CustomTabBar = ({ containerWidth, goToPage, scrollValue, tabs, activeTab }) => {
  let numberOfTabs = tabs.length,
    tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: colors.purple,
      bottom: 0
    },
    left = scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
    });

  const renderTabOption = (valsString, page) => {
    let vals = valsString.split('!$#');

    return (
      <TouchableOpacity key={valsString} onPress={() => goToPage(page)} style={styles.tab}>
        <Icon name={vals[1]}
          size={parseInt(vals[2])}
          color={activeTab === page ? colors.purple : 'gray'} />
        <Text style={styles.labelText}>
          {vals[0]}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View style={styles.tabs}>
        {tabs.map((tab, i) => renderTabOption(tab, i))}
      </View>
      <Animated.View style={[tabUnderlineStyle, { left }]} />
    </View>
  );
};

export default CustomTabBar;
