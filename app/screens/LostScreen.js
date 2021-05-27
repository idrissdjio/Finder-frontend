import React from 'react';
import { Button, Text } from 'react-native';
import Screen from '../Utilities/Screen';

function LostScreen({navigation}) {
    return (
        <Screen>
            <Text>Lost Items List</Text>
            <Button
                title="go back"
                onPress={() => navigation.push('Lost')}/>
            <Button title="come back" onPress={() => navigation.navigate('Home')} />
        </Screen>
    );
}

export default LostScreen;