import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TouchableOpacity,ActivityIndicator} from "react-native";
import styles from "./HomeScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import ViewPager from '@react-native-community/viewpager';
import OneHallComponent from '../../components/OneHallComponent'

import {registerPushNotification} from '../../notifications';
import * as firebase from 'firebase';
import { withFirebaseHOC } from "../../config/Firebase";
///////////////////////////////////////For Notification to solve error message 

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
// Work around issue `Setting a timer for long time`
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }
        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };
    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };
    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}
//////////////////////////////////////////////////


 class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Sliderimages:[
                {id:0,image:require('../../assets/images/sliderImage.png'),name:'صالة لارزوا'},
                {id:1,image:require('../../assets/images/sliderImage.png'),name:'صالة لارزوا'},
                {id:2,image:require('../../assets/images/sliderImage.png'),name:'صالة لارزوا'},
            ],
            mostWanted:[],
            nearList:[],
            activeIndex:0,
            user: {},
            isLoading:true
      
    
        }
    }

    componentDidMount(){
        registerPushNotification();
        const currentUser = this.props.firebase.auth.currentUser;
        firebase.firestore().collection('halls').limit(4).get()
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

        })
        .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

     
        if(currentUser != null) {
            this.props.firebase.getUserDocument(currentUser.uid)
                .then(userData=> {
                    this.setState({user:userData});
                })
                .catch(error=>console.log('e',error))
        }


    
            const defaultCity = this.state.user.city !== undefined ? this.state.user.city : "غزة";
            firebase.firestore().collection('halls').where('address', "==" , defaultCity ).limit(4)
            .get().then((querySnapshot)  => {
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
                <HeaderMenu navigation={this.props.navigation} title='الرئيسية' from='profile'></HeaderMenu>
            </View>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff'}}
                snapToStart={true}
            >     
                <View style={{width: '100%',height:'100%',paddingBottom: 50}}>
                    <Image source={require('../../assets/images/this.png')} 
                        style={{position:'absolute',top:0,width:'100%'}}
                    />  
                    <View style={styles.advertisementCont2}>
                        <ViewPager style={{flex:1}} initialPage={0}
                            onPageSelected={(onPageSelected) => this.setState({activeIndex:onPageSelected.nativeEvent.position})}
                        >
                        {this.state.Sliderimages.map((item, index) => {
                            return (
                            <View style={styles.slide} key={index}>
                                <View style={styles.imageCont}>
                                    <Image source={item.image}
                                        style={{height:180,width:180,resizeMode: "contain"}}
                                    />
                                </View>
                                <View style={styles.detailCon}>
                                    {/* <StyledText style={styles.nametxt}>{item.name}</StyledText> */}
                                    <StyledText style={styles.nametxt}>مرحباً بك في تطبيق فرحة </StyledText>
                                    {/* <StyledText style={styles.nametxt}>مفي تطبيق فرحة </StyledText> */}
                                    {/* <StyledText style={styles.detailtxt}>يرجى إدخال جميع البيانات </StyledText> */}
                                </View>
                            </View>
                            )
                        })}  
                        </ViewPager>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <View>
                                {this.state.activeIndex == 0 && this.activeDot() }
                                {this.state.activeIndex != 0 && this.dot() }
                            </View>
                            <View>
                                {this.state.activeIndex == 1 && this.activeDot() }
                                {this.state.activeIndex != 1 && this.dot() }
                            </View>
                            <View>
                                {this.state.activeIndex == 2 && this.activeDot() }
                                {this.state.activeIndex != 2 && this.dot() }
                            </View>
                        </View>
                    </View>

        {this.state.mostWanted.length > 0 &&
        <>
                    <View style={styles.HomeSliderCont}>
                        <TouchableOpacity style={styles.showMoreCont}
                            onPress={()=>this.props.navigation.navigate('MostWantedScreen')}
                        >
                            <StyledText style={styles.showMoreTitle}>
                                عرض الجميع
                            </StyledText>
                        </TouchableOpacity>
                        <View style={styles.generalTitleCont2}>
                            <StyledText style={styles.generalTitle2}>
                                الأكثر طلباً
                            </StyledText>
                        </View>  
                    </View>
                    <View style={styles.storiesImagesCont}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <OneHallComponent navigation={this.props.navigation} details={this.state.mostWanted}/>
                        </ScrollView>
                    </View>
        </>
        }

        {this.state.nearList.length > 0 &&
        <>
                    <View style={styles.HomeSliderCont}>
                        <TouchableOpacity style={styles.showMoreCont}
                            onPress={()=>this.props.navigation.navigate('NearScreen',{city:this.state.user.city})}
                        >
                            <StyledText style={styles.showMoreTitle}>
                                عرض الجميع
                            </StyledText>
                        </TouchableOpacity>
                        <View style={styles.generalTitleCont2}>
                            <StyledText style={styles.generalTitle2}>
                                الأقرب 
                            </StyledText>
                        </View>  
                    </View>
                    <View style={styles.storiesImagesCont}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <OneHallComponent navigation={this.props.navigation} details={this.state.nearList}/>
                        </ScrollView>
                    </View>
        </>
        }
                </View>
            </ScrollView>
        </View>
        );

        }
    }

    dot(){
        return(
          <View style={{backgroundColor:'#DC96CC', width: 8, height:8,borderRadius: 8/2,
            marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />
        )
    }
    activeDot(){
        return(
          <View style={{backgroundColor:'#924480', width: 8, height:8,borderRadius: 8/2,
            marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />
        )
    }
}

export default withFirebaseHOC(HomeScreen);