import React, { Component } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import styles from "./UseRuleScreenStyle";
import Constants from 'expo-constants'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'

export default class UseRuleScreen extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>          
        <View style={styles.StatusBar}>
          <StatusBar barStyle="light-content"/>
        </View>
        <View>
            <HeaderMenu navigation={this.props.navigation} title='شروط الاستخدام'></HeaderMenu>
        </View>
        <View style={{ width: '100%',marginTop: 10}}>
          <ScrollView
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff',paddingTop:40}}
            snapToStart={true}
          >
            <View style={styles.titleCont}>
              <StyledText style={styles.title}>من يمكنه استخدام الخدمات ؟</StyledText>
            </View>

            <View style={styles.TxtsCont}>
              <View style={styles.detailCont}>
                <StyledText style={styles.detail}>
                  {`يتم جمع وسائل التواصل المتاحة التي من ف شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشتراك، على سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر`}
                </StyledText>
              </View>

              <View style={styles.detailCont}>
                <StyledText style={styles.detail}>
                <StyledText style={styles.detailTitle}>الخطوة الأولى : </StyledText> 
                  {`يتم جمع وسائل التواصل المتاحة التي من ف شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشتراك، على سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر`}
                </StyledText>
              </View>

              <View style={styles.detailCont}>
                <StyledText style={styles.detail}>
                <StyledText style={styles.detailTitle}>الخطوة الثانية : </StyledText> 
                  {`يتم جمع وسائل التواصل المتاحة التي من ف شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشتراك، على سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر`}
                </StyledText>
              </View>

              <View style={styles.detailCont}>
                <StyledText style={styles.detail}>
                <StyledText style={styles.detailTitle}>الخطوة الثالثة : </StyledText> 
                  {`يتم جمع وسائل التواصل المتاحة التي من ف شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشتراك، على سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر`}
                </StyledText>
              </View>

            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}