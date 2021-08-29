import 'react-native-gesture-handler'
import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LostScreen from '../screens/LostScreen'
import FoundScreen from '../screens/FoundScreen'
import AccountScreen from '../screens/AccountScreen'
import MyPostsScreen from '../screens/MyPostsScreen'
import HomeScreen from '../screens/HomeScreen'
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen'
import ItemDetails from '../screens/ItemDetails';
import AddItemLost from '../screens/AddItemLost';
import AddItemFound from '../screens/AddItemFound';

import {CookiesProvider, useCookies, withCookies} from 'react-cookie';


const Stack = createStackNavigator();

function MyNavigations(props) {

  const [cookies, setCookie, removeCookie] = useCookies(['finder-token']);

    return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'dodgerblue',
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
        
      >
        <Stack.Screen name="AddItemLost" component={AddItemLost} options={{title: 'Add Lost Item'}}/>
        <Stack.Screen name="AddItemFound" component={AddItemFound} options={{title: 'Add Found Item'}}/>
        <Stack.Screen name="Account" component={AccountScreen} options={{title: 'Account'}}/>
        <Stack.Screen name="Found" component={FoundScreen} options={{title: 'Found Items'}}/>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerLeft: null}} />
        <Stack.Screen name="ItemDetails" component={ItemDetails} options={{title: 'Item Details'}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Login'}}/>
        <Stack.Screen name="Lost" component={LostScreen} options={{title: 'Lost Items'}}/>
        <Stack.Screen name="MyPosts" component={MyPostsScreen} options={{title: 'My Posts'}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{title: 'Register', headerLeft: null}}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default withCookies(MyNavigations);