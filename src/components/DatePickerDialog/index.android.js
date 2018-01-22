import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePickerAndroid, StyleSheet, View } from 'react-native';

export default class DatePickerDialog extends Component {
  static propTypes = {
    onDatePicked: PropTypes.func,
    onCancel: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }

  open(options: Object) {
    DatePickerAndroid.open(options).then(this.handleDatePicker);
  }

  handleDatePicker = ({ action, year, month, day }) => {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day),
      });
      if (this.props.onDatePicked) {
        this.props.onDatePicked(new Date(year, month, day));
      }
    } else if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  getSelectedDate() {
    return this.state.date;
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
});