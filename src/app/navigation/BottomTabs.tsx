import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from '@react-native-vector-icons/ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '../../screens/Home';
import { ProfileScreen } from '../../screens/Profile';
import { MapScreen } from '../../screens/Map';
import { WalletScreen } from '../../screens/Wallet';

export type BottomTabParamList = {
  Home: undefined;
  Map: undefined;
  Wallet: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: 'center',
        // 🔵 Blue background
        headerStyle: {
          backgroundColor: '#2F80ED',
        },
        // ⚪ White title text
        headerTitleStyle: {
          color: '#FFFFFF',
          fontWeight: '600',
        },
        // ⚪ White back button & icons
        headerTintColor: '#FFFFFF',

        tabBarIcon: ({ color, size }) => {

          const icon =
            route.name === 'Home'
              ? 'home-outline'
              : route.name === 'Map'
                ? 'map-outline'
                : route.name === 'Wallet'
                  ? 'wallet-outline'
                  : route.name === 'Profile'
                    ? 'person-outline'
                    : 'ellipse-outline';

          return <Ionicons name={icon} size={size} color={color} />;

        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
