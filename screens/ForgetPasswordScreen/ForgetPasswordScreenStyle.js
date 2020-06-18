import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const logoColor = '#00BB9A';
const titleColor ='#8D8D8D';
const borderColor='#DCDCDC';
const baseColor='#000';

const styles = StyleSheet.create({
  containerLinear:{flex:1,justifyContent:'flex-start',alignItems:'center'},
  logoImage:{width:'100%',justifyContent: 'flex-start',alignItems: "flex-end"},
  title1:{fontSize:20,color:'#000',width:'100%',textAlign:'right',marginTop:15,marginBottom:5},
  title2:{fontSize:12,color:'#A2A2A2',width:'100%',textAlign:'right'},
  StatusBar: { height: Constants.statusBarHeight },
  logoStyle: { alignContent: "center",marginBottom: 15,marginTop:15},
  KeyBoard:{flex: 2,zIndex: 1000,justifyContent: "flex-start",alignItems: "center"},
  InputContainer2:{marginBottom:15,justifyContent:'center',alignItems:'center',height:70,paddingRight:10,
    paddingLeft:10,borderRadius:10,borderBottomColor:'#E5E5E5',borderBottomWidth:1
  },
  InputContainer2Tilte:{width:'100%',fontSize:12,textAlign: 'right',marginBottom: 5},
  InputTilte:{textAlign:'right',color: titleColor,fontSize: 14,marginBottom: 5},
  Input:{flex:1,fontSize: 12,textAlign: 'right',color:'#A2A2A2'},
  forget:{justifyContent:'center',alignItems:'center',marginTop:20,marginBottom:60},
  forgetTitle:{fontSize: 12},
  LoginTouch:{justifyContent:'center',alignItems:'center',height:50,backgroundColor:'#924480',
    borderRadius:10,width:'100%',
  },
  OrCont:{justifyContent:'center',alignItems:'center',marginTop:0},
  ortxt:{fontSize:14,color:'#000'},
  SocialIconCon:{flexDirection:'row',marginTop:15,marginBottom: 40},
  SocialIcon:{
    justifyContent:'center',alignItems:'center',backgroundColor:'white',borderRadius:30,
    width:60,height:60,margin: 10,
  },
  SocialIconFace:{
    justifyContent:'center',alignItems:'center',width:70,height:50,
    margin:5,borderRadius:10
  },
  SocialIconTwitter:{
    justifyContent:'center',alignItems:'center',width:50,height:50,
    margin:5,borderRadius:10
  },
  registerCon:{
    width:'100%',justifyContent:'center',alignItems:'center',marginVertical:20,flexDirection:'row'
  },
  txt1:{fontSize:14,color:'#924480'},
  txt2:{fontSize:14,color:'#000',marginLeft: 10}
});
export default styles;