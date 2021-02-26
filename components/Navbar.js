import React from "react";
import { Image,Text,View,StatusBar } from "react-native";


const Navbar = ({ styles: { navbarImage,navbar, navbarText } }) =>
{
    return (
        <View style={navbar}>
            <StatusBar backgroundColor="purple"/>
            <Image style={navbarImage} source={{ uri: "https://blankernel.com/wp-content/uploads/2019/10/w-logo-blue.png", width: 55, height: 55 }}/>
            <Text style={navbarText}>BLANKERNEL</Text>
        </View>
    );
}

export default Navbar;