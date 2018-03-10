import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';




const InputAndBtn = (props) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
            <Text style={{ flex: 0.2 }}>{props.placeholderValue}</Text>
            <View style={{ flex: 0.5 }}>
                <TextInput
                    style={{ height:37, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                    onChangeText={props.onChangeFn}
                    value={`${props.inputFieldValue}`}
                    // placeholder={props.placeholderValue}
                />
            </View>
            <View style={{ flex: 0.3 }} >
                <Button
                    onPress={props.btnFn}
                    title="Search"
                    color="#2d963e"
                    accessibilityLabel="Search button"
                />
            </View>
        </View>
    )
};



export default InputAndBtn;
