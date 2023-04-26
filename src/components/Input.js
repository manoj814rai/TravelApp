import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import { COLORS } from '../utils/Consntants'

const CustomInput = (props) => {
    const {
        onChangeText,
        placeholder,
        value,
        inputLabel,
        imgPath,
        editable = true,
        onPressIcon = null,
        hideTopLabel = true,
        subPlaceHolder,
        rightLabel,
        placeholderTextColor = COLORS.GRAY
    } = props;
    return (
        <View style={styles.container}>
            { hideTopLabel ? null :
                <Text style={styles.inputLabel}>
                    {inputLabel}
                </Text>
            }
            <View style={[styles.row, hideTopLabel ? { alignItems: 'center' } : null]}>
                <TouchableOpacity onPress={onPressIcon} enabled={!!onPressIcon}>
                    <Image source={imgPath} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholderTextColor={placeholderTextColor}
                    value={value}
                    placeholder={placeholder}
                    editable={editable}
                />
                { rightLabel ? <Text>{rightLabel}</Text> : null}
            </View>
            { subPlaceHolder ? <Text style={styles.inputLabel}>{subPlaceHolder}</Text> : null }
        </View>
    )
}

export const Input = React.memo(CustomInput);

const styles = StyleSheet.create({
    input: {
        fontSize: 14,
        fontFamily: 'normal',
        fontWeight: '500',
        color: COLORS.BLACK,
      //  height: 40,
      //  padding: 10,
        flexGrow: 1,
        flex: 1,
    },
    inputLabel: {
       paddingLeft: 30
    },
    container: {
        borderWidth: 1,
        borderColor: COLORS.GRAY_DDD,
        margin: 15,
        paddingHorizontal: 5,
        borderRadius: 5,
        backgroundColor: COLORS.WHITE_F2,
        paddingVertical: 5,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 14,
        fontFamily: 'normal',
        fontWeight: '500',
        color: COLORS.BLACK
    }
})