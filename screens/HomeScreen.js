import React from 'react';

import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
  } from 'react-native';

// Project Imports
import HomeBanner from '../banner/HomeBanner';

const HomeScreen = () => (
    <ScrollView>
        <HomeBanner />
        <Text>Hello World</Text>
    </ScrollView>
);


export default () => <HomeScreen />;