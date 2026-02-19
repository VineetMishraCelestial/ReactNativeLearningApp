import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface SubscriptionModalSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
}

const SubscriptionModalSheet: React.FC<SubscriptionModalSheetProps> = ({
  visible,
  onClose,
  title,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Background */}
        <TouchableOpacity
          style={styles.background}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Bottom Sheet */}
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.description}>
            Subscribe to remove ads and unlock premium features.
          </Text>

          <TouchableOpacity style={styles.subscribeBtn}>
            <Text style={styles.subscribeText}>Subscribe Now</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SubscriptionModalSheet;

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    background: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
    },
    description: {
      fontSize: 14,
      color: '#555',
      marginBottom: 20,
    },
    subscribeBtn: {
      backgroundColor: '#2E6EF7',
      padding: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 15,
    },
    subscribeText: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    cancelText: {
      textAlign: 'center',
      color: '#2E6EF7',
    },
  });