import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  containerStyle: { flex: 1},
  containerLinear:{
    flex:1,paddingLeft: 15,paddingRight: 15,justifyContent:'flex-start',alignItems:'center',
    paddingTop:5,
  },
  StatusBar: {height: Constants.statusBarHeight,backgroundColor: "transparent"},
  logoStyle: { alignContent: "center"},

  titleCont:{height:50,alignItems:'flex-end',justifyContent:'center',backgroundColor:'#F7F6F7',marginBottom:30},
  title:{color:'#000',fontSize:14,marginVertical:5,paddingRight: 15},

  TxtsCont:{paddingLeft:15,paddingRight:15,justifyContent:'flex-start',alignItems:'center',
    paddingTop:5
  },
  detailCont:{marginBottom: 10,width:'100%'},
  detailTitle:{color:'#924480',marginLeft:20,fontSize:12,textAlign:'right'},
  detail:{color:'#000',fontSize:12,lineHeight:20,textAlign:'right'},
});
export default styles;