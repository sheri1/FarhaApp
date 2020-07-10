import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    containerStyle: { flex: 1},
    StatusBar: {height: Constants.statusBarHeight,backgroundColor: "transparent"},
    topBack:{width:'100%',backgroundColor:'#924480',height:180,borderBottomLeftRadius:30,
        borderBottomRightRadius:30
    },
    info:{width:'100%'},
    name:{fontSize:16,textAlign:'right',color:'#000',marginBottom:5},
    email:{fontSize:12,textAlign:'right',color:'#979797',marginBottom: 20},
    infoRow:{flexDirection:'row',width:'100%',backgroundColor:'#FEF8FC',height:50,marginVertical:10,
        borderRadius:10,paddingHorizontal:15
    },
    infoRowtitle:{justifyContent:'center',alignItems:'center'},
    title:{color:'#000',fontSize:14,textAlign:'right'},
    infoRowinfo:{flex:1,justifyContent:'center',alignItems:'center'},
    infotxt:{color:'#000',fontSize:14,textAlign:'right'},

    infoRow2:{flexDirection:'row',width:'100%',backgroundColor:'#FEF8FC',height:50,marginVertical:10,
        borderRadius:10,paddingHorizontal:15,borderColor:'#924480',borderWidth:1
    },
    infoRowinfo2:{flex:1,justifyContent:'center',alignItems:'center',width:'100%'
    },
    title2:{color:'#000',fontSize:14,textAlign:'right',width:'100%'},

    joinCont:{width:'100%',justifyContent:'center',alignItems:'center',marginTop:50},
    joinTouch:{width:'80%',justifyContent:'center',alignItems:'center',backgroundColor:'#924480',
        borderRadius:30,height:50,marginBottom:5
    },
    joinTXT:{fontSize:16,color:'#fff'}
});

export default styles;