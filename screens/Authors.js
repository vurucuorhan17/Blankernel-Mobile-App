import React, { useEffect, useState } from "react";
import { Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Text } from "native-base";

const Authors = ({ navigation }) => {

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        async function getAuthorsData() {
            await fetch(`http://blankernel.com/wp-json/wp/v2/users`)
                .then(response => response.json())
                .then(data => {
                    setAuthors(data);
                });
        }

        getAuthorsData();
    });

    const getImageForUser = (id) => 
    {
        switch(id)
        {
            case 1:
                return "https://blankernel.com/wp-content/uploads/2020/12/photo5945003786374334007.jpg";
            case 2:
                return "https://blankernel.com/wp-content/uploads/2021/03/IMG_20210227_014917_236.jpg";
            case 6:
                return "https://blankernel.com/wp-content/uploads/2019/02/WhatsApp-Image-2019-06-15-at-17.09.09.jpeg";
            case 7:
                return "https://blankernel.com/wp-content/uploads/2019/02/mypp.jpeg";
            case 8:
                return "https://blankernel.com/wp-content/uploads/2019/10/PHT2.jpg";
            default:
                return "http://1.gravatar.com/avatar/7bdce8819fb5d9f2e1862517688ea8d1?s=96&d=mm&r=g";
        }
    }

    const getMailForUser = (id) => 
    {
        switch(id)
        {
            case 1:
                return "berkayyaltass@gmail.com";
            case 2:
                return "orhanvurucu17@hotmail.com";
            case 6:
                return "ege@blankernel.com";
            case 7:
                return "furkan@blankernel.com";
            case 8:
                return "ensar@blankernel.com";
            default:
                return "blankernel.com";
        }
    }

    return (
        <Content>
            <List>
                {authors.map((data,i) => (
                    <ListItem thumbnail key={i}>
                        <Left>
                            <Thumbnail source={{ uri: getImageForUser(data.id) }} />
                        </Left>
                        <Body>
                            <Text>{data.name}</Text>
                            <Text note numberOfLines={1}>{data.description}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => navigation.navigate("DetailAuthor",{
                                name: data.name,
                                description: data.description,
                                image: getImageForUser(data.id),
                                mail: getMailForUser(data.id)
                            })}>
                                <Text>Görüntüle</Text>
                            </Button>
                        </Right>
                </ListItem>
                ))} 
            </List>
        </Content>
    );
}

export default Authors;