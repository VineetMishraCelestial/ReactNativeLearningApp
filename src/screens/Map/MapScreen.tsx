import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/NavigationTypes';
import { useLayoutEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
type IconName = React.ComponentProps<typeof Ionicons>['name'];
interface BottomMenuItem {
    name: string;
    icon: IconName;
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const MapScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const [activeTab, setActiveTab] = useState<'Map' | 'List'>('Map');
    const [activeFilter, setActiveFilter] = useState<string>('Price');
    const [viewFilter, setViewFilter] = useState<string>('View All');
    const [activeBottom, setActiveBottom] = useState<string>('Fuelbook');

    const bottomItems: BottomMenuItem[] = [
        { name: 'Fuelbook', icon: 'book-outline' },
        { name: 'Offers', icon: 'pricetag-outline' },
        { name: 'Account', icon: 'person-outline' },
    ];
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerTitle: 'Map',
            headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
                    <View style={styles.toggleContainer}>
                        {(['Map', 'List'] as const).map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.toggleBtn,
                                    activeTab === tab && styles.activeToggle,
                                ]}
                                onPress={() => handleToggle(tab)}
                            >
                                <Text
                                    style={[
                                        styles.toggleText,
                                        activeTab === tab && styles.activeToggleText,
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ),
        });
    }, [navigation, activeTab]);


    const handleToggle = (tab: 'Map' | 'List') => {
        setActiveTab(tab);
      
        if (tab === 'Map') {
          console.log('Map selected');
          // Call map filter function here
        } else {
          console.log('List selected');
          // Call list filter function here
        }
      };


    return (
        <View style={styles.container}>

            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            <View style={styles.filterContainer}>
                {['Price', 'Distance', 'Less IFTA'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[
                            styles.filterBtn,
                            activeFilter === item && styles.activeFilter,
                        ]}
                        onPress={() => setActiveFilter(item)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                activeFilter === item && styles.activeFilterText,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* MAP SECTION */}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 39.5,
                        longitude: -98.35,
                        latitudeDelta: 20,
                        longitudeDelta: 20,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 29.7604, longitude: -95.3698 }}
                        title="Houston"
                    />
                    <Marker
                        coordinate={{ latitude: 42.3314, longitude: -83.0458 }}
                        title="Detroit"
                    />
                    <Polyline
                        coordinates={[
                            { latitude: 29.7604, longitude: -95.3698 },
                            { latitude: 39.0997, longitude: -94.5786 },
                            { latitude: 42.3314, longitude: -83.0458 },
                        ]}
                        strokeWidth={4}
                        strokeColor="#2F80ED"
                    />
                </MapView>


                <View style={styles.viewfilterContainer}>
                    {['Top Ten', 'View All'].map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.filterBtn,
                                viewFilter === item && styles.activeFilter,
                            ]}
                            onPress={() => setViewFilter(item)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    viewFilter === item && styles.activeFilterText,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* CUSTOM BOTTOM BAR */}
                <View style={styles.bottomBar}>
                    {bottomItems.map((item) => (
                        <TouchableOpacity
                            key={item.name}
                            style={styles.bottomItem}
                            onPress={() => setActiveBottom(item.name)}
                        >
                            <Ionicons
                                name={item.icon}
                                size={24}
                                color={activeBottom === item.name ? '#2F80ED' : '#333'}
                            />
                            <Text
                                style={[
                                    styles.bottomText,
                                    activeBottom === item.name && styles.activeBottomText,
                                ]}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>



            </View>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 5, // adjust if needed
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
    },

    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        padding: 3,
    },

    toggleBtn: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
    },

    activeToggle: {
        backgroundColor: '#2F80ED',
    },

    toggleText: {
        fontSize: 14,
        color: '#333',
    },

    activeToggleText: {
        color: '#fff',
    },

    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#D9D9D9',
        borderRadius: 25,
        marginHorizontal: 15,
        padding: 0,
    },
    viewfilterContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        backgroundColor: '#D9D9D9',
        borderRadius: 25,
        marginRight: 15,
        marginTop: 10,
        padding: 2,
    },

    filterBtn: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },

    activeFilter: {
        backgroundColor: '#2F80ED',
    },

    filterText: {
        fontSize: 14,
        color: '#333',
    },

    activeFilterText: {
        color: '#fff',
    },

    mapContainer: {
        flex: 1,
        marginTop: 10,
    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },

    topButtons: {
        position: 'absolute',
        top: 15,
        right: 15,
        flexDirection: 'row',
    },

    topTenBtn: {
        backgroundColor: '#2F80ED',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
    },

    topTenText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500',
    },

    viewAllBtn: {
        backgroundColor: '#fff',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        elevation: 3,
    },

    viewAllText: {
        color: '#333',
        fontSize: 13,
        fontWeight: '500',
    },

    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#E6F3FF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingBottom: 10,
    },

    bottomItem: {
        alignItems: 'center',
    },

    bottomText: {
        fontSize: 12,
        color: '#333',
        marginTop: 4,
    },

    activeBottomText: {
        color: '#2F80ED',
        fontWeight: '600',
    },

});
