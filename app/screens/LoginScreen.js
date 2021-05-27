import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Image, Text, Button, TouchableHighlight } from 'react-native';
import AppTextInput from '../Utilities/AppTextInput';
import AppButton from '../Utilities/Button';
import colors from '../config/colors';
import {withCookies, useCookies} from 'react-cookie';

import Screen from '../Utilities/Screen'

function LoginScreen({navigation}) {
    const [phone, setPhone] = useState('670789253')
    const [password, setPassword] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    function handleLogin() {

        fetch('http://192.168.56.1:8000/account/login/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: phone,
                password: password
                })
            }).then( resp => resp.json())
            .then( res => {
                console.log(res.token);
                if(res.token){
                    setCookie('finder-token', res.token)
                    navigation.navigate('Home')
                }
                else{
                    navigation.push('Login')
                }
                
            })
            .catch( error => console.log(error))
    }


    return (
        <Screen style={styles.screen}>
            <View style={styles.header}>
                <Image source={require('../../assets/logo.png')} style={styles.logoimage}/>
                <Text style={styles.logotext}>find loss stuff here</Text>
            </View>
            <View style={styles.fields}>
                <AppTextInput icon="phone" onChangeText={phone => setPhone(phone)} value={phone} placeholder="phone"/>
                <AppTextInput icon="lock" secureTextEntry textContentType='password' onChangeText={password => setPassword(password)} value={password} placeholder="password"/>
                <AppButton title="Login" onPress={handleLogin} color='dodgerblue'/>
                <View style={styles.downview}>
                    <Text style={styles.forgot} onPress={() => console.log('forgot password')}>forgot password?</Text>
                    <Text style={styles.register} onPress={() => navigation.navigate('Register')}>register here</Text>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    downview: {
        flexDirection: 'row'
    },
    forgot: {
        paddingTop: 10,
        fontSize: 18,
    },
    header: {
        marginTop: 30
    },
    logoimage: {
        height: 70,
        width: 70,
        marginBottom: 10,
        alignSelf: 'center',
        // color: '#0041C2'
    },
    logotext: {
        fontWeight: 'normal'
    },
    fields: {
        width: '100%',
        position: 'absolute',
        top: 230,
    },
    register: {
        paddingLeft: '32%',
        paddingTop: 10,
        fontSize: 18,
    },
    screen: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#EEEEEE'
    }
})

export default withCookies(LoginScreen);