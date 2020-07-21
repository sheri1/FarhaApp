import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TextInput,TouchableOpacity} from "react-native";
import styles from "./AddRoomScreenStyle";
import Constants from 'expo-constants'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {FontAwesome,Ionicons} from '@expo/vector-icons'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase/app'

export default class AddRoomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName:"",
            roomPrice:"",
            roomPersons:"",
            serviceName:"",
            servicePrice:"",
            photoURL:"",
            // step2:true,
            errors:{},
            freeService:false,
            paidService:true,
            photos:[],
            hallId:null,
            roomNumber:0

        }
    }

    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        const roomNum = this.props.navigation.getParam('roomNum');
        console.log('hall id' , id);
        this.setState({hallId:id,
        roomNumber:roomNum});
    }

    chooseServiceType(t){
        if(t == 'f'){
            this.setState({freeService:true,paidService:false})
        }else{
            this.setState({freeService:false,paidService:true})
        }
    }
    
    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images"
        }).then((result) => {
            if (!result.cancelled) {
                const {photos} = this.state;
                const imgPath = result.uri;
                photos.push({path: result.uri})
                this.setState({photos, imagesScrollVisibile: true})
                var imgName = new Date().getTime();                
                this.uploadImage(imgPath,imgName);
            }
        })
    }

    uploadImage = async (path, imageName) => {
        const response = await fetch(path);
        const blob = await response.blob();
    
        const ref = firebase.storage().ref().child("rooms/" + imageName);
        return ref.put(blob).then(() => { //After store the image -> get the url of it 
                ref.getDownloadURL()
                .then(url=>{
                    this.setState({photoURL:url});
                })
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
        const {roomName,roomPrice,roomPersons,serviceName,servicePrice,photos,errors} = this.state;
        if (!roomName) {
            isValid = false;
            errors["roomName"] = "الرجاء ادخال اسم القاعة"
        }

        if (!roomPrice) {
            isValid = false;
            errors["roomPrice"] = "الرجاء ادخال سعر حجز القاعة"
        }

        if (!roomPersons) {
            isValid = false;
            errors["roomPersons"] = "الرجاء ادخال عدد الأشخاص المحتملين"
        }

        if (!serviceName) {
            isValid = false;
            errors["serviceName"] = "الرجاء ادخال اسم الخدمة"
        }

        if (!servicePrice) {
            isValid = false;
            errors["servicePrice"] = "الرجاء ادخال سعر الخدمة"
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
                <HeaderBack navigation={this.props.navigation} title='أضف قاعتك'></HeaderBack>
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
                {/* <View style={styles.imageCont}>
                    <TouchableOpacity style={styles.CircleCont}>
                        <View style={styles.inAciveCircleCont2}>
                            <StyledText style={styles.txt}>3</StyledText>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.spaceCont}></View>
                    <TouchableOpacity style={styles.CircleCont}>
                        <View style={styles.inAciveCircleCont}>
                            <StyledText style={styles.txt}>2</StyledText>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.spaceCont}></View>
                    <TouchableOpacity style={styles.CircleCont}>
                        <View style={styles.aciveCircleCont}>
                            <StyledText style={styles.txt}>1</StyledText>
                        </View>
                    </TouchableOpacity>
                </View> */}

                    <View style={styles.InputContainer}>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>تفاصيل القاعة :</StyledTextBold>
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

                        <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>
                            {errors["photoError"]}
                        </StyledText>
                        
                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>اسم القاعة : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="القاعة الكبرى"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                onSubmitEditing={() => {this.secondTextInput.focus()}}
                                onChangeText={(roomName) => this.setState({ roomName })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                        
                        <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>
                            {errors["roomName"]}
                        </StyledText>
                        

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>سعر القاعة ($) : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="****"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                ref={(input) => {this.secondTextInput = input}}
                                onSubmitEditing={() => {this.thirdTextInput.focus()}}
                                onChangeText={(roomPrice) => this.setState({ roomPrice })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                        
                        <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>
                            {errors["roomPrice"]}
                        </StyledText>
                        

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>عدد الأفراد المحتملين : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="****"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="phone-pad"
                                ref={(input) => {this.thirdTextInput = input}}
                                onSubmitEditing={() => {this.fourthTextInput.focus()}}
                                onChangeText={(roomPersons) => this.setState({ roomPersons })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>


                        <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>
                            {errors["roomPersons"]}
                        </StyledText>
                        

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>الخدمات :</StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="اسم الخدمة"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                ref={(input) => {this.fourthTextInput = input}}
                                onSubmitEditing={() => {this.fifthTextInput.focus()}}
                                onChangeText={(serviceName) => this.setState({ serviceName })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                        
                        <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>
                            {errors["serviceName"]}
                        </StyledText>
                        

                        <View style={[styles.InputContainer2,{paddingRight:0,paddingLeft:0}]}>
                            <View style={[styles.inputCont,{backgroundColor:'#fff'}]}>
                                <TouchableOpacity style={this.state.freeService?styles.activeTypeCont:styles.typeCont}
                                    onPress={()=>this.chooseServiceType('f')}
                                >
                                    <StyledText style={this.state.freeService?styles.activetxt:styles.inactivetxt}>
                                        مجانية
                                    </StyledText>
                                </TouchableOpacity>
                                <View style={{width:20}}></View>
                                <TouchableOpacity style={this.state.paidService?styles.activeTypeCont:styles.typeCont}
                                    onPress={()=>this.chooseServiceType('p')}
                                >
                                    <StyledText style={this.state.paidService?styles.activetxt:styles.inactivetxt}>
                                        مدفوعة
                                    </StyledText>
                                </TouchableOpacity>
                            </View>
                        </View>

                        

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>سعر الخدمة ($) : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="****"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                ref={(input) => {this.fifthTextInput = input}}
                                onSubmitEditing={() => {this.AddRoom()}}
                                onChangeText={(servicePrice) => this.setState({ servicePrice })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>
                    </View>

                    <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>
                            {errors["servicePrice"]}
                    </StyledText>

                    {/* <View style={[styles.RegisterButtonCont,{marginTop:70}]}> */}
                    <View style={styles.RegisterButtonCont}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.LoginTouch}
                          onPress={() => {this.AddRoom()}}
                        >
                          <StyledText style={{color:'#fff',fontSize:15}}>أضف القاعة</StyledText>
                        </TouchableOpacity>
                    </View>

                </KeyboardAwareScrollView> 
                </ScrollView>
            </View>
        </View>
        );
    }
    
    AddRoom(){
        const {hallId,roomNumber} = this.state;
        console.log('id' ,hallId)
        const roomsData = { 
            roomName:this.state.roomName,
            roomPrice:this.state.roomPrice,
            roomPersons:this.state.roomPersons,
            serviceName:this.state.serviceName,
            servicePrice:this.state.servicePrice,
            roomImage:this.state.photoURL,
            freeService:this.state.freeService,
            paidService:this.state.paidService,
            hallId: this.state.hallId
        }
        if(this.validation()){
            const ref = firebase.firestore().collection('rooms').add(roomsData)
            .then(()=>{
               firebase.firestore().collection('halls').doc(hallId).update({
                    roomNum: Number(roomNumber) + 1,
                })
                .then(()=>console.log('done'))
                .catch(e=>console.log(e))
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                alert('Something went wrong');
            });
            
            console.log(hallId);

        }

        
        setTimeout(() => this.props.navigation.navigate('AddRoomDoneScreen') , 4000);
        
        
    }
}