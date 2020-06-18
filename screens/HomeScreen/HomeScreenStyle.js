import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    containerStyle: { flex: 1,backgroundColor:'#924480'},
    StatusBar: {height: Constants.statusBarHeight,backgroundColor: "transparent"},

    
    HomeSliderCont:{width:'100%',flexDirection:'row',marginTop:20,marginBottom:10,paddingHorizontal:15},
    generalTitleCont2:{flex:1},
    generalTitle2:{textAlign:'right',color:'#616161',fontSize:14},
    showMoreCont:{flex:1},
    showMoreTitle:{textAlign:'left',color:'#616161',fontSize:12},

    storiesImagesCont:{width:'100%',paddingHorizontal:10},

    advertisementCont:{width:'110%',backgroundColor:'#00B1FF',height:200,justifyContent:'center',
        alignItems:'center',marginVertical:15,//width:'150%'
    },

    advertisementCont2:{width:'100%',height:220,marginVertical:15,borderRadius:15,paddingHorizontal:15,
        // backgroundColor:'gray'
        marginBottom:30,paddingTop:10
    },
    slide:{width:'100%',height:'80%',justifyContent:'center',alignItems:'flex-start',
        // backgroundColor:'#924480',
        flexDirection:'row',borderRadius:15
    },
    detailCon:{flex:1,justifyContent:'center',alignItems:'flex-end',height:'100%',paddingHorizontal:20},
    imageCont:{justifyContent:'center',alignItems:'center',height:'100%',paddingHorizontal:10},
    nametxt:{fontSize:18,color:'#fff',marginBottom:10},
    detailtxt:{fontSize:14,color:'#fff'},
});
export default styles;