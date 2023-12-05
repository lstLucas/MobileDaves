import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import LikeButton from '../../components/likebutton/LikeButton';

// Restante do seu código...

const Feed = () => {
  // Restante do seu código...

  return (
    <View style={styles.container}>
      {/* Restante do seu código... */}

      <Text style={styles.text}>Lista de Posts</Text>
      <FlatList
        data={"posts"}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: post, index }) => (
          <View style={styles.postContainer}>
            <View style={styles.postContent}>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.body}>{post.body}</Text>
              <View style={styles.likesContainer}>
                <Text style={styles.likesText}>Likes: {post.likes} </Text>
                <LikeButton />
              </View>
            </View>
            {/* Restante do seu código... */}
          </View>
        )}
      />
      {/* Restante do seu código... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#ffffff',
  },
  // Estilos para os posts
  postContainer: {
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likesText: {
    fontSize: 14,
    color: '#666666',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'red', // Altere a cor desejada para representar que o post foi curtido
  },
  // Outros estilos conforme necessário
});

export default Feed;
