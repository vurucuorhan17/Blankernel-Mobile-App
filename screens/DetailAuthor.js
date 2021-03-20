import React from "react";
import { View, Text, StatusBar, ImageBackground, StyleSheet } from "react-native";
import { Thumbnail, Content, List, ListItem, Left, Right, Container } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

const DetailAuthor = ({ route, navigation }) => {

    const { name, description, image, mail } = route.params;

    return (
        <View>
            <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
            <ImageBackground style={styles.bannerImage} source={{ uri: "https://blankernel.com/wp-content/uploads/2020/03/blankernel_header.jpg" }} >
                <Icon style={styles.arrowBack} name="arrow-back-outline" size={30} onPress={() => navigation.goBack()}/>
                <Thumbnail square style={styles.profilePhoto} source={{ uri: image }} />
            </ImageBackground>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>

            <List>
                <ListItem>
                        <Icon name="mail-outline" size={30} />
                        <Icon style={{ marginLeft:5, marginRight: 10 }} name="chevron-forward-outline" size={30}/>
                        <Text>{mail}</Text>
                </ListItem>
            </List>
        </View>
    );
}

const styles = StyleSheet.create({
    bannerImage: {
        width: 450,
        height: 200
    },
    profilePhoto: {
        marginLeft: 125,
        marginTop: 100,
        width: 120,
        height: 120,
        borderWidth: 3,
        borderColor: "white"
    },
    name: {
        marginTop: 90,
        fontSize: 20,
        textAlign: "center"
    },
    description: {
        fontFamily: "Roboto",
        textAlign: "center",
        marginTop: 5
    },
    arrowBack: {
        marginTop: 25,
        marginLeft: 15,
        color: "white"
    }
});

export default DetailAuthor;