import React, { useState, useEffect } from 'react';

import { createDrawerNavigator } from "@react-navigation/drawer"
import { Feather, Ionicons, FontAwesome5 } from "@expo/vector-icons"



import { useAuth } from '../auth/AuthProvider';
import Feed from '../../view/common/FeedView';
import Logout from '../../view/logout/LogoutView';
import Signup from '../../view/register/RegisterView';
import UsersInformation from '../../view/admin/AllUserView';

const CustomSideBar= () => {
  const Drawer = createDrawerNavigator()

    const { isAdmin } = useAuth()

    return(
            <Drawer.Navigator >
               <Drawer.Screen name="home" 
                    component={Feed}
                    options={{title: 'Feed',
                    headerTitle: '',
                    drawerIcon: ()=> <Feather name="home" size={24} />
                    }}/>

                { isAdmin() &&
                <>
                    <Drawer.Screen name="register" 
                    component={Signup}
                    options={{title: 'Create New Admin',
                    headerTitle: '',
                    drawerIcon: ()=> <Feather name="user-plus" size={24} color="black" />
                    }}/>

                    <Drawer.Screen name="members" 
                    component={UsersInformation}
                    options={{title: 'All Members',
                    headerTitle: '',
                    drawerIcon: ()=> <FontAwesome5 name="users-cog" size={24} color="black" />
                    }}/>

                                    
                </>
                }
                    
                    <Drawer.Screen name="logout" 
                    component={Logout}
                    options={{title: 'Logout',
                    headerTitle: '',
                    drawerIcon: ()=> <Ionicons name="exit" size={24} />}}/>  
                    
                    
            </Drawer.Navigator>

  );
}

export default CustomSideBar;