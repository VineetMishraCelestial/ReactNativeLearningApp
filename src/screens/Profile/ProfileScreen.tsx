import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


const ProfileScreen: React.FC = () => {

  const subscribeButtonHandler = () => {
    console.log('Subscribe Pressed');
  }


  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right',]}>
      {/* ScrollView */}
      <ScrollView style={styles.scrollContainer} >
        {/* Top Stats Card */}
        <View style={styles.statusCard}>

          {/* Left Section */}
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Check-ins</Text>
            <Text style={styles.statDate}>
              As of 26-01-12, 11:10 AM
            </Text>
          </View>

          {/* Vertical Divider */}
          <View style={styles.verticalDivider} />

          {/* Right Section */}
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Locations Added</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.subscribeButton}
          activeOpacity={0.7}
          onPress={subscribeButtonHandler}
        >
          <Text style={styles.subscribeText}>
            Subscribe to PlugShare Ad-Free
          </Text>

        </TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 14,
  },
  statBox: {
    width: '48%',
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
  statDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },

  verticalDivider: {
    width: 1,
    height: '70%',   // controls divider height
    backgroundColor: '#E5E5EA',
    marginHorizontal: 12,
  },

  subscribeButton: {
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E6EF7',
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
  },

  subscribeText: {
    color: '#2E6EF7',
    fontSize: 15,
    fontWeight: '600',
  },

});
