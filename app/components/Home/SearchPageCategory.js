import React, { Component } from 'react'
import { ImageBackground, RefreshControl, Image, TouchableOpacity, ScrollView, View, Text, Dimensions, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,ListItem  } from 'react-native-elements';
import { EventRegister } from 'react-native-event-listeners';
import Spinner from "react-native-loading-spinner-overlay";

import { productListStyle } from '../Category/ProductListStyle';
import { commonStyle} from '../Common/CommonStyle';
import ProductListItem from '../Category/ProductListItem';
import { CustomIconInfoButton, } from '../Common/index';
import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners, onNavigationPopToRoot } from '../../config/navigations';

import colors from '../../resources/colors';
import images from "../../resources/images";

//Action
import { CategoryAction } from "../../redux/actions/index";


export class SearchPageCategory extends Component {
 
    static propTypes = {
        searchText: PropTypes.any
    }
    constructor(props) {
        super(props);
        this.state = {
            search: this.props.searchText,
            spinner: false,
            refreshing: false,
            searchResult:[],
            shoppingCartData:this.props.shoppingCartData ? this.props.shoppingCartData : [],
          isSearchListFound:0,
            offset:0,
            count:500
            // shoppingCartData : this.props.shoppingCartData,
        };
        Navigation.events().bindComponent(this);
        
    }
  

   

   

    
    

    


    componentWillReceiveProps(nextProps) {
        if(this.props.isSearchDataFound!==nextProps.isSearchDataFound){
            if(nextProps.isSearchDataFound===1){
                this.setState({
                    searchResult:nextProps.searchResult,
                    spinner:false,
                    isSearchListFound:0
                })
            }else if(nextProps.isSearchDataFound===2){
                this.setState({
                    searchResult:[],
                    spinner:false,
                    isSearchListFound:2
                })
            }
        }
    }

    componentDidMount(){
        this.search.focus();
    }

    

    onNavigateToProductList(items){
        onNavigation("navigation.ismart.ProductList",
        "",
        this.props.componentId,
        { categoryId: items.CatagoryId, type:items.ParentId===0?"Cata":"SubCata", categoryName: items.CatagoryName })
    }

    

    

    updateSearch = search => {
        this.setState({ search ,spinner:true,});
        this.props.searchCategory({
            search:search,
            offset:this.state.offset,
            count:this.state.count,
            
        })
    };

    _renderProductList=({item})=>(
        
        
        <TouchableOpacity onPress={()=>this.onNavigateToProductList(item)}>
        <View 
        style={{
            flex:1,
            flexDirection:'row',
            borderBottomColor:colors.white,
            borderBottomWidth:1,
            padding:2,
            marginBottom:2}}
        >
            <View>
            <Image resizeMode="cover" style={{
                marginTop:0, 
                height:60, 
                width:60,
                borderRadius:12,
                alignSelf:"center",
            }}  source={{uri:item.CatagoryImage}}/>
            
            </View>
            <View style={{flex:2}}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'700',
                    padding:5
                    
                }}>{item.CatagoryName}</Text>
                
                <Text style={{
                    color:colors.red,
                    fontSize:12,
                    paddingLeft:10
                }}>Total Items: {item.ParentId===0?item.ProductCatagoryCount:item.ProductSubCatagoryCount}</Text>
            </View>
        </View>
        </TouchableOpacity>

   
    )
    render() {
        const { search } = this.state;
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                <SearchBar 
                placeholder="Search here" 
                showLoading={this.state.spinner} 
                onChangeText={this.updateSearch} 
                value={search} 
                autoCorrect={false} 
                ref={search => this.search = search}
                inputContainerStyle={commonStyle.searchBarInputContainerStyle } 
                containerStyle={commonStyle.searchBarContainerStyle} />
                
                
                {/* <ScrollView refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={}/> } >  */}
                    <ScrollView style={productListStyle.scrollContainer}  >
                        {this.state.searchResult && this.state.searchResult.length > 0 ?  
                        <FlatList
                            data={this.state.searchResult}
                            renderItem={this._renderProductList}
                            keyExtractor={item=>item.SUK+"-"+item.ProductName}
                           
                            
                           
                        />
                        
                        :<View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>{this.props.isSearchDataFound===2?"No Record Found":"Loading..."}</Text></View>}
                    </ScrollView>                                       
                {/* </ScrollView> */}
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    shoppingCartData:state.shoppingcart.shoppingCartData,
    searchResult:state.category.searchResult,
    isSearchDataFound:state.category.isSearchDataFound
    
})

const mapDispatchToProps = {
   ...CategoryAction
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageCategory)
