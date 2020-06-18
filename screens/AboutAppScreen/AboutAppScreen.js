import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image} from "react-native";
import styles from "./AboutAppScreenStyle";
import Constants from 'expo-constants'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'

export default class AboutAppScreen extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>          
        <View style={styles.StatusBar}>
          <StatusBar barStyle="light-content"/>
        </View>
        <View>
          <HeaderMenu navigation={this.props.navigation} title='عن التطبيق'></HeaderMenu>
        </View>
        <View style={{ width: '100%',marginTop: 10}}>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff',paddingTop:20}}
                snapToStart={true}
            >     
                <View style={styles.titleCont}>
                    <Image style={{width:'100%',borderRadius:10}} source={require('../../assets/images/AboutApp.png')} />
                </View>

                <View style={styles.TxtsCont}>
                    <View style={styles.detailCont}>
                        <StyledText style={styles.detail1}>عن التطبيق :</StyledText>
                    </View>

                    <View style={styles.detailCont}>
                        <StyledText style={styles.detail}>
                            {`يتم جمع وسائل التواصل المتاحة التي من ف شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشتراك، على سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر يتم جمع وسائل التواصل المتاحة التي من ف شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشتراك، على منب سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر يتم جمسؤع وسائل التواصل المتاحة التي من ف شأنها تسهيل التواصل وإنشساء وتأكيد عضوية الاشتراك، على سبيل المثال وليس الحصر ع المثال وليس الحصر`}
                        </StyledText>
                        <StyledText style={styles.detail}>
                            {`يتم جمع وسائل التواصل المتاحة التي من ف شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشتراك، على سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر يتم جمع وسائل التواصل المتاحة التي من ف شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشتراك، على منب سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر يتم جمسؤع وسائل التواصل المتاحة التي من ف شأنها تسهيل التواصل وإنشساء وتأكيد عضوية الاشتراك، على سبيل المثال وليس الحصر ع المثال وليس الحصر`}
                        </StyledText>
                    </View>
                </View>
            </ScrollView>
        </View>
      </View>
    );
  }
}