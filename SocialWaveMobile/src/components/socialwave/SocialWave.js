import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from "../../view/login/LoginView"
import RegisterScreen from "../../view/register/RegisterView"
import FeedScreen from "../../view/common/FeedView"
import CustomSideBar from "../sidebar/Sidebar"
import { PaperProvider } from "react-native-paper"
import DashboardScreen from "../../view/common/DashboardView"


const SocialWave = () => {

    const Stack = createStackNavigator()

    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="loginScreen">

                    <Stack.Screen name="loginScreen"
                        component={LoginScreen} options={{ title: "Login", headerShown: false }} />

                    <Stack.Screen name="registerScreen"
                        component={RegisterScreen} options={{ title: "New Account" }} />

                    <Stack.Screen name="feedScreen"
                        component={CustomSideBar} options={{ headerShown: false }} />

                    <Stack.Screen name="dashScreen"
                        component={DashboardScreen} options={{ headerShown: false }} />


                </Stack.Navigator>

            </NavigationContainer>
        </PaperProvider>
    )
}

export default SocialWave