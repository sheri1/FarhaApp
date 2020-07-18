import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TextInput,TouchableOpacity,ImageBackground} from "react-native";
import styles from "./EditProfileScreenStyle";
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import {AntDesign,Feather} from '@expo/vector-icons'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase/app'
import { withFirebaseHOC } from "../../config/Firebase";

class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            displayName: '',
            spinner: false,
            phone:'',
            city:'',
            image:'',
            photoURL:'',
            errors:{}       
        }
    }

    componentDidMount() {
        const currentUser = this.props.firebase.auth.currentUser;
        if(currentUser != null) {
            this.props.firebase.getUserDocument(currentUser.uid)
                .then(userData=> {
                    this.setState({
                        displayName:userData.displayName,
                        phone:userData.phone,
                        city:userData.city,
                        photoURL:userData.photoURL
                    })
                    
                })
                .catch(error=>console.log('e',error))
        }
    }
    useLibraryHandler = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: "Images"
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        }).then((result) => {
            // console.log(result, "result");
            const path = result.uri;
            const imageName = result.image;
            if (!result.cancelled) {
                this.setState({ image: path });
                var date = new Date().getTime();                
                this.uploadImage(path,date);
            
            }
        });
    };
   

    uploadImage = async (path, imageName) => {
        const response = await fetch(path);
        const blob = await response.blob();
    
        const ref = firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob).then(() => { //After store the image -> get the url of it 
                ref.getDownloadURL()
                .then(url=>{
                    this.setState({photoURL:url});
                })
        })
    }

    validation = () => {
        const {displayName,phone,city} = this.state;
        let isValid = true;
        let errors = {};

        if (!displayName.match(/^[a-zA-Z\u0600-\u06FF\s]+$/) || !displayName){
            isValid = false;
            //add Error message
            errors['name'] = "الاسم الذي أدخلته غير صحيح"
        }
    
        if (!phone.match(/[0-9]{10}/) || !phone || phone.length > 15){
          isValid = false;
          errors["phone"] = "رقم الهاتف الذي أدخلته غير صحيح"
            //add Error message
        }
    
        if(!city.match(/^[a-zA-Z\u0600-\u06FF\s]+$/) || !city){
          isValid = false;
          errors["city"] = "يرجى التحقق من اسم المدينة"
          //add Error message
        }

        this.setState({errors})
        return isValid;
      }

    updateUserProfile() {
        const {displayName,phone,city,photoURL} = this.state;
        const currentUser = this.props.firebase.auth.currentUser;
        const userData = {displayName,phone,city,photoURL}
     
        if(this.validation()){
            if(currentUser != null) {
                this.props.firebase.updateUserDocument(currentUser.uid,userData)
                .then(function() {
                    
                    currentUser.updateProfile({displayName,phone,photoURL})
                    .then (()=> {
                        alert("تم تحديث بياناتك بنجاح");
                    })
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });            
            }
        }
    }

    render() {
        const {displayName,phone,city,photoURL,errors} = this.state;
        return (
        <View style={styles.containerStyle}>    
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff',paddingBottom:50}}
                snapToStart={true}
            >       
            <View style={styles.topBack}>
                <View style={styles.StatusBar}>
                    <StatusBar barStyle="light-content"/>
                </View>
                <View>
                    <HeaderBack navigation={this.props.navigation} title='تعديل بياناتي' from='profile'></HeaderBack>
                </View>
            </View>

            <View style={{width:'100%',justifyContent:'center',alignItems:'center',top:-20,zIndex:2,height:50}}>
                {!this.state.image ? 
                (
                    <ImageBackground 
                        style={{height:100,width:100,borderRadius:100/2}} imageStyle={{height:100,width:100,borderRadius:100/2}}
                        source={!photoURL ? require('../../assets/images/user.png') : {uri:photoURL}}
                    >
                        <TouchableOpacity style={{alignItems:'center',top:35}} onPress={this.useLibraryHandler}>
                            <Feather name='camera' size={20} color='#777'/>
                        </TouchableOpacity>
                    </ImageBackground>
                )
                :
                (
                    <ImageBackground 
                        style={{height:100,width:100,borderRadius:100/2}} imageStyle={{height:100,width:100,borderRadius:100/2}}
                        source={{uri: this.state.image}}
                    >
                        <TouchableOpacity style={{alignItems:'center',top:35}} onPress={this.useLibraryHandler}>
                            <Feather name='camera' size={20} color='#fff'/>
                        </TouchableOpacity>
                    </ImageBackground>
                )} 
            </View>

            {/* <View style={{ width: '100%',marginTop: 10}}> */}
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff',paddingTop:20}}
                    snapToStart={true}
                >   
                <KeyboardAwareScrollView
                    keyboardDismissMode="on-drag" //work only on ios
                    enableOnAndroid={true}
                    style={{ width: "100%",paddingBottom:30}}
                >

                    <View style={styles.InputContainer}>
                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>الإسم</StyledTextBold>
                            <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="اسم المستخدم"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                value={displayName}
                                ref={(input) => {this.secondTextInput = input}}
                                onSubmitEditing={() => {this.ThirdTextInput.focus()}}
                                onChangeText={(displayName) => this.setState({ displayName })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>
                        <StyledText style={{color:'#F00',fontSize:12,marginBottom:10}}>{errors["name"]}</StyledText>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>الهاتف</StyledTextBold>
                            <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="الهاتف"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType='phone-pad'
                                value={phone}
                                ref={(input) => {this.ThirdTextInput = input}}
                                onSubmitEditing={() => {this.fourthTextInput.focus()}}
                                onChangeText={(phone) => this.setState({ phone })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>
                        <StyledText style={{color:'#F00',fontSize:12,marginBottom:10}}>{errors["phone"]}</StyledText>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>المدينة</StyledTextBold>
                            <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="المدينة"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"done"}
                                keyboardType='default'
                                value={city}
                                ref={(input) => {this.fourthTextInput = input}}
                                // onSubmitEditing={() => {this.fifthTextInput.focus()}}
                                onChangeText={(city) => this.setState({ city })}
                                blurOnSubmit={false}
                                style={styles.Input}
                                onSubmitEditing={() => this.updateUserProfile()}
                            />
                            </View>
                        </View>
                        <StyledText style={{color:'#F00',fontSize:12,marginBottom:10}}>{errors["city"]}</StyledText>

                    </View>

                    <View style={styles.RegisterButtonCont}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.LoginTouch}
                        onPress={() => this.updateUserProfile()}
                        >
                          <StyledText style={{color:'#fff',fontSize:15}}>حفظ</StyledText>
                        </TouchableOpacity>
                    </View>

                </KeyboardAwareScrollView> 
                </ScrollView>
            {/* </View> */}
            </ScrollView>
        </View>
        );
    }
}

export default withFirebaseHOC(EditProfileScreen);