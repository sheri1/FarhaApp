import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TextInput,TouchableOpacity,Picker} from "react-native";
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
            hallAddress:"",
            hallDescription:"",
            numOfRoom: "",
            photos:[],
            category: "غزة",
            imagesScrollVisibile: false,
            errors: {},
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

    validation() {
        let isValid = true;
        const {hallName,hallAddress,hallDescription,photos,errors,numOfRoom} = this.state;
        if (!hallName) {
            isValid = false;
            errors["hallName"] = "الرجاء ادخال اسم الصالة"
        }

        if (!hallAddress) {
            isValid = false;
            errors["hallAddress"] = "الرجاء ادخال عنوان الصالة"
        }

        if (!hallDescription) {
            isValid = false;
            errors["description"] = "الرجاء ادخال وصف عن الصالة"
        }

        if (!numOfRoom) {
            isValid = false;
            errors["numOfRoom"] = "الرجاء إدخال عدد قاعات الصالة"
        }
        if (photos.length === 0) {
            isValid = false;
            errors["photoError"] = "الرجاء اختيار صورة للصالة"
        }

        this.setState({errors});
        return isValid;

    }

    render() {
        const {errors} = this.state;
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
                            style={{flex:1, marginVertical: 10,marginBottom:5}} 
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

                      <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>{errors["photoError"]}</StyledText>



                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>اسم الصالة : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="صالة الأنوار"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                onSubmitEditing={() => {this.ThirdTextInput.focus()}}
                                onChangeText={(hallName) => this.setState({ hallName })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>
                      <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>{errors["hallName"]}</StyledText>

                       <View style={styles.InputContainer2}>
                       <StyledTextBold style={styles.InputContainer2Tilte}>موقع الصالة : </StyledTextBold>
                       <View style={styles.pickerStyle}>
                            <Picker
                            mode="dropdown"
                            selectedValue={this.state.category}
                            style={styles.Input}
                            onValueChange={(category, itemIndex) => this.setState({category})}
                            >
                            <Picker.Item label="مدينة غزة" value="غزة" style={{textAlign: 'right'}} />
                            <Picker.Item label="رفح" value="رفح" style={{textAlign: 'right'}} />
                            <Picker.Item label="خانيونس" value="خانيونس" style={{textAlign: 'right'}} />
                            <Picker.Item label="الوسطى" value="الوسطى" style={{textAlign: 'right'}} />

                            </Picker>
                            </View>
                        </View>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>العنوان بالتفصيل : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="دير البلح-البلد"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                ref={(input) => {this.ThirdTextInput = input}}
                                onSubmitEditing={() => {this.SixthTextInput.focus()}}
                                onChangeText={(hallAddress) => this.setState({ hallAddress })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                      <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>{errors["hallAddress"]}</StyledText>
                      
                    
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
                                onSubmitEditing={() => {this.SeventhTextInput.focus()}}
                                onChangeText={(hallDescription) => this.setState({ hallDescription })}
                                blurOnSubmit={false}
                                multiline
                                style={styles.Input}
                            />
                            </View>
                        </View>

                      <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>{errors["description"]}</StyledText>


                      <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>عدد القاعات : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="عدد قاعات الصالة"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="phone-pad"
                                ref={(input) => {this.SeventhTextInput = input}}
                                onSubmitEditing={() => {this.nextAddHall()}}
                                onChangeText={(numOfRoom) => this.setState({ numOfRoom })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                       <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>{errors["numOfRoom"]}</StyledText>

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
            hallPhotos:this.state.photos,
            numOfRoom:this.state.numOfRoom,
            category:this.state.category
        }
       
        if(this.validation()){
            this.props.navigation.navigate('AddHallStep2Screen',{firstInfo:firstStep})
        }
    }
}