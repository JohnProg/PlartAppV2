import React from 'react';
import { Alert, Linking, Platform, ScrollView, View } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import Share from 'react-native-share';

const shareOptions = {
  title: 'Plart App',
  message: 'Plart App - Find a extra job.',
  url: 'https://www.plart.pe/',
  subject: 'Share Link',
};

const AboutUsScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#EFEFF4', }}>
    <ScrollView>
      <TableView>
        <Section header="Info">
          <Cell
            cellStyle="RightDetail"
            title="Version"
            detail="1.0.0"
          />
        </Section>

        <Section header="Others">
          <Cell
            cellStyle="Basic"
            title="Share this cool app!"
            onPress={() => Share.open(shareOptions)}
          />
          <Cell
            cellStyle="Basic"
            title="Download"
            onPress={() => Linking.openURL(Platform.OS === 'ios' ? 'https://github.com/JohnProg/WatchAnimeApp' : 'https://github.com/JohnProg/WatchAnimeApp')}
          />
          <Cell
            cellStyle="Basic"
            title="Source code"
            onPress={() => Linking.openURL('')}
          />
          <Cell
            cellStyle="Basic"
            title="About the developer"
            onPress={() => Alert.alert('Made by John Paul Machahuay Giraldo')}
          />
        </Section>
      </TableView>
    </ScrollView>
  </View>
);

export default AboutUsScreen;
