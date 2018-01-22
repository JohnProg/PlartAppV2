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

  open = ({ value, items }) => {
    this.setState({ value, items });
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
    const { title } = this.props;
    return (
      <SinglePickerMaterialDialog
        title={title}
        items={items.map(row => ({ value: row.value, label: row.label }))}
        visible={open}
        selectedItem={value}
        onCancel={() => this.handleCancel()}
        onOk={result => this.handleOk(result)}
      />
    );
  }
}

PickerModal.propTypes = {
  title: PropTypes.string,
  onValuePicked: PropTypes.func.isRequired,
};

PickerModal.defaultProps = {
  title: '',
};

export default PickerModal;
