import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/NavigationTypes';
import { Product } from '../../models/Products';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = ({ route }: Props) => {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.imageWrapper}>
      <Text style={styles.title}>{product.title}</Text>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.productImage}
      />
    </View>
    <View style={styles.contentWrapper}>
    <Text style={styles.price}>Category - {product.category} </Text>
      <Text style={styles.price}>₹ {product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    padding: 0
  },
  imageWrapper: {
    alignItems: 'center',   // 👈 centers image horizontally
    marginBottom: 16,
  },
  productImage: {
    width:  200,
    height: 200,
    padding: 16,
    borderRadius: 8,
  },
  contentWrapper: {
    paddingHorizontal: 16,   // 👈 leading & trailing space
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
});
