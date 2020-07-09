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
    thanks:{fontSize:16,color:'#000',marginVertical:10},
    try:{fontSize:12,color:'#A2A2A2',marginBottom:50},
    move:{fontSize:14,color:'#924480',textDecorationLine:'underline'},
});
export default styles;