import React from 'react';
import { Text } from 'react-native';

export default class StyledTextLight extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'sansArabicExtraLight' }]} />;
    // return <Text {...this.props} style={this.props.style} />;
  }
}
