import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useAuth } from '../../components/auth/AuthProvider';

const LogoutView = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    showDialog();
  }, []);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('loginScreen');
  };



  return (
    <View style={styles.container}>
      <Text style={styles.text}>LOGOUT</Text>

      <TouchableOpacity onPress={showDialog} style={styles.leaveButton}>
        <Text style={styles.buttonText}>Leave</Text>
      </TouchableOpacity>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Are you sure you want to logout?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Stay</Button>
            <Button onPress={handleLogout}>Logout</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      marginBottom: 20,
    },
    leaveButton: {
      backgroundColor: '#3498db',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
  });

export default LogoutView;
