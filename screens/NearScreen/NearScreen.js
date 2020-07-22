import React, { Component } from "react";
import { View, ScrollView, StatusBar,ActivityIndicator } from "react-native";
import styles from "./NearScreenStyle";
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
import NearList from '../../components/NearList'
import * as firebase from 'firebase';

export default class NearScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nearList:[],
            isLoading:true,
            count:false
        }
    }
    
    componentDidMount() {
        const info = this.props.navigation.getParam('city');
        firebase.firestore().collection('halls').where("address", "==" , info )
            .limit(15)
            .get().then((querySnapshot)  => {
                if(querySnapshot.size === 0) {this.setState({count:false})}
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
                nearList: [...prevState.nearList, ...hallListData]
            }))

            this.setState({isLoading:false});
                
            })
            .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    }
    render() {
        const {isLoading} = this.state;
        console.log('near', this.state.nearList);
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
            <HeaderBack navigation={this.props.navigation} title='الأقرب'></HeaderBack>
            </View>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff'}}
                snapToStart={true}
            >     
                <View style={{width: '100%',height:'100%',paddingBottom: 50}}>
                {this.state.nearList.length > 0 &&
                <>
                    <View style={styles.storiesImagesCont}>
                        <NearList 
                            navigation={this.props.navigation}
                            details={this.state.nearList}
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
