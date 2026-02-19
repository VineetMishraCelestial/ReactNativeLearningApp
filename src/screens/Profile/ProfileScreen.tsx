
import { View, Text, StyleSheet, TouchableOpacity,SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubscriptionModalSheet from './SubscriptionModalSheet';
import React, { useState } from 'react';


interface MenuItem {
  id: string;
  title: string;
}

interface MenuSection {
  title: string;
  data: MenuItem[];
}


const ProfileScreen: React.FC = () => {
  const [isSubscribeVisible, setSubscribeVisible] = useState(false);
  const sections: MenuSection[] = [
    {
      title: 'YOUR STUFF',
      data: [
        { id: '1', title: 'Messages' },
        { id: '2', title: 'Notifications & Alerts' },
        { id: '3', title: 'Payment Method' },
        { id: '4', title: 'Charge History' },
      ],
    },
    {
      title: 'SETTINGS',
      data: [
        { id: '5', title: 'Profile' },
        { id: '6', title: 'Privacy' },
        { id: '7', title: 'Help & Support' },
      ],
    },
  ];

  const subscribeButtonHandler = () => {
    setSubscribeVisible(true);
  };

  const handleItemPress = (item: MenuItem) => {
   
  };


  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right',]}>
      {/* ScrollView */}
      <SectionList
  sections={sections}
  // keyExtractor={(item) => item.id}
  // contentContainerStyle={{ paddingBottom: 20 }}
  
  ListHeaderComponent={
    <>
      {/* Stats Card */}
      <View style={styles.statusCard}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Check-ins</Text>
          <Text style={styles.statDate}>
            As of 26-01-12, 11:10 AM
          </Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Locations Added</Text>
        </View>
      </View>

      {/* Subscribe Button */}
      <TouchableOpacity
        style={styles.subscribeButton}
        activeOpacity={0.7}
        onPress={subscribeButtonHandler}
      >
        <Text style={styles.subscribeText}>
          Subscribe to PlugShare Ad-Free
        </Text>
        <Text style={styles.subscribeArrow}>{'›'}</Text>
      </TouchableOpacity>
    </>
  }

  renderSectionHeader={({ section }) => (
    <Text style={styles.sectionTitle}>{section.title}</Text>
  )}

  renderItem={({ item, index, section }) => (
    <TouchableOpacity
      style={[
        styles.rowItem,
        index !== section.data.length - 1 && styles.rowBorder,
      ]}
      activeOpacity={0.7}
      onPress={() => handleItemPress(item)}
    >
      <Text style={styles.rowText}>{item.title}</Text>
      <Text style={styles.arrow}>{'›'}</Text>
    </TouchableOpacity>
  )}
/>

<SubscriptionModalSheet
  visible={isSubscribeVisible}
  onClose={() => setSubscribeVisible(false)}
  title="Subscribe to PlugShare"
/>
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
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E6EF7',
    backgroundColor: '#EAF1FF',
    alignItems: 'center',

    flexDirection: 'row',          // 👈 makes it horizontal
    justifyContent: 'space-between', // 👈 pushes arrow to right
   
  },

  subscribeText: {
    color: '#2E6EF7',
    fontSize: 15,
    fontWeight: '600',
  },

  sectionTitle: {
    marginTop: 24,
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    letterSpacing: 1,
    paddingBottom: 8,
  },

  listContainer: {
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
  },
  
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  
  rowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  
  rowText: {
    fontSize: 16,
    color: '#000',
  },
  
  arrow: {
    fontSize: 22,
    color: '#C7C7CC',
  },
  subscribeArrow: {
    fontSize: 28,
    color: '#2E6EF7',
  },

});
