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

export default class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            spinner: false,
            phone:'',
            city:'',
            image:''         
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
            if (!result.cancelled) {
                this.setState({ image: path });
            }
        });
    };
    
    render() {
        return (
        <View style={styles.containerStyle}>          
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
                        source={require('../../assets/images/profile.png')}
                    >
                        <TouchableOpacity style={{alignItems:'center',top:35}} onPress={this.useLibraryHandler}>
                            <Feather name='camera' size={20} color='#fff'/>
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

            <View style={{ width: '100%',marginTop: 10}}>
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff',paddingTop:20}}
                    snapToStart={true}
                >   
                <KeyboardAwareScrollView
                    keyboardDismissMode="on-drag" //work only on ios
                    enableOnAndroid={true}
                    style={{ width: "100%",paddingBottom:150}}
                >

                    <View style={styles.InputContainer}>
                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>البريد الالكتروني</StyledTextBold>
                            <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="البريد الالكتروني"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="email-address"
                                ref={(input) => {this.secondTextInput = input}}
                                onSubmitEditing={() => {this.ThirdTextInput.focus()}}
                                onChangeText={(email) => this.setState({ email })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>الهاتف</StyledTextBold>
                            <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="الهاتف"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType='phone-pad'
                                ref={(input) => {this.ThirdTextInput = input}}
                                onSubmitEditing={() => {this.fourthTextInput.focus()}}
                                onChangeText={(phone) => this.setState({ phone })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>المشكلة</StyledTextBold>
                            <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="المدينة"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType='default'
                                ref={(input) => {this.fourthTextInput = input}}
                                // onSubmitEditing={() => {this.fifthTextInput.focus()}}
                                onChangeText={(city) => this.setState({ city })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>
                    </View>

                    <View style={styles.RegisterButtonCont}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.LoginTouch}>
                          <StyledText style={{color:'#fff',fontSize:15}}>حفظ</StyledText>
                        </TouchableOpacity>
                    </View>

                </KeyboardAwareScrollView> 
                </ScrollView>
            </View>
        </View>
        );
    }
}