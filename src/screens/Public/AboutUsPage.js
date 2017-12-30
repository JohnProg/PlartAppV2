'use strict';

import React, {Component} from 'react';
import { BackAndroid, Linking, Platform, ScrollView, View } from 'react-native';

// 3rd Party Libraries
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';

// Components
import Header from './../../Components/Header';

export default class AboutMe extends Component{
  componentDidMount() {
    BackAndroid.addEventListener('backBtnPressed', this._handleBackBtnPress);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backBtnPressed', this._handleBackBtnPress);
  }

  _handleBackBtnPress = () => {
    this.props.navigator.pop();
    return true
  }

  render() {
    let shareOptions = {
      title: 'PUN App',
      message: 'PUN App - Watch and organize your animes without worries.',
      url: 'https://www.plart.pe/',
      subject: 'Share Link',
    };
    return (
      <View style={{flex: 1, backgroundColor: '#EFEFF4',}}>
        <Header
            title="Acerca de la App"
            leftText={<Icon name='angle-left' size={30}/>}
            onLeftPress={ () => this.props.navigator.pop() } />
        <ScrollView>
          <TableView>
            <Section header={'Info'}>
              <Cell
                cellStyle="RightDetail"
                title={'Version'}
                detail={'1.0.0'}
              />
            </Section>

            <Section header={'Others'}>
              <Cell
                cellStyle="Basic"
                title={'Share this cool app!'}
                onPress={() => Share.open(shareOptions) }
              />
              <Cell
                cellStyle="Basic"
                title={'Download'}
                onPress={() => Linking.openURL(Platform.OS === 'ios' ? 'https://github.com/JohnProg/WatchAnimeApp' : 'https://github.com/JohnProg/WatchAnimeApp') }
              />
              <Cell
                cellStyle="Basic"
                title={'Source code'}
                onPress={() => Linking.openURL('') }
              />
              <Cell
                cellStyle="Basic"
                title={'About the developer'}
                onPress={() => alert('Made by John Paul Machahuay Giraldo') }
              />
            </Section>
          </TableView>
        </ScrollView>
      </View>
    );
  }
}
