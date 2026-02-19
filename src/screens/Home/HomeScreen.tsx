import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,ActivityIndicator, FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/NavigationTypes';
import { useHomeViewModel } from '.';
import { Product } from '../../models/Products';
import { useLayoutEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { products, loading, error, fetchProducts } = useHomeViewModel();

  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home',
      headerRight: () => (
        <TouchableOpacity
          onPress={onLogout}
          style={{
            marginRight: 15,
            padding: 6, // bigger tap area
          }}
          activeOpacity={0.7}
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color='#FFFFFF'
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onLogout = (): void => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const ProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity
    style={styles.card}
    onPress={() =>
      navigation.navigate('ProductDetails', {
        product: item,
      })
    }
  >
    <Text style={styles.title}>{item.title}</Text>
    <Text>₹ {item.price}</Text>
  </TouchableOpacity>
  );
  

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 2️⃣ Error state
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={ProductCard}
        onRefresh={fetchProducts}
        refreshing={loading}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,                     // fills screen
    justifyContent: 'center',     // vertical center
    alignItems: 'center',         // horizontal center
    backgroundColor: '#F4F6F8',   // clean background
  },
  center: {
    flex: 1,                     // fills screen
    justifyContent: 'center',     // vertical center
    alignItems: 'center',         // horizontal center
   // clean background
  },
   card: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});


export default HomeScreen;



