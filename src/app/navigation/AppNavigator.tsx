import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';

import { LoginScreen } from '../../screens/Login';
import { SignupScreen } from '../../screens/Signup';
import BottomTabs from './BottomTabs';
import { UserDetailScreen } from '../../screens/UserDetail';
import { ProductDetailsScreen } from '../../screens/Product';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="HomeTabs" component={BottomTabs} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{
      headerShown: true,
      title: 'Product Details',
    }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
