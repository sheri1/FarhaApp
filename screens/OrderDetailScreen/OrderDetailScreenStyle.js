import { StyleSheet } from "react-native";
import Constants from 'expo-constants'
const titleColor ='#8D8D8D';

const styles = StyleSheet.create({
    containerStyle: { flex: 1},
    StatusBar: {height: Constants.statusBarHeight,backgroundColor: "transparent"},
    title:{color:'#000',fontSize:14,marginVertical:5,paddingRight: 15},

    content:{flex:1,width:'100%',justifyContent:'center',alignItems:'center'},
    
    orderViewCont:{width:'100%',paddingHorizontal:20},
    orderView:{backgroundColor:'#924480',height:90,width:'100%',justifyContent:'center',alignItems:'center',
        paddingVertical:10,borderRadius:10,marginBottom:10
    },
    orderTxtDetail:{fontSize:16,color:'#fff',marginBottom:5},
    
    dataRow:{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10,
        paddingHorizontal:20
    },

    dataRowView:{flex:1,justifyContent:'center',alignItems:'center'},
    dataRowDetail:{color:'#000',width:'100%',textAlign:'left'},

    Row:{width:'100%',backgroundColor:'#FAF5FA',justifyContent:'center',alignItems:'center',height:40,
        marginVertical:10,paddingHorizontal:20
    },
    rowDetail:{fontSize:12,color:'#924480',width:'100%',textAlign:'right'},

    dataColumn:{paddingHorizontal:20,width:'100%',paddingHorizontal:20,flexDirection:'column',marginBottom:5},
    dataColumnTxt:{width:'100%',color:'#4A4A4A',textAlign:'right',marginVertical:10,},
    dataViewTxt:{width:'100%'},
    dataColumnDetail:{width:'100%',color:'#4A4A4A',textAlign:'right',lineHeight:20},

    hallRowCont:{width:'100%',paddingHorizontal:20,marginBottom:20},
    hallRow:{flexDirection:'row',padding:10,borderRadius:10,borderWidth:1,borderColor:'#E4E4E4',paddingRight:20},
    hallDetail:{flex:3,paddingVertical:10},
    hallName:{fontSize:14,color:'#000',width:'100%',textAlign:'right'},
    hallRowLocation:{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10},
    hallLocation:{flex:1},
    hallPlace:{fontSize:14,color:'#A2A2A2',width:'100%',textAlign:'right'},
    hallPrice:{fontSize:14,color:'#924480',width:'100%',textAlign:'right'},
    hallImage:{flex:1,marginLeft:10,marginRight:10,},
});

export default styles;