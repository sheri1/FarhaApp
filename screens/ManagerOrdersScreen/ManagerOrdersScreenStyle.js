import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    containerStyle: { flex: 1},
    StatusBar: {height: Constants.statusBarHeight,backgroundColor: "transparent"},

    activeItem:{backgroundColor:'#924480',height:30,borderWidth:1,borderRadius:10,borderColor:'#D3D3D3',
        padding:20,justifyContent:'center',alignItems:'center',
    },
    activeTXT:{color:'#fff'},
    inActiveItem:{backgroundColor:'#fff',height:30,borderWidth:1,borderRadius:10,borderColor:'#D3D3D3',
        padding:20,justifyContent:'center',alignItems:'center',
    },
    inActiveTXT:{color:'#D3D3D3'},
    storiesImagesCont:{width:'100%',paddingHorizontal:10},
    joinTouch:{width:'30%',justifyContent:'center',alignItems:'center',backgroundColor:'#924480',
        borderRadius:30,height:50,marginBottom:5
    },
    joinTXT:{fontSize:16,color:'#fff'}
})
export default styles;