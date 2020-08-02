import * as React from "react";
import { StyleSheet, View, Image, TouchableOpacity , FlatList } from "react-native";
import StyledText from './StyledTexts/StyledText';
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as firebase from 'firebase';
export default class MostWantedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:''
        }
    }

    componentDidMount(){
        const currentUser = firebase.auth().currentUser;
        this.setState({uid:currentUser.uid})
    }

    favPress(id) {
        console.log(id);
    }
    render() {
        const {uid} = this.state;
        let wantedList = this.props.details
        return (
        <>
            <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{marginTop:30}}
                snapToStart={true}
                data={wantedList}
                extraData={this.props}
                numColumns={2}
                renderItem={({item, index})=>(
                    <TouchableOpacity key={index} style={styles.container} activeOpacity={0.8}
                    onPress={() => this.props.navigation.navigate('HallDetailScreen',{id:item.id})}>
                        <View style={styles.ImageCont}>
                            <Image source={{uri:item.image}} style={{width:120,height:100}} resizeMode='contain'/>
                            
                            {item.discount &&
                            <View style={styles.discount}>
                                <StyledText style={styles.discountTXT}>عرض {item.discount}</StyledText>
                            </View>
                            }
                        </View>
                        <View style={styles.heartCont}>
                            <TouchableOpacity style={styles.heartTouch}
                                onPress={()=> this.favPress(uid)}
                            >
                                {item.isFav ? 
                                    <AntDesign name='heart' size={20} color='red'/>
                                    :
                                    <AntDesign name='heart' size={20} color='#A2A2A2'/>
                                }
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.spaceCont}>
                            <StyledText style={styles.blueTXT}>{item.price}</StyledText>
                        
                        </View> */}

                        <View style={styles.titleCont}>
                            <StyledText numberOfLines={2} style={styles.title}>{item.name}</StyledText>
                        </View>
                        <View style={styles.titleCont}>
                            <StyledText numberOfLines={2} style={styles.location}>{item.location}</StyledText>
                            <Entypo name='location-pin' color='#A2A2A2' size={15}/>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex:1, borderRadius:15, padding: 10,backgroundColor:'#fff',paddingBottom:0,
        justifyContent:'center',alignItems:'center',marginHorizontal:10,marginVertical:15,
        shadowColor: "#000",shadowOffset: {width: 0,height: 2},
        shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,  
    },
    ImageCont:{flex:1,justifyContent:'center',alignItems:'center',marginTop:-30},
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
        width:35,height:35,borderRadius:35/2,position:'absolute',left:10,top:'30%'
    },
    heartTouch:{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',}
})