import React,{ useEffect,useState } from "react";
import { View, Text,FlatList } from "react-native";
import PostsByCategoryCard from "../components/PostByCategoryCard";

const PostsByCategory = ({ route, navigation }) => 
{

    const { id, name } = route.params;

    const [posts,setPosts] = useState([]);

    useEffect(() => {
        const ac = new AbortController();
        async function getPostsByCategory()
        {
            await fetch(`https://blankernel.com/wp-json/wp/v2/posts/?categories=${id}&_embed`)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            });
        }

        getPostsByCategory();
        return () => ac.abort();
    },[]);

    const renderItem = ({item}) => 
    {
        return (
            <PostsByCategoryCard 
                title={item.title.rendered}
                author={item._embedded.author[0].name}
                image={item._embedded['wp:featuredmedia'][0].source_url}
                excerpt={item.excerpt.rendered}
                link={item.link}
                navigation={navigation}
            />
        );
    }

    return (
        <View>
            <FlatList 
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item,index) => index.toString()}
            />
        </View>
    );
}

export default PostsByCategory;

