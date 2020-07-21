import React, { Component } from "react";
import { View, ScrollView, StatusBar,ActivityIndicator } from "react-native";
import styles from "./MostWantedScreenStyle";
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
import MostWantedList from '../../components/MostWantedList'
import * as firebase from 'firebase';
export default class MostWantedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostWanted:[],
            isLoading:true
        }
    }
    
    componentDidMount() {
        firebase.firestore().collection('halls').get()
        .then((querySnapshot)  => {
            let hallListData = [];
            querySnapshot.forEach((doc) => {
            const hallData = doc.data();
            hallListData.push(
                {id:doc.id,
                image: hallData.hallImage,
                name: hallData.name,
                
                location:hallData.address,
                discount:null,
                isFav: false,
                uri:true
                
                }
            )
                
        });
        this.setState(prevState => ({
            mostWanted: [...prevState.mostWanted, ...hallListData]
        }))

        this.setState({isLoading:false})

        })
        .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }
    render() {
        const {isLoading} = this.state;
        if (isLoading) {
            return (
                <View style={{flex: 1, justifyContent: "center"}}>
                     <ActivityIndicator size="large" color="#924480" />
                </View>
            );
          } else {
    
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
}