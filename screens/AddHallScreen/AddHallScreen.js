import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TextInput,TouchableOpacity} from "react-native";
import styles from "./AddHallScreenStyle";
import Constants from 'expo-constants'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {FontAwesome,Ionicons} from '@expo/vector-icons'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class AddHallScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hallName:"",
           // hallPrice:"",
            hallAddress:"",
            //hallCount:"",
            //hallPersons:"",
            hallDescription:"",

            photos:[],
            imagesScrollVisibile: false,

            step1:true,
        }
    }

    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images"
        }).then((result) => {
            if (!result.cancelled) {
                const {photos} = this.state
                photos.push({path: result.uri})
                this.setState({photos, imagesScrollVisibile: true})
            }
        })
    }

    deleteImage(index){
        var array = [...this.state.photos]     // make a separate copy of the array
        if (index !== -1) {
            array.splice(index, 1)
            this.setState({photos: array})
            if(array.length == 0){
                this.setState({imagesScrollVisibile: false})
            }
        }
    }

    render() {
        return (
        <View style={styles.containerStyle}>          
            <View style={styles.StatusBar}>
                <StatusBar barStyle="light-content"/>
            </View>
            <View>
                <HeaderBack navigation={this.props.navigation} title='أضف صالتك'></HeaderBack>
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
                <View style={styles.imageCont}>
                    <TouchableOpacity style={styles.CircleCont}>
                        <View style={styles.inAciveCircleCont2}>
                            <StyledText style={styles.txt}>3</StyledText>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.spaceCont}></View>
                    <TouchableOpacity style={styles.CircleCont}>
                        <View style={styles.inAciveCircleCont2}>
                            <StyledText style={styles.txt}>2</StyledText>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.spaceCont}></View>
                    <TouchableOpacity style={styles.CircleCont}>
                        <View style={styles.inAciveCircleCont}>
                            <StyledText style={styles.txt}>1</StyledText>
                        </View>
                    </TouchableOpacity>
                </View>

                {this.state.step1 &&
                <>
                    <View style={styles.InputContainer}>
                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>تفاصيل الصالة :</StyledTextBold>
                            <View style={styles.inputCont}>
                                <TouchableOpacity style={styles.photoIcon} onPress={this.selectPicture}>
                                    <FontAwesome name='camera' color='#924480' size={20}/>
                                </TouchableOpacity>
                                <View style={styles.photoTilteCont}>
                                    <StyledTextBold style={styles.photoTilte}>اختر صور وقم بإرفاقها</StyledTextBold>
                                </View>     
                            </View>
                        </View>

                        {this.state.imagesScrollVisibile && (
                        <ScrollView
                            style={{flex:1, marginVertical: 10,marginBottom:20}} 
                            horizontal={true} showsHorizontalScrollIndicator={false}
                        >
                            {this.state.photos.map((item, index)=>(
                                <View key={index} style={{marginHorizontal:5}}> 
                                    <Image source={{uri: item.path}} style={{height:90, width:90}} />
                                    <TouchableOpacity style={{position: 'absolute', padding:3, right: 0}} onPress={()=>this.deleteImage(index)}>
                                        <Ionicons name='ios-close-circle-outline' size={22} color='red'/>
                                    </TouchableOpacity>
                                </View>
                            ))}  
                        </ScrollView>
                        )}

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>اسم الصالة : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="صالة الأنوار"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                onSubmitEditing={() => {this.secondTextInput.focus()}}
                                onChangeText={(hallName) => this.setState({ hallName })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>
{/* 
                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>سعر الصالة ($) : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="********"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                ref={(input) => {this.secondTextInput = input}}
                                onSubmitEditing={() => {this.ThirdTextInput.focus()}}
                                onChangeText={(hallPrice) => this.setState({ hallPrice })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View> */}

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>العنوان : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="دير البلح-البلد"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                ref={(input) => {this.ThirdTextInput = input}}
                                onSubmitEditing={() => {this.FourthTextInput.focus()}}
                                onChangeText={(hallAddress) => this.setState({ hallAddress })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                        {/* <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>عدد القاعات : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="********"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                ref={(input) => {this.FourthTextInput = input}}
                                onSubmitEditing={() => {this.FifthTextInput.focus()}}
                                onChangeText={(hallCount) => this.setState({ hallCount })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View> */}

                        {/* <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>عدد الأفراد المحتملين : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="********"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                ref={(input) => {this.FifthTextInput = input}}
                                onSubmitEditing={() => {this.SixthTextInput.focus()}}
                                onChangeText={(hallPersons) => this.setState({ hallPersons })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View> */}
                    
                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>الوصف : </StyledTextBold>
                            <View style={styles.input2Cont}>
                            <TextInput
                                placeholder="وصف للصالة"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                ref={(input) => {this.SixthTextInput = input}}
                                onSubmitEditing={() => {this.nextAddHall()}}
                                onChangeText={(hallDescription) => this.setState({ hallDescription })}
                                blurOnSubmit={false}
                                multiline
                                style={styles.Input}
                            />
                            </View>
                        </View>
                    </View>

                    <View style={styles.RegisterButtonCont}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.LoginTouch}
                          onPress={() => {this.nextAddHall()}}
                        >
                          <StyledText style={{color:'#fff',fontSize:15}}>التالي</StyledText>
                        </TouchableOpacity>
                    </View>
                </>
                }

                </KeyboardAwareScrollView> 
                </ScrollView>
            </View>
        </View>
        );
    }

    // بعتنا الداتا تعت الخطوة الآولى ك اوبجكت 
    nextAddHall(){
        const firstStep = {
            hallName:this.state.hallName,
            hallAddress:this.state.hallAddress,
            hallDescription:this.state.hallDescription,
            photos:this.state.photos,
        }
        this.props.navigation.navigate('AddHallStep2Screen',{firstInfo:firstStep})
    }
}