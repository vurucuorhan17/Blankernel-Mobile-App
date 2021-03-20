import React from "react";
import { Image,StyleSheet,TouchableOpacity } from "react-native";
import { Container,Content,Card,CardItem,Left,Body,Text } from "native-base";
import HTML from "react-native-render-html";

const PostsByCategoryCard = (props) => 
{

    const { title,author,excerpt,image, link, navigation } = props;

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Post",{
            link,
            title: title.replace("&#8211;","-").replace("&#8217;","'").replace("&#8211;","-")
        })}>
            <Content style={styles.card}>
                <Card style={{flex: 0}}> 
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
                            <Image source={{uri: image}} style={{width: 300 , height: 170, flex: 1}}/>
                            <HTML tagsStyles={{ p: { color:"purple",width: 310, height: 55, } }} containerStyle={{ marginLeft: 10, marginTop: 5 }} source={{ html: excerpt }}/> 
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card:{
        marginTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10
    }
});

export default PostsByCategoryCard;
