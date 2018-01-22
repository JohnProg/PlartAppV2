import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePickerIOS, Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

class DatePickerDialog extends Component {
  constructor(props) {
    super(props);
    this.modalKey = `IosDatePickerModal_${Date.now()}`;
    this.state = {
      open: false,
      options: { date: new Date() },
    };
  }

  open = (options) => {
    this.setState({ options });
    this.showPickerModal();
  }

  cancel = () => {
    this.hidePickerModal();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  ok = () => {
    this.hidePickerModal();
    if (this.props.onDatePicked) {
      this.props.onDatePicked(this.state.options.date);
    }
  }

  showPickerModal = () => (
    this.setState({ open: true })
  )

  hidePickerModal = () => (
    this.setState({ open: false })
  )

  render() {
    const { options } = this.state;
    return (
      <Modal visible={this.state.open} transparent key={this.modalKey}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <DatePickerIOS
              mode="date"
              date={options.date}
              minimumDate={options.minimumDate}
              maximumDate={options.maximumDate}
              onDateChange={(date) => {
                options.date = date;
                this.setState({
                  options,
                });
              }}
            />
            <View style={styles.containerTwoGrid}>
              <TouchableOpacity style={styles.containerItemTwoGrid} onPress={this.cancel}>
                <Text style={styles.buttonTextStyle}>{this.props.cancelLabel}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.containerItemTwoGrid} onPress={this.ok}>
                <Text style={styles.buttonTextStyle}>{this.props.okLabel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

DatePickerDialog.propTypes = {
  onDatePicked: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

DatePickerDialog.defaultProps = {
  onCancel: () => { },
  okLabel: 'Aceptar',
  cancelLabel: 'Cancelar',
};

export default DatePickerDialog;
