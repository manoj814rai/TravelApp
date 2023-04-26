
import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    View,
    FlatList,
    Image,
} from 'react-native';
import { COLORS } from '../utils/Consntants';
import { formatTime, formatDate } from '../utils/Utils';

const AvailableFlightList = (props) => {
    const {
        flightData,
    } = props.route.params;


    const _renderItem = ({ item }) => {
        return (
            <ListItem
                item={item}
            />
        )
    }

    const _keyExtractor = (item, index) => item.id;

    const onGoback = () => {
        props.navigation.goBack();
    }

    return (
        <View
            style={{ backgroundColor: COLORS.WHITE_F2 }}
        >
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onGoback} style={styles.header}>
                    <Image source={require('../assets/arrow_back.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={flightData}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
            />
        </View>
    )
};

const ListItem = ({ item }) => {
    return (
        <View style={[styles.card, styles.row]}>
            <View>
                <Text style={styles.description}>{formatTime(item.displayData?.source?.depTime)}</Text>
                <View style={styles.row}>
                    <Text >{item.displayData?.source?.airport?.airportCode}</Text>
                    <Text style={styles.date}>{formatDate(item.displayData?.source?.depTime)}</Text>
                </View>
            </View>
            <View>
                <Text>{item.displayData?.totalDuration}</Text>
                <Text>{item.displayData?.stopInfo}</Text>
            </View>
            <View>
                <Text style={styles.description}>{formatTime(item.displayData?.destination?.arrTime)}</Text>
                <View style={styles.row}>
                    <Text>{item.displayData?.destination?.airport?.airportCode}</Text>
                    <Text style={styles.date}>{formatDate(item.displayData?.destination?.arrTime)}</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 6,
        padding: 15,
        alignItems: 'center',
        backgroundColor: COLORS.WHITE
    },
    description: {
        color: COLORS.BLACK,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        marginTop: 10,
    },
    title: {
        color: COLORS.BLACK,
        fontSize: 18,
        fontStyle: '500',
        fontWeight: 'bold',
        marginTop: 10,
    },
    image: {
        height: 25,
        width: 25,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        //backgroundColor: COLORS.GRAY_DDD,
        padding: 15,
    },
    date: {
        fontSize: 12,
        paddingLeft: 15
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default AvailableFlightList;
