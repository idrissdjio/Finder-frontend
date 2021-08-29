import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native'
import Box from '../Utilities/Box';
import Screen from '../Utilities/Screen';
import LostScreen from './LostScreen';
import colors from '../config/colors';
import {CookiesProvider, useCookies, withCookies} from 'react-cookie';


function HomeScreen({route, navigation}) {

    const {token, currentID} = route.params

    return (
        <Screen style={styles.screen}>
            <View style={styles.header}>
                <Image source={require('../../assets/logo.png')} style={styles.logo}/>
                <Text style={styles.textlogo}>Welcome to Finder!</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.firstrow}>
                    <Box color='dodgerblue' text='Lost' onpress={() => navigation.navigate('Lost', {currentID: currentID})}/>
                    <Box color='#fc5c65' text='Found' onpress={() => navigation.navigate('Found', {currentID: currentID})}/>
                </View>
                <View style={styles.firstrow}>
                    <Box color='#fc5c65' text='My Posts' onpress={() => navigation.navigate('MyPosts', {currentID: currentID})}/>
                    <Box color='dodgerblue' text='Account' onpress={() => navigation.navigate('Account', {token: token})}/>
                </View>
            </View>
        </Screen>
           
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        // padding: 5,
        marginTop: 20,
    },
    firstrow: {
        flexDirection: 'row',
        padding: 30,
    },
    header: {
        padding: '3%',
        marginTop: 20,
        alignItems: 'center'
    },
    logo: {
        paddingTop: 10,
        width: 80,
        height: 80,
        marginBottom: 5,
    },
    screen: {
        backgroundColor: colors.logres,
    },
    textlogo: {
        fontSize: 20,
        fontWeight: 'normal'
    }
})

export default withCookies(HomeScreen);