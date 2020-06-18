import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  containerStyle: { flex: 1},
  containerLinear:{
    flex:1,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent:'flex-start',
    alignItems:'center',
    // paddingVertical:5,
    paddingTop:5,
  },
  backgroundImg: {
    justifyContent: "center",
    alignItems: "center",
    width:'100%',height:'100%'
  },
  StatusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: "transparent"
  },
  logoStyle: { alignContent: "center"},
  TXT1:{color:'#fff',fontSize:16,marginVertical:20},
  TXT2:{color:'#fff',fontSize:14,marginVertical:5}
 
});
export default styles;
