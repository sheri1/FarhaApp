import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image } from "react-native";
import styles from "./OffersScreenStyle";
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import OffersList from '../../components/OffersList'

export default class OffersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Offers:[
                {id:0,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'30%',isFav:true
                },
                {id:1,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'60%',isFav:false
                },
                {id:2,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'30%',isFav:true
                },
                {id:3,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'60%',isFav:false
                },
                {id:4,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'30%',isFav:false
                },
                {id:5,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'60%',isFav:true
                },
                {id:6,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'30%',isFav:false
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
            <HeaderMenu navigation={this.props.navigation} title='العروض'></HeaderMenu>
            </View>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff'}}
                snapToStart={true}
            >     
                <View style={{width: '100%',height:'100%',paddingBottom: 50}}>
                {this.state.Offers.length > 0 ?
                <>
                    <View style={styles.storiesImagesCont}>
                        <OffersList 
                            navigation={this.props.navigation}
                            details={this.state.Offers}
                        />
                    </View>
                </>
                :
                <View style={{width: '100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../../assets/images/NoSales.png')}/>
                </View>
                }
                </View>
            </ScrollView>
        </View>
        );
    }
}