import React from 'react';
import { Text } from 'react-native';

export default class StyledTextBold extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'sansArabicBold' }]} />;
    // return <Text {...this.props} style={[this.props.style, { fontWeight: 'bold' }]} />;
  }
}

// return <Text {...this.props} style={[this.props.style]} />;
