import 'react-native-gesture-handler'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyNavigations from './app/routes/MyNavigations';
import LoginScreen from './app/screens/LoginScreen';
import {CookiesProvider, useCookies, withCookies} from 'react-cookie';
import RegisterScreen from './app/screens/RegisterScreen';
import FoundScreen from './app/screens/FoundScreen';
import LostScreen from './app/screens/LostScreen';
import ItemDetails from './app/screens/ItemDetails';
import AddItemLost from './app/screens/AddItemLost';
import AccountScreen from './app/screens/AccountScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <CookiesProvider>
      <MyNavigations/>
      {/* <LostScreen/> */}
      {/* <RegisterScreen/> */}
      {/* <FoundScreen/> */}
      {/* <ItemDetails/> */}
      {/* <AddItem/> */}
      {/* <AccountScreen/> */}
    </CookiesProvider>
    
  )
}

export default withCookies(App);

