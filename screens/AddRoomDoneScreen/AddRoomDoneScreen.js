import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TextInput,TouchableOpacity} from "react-native";
import styles from "./AddRoomDoneScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'

export default class AddRoomDoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            isConnected: null,
        }
    }

    render() {
        return (
        <View style={styles.containerStyle}>          
            <View style={styles.StatusBar}>
            <StatusBar barStyle="light-content"/>
            </View>

            <View style={{ width: '100%',marginTop: 10}}>
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1,alignItems:'center',justifyContent:'center',backgroundColor:'#fff',paddingTop:120}}
                    snapToStart={true}
                >   
                    <Image source={require('../../assets/images/sucessRegister.png')} />
                    <StyledText style={styles.thanks}>نجاح</StyledText>
                    <StyledText style={styles.try}>تم إضافة القاعة بنجاح </StyledText>

                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('Profile')} >
                        <StyledText style={styles.move}>الانتقال للملف الشخصي</StyledText>
                    </TouchableOpacity>
                
                </ScrollView>
            </View>
        </View>
        );
    }
}