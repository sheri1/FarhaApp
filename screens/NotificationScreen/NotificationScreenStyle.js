import { StyleSheet , Dimensions } from "react-native";
import Constants from 'expo-constants'

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#F0F0F0',
  },
  containerLinear:{
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  backgroundImg: {
    justifyContent: 'flex-start',
    alignItems: "center",
    width: '100%',
  },
  StatusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: "transparent"
  },

  headerContainer:{
    width:width,borderBottomLeftRadius:30,borderBottomRightRadius:30,
    justifyContent:'center',alignItems:'center',
  },
  headerContainerStyle:{
    width: width,
    justifyContent:'center',alignItems:'center',
    borderBottomLeftRadius:30,borderBottomRightRadius:30,
  },
  headerContainerImageStyle:{
    borderBottomLeftRadius:30,borderBottomRightRadius:30,width:'100%',resizeMode:'stretch',
  },

  logoStyle: { alignContent: "center", marginBottom: 15 },
  logintxt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  KeyBoard: {
    flex: 2,
    zIndex: 1000,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // paddingTop: 10
  },
  InputContainer: {
    borderColor: "#858585",
    borderRadius: 30,
    borderWidth: 1,
    height: 50,
    width: 340,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  InputContainer2: {
    borderColor: '#4DCAC3',
    borderBottomWidth: 2,
    paddingTop: 15,
    paddingBottom: 5
  },
  InputTilte: {
    textAlign: 'right',
    color: 'white',
    fontSize: 14,
    marginBottom: 5
  },
  Input: {
    // width:'100%',
    flex: 1,
    fontSize: 12,
  },
  forget: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 10
  },
  forgetTitle: {
    fontSize: 14,
    color: '#4DCAC3'
  },
  LoginTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    width: '85%',
    height: 60
  },
  OrCont: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  SocialIconCon: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 30
  },
  SocialIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    width: 60,
    height: 60,
    margin: 10
  },
  registerCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    position: 'relative',
    bottom: 10
  }

});
export default styles;
