
import React from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View,
} from 'react-native';

export const Loader = () => (
    <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
    </View>
);

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});