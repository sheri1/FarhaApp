import { StyleSheet, Dimensions } from "react-native";
import Constants from 'expo-constants'
const { width , height} = Dimensions.get('window');

const styles = StyleSheet.create({
    containerStyle: { flex: 1 },
    StatusBar: {height: Constants.statusBarHeight,backgroundColor: "transparent"},

    viewPager: {width:'100%',height: 300},//height:270
    dotCont:{flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',bottom:35,
        width:width
    },
    imageStyle: { height: 300,height:'100%', width:'100%'},//height:270

    whiteView:{flex:2,width:'100%',backgroundColor:'#fff',borderTopLeftRadius:30,borderTopRightRadius:30,
        marginTop:-30,paddingTop:10,paddingHorizontal:10,paddingBottom:30
    },
    nameTXT:{paddingRight:5,fontSize:20},
    locationTXTView:{flexDirection:'row',width:'100%',marginVertical:10},
    locationTXT:{color:'#924480',flex:1,textAlign:'right'},
    descTXT:{lineHeight:20},

    activeItem:{backgroundColor:'#924480',height:30,borderWidth:1,borderRadius:10,borderColor:'#D3D3D3',
        padding:20,justifyContent:'center',alignItems:'center',
    },
    activeTXT:{color:'#fff'},
    inActiveItem:{backgroundColor:'#fff',height:30,borderWidth:1,borderRadius:10,borderColor:'#D3D3D3',
        padding:20,justifyContent:'center',alignItems:'center',
    },
    inActiveTXT:{color:'#D3D3D3'},

    infoRowCont:{width:'100%',marginBottom:10},
    ContactView:{flex:1,paddingTop:20},
    infoRow:{flexDirection:'row',width:'100%',marginBottom:10},
    info:{flex:1,textAlign:'right',marginRight:10,fontSize:16,color:'#924480'},
    infoName:{textAlign:'right',marginLeft:10,fontSize:16,color:'#000',marginBottom:10},

    firstRow:{flexDirection:'row',width:'100%'},
    firstRowName:{flex:1},
    firstName:{textAlign:'right',width:'100%',color:'#000',fontSize:16},
    firstRowPrice:{flex:1},
    firstPrice:{textAlign:'left',width:'100%',color:'#924480',fontSize:16},

    capView:{width:'100%',marginVertical:10},
    capTXT:{color:'#A2A2A2',textAlign:'right',fontSize:14},

    serviceView:{width:'100%',marginVertical:10},
    serviceRow:{width:'100%'},
    serviceTitle:{color:'#000',textAlign:'right',fontSize:16,marginBottom:10},
    serviceInfo:{color:'#A2A2A2',textAlign:'right',fontSize:14,lineHeight:20},

    rateCont:{flexDirection:'row',width:'100%',marginVertical:10,alignItems:'center',justifyContent:'center'},
    rateTitle:{color:'#000',textAlign:'right',fontSize:16},
    rateView:{flex:1,justifyContent:'center'},

    centeredView: {
        flex: 1, justifyContent: "center",alignItems: "center",marginTop:130,backgroundColor:'#924480',
        borderTopRightRadius:80,borderTopLeftRadius:80,shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5
    },
    modalView: {
        flex:1,justifyContent:'flex-start',alignItems:'center',paddingTop:50,paddingHorizontal:15,
        width:'100%',paddingBottom:30
    },
    firstView:{width:'100%',paddingHorizontal:20,justifyContent:'center',alignItems:'center',
        flexDirection:'row',marginBottom:10
    },
    done:{width:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:10,marginTop:30},
    doneTouch:{width:'100%',height:60,backgroundColor:'#fff',justifyContent:'center',
      alignItems:'center',borderRadius:10
    },
    doneTxt:{color:'#924480',fontSize:16},

    dateCont:{width:'100%',minHeight:50,backgroundColor:'#fff',justifyContent:'center',
        alignItems:'center',borderRadius:10,paddingVertical:5
    },
    dateCont2:{width:'100%',backgroundColor:'#fff',justifyContent:'center',
        alignItems:'center',marginVertical:10
    },

    minView:{alignItems:'center',justifyContent:'center',backgroundColor:'#924480',height:60,
        borderTopLeftRadius:30,borderTopRightRadius:30
    },
    minTXT:{color:'#fff',fontSize:15},
         
    shareFavCont:{width:'100%',height:5,flexDirection:'row',},
    shareButton:{width:50,height:50,borderRadius:50/2,justifyContent:'center',alignItems:'center',
        backgroundColor:'#fff',padding:5,top:-30,marginRight:10,marginLeft:10,
        shadowColor: "#000",shadowOffset: { width: 0,height: 1 },
        shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3,
    },
    favButton:{width:50,height:50,borderRadius:50/2,justifyContent:'center',alignItems:'center',
        backgroundColor:'#fff',padding:5,top:-30,marginRight:10,marginLeft:10,
        shadowColor: "#000",shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3,
    },

});
export default styles;