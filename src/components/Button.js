import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/Consntants';

const CustomButton = (props) => {
    const {
        onPress,
        buttonLabel,
        disabled = false
    } = props;

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.wrapperCustom,{opacity: disabled ? 0.4 : 1}]}>
            <Text style={styles.text}>{buttonLabel}</Text>
        </TouchableOpacity>
    );
};

export const Button = React.memo(CustomButton);

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: COLORS.WHITE
    },
    wrapperCustom: {
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: COLORS.DODGER_BLUE,
    },
});