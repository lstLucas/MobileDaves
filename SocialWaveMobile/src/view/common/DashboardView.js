import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { getData, getPostsQtandLikes } from '../../service/ServiceUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = () => {
    const [likes, setLikes] = useState(0);
    const [posts, setPosts] = useState(0);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const email = await AsyncStorage.getItem('email');
          const data = await getData(email);
          const { postsCount, likesCount } = await getPostsQtandLikes(data.id);
          setLikes(likesCount);
          setPosts(postsCount);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    }, []);
  
    const data = [
      {
        name: 'Likes',
        value: likes,
        color: '#2979FF',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Posts',
        value: posts,
        color: '#FF6D00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
  
        <View style={styles.chartContainer}>
          {posts === 0 ? (
            <Text style={styles.noPostsText}>You haven't realized any posts yet</Text>
          ) : (
            <PieChart
              data={data}
              width={300}
              height={200}
              chartConfig={{
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              }}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          )}
        </View>
  
        <Text style={styles.statsText}>
          You have {likes} likes in {posts} posts.
        </Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    chartContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    statsText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    noPostsText: {
      fontSize: 16,
      textAlign: 'center',
      color: '#FF0000',
      marginBottom: 20,
    },
  });
  
  export default DashboardScreen;
  
