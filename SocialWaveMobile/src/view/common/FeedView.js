import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, List, Title, Paragraph, Card, IconButton, Text} from 'react-native-paper';
import { createPost, getAllPosts, getData, likePost } from '../../service/ServiceUtil';
import LikeButton from '../../components/likebutton/LikeButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSharedValue, withSpring } from 'react-native-reanimated';

const FeedScreen = () => {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const liked = useSharedValue(0);

    useEffect(() => {
        const fetchData = async () => {

            try {
                reloadPosts();
    
                const email = await AsyncStorage.getItem('email');
                const data = await getData(email);
                setUserData(data);
            } catch (error) {
                console.error('Erro ao obter posts:', error);
            }
    
        };

        fetchData();
    }, []);

    const reloadPosts = async () => {
        try {
            const filteredPosts = await getAllPosts();
            setPosts(filteredPosts);
        } catch (error) {
            console.error('Erro ao recarregar posts:', error);
        }

    };

    const handleLikeFunc = async (postId, userId) => {
        liked.value = withSpring(liked.value ? 0 : 1);
    
        try {
          const likeResponse = await likePost(postId, userId);
      
          if (likeResponse) {
            console.log(true);
            await reloadPosts();
          } else {
            console.error('Falha ao curtir o post');
          }
        } catch (error) {
          console.error('Ocorreu um erro:', error);
        }
      };
    

    const addPost = () => {
        if (title.trim() !== '' && body.trim() !== '') {
            const newPost = {
                title: title,
                body: body,
                author: '',
                likes: 0,
            };

            setPosts([...posts, newPost]);
            setTitle('');
            setBody('');
        }
    };




    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Card style={{ padding: 10, marginBottom: 20 }}>
                <Title style={{ textAlign: 'center' }}>NEW POST</Title>
                <TextInput
                    label="Title"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    style={{ marginBottom: 10 }}
                />
                <TextInput
                    label="Description"
                    value={body}
                    onChangeText={(text) => setBody(text)}
                    multiline
                    numberOfLines={5}
                    style={{ marginBottom: 10 }}
                />
                <Button mode="contained" onPress={addPost}>
                    Publish
                </Button>
            </Card>

            <ScrollView style={styles.container}>
                <Title style={{ textAlign: 'center' }}>POSTS</Title>
                {userData != null && posts != null && posts.map((post, index) => (
                    <View style={styles.postContainer} key={index}>
                        <Title style={styles.postTitle}>{post.title}</Title>
                        <List.Item
                            description={post.body}
                            descriptionNumberOfLines={6}
                            right={() => (
                                <View>
                                    <Paragraph style={styles.author}>{`Autor: ${post.authorName}`}</Paragraph>
                                    <View style={styles.likesContainer}>
                                        <Paragraph style={styles.likes}>{`Likes: ${post.likes}`}</Paragraph>
                                        <LikeButton status={{userId: userData.id, postId: post.id}}  
                                        handleLike={handleLikeFunc}
                                        />
                                        {post.authorId === userData.id && ( 
                                            <IconButton
                                                icon="delete" 
                                                color="#FF0000"
                                                // onPress={() => handleDeletePost(index)} 
                                            />
                                        )}
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
    
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    postContainer: {
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
    },
    postTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    author: {
        marginBottom: 5,
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likes: {
        marginRight: 5,
    },
});


export default FeedScreen;
