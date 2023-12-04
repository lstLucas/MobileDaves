import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from "../../view/login/LoginView"
import RegisterScreen from "../../view/register/RegisterView"


const SocialWave = () => {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="loginScreen">

                <Stack.Screen name="loginScreen"
                    component={LoginScreen} options={{ title: "Login", headerShown: false }}/>

                <Stack.Screen name="registerScreen"
                    component={RegisterScreen}  options={{ title: "New Account" }}/>


            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default SocialWave