import React from "react";
import { ScrollView,Text,Button, StyleSheet,View,ImageBackground,StatusBar } from "react-native";
import HTML from "react-native-render-html";
import Icon from "react-native-vector-icons/Ionicons";
import { WebView } from "react-native-webview";

const Post = ({ route, navigation }) => 
{

    const { link } = route.params;

    return (
        <WebView source={{ uri: `${link}` }}  />
    );
}

const styles = StyleSheet.create({
    postTitle: {
        textAlign:"center",
        marginTop: 20
    },
    postImage: {
        height: 200,
        
    }
});

export default Post;