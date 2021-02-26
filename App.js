import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{ useEffect } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Expo from "expo";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Navbar from "./components/Navbar";
import HomeScreen from "./screens/Home";
import CategoriesScreen from "./screens/Categories";
import AuthorsScreen from "./screens/Authors";
import SearchScreen from "./screens/Search";

const Tab = createBottomTabNavigator();

export default function App() {
  
  useEffect(() => {
    async function loadFont()
    {
      await Font.loadAsync({
          ...Ionicons.font
      });
    }

    loadFont()
  },[]);
  
  return (
    <>
        <Navbar styles={{ navbarImage: styles.navbarImage, navbar: styles.navbar, navbarText: styles.navbarText }} />
        <NavigationContainer>
          <Tab.Navigator 
          initialRouteName="Home"
          screenOptions={
            ({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Anasayfa') {
                  iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'Kategoriler') {
                  iconName = focused ? 'list' : 'list-outline';
                }
                else if(route.name === "Yazarlar")
                {
                  iconName = focused ? "body" : "body-outline"
                }
                else if(route.name === "Arama")
                {
                  iconName = focused ? "search" : "search-outline"
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
            })
          }
          tabBarOptions={{
            activeTintColor: "purple",
            inactiveTintColor: "gray"
          }}
          >
            <Tab.Screen name="Anasayfa" component={HomeScreen}/>
            <Tab.Screen name="Kategoriler" component={CategoriesScreen} />
            <Tab.Screen name="Yazarlar" component={AuthorsScreen} />
            <Tab.Screen name="Arama" component={SearchScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: "purple",
    height: 60
  },
  navbarText: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "normal",
    color: "white",
  },
  navbarImage: {
    marginTop: 3,
    marginLeft: 10
  }
});
