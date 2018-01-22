import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Picker, Text, TouchableHighlight, View } from 'react-native';
import styles from './styles';

class PickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      items: [],
      value: undefined,
    };
  }

  open = ({ items }) => {
    this.setState({ items });
    this.showPickerModal();
  }

  handleCancel = () => (this.setState({ open: false }));

  handleOk = () => {
    const { items, value } = this.state;
    this.handleCancel();
    if (this.props.onValuePicked) {
      this.props.onValuePicked(items.find(item => item.value === value));
    }
  }

  showPickerModal = () => (
    this.setState({ open: true })
  )

  render() {
    const { open, value } = this.state;
    return (
      <Modal visible={open} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <Picker
              selectedValue={value}
              onValueChange={newValue => this.setState({ value: newValue })}
            >
              {this.props.children}
            </Picker>
            <View style={styles.containerTwoGrid}>
              <TouchableHighlight style={styles.containerItemTwoGrid} onPress={this.handleCancel}>
                <Text style={styles.buttonTextStyle}>{this.props.cancelLabel}</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.containerItemTwoGrid} onPress={this.handleOk}>
                <Text style={styles.buttonTextStyle}>{this.props.okLabel}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

PickerModal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  okLabel: PropTypes.string,
  onValuePicked: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string,
};

PickerModal.defaultProps = {
  okLabel: 'Aceptar',
  cancelLabel: 'Cancelar',
};

export default PickerModal;
