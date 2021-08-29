import React, { useState, useEffect } from 'react';
import { Button, Text, StyleSheet, View, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';
import colors from '../config/colors';
import AppTextInput from '../Utilities/AppTextInput';
import AppButton from '../Utilities/Button';
import Screen from '../Utilities/Screen';
import * as ImagePicker from 'expo-image-picker';
import { HOST } from '../Hosts/HOST_WITH_PORT';


import {CookiesProvider, useCookies, withCookies} from 'react-cookie';

function AccountScreen({route, navigation}) {

    const {token} = route.params

    const [newPassword1, setPassword1] = useState()
    const [newPassword2, setPassword2] = useState()
    const [phone, setPhone] = useState()
    const [location, setLocation] = useState()
    const [name, setName] = useState('my_name')
    const [image, setImage] = useState()
    const [userID, setUserID] = useState()


    useEffect(() => {
        (async () =>{
            if(Platform.OS !== 'web'){
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if
                (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions')
                }
            }
        })();

        fetch(`${HOST}/account/register/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'},
        }).then(response => response.json())
        .then(response => {
            // setPassword(response[0].password),
            setPhone(response[0].phone),
            setLocation(response[0].location),
            setName(response[0].name),
            setImage(response[0].profile_picture)
            setUserID(response[0].id)

        })
    }, []);

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if(!result.cancelled){
            setImage(result.uri)
            console.log(image)
        }
    }

    function handleUpdatePro() {
        const formData = new FormData();

        formData.append("profile_picture", {
            uri: image,
            type: 'image/jpeg',
            name: 'photo.jpg'
        });
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("location", location);

        if(newPassword1==newPassword2) {
            formData.append("password", newPassword1);
        }

        fetch(`${HOST}/account/register/${userID}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
                'content-type': 'multipart/form-data'
            },
            body: formData
        }).then(response => {
            response.json()
            navigation.navigate('Home', {currentID: userID})
        })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    function handleLogOut() {
        // console.log(userID)
        fetch(`${HOST}/account/logout/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'content-type': 'application/json'
            }
        }).then(response => {
            navigation.navigate('Login')
        })
        .catch(error => console.log(error))
    }

    return (
        <ScrollView>
            <Screen style={styles.screen}>
                <TouchableWithoutFeedback onPress={pickImage}>
                    <View style={styles.header}>
                        <View style={styles.image}>
                            {image && <Image source={{uri: image}} style={styles.image}/>}
                        </View>
                        <Text style={styles.name}>{name}</Text>
                    </View>       
                </TouchableWithoutFeedback>
                <View style={styles.body}>
                    <AppTextInput icon="contacts" onChangeText={name => setName(name)} value={name} placeholder="name"/>
                    <AppTextInput icon="phone" onChangeText={phone => setPhone(phone)} value={phone} placeholder="phone"/>
                    <AppTextInput icon="home-map-marker" onChangeText={location => setLocation(location)} value={location} placeholder="location"/>
                    <AppTextInput icon="lock" secureTextEntry textContentType='password' onChangeText={password => setPassword1(password)} value={newPassword1} placeholder="new password"/>
                    <AppTextInput icon="lock" secureTextEntry textContentType='password' onChangeText={newPassword => setPassword2(newPassword)} value={newPassword2} placeholder="new password again"/>
                    <AppButton title="Update Profile" onPress={handleUpdatePro} color='dodgerblue'/>
                    <AppButton title="LogOut" onPress={handleLogOut} color='#fc5c65'/>
                </View>  
            </Screen>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    body: {
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    detail: {
        fontStyle: 'normal',
        fontSize: 23,
        backgroundColor: colors.light,
        alignItems: 'center',
        marginBottom: 30,
        height: 60,
        color: colors.medium,
        borderRadius: 20,
    },
    header: {
        alignItems: 'center',
    },
    image: {
        height: 160,
        width: 160,
        borderRadius: 80,
        backgroundColor: colors.white
    },
    name: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    screen: {
        backgroundColor: colors.logres
    }
})

export default withCookies(AccountScreen);