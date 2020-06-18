import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TouchableOpacity } from "react-native";
import styles from "./ProfileScreenStyle";
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import StyledText from "../../components/StyledTexts/StyledText";
import {AntDesign} from '@expo/vector-icons'

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {          
        }
    }
    
    render() {
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
                    source={require('../../assets/images/profile.png')} />
            </View>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',paddingHorizontal:15}}
                snapToStart={true}
            >     
                <View style={{width: '100%',height:'100%',paddingBottom: 50}}>
                    <View style={styles.info}>
                        <StyledText style={styles.name}>شيماء ابو عمرة</StyledText>
                        <StyledText style={styles.email}>xxxxx @gmail .com</StyledText>

                        <View style={styles.infoRow}>
                            <View style={styles.infoRowinfo}>
                                <StyledText style={styles.infotxt}>059777777</StyledText>
                            </View>
                            <View style={styles.infoRowtitle}>
                                <StyledText style={styles.title}>الهاتف :</StyledText>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoRowinfo}>
                                <StyledText style={styles.infotxt}>دير البلح</StyledText>
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
                        <TouchableOpacity style={styles.joinTouch}
                            onPress={() => this.props.navigation.navigate('AddHallScreen')}
                        >
                            <StyledText style={styles.joinTXT}>انضم لأصحاب الصالات</StyledText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
        );
    }
}