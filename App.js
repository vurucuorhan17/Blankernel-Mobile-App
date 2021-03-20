import 'react-native-gesture-handler';
import React,{ useEffect,useState } from 'react';
import { View, Text, StyleSheet, Button, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Expo from "expo";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { setCustomText } from 'react-native-global-props';

import Navbar from "./components/Navbar";
import HomeScreen from "./screens/Home";
import PostScreen from "./screens/Post";
import CategoriesScreen from "./screens/Categories";
import AuthorsScreen from "./screens/Authors";
import SearchScreen from "./screens/Search";
import DetailAuthorScreen from "./screens/DetailAuthor";
import PostsByCategoryScreen from "./screens/PostsByCategory";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CategoriesStack = createStackNavigator();
const SearchStack = createStackNavigator();
const AuthorStack = createStackNavigator();

const HomeStackScreen = () => 
{
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Anasayfa" component={HomeScreen} options={{ headerTitle: props => <Navbar styles={{ navbar: styles.navbar, navbarImage: styles.navbarImage, navbarText: styles.navbarText }} /> }} />
      <HomeStack.Screen name="Post" component={PostScreen} options={({ route }) => ({ title: route.params.title,headerStyle:{ backgroundColor: "#800080" }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "bold" } } )}/>
      <HomeStack.Screen name="DetailAuthor" component={DetailAuthorScreen} options={{
        headerShown: false
      }} />
    </HomeStack.Navigator>
  );
}

const CategoriesStackScreen = () => 
{
  return (
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen name="Kategoriler" component={CategoriesScreen} options={{
        headerStyle:{ backgroundColor: "#800080" }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "bold" }
      }}/>
      <CategoriesStack.Screen name="Post" component={PostScreen} options={({ route }) => ({ title: route.params.title,headerStyle:{ backgroundColor: "#800080" }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "bold" } } )}/>
      <CategoriesStack.Screen name="PostsByCategory" component={PostsByCategoryScreen} options={({ route }) => ({ title: route.params.name,headerStyle:{ backgroundColor: "#800080" }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "bold" } } )}/>
    </CategoriesStack.Navigator>
  );
}

const SearchStackScreen = () => 
{
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Arama" component={SearchScreen} options={{
        headerShown: false
      }}/>
      <SearchStack.Screen name="Post" component={PostScreen} options={({ route }) => ({ title: route.params.title,headerStyle:{ backgroundColor: "#800080" }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "bold" } } )}/>
    </SearchStack.Navigator>
  );
}

const AuthorStackScreen = () =>
{
  return (
    <AuthorStack.Navigator>
      <AuthorStack.Screen name="Yazarlar" component={AuthorsScreen} options={{
        headerStyle:{ backgroundColor: "#800080" }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "bold" }
      }} />
      <AuthorStack.Screen name="DetailAuthor" component={DetailAuthorScreen} options={{
        headerShown: false
      }} />
    </AuthorStack.Navigator>
  );
}


export default function App() {
  
  const [isReady,setIsReady] = useState(false);
 
  useEffect(() => {
    const ac = new AbortController();
    async function loadFont()
    {
      await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font
      });
      setIsReady(true);
    }

    loadFont();
    return () => ac.abort();
  },[]);

  if(!isReady)
  {
    return <AppLoading/>
  }
  else
  {
    const customTextProps = { 
      style: { 
        fontFamily: "Roboto_medium"
      }
    }
  
    setCustomText(customTextProps);
  }

  return (
    <>
        <NavigationContainer>
          <Tab.Navigator 
          initialRouteName="Anasayfa"
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
                  iconName = focused ? "people" : "people-outline"
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
            <Tab.Screen name="Anasayfa" component={HomeStackScreen} />
            <Tab.Screen name="Kategoriler" component={CategoriesStackScreen} />
            <Tab.Screen name="Yazarlar" component={AuthorStackScreen} />
            <Tab.Screen name="Arama" component={SearchStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: "purple",
    marginLeft: -20,
    width: 500,
    height: 60,
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
