import 'react-native-gesture-handler'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyNavigations from './app/routes/MyNavigations';
import LoginScreen from './app/screens/LoginScreen';
import {CookiesProvider, useCookies, withCookies} from 'react-cookie';
import RegisterScreen from './app/screens/RegisterScreen';
import FoundScreen from './app/screens/FoundScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <CookiesProvider>
      <MyNavigations/>

      {/* <RegisterScreen/> */}
      {/* <FoundScreen/> */}
    </CookiesProvider>
    
  )
}

export default withCookies(App);

