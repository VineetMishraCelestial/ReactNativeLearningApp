import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import { useWalletViewModel } from "./WalletViewModel";

export default function WalletScreen() {
  const {
    products,
    fetchProducts,
    loadMore,
    loading,
    loadingMore,
    error,
  } = useWalletViewModel();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading && products.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products List</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            {/* Horizontal Images */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imageContainer}
            >
              {item.images?.map((img: string, index: number) => (
                 <TouchableOpacity onPress={() => setSelectedImage(img)}>
                 <Image
                  key={index}
                   source={{ uri: img }}
                   style={styles.image}
                   resizeMode="cover"
                 />
               </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.price}>₹ {item.price}</Text>
            <Text style={styles.price}>₹ {item.description}</Text>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
      />
      <Modal
  visible={selectedImage !== null}
  transparent={true}
  animationType="fade"
>
  <View style={styles.modalContainer}>
    <TouchableOpacity
      style={styles.modalBackground}
      onPress={() => setSelectedImage(null)}
    >
      <Image
        source={{ uri: selectedImage ?? '' }}
        style={styles.fullImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
</Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "600" ,textAlign: "center"},
  price: { marginTop: 4, color: "gray" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
    image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
    imageContainer: {
    marginVertical: 8,
  },
    card: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  fullImage: {
    width: '100%',
    height: '80%',
  },
});

