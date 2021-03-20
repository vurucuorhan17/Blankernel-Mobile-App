import React,{ useEffect, useState } from "react";
import { View,Text,TouchableOpacity } from "react-native";
import { Container,Content,List,ListItem,Left,Right } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

const Categories = ({ navigation }) => 
{

    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        const ac = new AbortController();

        async function getCategories()
        {
                await fetch("https://blankernel.com/wp-json/wp/v2/categories?per_page=40")
                .then(response => response.json())
                .then(data => {
                    setCategoriesData(data);
                });
        }
        
        getCategories();

        return () => ac.abort();

    },[]);

    

    return (
        <Container>
            <Content>
                <List>
                    {categoriesData.map((data,i) => (
                        <ListItem key={i}>
                            <Left>
                                <Text>{data.name}</Text>
                            </Left>
                            <Right>
                                <TouchableOpacity onPress={() => navigation.navigate("PostsByCategory",{
                                    id: data.id,
                                    name: data.name
                                })}>
                                    <Icon name="chevron-forward" size={30}/>
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    ))}
                </List>
            </Content>
        </Container>
    );
}

export default Categories;