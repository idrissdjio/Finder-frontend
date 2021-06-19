import React, {useState} from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import AppTextInput from '../Utilities/AppTextInput';
import AppButton from '../Utilities/Button';
import Screen from '../Utilities/Screen'
import colors from '../config/colors'
import {HOST} from '../Hosts/HOST_WITH_PORT'

function RegisterScreen({navigation}) {

    const [phone, setPhone] = useState('4321')
    const [password, setPassword] = useState()
    const [name, setName] = useState('manegue')
    const [location, setLocation] = useState('bonaberi');

    function handleRegister() {

        fetch(`${HOST}/account/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                phone: phone,
                password: password,
                name: name,
                location: location,
                profile_picture: null
            })
        }).then(resp => resp.json())
        .then(resp => console.log(resp))
        .catch(error => console.log(error))
    }

    return (
        <Screen style={styles.screen}>
            <View style={styles.header}>
                <Image source={require('../../assets/logo.png')} style={styles.logoimage}/>
                <Text style={styles.logotext}>find loss stuff here</Text>
            </View>
            <View style={styles.fields}>
                <AppTextInput icon="phone" onChangeText={phone => setPhone(phone)} value={phone} placeholder="phone"/>
                <AppTextInput icon="contacts" onChangeText={name => setName(name)} value={name} placeholder="name"/>
                <AppTextInput icon="lock" secureTextEntry textContentType='password' onChangeText={password => setPassword(password)} value={password} placeholder="password"/>
                <AppTextInput icon="home-map-marker"  onChangeText={location => setLocation(location)} value={location} placeholder="location"/>
                <AppButton title="Register"  color='dodgerblue' onPress={handleRegister}/>
                <View style={styles.downview}>
                    <Text style={styles.login} onPress={() => navigation.navigate('Login')}>Login here</Text>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    downview: {
        flexDirection: 'row'
    },
    header: {
        marginTop: '2%'
    },
    logoimage: {
        height: 70,
        width: 70,
        marginBottom: 10,
        alignSelf: 'center',
    },
    logotext: {
        fontWeight: 'normal'
    },
    fields: {
        width: '100%',
        position: 'absolute',
        top: 150,
    },
    login: {
        paddingLeft: '70%',
        paddingTop: 10,
        fontSize: 18,
    },
    screen: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.logres,
        // backgroundColor: '#F0EBCC'
    }
})

export default RegisterScreen;