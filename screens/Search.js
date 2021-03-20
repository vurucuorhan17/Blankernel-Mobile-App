import React,{ useState } from "react";
import { StatusBar, TouchableOpacity,StyleSheet } from "react-native";
import { Container, Header, Item, Input, Icon, Button, Text, Content,Card,CardItem,Body } from 'native-base';

const Search = ({ navigation }) => 
{

    const [searchText, setSearchText] = useState("");
    const [searchArticlesData, setSearchArticlesData] = useState([]);

    const getArticles = async () => 
    {
        await fetch(`https://blankernel.com/wp-json/wp/v2/search?search=${searchText}&subtype=page&subtype=post`)
        .then(response => response.json())
        .then(data => {
            setSearchArticlesData(data);
        });
    }

    return (
        <>
        <Container>
            <Header searchBar rounded style={{ backgroundColor: "#800080" }}>
            <StatusBar backgroundColor="#800080" barStyle="light-content"/>
            <Item>
                <Icon name="ios-search" />
                <Input placeholder="Ara" onChangeText={text => setSearchText(text) } onSubmitEditing={() => getArticles() } />
            </Item>
            </Header>
            <Content style={styles.searchCard}>
                {searchArticlesData.length > 0 ? (
                    searchArticlesData.map((item,i) => (
                        <Card key={i}>
                            <TouchableOpacity onPress={() => navigation.navigate("Post",{
                                    link: item.url,
                                    title: item.title.replace("&#8211;","-").replace("&#8217;","'").replace("&#8211;","-")
                                }) }>
                                <CardItem> 
                                        <Body>
                                            <Text>
                                                {item.title.replace("&#8211;","-").replace("&#8217;","'").replace("&#8211;","-")}
                                            </Text>
                                        </Body>
                                    
                                </CardItem>
                            </TouchableOpacity>
                        </Card>
                    ))
                ): null}
            </Content>
        </Container>
        </>
    );
}

const styles = StyleSheet.create({
    searchCard: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5
    }
});

export default Search;