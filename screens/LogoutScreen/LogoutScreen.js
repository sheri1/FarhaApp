import React from 'react';
import { View, StatusBar, StyleSheet, AsyncStorage, Platform} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import Constants from 'expo-constants'

export default class LogoutScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      DataReady: null,
    };
  }

  componentDidMount() { 
    this.props.navigation.navigate("LoginScreen");
  }

  render(){
    // if (this.state.DataReady == null) {
    //     return (
    //       <View style={styles.container}>
            // <View style={styles.statusBar}>
            //   <StatusBar barStyle="light-content" />
            // </View>
    //         <View style={{flex:1, width:'100%'}}> 
    //           <UIActivityIndicator
    //             // style={{ backgroundColor: "#F2F2F2" }}
    //             color="#707070"
    //           />
    //         </View>
    //       </View>
    //     );
    //   }
      return(
          <View style={styles.container}>
            <View style={styles.statusBar}>
              <StatusBar barStyle="light-content" />
            </View>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  statusBar:{
    height: Constants.statusBarHeight,
  },
})