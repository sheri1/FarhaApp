import React, { Component } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import styles from "./MostWantedScreenStyle";
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
import MostWantedList from '../../components/MostWantedList'

export default class MostWantedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostWanted:[
                {id:0,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'30%',isFav:true
                },
                {id:1,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'30%',isFav:false
                },
                {id:2,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:null,isFav:false
                },
                {id:3,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'30%',isFav:true
                },
                {id:4,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:null,isFav:false
                },
                {id:5,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:'30%',isFav:false
                },
                {id:6,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
                    location:'دير البلح',discount:null,isFav:true
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
            <HeaderBack navigation={this.props.navigation} title='الأكثر طلباً'></HeaderBack>
            </View>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff'}}
                snapToStart={true}
            >     
                <View style={{width: '100%',height:'100%',paddingBottom: 50}}>
                {this.state.mostWanted.length > 0 &&
                <>
                    <View style={styles.storiesImagesCont}>
                        <MostWantedList 
                            navigation={this.props.navigation}
                            details={this.state.mostWanted}
                        />
                    </View>
                </>
                }
                </View>
            </ScrollView>
        </View>
        );
    }
}