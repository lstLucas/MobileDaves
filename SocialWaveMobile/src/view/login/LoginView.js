import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { useAuth } from "../../components/auth/AuthProvider"
import { useNavigation } from '@react-navigation/native';
import { CustomSideBar } from '../../components/sidebar/Sidebar';

const Login = () => {
    const navigation = useNavigation();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [msg, setMsg] = useState("")

    const { login } = useAuth()

    const signIn = async () => {
        const resp = await login(credentials.email, credentials.password)
        if (resp) {
            navigation.navigate('loginScreen')
        } else {
            setCredentials({ login: "", password: "" })
            setMsg("Incorrect E-mail or Password!")
        }

    }


    const alterarCampo = (name, value) => {
        let obj = { ...credentials };
        obj[name] = value;
        setCredentials(obj);
    };

    const redirectToSignup = () => {
        navigation.navigate('registerScreen');
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                {/* <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                > */}
                    {(msg != '') &&
                        <Text style={{ color: 'red' }}>{msg}</Text>
                    }

                    <View style={styles.card}>

                        <View style={styles.logoContainer}>
                            <Image source={require('../../images/SWLogo.jpeg')} style={styles.logo} />
                            <Title style={styles.title}>Login</Title>
                        </View>
                        <TextInput
                            label="E-mail"
                            value={credentials.email}
                            onChangeText={(text) => alterarCampo('email', text)}
                            style={styles.input}
                            placeholder="e.g., Lsteixeira@email.com"
                        />
                        <TextInput
                            label="Password"
                            value={credentials.password}
                            onChangeText={(text) => alterarCampo('password', text)}
                            secureTextEntry
                            style={styles.input}
                            placeholder="e.g., ******"
                        />
                        <Button
                            mode="contained"
                            onPress={signIn}
                            style={styles.button}
                            labelStyle={styles.buttonText}
                        >
                            Login
                        </Button>
                        <Text style={styles.signupText}>
                            <Text>New to the app? </Text>
                            <Text style={styles.signupLink} onPress={redirectToSignup}>
                                Sign up for free
                            </Text>
                        </Text>

                    </View>
                {/* </KeyboardAvoidingView> */}
            </View>
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
});

export default Login;
