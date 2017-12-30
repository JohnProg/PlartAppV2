import React, { Component, PropTypes } from 'react';
import { ScrollView, Keyboard } from 'react-native';
import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType';
import ViewStylePropTypes from 'react-native/Libraries/Components/View/ViewStylePropTypes';

export class KeyboardAwareScrollView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyboardSpace: 0,
    }
  }

  // Keyboard actions
  // TODO: automatically handle TabBar height instead of using props
  updateKeyboardSpace(frames) {
    // let coordinatesHeight = (frames.endCoordinates)? frames.endCoordinates.height : frames.end.height;
    let coordinatesHeight = frames.endCoordinates.height;
    const keyboardSpace = (this.props.viewIsInsideTabBar) ? coordinatesHeight - 49 : coordinatesHeight
    this.setState({
      keyboardSpace: keyboardSpace,
    })
    return {

    }
  }

  resetKeyboardSpace() {
    this.setState({
      keyboardSpace: 0,
    })
  }

  componentDidMount() {
    // Keyboard events
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.updateKeyboardSpace.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.resetKeyboardSpace.bind(this))
  }

  componentWillUnmount() {
    // TODO: figure out if removeAllListeners is the right thing to do
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  /**
   * @param extraHeight: takes an extra height in consideration.
   */
  scrollToFocusedInput(event, reactNode, extraHeight = 69) {
    const scrollView = this.refs.keyboardScrollView.getScrollResponder();
    setTimeout(() => {
      scrollView.scrollResponderScrollNativeHandleToKeyboard(
        reactNode, extraHeight, true
      )
    }, 220)
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps='never'
        ref='keyboardScrollView'
        keyboardDismissMode='interactive'
        contentInset={{ bottom: this.state.keyboardSpace }}
        showsVerticalScrollIndicator={true}
        style={this.props.style}>
        {this.props.children}
      </ScrollView>
    )
  }
}

KeyboardAwareScrollView.propTypes = {
  style: StyleSheetPropType(ViewStylePropTypes),
  children: PropTypes.node,
  viewIsInsideTabBar: PropTypes.bool,
}
