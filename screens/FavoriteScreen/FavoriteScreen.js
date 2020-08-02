import React, { Component } from "react";
import { View, ScrollView, StatusBar, Image,ActivityIndicator } from "react-native";
import styles from "./FavoriteScreenStyle";
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import FavoriteList from '../../components/FavoriteList'
import * as firebase from 'firebase'
export default class FavoriteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fav:[],
            hallIds: [],
            isLoading:true
        }
    }


    componentDidMount() {
        const currentUser = firebase.auth().currentUser;
        const favRef = firebase.firestore().collection('favouriteHalls');
        const query = favRef.where('uid' , '==' , currentUser.uid)
        .get()
        .then((querySnapshot) => {
            const ids = [];
            querySnapshot.forEach((doc)  => {
                const snapShot = doc.data();
                ids.push(snapShot.hallId)
               
                });
            this.setState(prevState => ({
                hallIds: [...prevState.hallIds, ...ids]
            }))    
        })
        .catch(function(error) {
            console.log("Error getting documents1: ", error);
        });

        setTimeout(()=> {
            this.state.hallIds.forEach((id) => {
            const hallRef = firebase.firestore().collection('halls').doc(id)
            .get()
            .then((queryResult)  => { 
                  const hallData = queryResult.data();
                 let hallListData = [];
                  hallListData.push(
                    {id:queryResult.id,

                      image: hallData.hallImage,
                      name: hallData.name,
                     
                      location:hallData.address,
                      discount:null,
                      isFav:true,
                      uri:true
                      
                      }
                  )
                  this.setState({isLoading:false});
                  this.setState(prevState => ({
                    fav: [...prevState.fav, ...hallListData]
                  }))

                  
                    
              
            }).catch(e=>console.log(e))
            
         })
         },1000)
    
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
}