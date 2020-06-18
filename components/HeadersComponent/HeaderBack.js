import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText from '../StyledTexts/StyledText';
import { Header } from 'react-navigation-stack';
import { AntDesign } from "@expo/vector-icons";

export default class HeaderBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
        };
    }
    componentDidMount() {
        this.setState({
            title: this.props.title
        });
    }

    render() {
        return (
            <>
            <View style={styles.containerLinear}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <AntDesign name='arrowleft' size={25} color='transparent' />
                    </TouchableOpacity>
                </View>
        
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <StyledText style={{textAlign:'center',fontSize:16,color:this.props.from == 'profile'?'#fff':'#000' }}>
                    {this.props.title}
                    </StyledText>
                </View>
        
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()} 
                    >
                        <AntDesign name='right' size={25} color={this.props.from == 'profile'?'#fff':'#000'} />
                    </TouchableOpacity>
                </View>
            </View>
            </>
        );
    }

}

const styles = StyleSheet.create({
    containerLinear: {
        paddingHorizontal: 20,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: Header.HEIGHT,
        // height:40,
      }
});





