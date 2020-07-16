import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TextInput,TouchableOpacity} from "react-native";
import styles from "./RegisterDoneScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import { withFirebaseHOC } from '../../config/Firebase'

 class RegisterDoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            isConnected: null,
        }
    }

    // aya
    componentDidMount() {
        const currentUser = this.props.firebase.auth.currentUser;
        if(currentUser != null) {
            currentUser.sendEmailVerification().then(function() {
                // Email sent.
                alert('يرجى مراجعة بريدك الالكتروني لتأكيد التسجيل');
              }).catch(function(error) {
                // An error happened.
                alert('error')
              });
        }
    }

    //

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
                    <StyledText style={styles.try}>لقد تم تسجيل حسابك بنجاح</StyledText>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')}>
                        <StyledText style={styles.move}>الانتقال للرئيسية</StyledText>
                    </TouchableOpacity>
                
                </ScrollView>
            </View>
        </View>
        );
    }
}
 export default withFirebaseHOC(RegisterDoneScreen)