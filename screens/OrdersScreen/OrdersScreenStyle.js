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
})
export default styles;