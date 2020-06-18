import React, { Component } from "react";
import { View, ScrollView, StatusBar, Image } from "react-native";
import styles from "./FavoriteScreenStyle";
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import FavoriteList from '../../components/FavoriteList'

export default class FavoriteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fav:[
                {id:0,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:null,isFav:true
                },
                {id:1,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'60%',isFav:true
                },
                {id:2,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:null,isFav:true
                },
                {id:3,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:null,isFav:true
                },
                {id:4,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'30%',isFav:true
                },
                {id:5,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:null,isFav:true
                },
                {id:6,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'30%',isFav:true
                },
            ]
        }
    }
    
    render() {
        return (
        <View style={styles.containerStyle}>          
            <View style={styles.StatusBar}>
            <StatusBar barStyle="light-content"/>
            </View>
            <View>
                <HeaderMenu navigation={this.props.navigation} title='المفضلة'></HeaderMenu>
            </View>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff'}}
                snapToStart={true}
            >     
                <View style={{width: '100%',height:'100%',paddingBottom: 50}}>
                {this.state.fav.length > 0 ?
                <>
                    <View style={styles.storiesImagesCont}>
                        <FavoriteList 
                            navigation={this.props.navigation}
                            details={this.state.fav}
                        />
                    </View>
                </>
                :
                <View style={{width: '100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../../assets/images/NoFav.png')}/>
                </View>
                }
                </View>
            </ScrollView>
        </View>
        );
    }
}