import * as React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import StyledText from './StyledTexts/StyledText';
import { AntDesign, Entypo } from "@expo/vector-icons";

export default class OneHallComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let sectionDetailList = this.props.details
        return (
        <>
        {sectionDetailList.map((item,index)=>{
                return(
                    <TouchableOpacity key={index} style={styles.container} activeOpacity={0.8}>
                        <View style={styles.ImageCont}>
                            <Image source={item.image} style={{width:120,height:100}} resizeMode='contain'/>
                            {item.discount &&
                            <View style={styles.discount}>
                                <StyledText style={styles.discountTXT}>عرض {item.discount}</StyledText>
                            </View>
                            }
                        </View>
                        <View style={styles.heartCont}>
                            <TouchableOpacity style={styles.heartTouch}
                                // onPress={()=> this.favPress()}
                            >
                                {item.isFav ? 
                                    <AntDesign name='heart' size={20} color='red'/>
                                    :
                                    <AntDesign name='heart' size={20} color='#A2A2A2'/>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.spaceCont}>
                            <StyledText style={styles.blueTXT}>{item.price}</StyledText>
                        </View>
                        <View style={styles.titleCont}>
                            <StyledText numberOfLines={2} style={styles.title}>{item.name}</StyledText>
                        </View>
                        <View style={styles.titleCont}>
                            <StyledText numberOfLines={2} style={styles.location}>{item.location}</StyledText>
                            <Entypo name='location-pin' color='#A2A2A2' size={15}/>
                        </View>
                    </TouchableOpacity>
                )
            })  
        } 
        </>
        );
    }

    // favPress(){
    // }
}

const styles = StyleSheet.create({
    container: {flex:1, borderRadius:15, padding:5,margin:5,backgroundColor:'#fff',paddingBottom:0,
        justifyContent:'center',alignItems:'center',marginHorizontal:5,marginVertical:8,
        shadowColor: "#000",shadowOffset: {width: 0,height: 2},
        shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,
        width:150,
    },
    ImageCont:{flex:1,justifyContent:'center',alignItems:'center'},
    discount:{position:'absolute',top:15,backgroundColor:'red',padding:2,borderRadius:5,right:0},
    discountTXT:{color:'#fff',fontSize:10},
    titleCont:{justifyContent:'center',alignItems:'center',flexDirection:'row'},
    title:{color:'#3D3D3D',fontSize:14,textAlign:'center',marginVertical:7},
    spaceCont:{flexDirection:'row',justifyContent:'center',alignItems:'center'},
    blcakTXT:{color:'#3D3D3D',fontSize:10},
    blueTXT:{color:'#924480',fontSize:15,marginVertical:0},
    location:{color:'#A2A2A2',fontSize:12,marginVertical:5,marginBottom: 10},

    heartCont:{
        backgroundColor:'#fff',justifyContent:'center',alignItems:'center',
        shadowColor: "#000",shadowOffset: {width: 0,height: 2},
        shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,
        width:35,height:35,borderRadius:35/2,position:'absolute',left:10
    },
    heartTouch:{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',}
})
