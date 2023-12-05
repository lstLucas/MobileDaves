import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../components/auth/AuthProvider';
import { createUser } from '../../service/ServiceUtil';


const Signup = () => {
    const navigation = useNavigation();
    const [credentials, setCredentials] = useState({ email: '', password: '', username: '' });
    const [msg, setMsg] = useState('');

    const { isAdmin } = useAuth();

    const signUp =  () => {
        if(isAdmin())
            createUser(credentials, true);
        else
            createUser(credentials, false);
    };

    const changeField = (name, value) => {
        let obj = { ...credentials };
        obj[name] = value;
        setCredentials(obj);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };    

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                
                {(msg !== '') && (
                    <Text style={{ color: 'red' }}>{msg}</Text>
                )}

                <View style={styles.card}>
                    
                    <View style={styles.logoContainer}>
                        <Image source={require('../../images/SWLogo.jpeg')} style={styles.logo} />
                        <Title style={styles.title}>Sign Up</Title>
                    </View>
                    <TextInput
                        label="E-mail"
                        value={credentials.email}
                        onChangeText={(text) => changeField('email', text)}
                        style={styles.input}
                        placeholder="e.g., lstemail@example.com"
                        textContentType='oneTimeCode'
                    />
                    <TextInput
                        label="Password"
                        value={credentials.password}
                        onChangeText={(text) => changeField('password', text)}
                        secureTextEntry
                        style={styles.input}
                        placeholder="e.g., ********"
                        textContentType='oneTimeCode'
                    />
                    <TextInput
                        label="Username"
                        value={credentials.username}
                        onChangeText={(text) => changeField('username', text)}
                        style={styles.input}
                        placeholder="e.g., lsteixeira"
                    />
                    <Button
                        mode="contained"
                        onPress={signUp}
                        style={styles.button}
                        labelStyle={styles.buttonText}
                    >
                        Sign Up
                    </Button>
                    <Text style={styles.signupText}>
                        <Text>Already have an account? </Text>
                        <Text style={styles.signupLink} onPress={() => navigation.navigate('loginScreen')}>
                            Log In
                        </Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '80%',
        elevation: 4,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
        paddingVertical: 8,
        borderRadius: 4,
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    signupText: {
        marginTop: 10,
        textAlign: 'center',
    },
    signupLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
    },
});

export default Signup;
