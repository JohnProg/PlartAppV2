import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';

class PickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      items: [],
      value: undefined,
    };
  }

  open = ({ items, value }) => {
    let newValue;
    if (value) {
      newValue = items.find(item => (item.value || item.id) === value);
      this.setState({ value: newValue });
    }
    this.setState({ items });
    this.showPickerModal();
  }

  handleCancel = () => (this.setState({ open: false }));

  handleOk = (result) => {
    this.handleCancel();
    this.setState({ value: result.selectedItem }, () => {
      if (this.props.onValuePicked) {
        this.props.onValuePicked(this.state.value);
      }
    });
  }

  showPickerModal = () => (
    this.setState({ open: true })
  )

  render() {
    const { items, open, value } = this.state;
    const { title, scrolled } = this.props;
    return (
      <SinglePickerMaterialDialog
        title={title}
        items={items.map(row => ({ value: (row.value || row.id), label: (row.label || row.name) }))}
        visible={open}
        selectedItem={value}
        onCancel={() => this.handleCancel()}
        onOk={result => this.handleOk(result)}
        scrolled={scrolled}
      />
    );
  }
}

PickerModal.propTypes = {
  title: PropTypes.string,
  onValuePicked: PropTypes.func.isRequired,
  scrolled: PropTypes.bool,
};

PickerModal.defaultProps = {
  title: '',
  scrolled: false,
};

export default PickerModal;
