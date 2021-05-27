import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native'
import Box from '../Utilities/Box';
import Screen from '../Utilities/Screen';
import LostScreen from './LostScreen';

function HomeScreen({navigation}) {
    return (
        <Screen>
            <View style={styles.header}>
                <Image source={require('../../assets/logo.png')} style={styles.logo}/>
                <Text style={styles.textlogo}>Welcome to Finder!</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.firstrow}>
                    <Box color='dodgerblue' text='Lost' onpress={() => navigation.navigate('Lost')}/>
                    <Box color='tomato' text='Found' onpress={() => navigation.navigate('Found')}/>
                </View>
                <View style={styles.firstrow}>
                    <Box color='tomato' text='My Posts' onpress={() => navigation.navigate('MyPosts')}/>
                    <Box color='dodgerblue' text='Account' onpress={() => navigation.navigate('Account')}/>
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
    textlogo: {
        fontSize: 20,
        fontWeight: 'normal'
    }
})

export default HomeScreen;