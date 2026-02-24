import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useWalletViewModel } from './WalletViewModel';

export default function WalletScreen() {
  const { countries, fetchCountries, loading, error } = useWalletViewModel();

  useEffect(() => {
    fetchCountries();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Text>Countries List:</Text>
      <FlatList
        data={countries}
        keyExtractor={item => item.code}
        renderItem={({ item }) => (
          <Text>{item.emoji} {item.name}</Text>
        )}
      />
    </View>
  );
}