import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const logoColor = '#00BB9A';
const titleColor ='#8D8D8D';
const borderColor='#DCDCDC';
const baseColor='#000';

const styles = StyleSheet.create({
  containerStyle: { flex: 1 },
  containerLinear:{flex:1,justifyContent:'flex-start',alignItems:'center',},
  BackIconCont:{width: '100%',justifyContent: 'flex-start',alignItems: 'flex-start'},
  backgroundImg: {justifyContent: 'flex-start',alignItems: "center",width:'100%'},
  StatusBar: { height: Constants.statusBarHeight, backgroundColor: '#F0F0F0' },
  logoStyle: { alignContent: "center",marginBottom: 15},
  logintxt:{textAlign:'center',color: titleColor,fontSize: 20,marginTop:5,marginBottom:15},
  KeyBoard:{flex: 2,zIndex: 1000,justifyContent: "flex-start",alignItems: "center",paddingTop:0},
  InputContainer: {
    borderColor: "#858585",borderRadius: 30,borderWidth: 1,height: 50,width: 340,
    alignItems: "center",justifyContent: "center",flexDirection: "row",marginBottom: 5,marginTop: 5,
    paddingLeft: 10,paddingRight: 10
  },
  InputContainer2:{marginBottom:15,justifyContent:'center',alignItems:'center',height:70,paddingRight:10,
    paddingLeft:10,borderRadius:10,borderBottomColor:'#E5E5E5',borderBottomWidth:1
  },
  pickerStyle:{flexDirection: 'row',backgroundColor:'#FAFAFA',height:50,borderRadius:10,paddingHorizontal:10,
  marginBottom: 15
},
  InputContainer2Tilte:{width:'100%',fontSize:12,textAlign: 'right',marginBottom: 5},
  InputTilte:{textAlign:'right',color: titleColor,fontSize: 14,marginBottom: 5},
  Input:{flex:1,fontSize: 12,textAlign: 'right'},
  LoginTouch:{
    justifyContent:'center',alignItems:'center',height:50,backgroundColor:'#924480',
    borderRadius:10,width:'100%',
  },
  conditionCont:{width:'100%',justifyContent:'center',alignItems:'center',},
  condition:{justifyContent:'center',alignItems:'center',marginBottom: 20},
  DialogTitleContainerTxt: {color: "#555555",fontSize: 18,padding: 15,textAlign: "right"},
  CloseButtonContainer: {
    alignSelf: "center",width:'70%',height:40,padding: 7,marginVertical:20,justifyContent:'center',
    alignItems:'center',borderRadius:10,backgroundColor:'#3FE3EA'
  },
  okButton: {color: 'white',fontSize: 14},
  okButtonText: {color: "white"},
  grayText: {fontFamily: "cairo",textAlign: "center",fontSize: 14},
  RegisterButtonCont:{justifyContent: 'center',alignItems: 'center',marginBottom:10,marginTop: 20},
  OrCont:{justifyContent:'center',marginTop:0,marginBottom:30,width:'100%',alignItems:'flex-end'},
  Ortxt:{fontSize: 20,width:'100%',textAlign:'right',color:'#000',marginBottom: 10,marginTop:40},
  Ortxt2:{fontSize: 12,width:'100%',textAlign:'right',color:'#A2A2A2'},
  SocialIconCon:{flexDirection:'row',marginTop:15,marginBottom: 20},
  SocialIconFace:{
    justifyContent:'center',alignItems:'center',backgroundColor:'#1399E5',width:70,
    height:50,margin: 10,borderRadius:10
  },
  SocialIconTwitter:{
    justifyContent:'center',alignItems:'center',backgroundColor:'#14A7F4',width:70,height:50,
    margin: 10,borderRadius:10
  },
});
export default styles;