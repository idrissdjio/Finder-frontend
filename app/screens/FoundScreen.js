import React from 'react';
import { Button, Text } from 'react-native';
import Screen from '../Utilities/Screen';

function FoundScreen({navigation}) {
    return (
        <Screen>
            <Text>Found Items List</Text>
            <Button
                title="go back"
                onPress={() => navigation.push('Found')}/>
            <Button title="come back" onPress={() => navigation.navigate('Home')} />
        </Screen>
    );
}

export default FoundScreen;
