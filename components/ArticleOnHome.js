import React from "react";
import { View,StyleSheet,Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import HTML from "react-native-render-html";
import { Container,Content,Card,CardItem,Left,Body,Text } from "native-base";

const ArticleOnHome = (props) =>
{

    const { id,title, author, image, excerpt, navigation, link } = props;

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Post",{
            link,
            title: title.replace("&#8211;","-").replace("&#8217;","'").replace("&#8211;","-")
        })}>
            <Content style={styles.cardBorder}>
                <Card> 
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>{title.replace("&#8211;","-").replace("&#8217;","'").replace("&#8211;","-")}</Text>
        
                                <Text note>{author}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Image source={{uri: image}} style={{width: 300 , height: 170}}/>
                            <HTML tagsStyles={{ p: { color:"purple",width: 310, height: 55, } }} containerStyle={{ marginLeft: 5, marginTop: 5 }} source={{ html: excerpt }}/> 
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </TouchableOpacity>
          
    );

}

const styles = StyleSheet.create({
    cardBorder: {
        marginTop: 5,
        marginBottom: 10,
        marginLeft: -10,
        marginRight: 10
    },
    title:{
        fontSize: 19,
        fontWeight: "bold",
        
    },
    cardImage: {
        marginTop: 20,
        marginLeft: 10,
        resizeMode: "cover"
    },
    excerpt: {
        marginLeft: 10,
        marginTop: 8
    },
    authorText: {
        marginLeft: 10,
        marginTop: 5,
        fontFamily:"Roboto_medium"
    }
});

export default ArticleOnHome;