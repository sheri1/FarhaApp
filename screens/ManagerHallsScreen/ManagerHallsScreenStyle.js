import { StyleSheet } from "react-native";
import Constants from 'expo-constants'
const titleColor ='#8D8D8D';

const styles = StyleSheet.create({
  containerStyle: { flex: 1},
  containerLinear:{
    flex:1,paddingLeft: 15,paddingRight: 15,justifyContent:'flex-start',alignItems:'center',
    paddingTop:5,
  },
  StatusBar: {height: Constants.statusBarHeight,backgroundColor: "transparent"},
  titleCont:{height:50,alignItems:'flex-end',justifyContent:'center',backgroundColor:'#F7F6F7',marginBottom:30},
  title:{color:'#000',fontSize:14,marginVertical:5,paddingRight: 15},

  searchContainer:{width:'100%',paddingHorizontal: 20,marginVertical:15,marginLeft:5,flexDirection:'row'},
  searchInputContainerStyle: {borderRadius: 10,backgroundColor: "#F5F5F5",width:'100%',
    flexDirection:'row-reverse',
  },
  searchContainerStyle:{backgroundColor: "transparent",borderTopWidth: 0,borderBottomWidth: 0},
  searchInputStyle: { textAlign: "right", fontSize: 14 },

  filterCont:{alignItems:'center',justifyContent:'center'},
  activeItem:{backgroundColor:'#924480',height:30,borderWidth:1,borderRadius:10,borderColor:'#D3D3D3',
    padding:20,justifyContent:'center',alignItems:'center'
  },
  activeTXT:{color:'#fff'},
  inActiveItem:{backgroundColor:'#fff',height:30,borderWidth:1,borderRadius:10,borderColor:'#D3D3D3',
    padding:20,justifyContent:'center',alignItems:'center'
  },
  inActiveTXT:{color:'#D3D3D3'},
  storiesImagesCont:{width:'100%',paddingHorizontal:10},

  centeredView: {
    flex: 1, justifyContent: "center",alignItems: "center",marginTop:130,backgroundColor:'#fff',
    borderTopRightRadius:120,borderTopLeftRadius:120,shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5
  },
  modalView: {
    // margin: 20,backgroundColor: "white",borderRadius: 20,padding: 35,alignItems: "center",shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5
    flex:1,justifyContent:'flex-start',alignItems:'center',paddingTop:50,paddingHorizontal:15,
    width:'100%'
  },
  firstView:{flexDirection:'row',width:'100%',paddingHorizontal:20,justifyContent:'center',alignItems:'center'},
  firstViewtilte:{flex:1,justifyContent:'center',alignItems:'center'},
  openButton: {
    backgroundColor: "#F194FF",borderRadius: 20,padding: 10,elevation: 2
  },
  textStyle: {color: "white",fontWeight: "bold",textAlign: "center"},
  modalText: {textAlign: "right",fontSize:16,marginBottom: 30},

  modalRow:{width:'100%',marginVertical:10},

  InputContainer2:{marginBottom:15,justifyContent:'center',alignItems:'center',height:45,paddingRight:10,
    paddingLeft:10,borderRadius:10,borderBottomColor:'#E5E5E5',borderBottomWidth:1,
    backgroundColor: "#E5E5E5",marginTop: 15
  },
  InputContainer2Tilte:{width:'100%',fontSize:12,textAlign: 'right',marginBottom: 5},
  InputTilte:{textAlign:'right',color: titleColor,fontSize: 14,marginBottom: 5},
  Input:{flex:1,fontSize: 12,textAlign: 'right',color:'#A2A2A2'},
  rowTitle:{width:'100%',textAlign:'right',fontSize: 14,},


  done:{width:'100%',justifyContent:'center',alignItems:'center'},
  doneTouch:{width:60,height:60,backgroundColor:'#924480',justifyContent:'center',
    alignItems:'center',borderRadius:10
  }
});
export default styles;