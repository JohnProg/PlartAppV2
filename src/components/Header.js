'use strict'

import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 20;

const styles = StyleSheet.create({
  navBarContainer: {
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e4e4e4',
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID
  },
  navBarTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitleText: {
    fontWeight: '500',
  },
  navBarButton: {
    paddingHorizontal: 15,
    justifyContent: 'center',
  }
});

const Header = ({ showNavBar = true, leftText, onLeftPress, onRightPress, rightText='', title, colorText, containerStyle, showStatusBar = true }) =>
  <View style={[styles.navBarContainer, containerStyle]}>
    {
      showStatusBar ? <View style={styles.statusBar}>
        <StatusBar
          translucent={true}
          backgroundColor={'#rgba(0, 0, 0, 0.2)'}
          barStyle="default"
          showHideTransition='slide'
          style={styles.statusBar}
          hidden={false}
        />
      </View> : null
    }
    {
      !showNavBar ? null :
        <View style={styles.navBar}>

          <View
            style={styles.navBarTitleContainer}>
            <Text style={[styles.navBarTitleText, { color: colorText }]}>{title}</Text>
          </View>

          {
            leftText ? <TouchableOpacity
              onPress={onLeftPress}
              style={styles.navBarButton}>
              <Text style={{ color: colorText }}>{leftText}</Text>
            </TouchableOpacity>
              : null
          }

          {
            rightText ? <TouchableOpacity
              onPress={onRightPress}
              style={styles.navBarButton}>
              <Text style={{ color: colorText }}>{rightText}</Text>
            </TouchableOpacity>
              : null
          }
        </View>
    }
  </View>

export default Header;
