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
    logoStyle: { alignContent: "center"},

    titleCont:{alignItems:'center',justifyContent:'center',marginVertical:10,paddingHorizontal:15,
        backgroundColor:'#F9F5F9',height:40,width:'100%'
    },
    title:{color:'#000',fontSize:14,marginVertical:5,paddingRight: 15,textAlign:'right',width:'100%'},

    InfoCont:{width:'100%',justifyContent:'center',alignItems:'flex-start',paddingHorizontal:20},
    InfoRow:{flexDirection:'row',justifyContent:'center',alignItems:'center'},
    info:{color:'#000',fontSize:14,marginVertical:5,paddingRight: 15,textAlign:'right',width:'100%'},

    InputContainer: {
        paddingHorizontal: 15
    },
    InputContainer2:{marginBottom:15,justifyContent:'center',alignItems:'center',height:70,paddingRight:10,
        paddingLeft:10,borderRadius:10,borderBottomColor:'#E5E5E5',borderBottomWidth:1
    },
    InputContainer2Tilte:{width:'100%',fontSize:12,textAlign: 'right',marginBottom: 5},
    InputTilte:{textAlign:'right',color: titleColor,fontSize: 14,marginBottom: 5},
    Input:{flex:1,fontSize: 12,textAlign: 'right'},

    RegisterButtonCont:{justifyContent: 'center',alignItems: 'center',marginBottom:10,marginTop: 20,paddingHorizontal:20},
    LoginTouch:{
        justifyContent:'center',alignItems:'center',height:50,backgroundColor:'#924480',
        borderRadius:10,width:'100%',
    },
});
export default styles;