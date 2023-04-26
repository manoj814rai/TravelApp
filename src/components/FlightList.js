
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
import { COLORS, FLIGHT_TYPE} from '../utils/Consntants';

export const FlightList = (props) => {
    const {
        flightData,
        selectFlightItem,
        type
    } = props;


    const _renderItem = ({ item }) => {
        return (
            <ListItem
                item={item}
                selectFlightItem={selectFlightItem}
                type={type}
            />
        )
    }

    const _keyExtractor = (item, index) => item.id;

    return (
        <View>
            <FlatList
                data={flightData}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
            />
        </View>
    )
};

const ListItem = ({ item, selectFlightItem, type }) => {
    if (type == FLIGHT_TYPE.FROM) {
        return (
            <TouchableOpacity style={[styles.card, styles.row]} onPress={() => selectFlightItem(item, 'from')}>
                <View style={[styles.row, { alignItems: 'center' }]}>
                    <Image source={require('../assets/flight.png')} style={styles.image} />
                    <View>
                        <Text style={styles.description}>{item.displayData?.source?.airport?.cityName}</Text>
                        <Text>{item.displayData?.source?.airport?.airportName}</Text>
                    </View>
                </View>
                <Text>{item.displayData?.source?.airport?.airportCode}</Text>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity style={[styles.card, styles.row]} onPress={() => selectFlightItem(item, "to")}>
                <View style={[styles.row, { alignItems: 'center' }]}>
                    <Image source={require('../assets/flight.png')} style={styles.image} />
                    <View>
                        <Text style={styles.description}>{item.displayData?.destination?.airport?.cityName}</Text>
                        <Text>{item.displayData?.destination?.airport?.airportName}</Text>
                    </View>
                </View>
                <Text>{item.displayData?.destination?.airport?.airportCode}</Text>
            </TouchableOpacity>
        )
    }

};

const Loader = () => (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
    </View>
);

const styles = StyleSheet.create({
    card: {
        marginVertical: 6,
        padding: 15,
        alignItems: 'center',
    },
    description: {
        color: COLORS.BLACK,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        marginTop: 10,
    },
    image: {
        height: 20,
        width: 20,
        borderRadius: 5,
        marginRight: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});
