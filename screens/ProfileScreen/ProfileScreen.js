import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TouchableOpacity } from "react-native";
import styles from "./ProfileScreenStyle";
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import StyledText from "../../components/StyledTexts/StyledText";
import {AntDesign} from '@expo/vector-icons';
import { withFirebaseHOC } from '../../config/Firebase'
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
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



class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {          
            user: {},
            uid:'',
            photoURL:null,
            isAnonymousUser: false
        }
    }
    
    componentDidMount() {
        const currentUser = this.props.firebase.auth.currentUser;
       firebase.firestore().collection('users').doc(currentUser.uid)
        .onSnapshot((doc) => {
            AsyncStorage.setItem(`${currentUser.uid}`, JSON.stringify(doc.data()))
                .then(()=>this.getUserData(currentUser));

                
            console.log("Current data: ", doc.data());
        });
        if(currentUser != null && !currentUser.isAnonymous) {
            this.setState({uid:currentUser.uid});
           this.getUserData(currentUser);
           this.setState({photoURL:doc.data().photoURL,
            isAnonymousUser:false});
        }else {
            this.setState({isAnonymousUser:true})
        }
    }

    async storeUserData(user) {
        
        try {
           await AsyncStorage.setItem(`${user.uid}`, JSON.stringify(user));
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }

      

      async getUserData(user) {
        try {
          let userData = await AsyncStorage.getItem(`${user.uid}`);
          let data = JSON.parse(userData);
          console.log('data', data)
          this.setState({user:data})
          if(data == null) {
              this.getUserDocument()
          }
        
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }

    render() {
        const {user,photoURL,isAnonymousUser} = this.state;
      
        if (isAnonymousUser) {
            return (
                
        <View >          
            <View style={[styles.topBack,{zIndex:-1}]}>
                <View style={styles.StatusBar}>
                    <StatusBar barStyle="light-content"/>
                </View>
                <View>
                    <HeaderMenu navigation={this.props.navigation} title='' from='profile'></HeaderMenu>
                </View>
            </View>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',paddingHorizontal:15}}
                snapToStart={true}
            >   
            <View style={{width:'100%',left:120,top:10,zIndex:2,height:30}}>
                <Image style={{height:120,width:120,borderRadius:100}}
                    source={!photoURL ? require('../../assets/images/user.png') : {uri:photoURL}} />
            </View>

            <View style={{display:"flex",marginTop:120,textAlign:"center",justifyContent:'center',alignItems:'center'}}>
                <StyledText style={styles.infotxt}> لم تسجل دخولك بعد ؟ </StyledText>
                <StyledText style={styles.infotxt}>  انضم الينا حتى تستفيد من خدمات التطبيق</StyledText>
                <StyledText style={styles.infotxt}>و تقوم بحجز الصالة التي تريد</StyledText>
            </View>

            <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginVertical:20,flexDirection:'row'}}>
          
                <View>
                     <TouchableOpacity activeOpacity={0.5}
                          onPress={() => this.props.firebase.auth.signOut().then(()=>this.props.navigation.navigate('LoginScreen'))}
                        >
                          <StyledText style={{fontSize:14,marginBottom:15, 
                            color:'#FFF',backgroundColor:'#924480',paddingVertical:15,paddingHorizontal:15}}>تسجيل الدخول</StyledText>
                        </TouchableOpacity>
                        <View style={{display:"flex",textAlign:"center",justifyContent:'center',alignItems:'center'}}>
                          <StyledText style={styles.title2,{textAlign:"center"}}>مستخدم جديد ؟</StyledText>
                          <TouchableOpacity activeOpacity={0.5}
                          onPress={() => this.props.navigation.navigate('RegisterScreen')}
                        >
                          <StyledText style={{fontSize:14,color:'#924480',paddingVertical:15,paddingHorizontal:15}}>سجل الآن</StyledText>
                        </TouchableOpacity>
                        </View>
                </View>
                </View>
            </ScrollView>
        </View>

            )
        }else {
        return (
        <View style={styles.containerStyle}>          
            <View style={[styles.topBack,{zIndex:-1}]}>
                <View style={styles.StatusBar}>
                    <StatusBar barStyle="light-content"/>
                </View>
                <View>
                    <HeaderMenu navigation={this.props.navigation} title='حسابي' from='profile'></HeaderMenu>
                </View>
            </View>
            <View style={{width:'100%',left:40,top:-50,zIndex:2,height:30}}>
                <Image style={{height:100,width:100,borderRadius:100/2}}
                    source={!photoURL ? require('../../assets/images/user.png') : {uri:photoURL}} />
            </View>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',paddingHorizontal:15}}
                snapToStart={true}
            >     
                <View style={{width: '100%',height:'100%',paddingBottom: 50}}>
                    <View style={styles.info}>
        <StyledText style={styles.name}>{user.displayName}</StyledText>
        <StyledText style={styles.email}>{user.email}</StyledText>

                        <View style={styles.infoRow}>
                            <View style={styles.infoRowinfo}>
                               <StyledText style={styles.infotxt}>{user.phone}</StyledText>
                            </View>
                            <View style={styles.infoRowtitle}>
                                <StyledText style={styles.title}>الهاتف :</StyledText>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoRowinfo}>
                                <StyledText style={styles.infotxt}>{user.city}</StyledText>
                            </View>
                            <View style={styles.infoRowtitle}>
                                <StyledText style={styles.title}>المدينة :</StyledText>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.infoRow2}
                          onPress={() => this.props.navigation.navigate('EditProfileScreen')}
                        >
                            <View style={styles.infoRowtitle}>
                                <AntDesign name='left' size={20} color='#000'/>
                            </View>
                            <View style={styles.infoRowinfo2}>
                                <StyledText style={styles.title2}>تعديل الملف الشخصي</StyledText>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.infoRow2}
                          onPress={() => this.props.navigation.navigate('ChangePasswordScreen')}
                        >
                            <View style={styles.infoRowtitle}>
                                <AntDesign name='left' size={20} color='#000'/>
                            </View>
                            <View style={styles.infoRowinfo2}>
                                <StyledText style={styles.title2}>تغيير كلمة المرور</StyledText>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.joinCont}>
                        {user.manager ? 
                        <>
                        <TouchableOpacity style={styles.joinTouch}
                        //    onPress={() => this.props.navigation.navigate('AddRoomScreen')}
                        onPress={() => this.props.navigation.navigate('AddHallScreen')}
                        >
                            <StyledText style={styles.joinTXT}>أضف صالة جديدة</StyledText>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.joinTouch}
                        //    onPress={() => this.props.navigation.navigate('AddRoomScreen')}
                        onPress={() => this.props.navigation.navigate('ManagerHallsScreen')}
                        >
                            <StyledText style={styles.joinTXT}>عرض الصالات الخاصة بي</StyledText>
                        </TouchableOpacity>
                        </>


                        :
                        <TouchableOpacity style={styles.joinTouch}
                        onPress={() => this.props.navigation.navigate('AddHallScreen')}
                    >
                        <StyledText style={styles.joinTXT}>انضم لأصحاب الصالات</StyledText>
                    </TouchableOpacity>
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
        );
    }
    }
}

export default withFirebaseHOC(ProfileScreen)