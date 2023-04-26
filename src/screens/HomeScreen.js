
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
import { sagaActions } from "../redux/saga/SagaActions.js";
import { setLoading } from '../redux/slices/FlightSlices'
import { Loader } from '../components/Loader';
import { COLORS, SCREENS_NAME, FLIGHT_LIST, FLIGHT_TYPE } from '../utils/Consntants';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { FlightList } from '../components/FlightList';
import DatePicker from 'react-native-date-picker'

const Home = (props) => {
    const dispatch = useDispatch();
    const { flightList, isLoading } = useSelector(state => state.fligthReducer);
    const [selectedTo, setTo] = useState(null);
    const [selectedFrom, setFrom] = useState(null);
    const [filteredList, setFilterList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [isShow, setShow] = useState(false)

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch({ type: sagaActions.FETCH_FLIGHT_DATA_SAGA });

    }, []);

    const setAirportLocation = (selectedAirport, type) => {
        if (type == FLIGHT_TYPE.FROM) {
            setFrom(selectedAirport);
        }
        else {
            setTo(selectedAirport);
        }
    }

    const onSelectAirport = (type) => {
        props.navigation.navigate(SCREENS_NAME.SEARCH, {
            onGoback: setAirportLocation,
            type: type
        })
    };

    const onConfirmDate = (date) => {
        setDate(date);
        setShow(false);
    }

    const serachFlight = () => {
        const result = flightList.filter(item => {
            const dateCheck = new Date(date).getTime() === new Date(selectedFrom?.displayData?.source?.depTime).getTime();
            return (
                item.displayData?.source?.airport?.airportCode == selectedFrom?.displayData?.source?.airport?.airportCode &&
                item.displayData?.destination?.airport?.airportCode == selectedTo?.displayData?.destination?.airport?.airportCode
                // && dateCheck // commented as of now because api old date data
            )
        })
        props.navigation.navigate(SCREENS_NAME.AVAILABLE_FLIGHT_LIST, {
            flightData: result,
        })
    };

    if(isLoading) {
        return <Loader />
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <HeaderComponent />
                <InputWrapper
                    inputLabel={"From"}
                    imgPath={require('../assets/flight_takeoff.png')}
                    placeholder={selectedFrom?.displayData?.source?.airport?.cityName || "Select source location"}
                    placeholderTextColor={selectedFrom?.displayData?.source?.airport?.cityName ? COLORS.BLACK : COLORS.GRAY}
                    subPlaceHolder={selectedFrom?.displayData?.source?.airport?.airportName}
                    editable={false}
                    onSelectAirport={onSelectAirport}
                    type={FLIGHT_TYPE.FROM}
                    rightLabel={selectedFrom?.displayData?.source?.airport?.airportCode}
                />
                <InputWrapper
                    inputLabel={"To"}
                    imgPath={require('../assets/flight_land.png')}
                    placeholder={selectedTo?.displayData?.destination?.airport?.cityName || "Select destination location"}
                    placeholderTextColor={selectedTo?.displayData?.source?.airport?.cityName ? COLORS.BLACK : COLORS.GRAY}
                    subPlaceHolder={selectedTo?.displayData?.source?.airport?.airportName}
                    editable={false}
                    onSelectAirport={onSelectAirport}
                    type={FLIGHT_TYPE.TO}
                    rightLabel={selectedTo?.displayData?.destination?.airport?.airportCode}
                />
                {filteredList.length ?
                    <View style={{ flex: 0.7, marginHorizontal: 15 }}>
                        <FlightList flightData={filteredList} selectFlightItem={selectFlightItem} />
                    </View>
                    : null
                }
                <TouchableOpacity onPress={() => setShow(true)} style={styles.calender}>
                    <Text style={styles.label}>{new Date(date).toDateString()}</Text>
                    <Image source={require('../assets/calender.png')} style={styles.image}/>
                </TouchableOpacity>
                <DatePicker
                    style={styles.datePickerStyle}
                    modal={true}
                    date={date}
                    mode="date"
                    minimumDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    open={isShow}
                    onCancel={() => setShow(false)}
                    onDateChange={(date) => {
                        setDate(date);
                    }}
                    onConfirm={onConfirmDate}
                />
            </View>
            <View style={{ paddingBottom: 20 }}>
                <Button
                    onPress={serachFlight}
                    buttonLabel={"Search"}
                    disabled={!selectedFrom && !selectedTo}
                />
            </View>
        </SafeAreaView>
    )
};



const HeaderComponent = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.welcomeLabel}>
                Welcome to Travel.com
            </Text>
        </View>
    )
}

const InputWrapper = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onSelectAirport(props.type)}>
            <Input {...props} hideTopLabel={false} />
        </TouchableOpacity>
    )
}

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
    header: {
        backgroundColor: COLORS.DODGER_BLUE,
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 20,
        width: 20,
        borderRadius: 5,
        marginRight: 10
    },
    calender: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.GRAY_DDD,
        marginHorizontal: 15,
        padding: 15,
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: COLORS.WHITE_F2,
    },
    label: {
        fontSize: 14,
        fontFamily: 'normal',
        fontWeight: '500',
        color: COLORS.BLACK,
    }
});


export default Home;
