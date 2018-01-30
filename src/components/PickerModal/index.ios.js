import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Picker, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

class PickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      items: [],
      value: null,
    };
  }

  open = ({ items, value }) => {
    this.setState({ items, value });
    this.showPickerModal();
  }

  handleCancel = () => (this.setState({ open: false }));

  handleOk = () => {
    const { items } = this.state;
    let { value } = this.state;
    this.handleCancel();
    if (!value) {
      value = items[0].id;
    }
    if (this.props.onValuePicked) {
      this.props.onValuePicked(items.find(item => (item.value || item.id) === value));
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
              <TouchableOpacity style={styles.containerItemTwoGrid} onPress={this.handleCancel}>
                <Text style={styles.buttonTextStyle}>{this.props.cancelLabel}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.containerItemTwoGrid} onPress={this.handleOk}>
                <Text style={styles.buttonTextStyle}>{this.props.okLabel}</Text>
              </TouchableOpacity>
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
