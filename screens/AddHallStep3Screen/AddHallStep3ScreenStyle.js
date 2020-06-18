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

    titleCont:{alignItems:'center',justifyContent:'center',marginVertical:10,paddingHorizontal:15,
        backgroundColor:'#F9F5F9',height:40,width:'100%'
    },
    title:{color:'#000',fontSize:14,marginVertical:5,paddingRight: 15,textAlign:'right',width:'100%'},

    InfoCont:{width:'100%',justifyContent:'center',alignItems:'flex-start',paddingHorizontal:20},
    InfoRow:{flexDirection:'row',justifyContent:'center',alignItems:'center'},
    info:{color:'#000',fontSize:14,marginVertical:5,paddingRight: 15,textAlign:'right',width:'100%'},

    InputContainer: { paddingHorizontal: 15 },
    InputContainer2:{marginBottom:15,justifyContent:'center',alignItems:'center',minHeight:70,paddingRight:10,
        paddingLeft:10,borderRadius:10,marginBottom: 10
        // borderBottomColor:'#E5E5E5',borderBottomWidth:1
    },
    InputContainer2Tilte:{width:'100%',fontSize:12,textAlign: 'right',marginBottom:10},
    InputTilte:{textAlign:'right',color: titleColor,fontSize: 14,marginBottom: 5},
    Input:{flex:1,fontSize: 12,textAlign: 'right',color:'#A2A2A2'},

    RegisterButtonCont:{justifyContent: 'center',alignItems: 'center',marginBottom:10,marginTop: 20,paddingHorizontal:20},
    LoginTouch:{
        justifyContent:'center',alignItems:'center',height:50,backgroundColor:'#924480',
        borderRadius:10,width:'100%',
    },

    inputCont:{flexDirection: 'row',backgroundColor:'#FAFAFA',height:50,borderRadius:10,paddingHorizontal:10,
        marginBottom: 10
    },
    input2Cont:{flexDirection: 'row',backgroundColor:'#FAFAFA',minHeight:100,borderRadius:10,paddingHorizontal:10,
        marginBottom: 10, justifyContent:'center',alignItems:'flex-start',padding:5
    },

    photoTilteCont:{flex:1,justifyContent:'center'},
    photoIcon:{justifyContent:'center'},
    photoTilte:{color:'#A2A2A2',fontSize:12},

    imageCont: {width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row',
        paddingHorizontal: 30,marginBottom:30
    },
    CircleCont:{height:40,width:40,borderRadius:40/2,backgroundColor:'#E5E7E7',justifyContent:'center',
        alignItems:'center'
    },
    spaceCont:{height:10,width:10,backgroundColor:'#E5E7E7',flex:1},

    aciveCircleCont:{backgroundColor:'#01B013',width:30,height:30,borderRadius:30/2,justifyContent:'center',
        alignItems:'center'
    },
    inAciveCircleCont:{backgroundColor:'#924480',width:30,height:30,borderRadius:30/2,justifyContent:'center',
        alignItems:'center'
    },
    txt:{color:'#fff'},

    typeCont:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#FAFAFA',borderRadius:10},
    inactivetxt:{color:'#A2A2A2'},
    activeTypeCont:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#924480',borderRadius:10},
    activetxt:{color:'#fff'},

});
export default styles;