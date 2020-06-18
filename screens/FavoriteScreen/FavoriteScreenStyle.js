import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    containerStyle: { flex: 1},
    StatusBar: {height: Constants.statusBarHeight,backgroundColor: "transparent"},
    storiesImagesCont:{width:'100%',paddingHorizontal:10},
});
export default styles;