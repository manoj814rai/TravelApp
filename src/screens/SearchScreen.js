
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FLIGHT_TYPE } from '../utils/Consntants';
import { Input } from '../components/Input';
import { FlightList } from '../components/FlightList';

const Search = (props) => {

    const type = props.route?.params?.type
    const { flightList } = useSelector(state => state.fligthReducer);
    const [selectedFlightData, setFlightData] = useState(null);
    const [filteredList, setFilterList] = useState([]);
    const [searchedKeywords, setSearchKeywords] = useState("");

    const onChangeText = (text) => {
        setSearchKeywords(text);
        filterFlight(flightList, text, type);
    };

    const selectFlightItem = (item) => {
        setFlightData(item);
        props.route?.params?.onGoback(item, type);
        props.navigation.goBack();
    };

    const filterFlight = (list, value, type) => {
        let updatedList = [], foundObj = null;
        if (type == FLIGHT_TYPE.TO) {
            updatedList = list.filter(item => {
                return (item.displayData?.destination?.airport?.cityName.toLowerCase().includes(value.toLowerCase()) ||
                    item.displayData?.destination?.airport?.airportName.toLowerCase().includes(value.toLowerCase()) ||
                    item.displayData?.destination?.airport?.airportCode.toLowerCase().includes(value.toLowerCase())
                )
            }
            )
        }
        else {
            updatedList = list.filter(item => {
                return item.displayData?.source?.airport?.cityName.toLowerCase().includes(value.toLowerCase()) ||
                    item.displayData?.source?.airport?.airportName.toLowerCase().includes(value.toLowerCase()) ||
                    item.displayData?.source?.airport?.airportCode.toLowerCase().includes(value.toLowerCase())
            }
            )
        }

        if (foundObj) {
            updatedList.push(foundObj);
        }
        setFilterList(updatedList);
    }

    const onPressGoBack = () => {
        props.route?.params?.onGoback(selectedFlightData, type);
        props.navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <Input
                    onChangeText={onChangeText}
                    inputLabel={"From"}
                    imgPath={require('../assets/arrow_back.png')}
                    placeholder={"Search airport location"}
                    onPressIcon={onPressGoBack}
                />

                {filteredList.length ?
                    <View style={{ flex: 1 }}>
                        <FlightList
                            flightData={filteredList}
                            selectFlightItem={selectFlightItem}
                            type={type}
                        />
                    </View>
                    : null
                }
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'space-between'
    },
    welcomeLabel: {
        fontSize: 24,
        fontFamily: 'normal',
        fontWeight: 'bold',
        color: COLORS.WHITE
    },
    card: {
        marginHorizontal: 15,
        marginVertical: 6,
        backgroundColor: COLORS.WHITE_F2,
        borderRadius: 5,
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


export default Search;
