import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, DrawerItem } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CustomSideBar= () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  return (
    <></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
});

export default CustomSideBar;