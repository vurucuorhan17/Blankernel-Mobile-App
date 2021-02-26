import React from "react";
import { View,StyleSheet,Image,Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import HTML from "react-native-render-html";

const ArticleOnHome = (props) =>
{

    const { id,title, author, image, excerpt } = props;

    return (
        <TouchableOpacity>
            <View style={styles.cardBorder}>
                <HTML containerStyle={{marginLeft: 15,marginTop: 20,}} source={{ html: title }}/>
                <Text style={styles.authorText}>Yazar: {author}</Text>
                <Image style={styles.cardImage} source={{ uri: image, width: 300 , height: 150 }}></Image>
                <Text style={styles.excerpt}>{excerpt.substring(3,100)}...</Text>
            </View>
        </TouchableOpacity>

    );

}

const styles = StyleSheet.create({
    cardBorder: {
        flex: 1,
        flexDirection: "column",
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "grey",
        borderRadius: 3,
        marginBottom: 10,
        width: 330,
        height: 310,
        alignItems: "baseline",
        alignSelf: "flex-start",
        marginLeft: 6,
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
        marginLeft: 16,
        marginTop: 5,
        fontStyle: "italic"
    }
});

export default ArticleOnHome;