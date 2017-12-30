'use strict';

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/FontAwesome'

// Utils
import colors from './../Utils/colors';

const styles = StyleSheet.create({
    button: {
        marginTop: 11
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 3
    },
    columnIcon: {
        flex: .1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 15,
        marginLeft: 8
    },
    columnText: {
        flex: .9
    },
    rowTitle: {
        marginTop: 10,
        marginBottom: 4,
        marginRight: 10,
        marginLeft: 8,
        fontSize: 15,
        textAlign: 'left',
        color: '#333'
    },
    rowDetailsLine: {
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 8,
        fontSize: 12,
        color: 'gray'
    },
    colorPurple: {
        color: colors.purple
    }
});

export default ({ message, i }) =>
    <TouchableOpacity style={styles.button}>
        <View style={styles.rowContainer}>
            <View style={styles.columnIcon}>
                <Icon name={'check'} size={20} color={message.status ? '#333' : '#673AB7'} style={{ backgroundColor: 'transparent' }} />
            </View>
            <View style={styles.columnText}>
                <Text style={[styles.rowTitle, message.status ? null : styles.colorPurple]}>
                    {message.title}
                </Text>
                <Text style={[styles.rowDetailsLine, message.status ? null : styles.colorPurple]}>
                    {message.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....'}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
