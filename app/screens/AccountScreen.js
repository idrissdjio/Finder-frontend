import React from 'react';
import { Button, Text } from 'react-native';
import Screen from '../Utilities/Screen';

function AccountScreen({navigation}) {
    return (
        <Screen>
            <Text>My Account</Text>
            <Button
                title="go back"
                onPress={() => navigation.push('Account')}/>
            <Button title="come back" onPress={() => navigation.navigate('Home')} />
        </Screen>
    );
}

export default AccountScreen;