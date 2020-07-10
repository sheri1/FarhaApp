import React, { Component } from "react";
import { View, ScrollView, StatusBar,TouchableOpacity,Image,Modal,TextInput,Switch} from "react-native";
import styles from "./ManagerHallsScreenStyle";
import Constants from 'expo-constants'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import { SearchBar } from "react-native-elements";
import {MaterialCommunityIcons,AntDesign,Entypo} from '@expo/vector-icons'
import SearchList from '../../components/SearchList'
import { Rating } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import * as firebase from 'firebase';

export default class ManagerHallsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchList:[],
      modalVisible:false,
      hallPersonNum:300,
      priceValue:0,

      date:new Date(),
      showDate:false,
      Selecteddate:'',
      mostBooked:true,
      minPrice:'',
      maxPrice:''
    }
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    var halls = firebase.firestore().collection("halls");
    var query = halls.where("owner", "==", user.uid)
      .get().then((querySnapshot)  => {
          querySnapshot.forEach((doc) => {
            const hallData = doc.data();
            let hallListData = [];
            hallListData.push(
              {id:doc.id,
                image: hallData.hallImage,
                name: hallData.name,
               
                location:hallData.address,
                discount:null,
                uri:true
                
                }
            )
            this.setState(prevState => ({
              searchList: [...prevState.searchList, ...hallListData]
            }))
              
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }

  selectItem = (id) => {
    let listDataCopy = JSON.parse(JSON.stringify(this.state.regionsList));
    listDataCopy.forEach((elem) => {
      elem.isSelect = false;
      if (elem.id === id) {
        elem.isSelect = true;
      }
    });
    const filter = listDataCopy[id].name;
    this.setState({
      regionsList: listDataCopy,
      reginFilter: filter,
    });
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  selectDate(value){
    this.setState({showDate:false,showTimer:false})
    const SelectedDateTime = value;
    const Selecteddate = moment(value).format("YYYY-MM-DD");
    const SelectedTime = moment(value).format("h:mm:ss");
    // console.log(Selecteddate , SelectedTime)
    this.setState({Selecteddate:Selecteddate})
  } 

  toggleSwitch = () => {
    this.setState({mostBooked: ! this.state.mostBooked})
  }

  searchFilter(){
    this.setState({modalVisible:false})
  }

  render() {
    return (
      <View style={styles.containerStyle}>          
        <View style={styles.StatusBar}>
          <StatusBar barStyle="light-content"/>
        </View>
        <View>
          <HeaderMenu navigation={this.props.navigation} title='الصالات الخاصة بي'></HeaderMenu>
        </View>
        <View style={{ width: '100%',marginTop: 10}}>
          <ScrollView
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false} snapToStart={true}
            contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff',paddingBottom:60,paddingTop:20,paddingHorizontal:10}}
          >

       


            <View style={{width: '100%'}}>
            
                <>
                <View style={styles.storiesImagesCont}>
                    <SearchList 
                      navigation={this.props.navigation}
                      details={this.state.searchList}
                    />
                  </View>
                </>
            
            </View>

           
          </ScrollView>
        </View>
      </View>
    );
  }

  updateSearch = (search) => {
    // this.setState({ search: search.trim() });
    // if (search) {
    // } else {
    //   this.setState({
    //     showSearchView:false,
    //     empty: false,
    //     productsFound: false,
    //     img_empty: false,
    //     refreshing: false,
    //     spinner:false
    //   });
    // }
  }

  clearSearch() {
    // this.setState({
    //   showSearchView:false,
    //   empty: false,
    //   productsFound: false,
    //   spinner: false,
    //   img_empty: false,
    //   refreshing: false
    // });
  }

  SearchAboutProducts(searchText) {
    // if (searchText.trim() != null && searchText.trim() != "") {
    //     this.setState({
    //         showSearchView:true,
    //         activities: [],
    //         spinner: true,
    //         img_empty: false,
    //         refreshing: false,
    //         search:searchText
    //     });
    //     this.props.searchProduct(searchText).then((response) => {
    //         // console.log(response)
    //         if (response.type == 'FETCH_SEARCH_SUCESS') {
    //         if (response.payload.items.length) {
    //             try {
    //                 let activitiesArray = response.payload.items;
    //                 this.setState({
    //                     spinner: false,
    //                     empty: false,
    //                     activities: activitiesArray,
    //                     img_empty: false,
    //                     refreshing: false,
    //                     selectIndex:null
    //                 });
    //             } catch (error) {
    //                 console.log(error.message);
    //             }
    //         } else {
    //             try {
    //                 this.setState({
    //                     empty: true,
    //                     spinner: false,
    //                     img_empty: true,
    //                     refreshing: false,
    //                     selectIndex:null
    //                 });
    //             } catch (error) {
    //                 console.log(error.message);
    //             }
    //         }
    //         } else {
    //         this.setState({
    //             empty: true, img_empty: true, refreshing: false, selectIndex:null
    //         });
    //             alert(i18n.t('loginScreen.server',{locale:this.props.LanguageReducer.langID}));
    //         }
    //     });
    // }
  }

}