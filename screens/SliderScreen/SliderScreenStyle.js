import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  containerStyle: { flex: 1 ,backgroundColor:'#F5F5F5'},
  StatusBar: {height: Constants.statusBarHeight,backgroundColor: "transparent"},
  viewPager: {flex: 1,marginTop:30,backgroundColor:'#fff'},
  sliderTitleCont:{justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:'#F5F5F5'},
  sliderImageCont:{flex:2.6,paddingTop:0,justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:'#F5F5F5'},
  sliderDetailCont:{flex:1,justifyContent:'flex-start',alignItems:'flex-end',width:'100%',paddingHorizontal: 15,
  marginTop: 15,backgroundColor:'#fff'},
  text:{color: '#fff',fontSize:30,textAlign: 'center'},
  detailTitle:{color:'#000',textAlign:'right',fontSize: 20,width:'100%',marginBottom:15},
  detailDesc:{color:'#C1C0C0',textAlign:'right',fontSize: 15,width:'100%'},
  skipAndSaved:{paddingTop:10,flex:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'},
  skipButton:{width:'50%',justifyContent:'center',alignItems:'center',backgroundColor:'#924480',height:50,borderRadius:30},
  saved:{color:'#fff'},
  dotCont:{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}
});
export default styles;