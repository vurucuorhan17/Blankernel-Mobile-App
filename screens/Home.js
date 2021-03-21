import React, { Component } from "react";
import { ScrollView, Button, Text, StyleSheet, View, FlatList, TouchableOpacity} from "react-native";
import ArticleOnHome from "../components/ArticleOnHome";
import Icon from "react-native-vector-icons/Ionicons";

class Home extends Component
{
    constructor(props)
    {
        super(props);
        this.onEndReachedCalledDuringMomentum = false;
        this.state = {
            page: 1,
            posts: [],
            isLoading: false,
            isRefreshLoading: false,
            hasMoreToLoad: true
        }
        this.listViewRef;
    }
    
    componentDidMount()
    {
        const ac = new AbortController(); 

        this.setState({isLoading: true},this.getData);

        return () => ac.abort();
    }

    getData = async () => 
    {
        await fetch(`http://blankernel.com/wp-json/wp/v2/posts?page=${this.state.page}&_embed`)
        .then(response => response.json())
        .then((data) => {
            if(data.length < 10)
            {
                this.setState({ hasMoreToLoad: false });
            }
            this.setState({
                posts: this.state.posts.concat(data),
                isLoading: false
            })
        })
        .catch(err => err);
    }

    getDataFromRefresh = async () => 
    {
        this.setState({isRefreshLoading: true})
        await fetch(`http://blankernel.com/wp-json/wp/v2/posts?page=${1}&_embed`)
        .then(response => response.json())
        .then((data) => {
            this.setState({
                posts: data,
                page: 1
            })
        })
        .finally(() => this.setState({isRefreshLoading: false}))
        .catch(err => err);
    }

    handleLoadMore = () =>
    {
        if(this.state.hasMoreToLoad)
        {
            this.setState({
                page: this.state.page + 1,
                isLoading: true
            },this.getData)
        }
        else
        {
            return null;  
        }
    }

    renderFooter = () => 
    {
        return (
            this.state.isLoading ? (
                <View style={styles.loader}>
                    <Text>Makaleler yükleniyor...</Text>
                </View>
            ) : null
            
        );
    }

    renderItem = ({item}) =>
    {
        {
            try 
            {
                return (
                    <ArticleOnHome
                        id={item.id}
                        title={item.title.rendered}
                        author={item._embedded.author[0].name}
                        image={item._embedded['wp:featuredmedia'][0].source_url}
                        excerpt={item.excerpt.rendered}
                        navigation={this.props.navigation}
                        link={item.link}
                    />
                );
            }
            catch(e)
            {
                return null;
            }
        }
        
    }

    scrollTopHandler = () => 
    {
        this.listViewRef.scrollToOffset({ offset: 0, animated: true });
    }

    render()
    {
        return (
            <>
            <View style={styles.container}>
                <FlatList
                    data={this.state.posts}
                    renderItem={this.renderItem}
                    keyExtractor={(item,index) => index.toString()}
                    onEndReached={this.state.hasMoreToLoad ? this.handleLoadMore : null}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.isRefreshLoading}
                    onRefresh={this.getDataFromRefresh}
                    ref={(ref) => {
                        this.listViewRef = ref;
                    }}
                />
                {this.state.isLoading ? null : (
                    <TouchableOpacity activeOpacity={0.7} style={styles.scrollTopButton} onPress={this.scrollTopHandler}>
                        <Icon style={styles.arrowUp} name="arrow-up-outline" size={30}/>
                    </TouchableOpacity>
                )}
            </View>
            </>
        ); 
    }

}


const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginTop: 15,
    },
    pagination: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10
    },
    num:{
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 5,
        marginRight: 10,
        paddingRight: 10,
        backgroundColor: "purple",
        width: 35,
        height: 30
    },
    numText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 3
    },
    loader: {
        marginTop: 10,
        alignItems: "center",
        marginBottom: 5
    },
    scrollTopButton: {
        right: 30,
        bottom: 35,
        position: "absolute",
        width: 60,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "purple",
        borderWidth: 0.5,
        borderRadius: 70,
        borderColor: "purple"

    },
    arrowUp:{
        color: "white"
    }
});


export default Home;