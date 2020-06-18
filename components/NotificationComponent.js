import * as React from "react";
import { StyleSheet, View, Image, TouchableOpacity , FlatList, ActivityIndicator} from "react-native";
import StyledText from './StyledTexts/StyledText';
import StyledTextBold from './StyledTexts/StyledTextBold';

export default class NotificationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {          
        };
    }

    componentDidMount(){
    }

    render() {
        let notificationList = this.props.details
        return (
            <>
                <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    snapToStart={true}
                    data={notificationList}
                    extraData={this.props}
                    renderItem={({item})=>(
                        <TouchableOpacity style={styles.container} activeOpacity={0.7}>
                            <View style={{flex:2}}>
                                <View style={styles.titleView}>
                                    <StyledText style={styles.titleText}>
                                        {item.title}
                                    </StyledText>
                                </View>
                                <View style={styles.titleView}>
                                    <StyledText style={styles.dateTime}>
                                        {item.date}   {item.time}
                                    </StyledText>
                                </View>
                            </View>

                            <View>
                                <Image style={styles.imgStyle} 
                                source={require('../assets/images/newNotifi.png')} />
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {width: '100%', borderRadius: 15, flexDirection: 'row', padding: 10, marginBottom: 0,
        paddingTop:10,height:100,marginBottom:10,borderBottomWidth:1,borderBottomColor:'#F2F2F2'
    },
    timeView: {justifyContent: 'center',alignItems:'center', marginRight: 10,width:'100%',
        flexDirection:'row',paddingHorizontal:10
    },
    timeView2:{flex:3},
    timeView3:{flex:1},
    timeText: { fontSize: 8, color: '#808080',textAlign: 'left',marginBottom:3},
    timeText2: { fontSize:14, color: '#808080',textAlign: 'right',marginBottom:3,fontWeight:'bold'},
    titleView: { alignItems: 'flex-end',justifyContent: 'center', marginRight: 10 },
    titleText: { fontSize:14, textAlign: 'right',marginBottom:3,color:'#000',lineHeight:20},
    // imgStyle: { width: 45, height: 45 ,borderRadius:40/2},
    iconStyle: { position: 'absolute', bottom: 0, right: 0 },
    dateTime:{fontSize:10,color:'#A2A2A2',marginTop:5}
})