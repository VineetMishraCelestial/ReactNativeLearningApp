import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";


const MARKERS = [
  {
    id: 1,
    latitude: 38.627,
    longitude: -90.1994,
    title: "St. Louis, MO",
    price: 2.789,
    tag: "Less IFTA",
    brand: "Pilot",
    savings: "$12.40",
  },
  {
    id: 2,
    latitude: 32.7767,
    longitude: -96.797,
    title: "Dallas, TX",
    price: 3.099,
    tag: "Less IFTA",
    brand: "Loves",
    savings: "$8.20",
  },
  {
    id: 3,
    latitude: 41.8827,
    longitude: -87.6233,
    title: "Chicago, IL",
    price: 3.259,
    tag: "Less IFTA",
    brand: "TA",
    savings: "$5.60",
  },
];

const ROUTE_COORDS = [
  { latitude: 29.7604, longitude: -95.3698 },
  { latitude: 32.7767, longitude: -96.797  },
  { latitude: 38.627,  longitude: -90.1994 },
  { latitude: 41.8827, longitude: -87.6233 },
  { latitude: 43.6532, longitude: -79.3832 },
];

// ─── Main Screen ──────────────────────────────────────────────────────────────

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedMarker = selectedId !== null
    ? MARKERS.find((m) => m.id === selectedId)
    : undefined;

  const fitMap = () => {
    mapRef.current?.fitToCoordinates(ROUTE_COORDS, {
      edgePadding: { top: 80, right: 40, bottom: 100, left: 40 },
      animated: true,
    });
  };

  useEffect(() => {
    setSelectedId(null);
    const timer = setTimeout(fitMap, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>

      {/* ── Map ── */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.5,
          longitude: -90.0,
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
        onMapReady={fitMap}
        onPress={() => setSelectedId(null)}
      >

        {/* Route Polyline */}
        <Polyline
          coordinates={ROUTE_COORDS}
          strokeColor="orange"
          strokeWidth={8}
        />

        {/* Origin Dot */}
        <Marker
          coordinate={{ latitude: 29.7604, longitude: -95.3698 }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View style={styles.endpointOuter}>
            <View style={styles.endpointInner} />
          </View>
        </Marker>

        {/* Destination Dot */}
        <Marker
          coordinate={{ latitude: 43.6532, longitude: -79.3832 }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View style={styles.endpointOuter}>
            <View style={styles.endpointInner} />
          </View>
        </Marker>

        {/* Fuel Stop Markers */}
        {MARKERS.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            anchor={{ x: 0.5, y: 1 }}
            // ✅ Use calloutOffset to help touch detection
            calloutOffset={{ x: 0, y: 0 }}
            onPress={(e) => {
              e.stopPropagation();
              setSelectedId(marker.id);
            }}
          >
            {/* ✅ Pointer events none so touch passes to Marker */}
            <View
              style={styles.markerContainer}
              pointerEvents="none"
            >
              <View style={[
                styles.markerBubble,
                selectedId === marker.id && styles.markerBubbleActive,
              ]}>
                <Text style={styles.markerPrice}>
                  ${marker.price.toFixed(2)}
                </Text>
                <View style={styles.markerTag}>
                  <Text style={styles.markerTagText}>{marker.tag}</Text>
                </View>
              </View>
              <View style={[
                styles.markerArrow,
                selectedId === marker.id && styles.markerArrowActive,
              ]} />
            </View>
          </Marker>
        ))}

      </MapView>

      

      {/* ── Popup Card ── */}
      {selectedMarker !== undefined && (
  <View style={styles.popupContainer} pointerEvents="box-none">
    <View style={styles.popup}>

      <TouchableOpacity
        style={styles.popupClose}
        activeOpacity={0.7}
        onPress={() => setSelectedId(null)}
      >
        <Text style={styles.popupCloseText}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.popupTitle}>{selectedMarker.title}</Text>
      <Text style={styles.popupBrand}>⛽ {selectedMarker.brand}</Text>

      <View style={styles.popupDivider} />

      <View style={styles.popupRow}>
        <View>
          <Text style={styles.popupLabel}>Fuel Price</Text>
          <Text style={styles.popupPrice}>
            ${selectedMarker.price.toFixed(3)}
          </Text>
        </View>

        <View style={styles.popupTagBox}>
          <Text style={styles.popupTagText}>{selectedMarker.tag}</Text>
        </View>
      </View>

      <View style={styles.popupSavingsRow}>
        <Text style={styles.popupSavingsLabel}>Estimated Savings</Text>
        <Text style={styles.popupSavings}>{selectedMarker.savings}</Text>
      </View>

      <TouchableOpacity style={styles.popupBtn}>
        <Text style={styles.popupBtnText}>Navigate Here →</Text>
      </TouchableOpacity>

    </View>
  </View>
)}

    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

  endpointOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(26,115,232,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#1A73E8",
  },
  endpointInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1A73E8",
  },

  markerContainer: { alignItems: "center" },
  markerBubble: {
    backgroundColor: "#1a1a2e",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1A73E8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  markerBubbleActive: {
    borderColor: "#fbbf24",
  },
  markerPrice: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  markerTag: {
    backgroundColor: "#fbbf24",
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginTop: 3,
  },
  markerTagText: {
    color: "#000",
    fontSize: 8,
    fontWeight: "700",
  },
  markerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 9,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#1A73E8",
  },
  markerArrowActive: {
    borderTopColor: "#fbbf24",
  },

  popup: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,
    backgroundColor: "#0f1923",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  popupClose: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  popupCloseText: { color: "#fff", fontSize: 22, fontWeight: "700" },
  popupTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  popupBrand: { color: "#8ba0b4", fontSize: 13 },
  popupDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 14,
  },
  popupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  popupLabel: { color: "#8ba0b4", fontSize: 12, marginBottom: 4 },
  popupPrice: { color: "#4ade80", fontSize: 28, fontWeight: "700" },
  popupTagBox: {
    backgroundColor: "rgba(251,191,36,0.15)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.4)",
  },
  popupTagText: { color: "#fbbf24", fontSize: 12, fontWeight: "700" },
  popupSavingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  popupSavingsLabel: { color: "#8ba0b4", fontSize: 13 },
  popupSavings: { color: "#4ade80", fontSize: 15, fontWeight: "700" },
  popupBtn: {
    backgroundColor: "#1A73E8",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  popupBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  popupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 9999,
  },
});


// import React from "react";
// import { View, StyleSheet } from "react-native";
// import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

// const MapScreen = () => {
//   return (
//     <View style={styles.container}>
//       <MapView
//        provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//       >
//         <Marker
//           coordinate={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//           }}
//           title="Test Marker"
//         />
//       </MapView>
//     </View>
//   );
// };

// export default MapScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });



// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     StatusBar, Image
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../app/navigation/NavigationTypes';
// import { useLayoutEffect } from 'react';
// import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// type IconName = React.ComponentProps<typeof Ionicons>['name'];
// interface BottomMenuItem {
//     name: string;
//     icon: IconName;
// }
// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
// const MapScreen: React.FC = () => {
//     const navigation = useNavigation<NavigationProp>();
//     const [activeTab, setActiveTab] = useState<'Map' | 'List'>('Map');
//     const [activeFilter, setActiveFilter] = useState<string>('Price');
//     const [viewFilter, setViewFilter] = useState<string>('View All');
//     const [activeBottom, setActiveBottom] = useState<string>('Fuelbook');

//     const bottomItems: BottomMenuItem[] = [
//         { name: 'Fuelbook', icon: 'book-outline' },
//         { name: 'Offers', icon: 'pricetag-outline' },
//         { name: 'Account', icon: 'person-outline' },
//     ];
//     useLayoutEffect(() => {
//         navigation.setOptions({
//             headerTitleAlign: 'center',
//             headerTitle: 'Map',
//             headerRight: () => (
//                 <View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
//                     <View style={styles.toggleContainer}>
//                         {(['Map', 'List'] as const).map((tab) => (
//                             <TouchableOpacity
//                                 key={tab}
//                                 style={[
//                                     styles.toggleBtn,
//                                     activeTab === tab && styles.activeToggle,
//                                 ]}
//                                 onPress={() => handleToggle(tab)}
//                             >
//                                 <Text
//                                     style={[
//                                         styles.toggleText,
//                                         activeTab === tab && styles.activeToggleText,
//                                     ]}
//                                 >
//                                     {tab}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 </View>
//             ),
//         });
//     }, [navigation, activeTab]);


//     const handleToggle = (tab: 'Map' | 'List') => {
//         setActiveTab(tab);
      
//         if (tab === 'Map') {
//           console.log('Map selected');
//           // Call map filter function here
//         } else {
//           console.log('List selected');
//           // Call list filter function here
//         }
//       };


//     return (
//         <View style={styles.container}>

//             <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

//             <View style={styles.filterContainer}>
//                 {['Price', 'Distance', 'Less IFTA'].map((item) => (
//                     <TouchableOpacity
//                         key={item}
//                         style={[
//                             styles.filterBtn,
//                             activeFilter === item && styles.activeFilter,
//                         ]}
//                         onPress={() => setActiveFilter(item)}
//                     >
//                         <Text
//                             style={[
//                                 styles.filterText,
//                                 activeFilter === item && styles.activeFilterText,
//                             ]}
//                         >
//                             {item}
//                         </Text>
//                     </TouchableOpacity>
//                 ))}
//             </View>

//             {/* MAP SECTION */}
//             <View style={styles.mapContainer}>
//                 <MapView
//                     provider={PROVIDER_GOOGLE}
//                     style={styles.map}
//                     initialRegion={{
//                         latitude: 39.5,
//                         longitude: -98.35,
//                         latitudeDelta: 20,
//                         longitudeDelta: 20,
//                     }}
//                 >
//                     <Marker
//                         coordinate={{ latitude: 29.7604, longitude: -95.3698 }}
//                         title="Houston"
//                     />
//                     <Marker
//                         coordinate={{ latitude: 42.3314, longitude: -83.0458 }}
//                         title="Detroit"
//                     />
//                     <Polyline
//                         coordinates={[
//                             { latitude: 29.7604, longitude: -95.3698 },
//                             { latitude: 39.0997, longitude: -94.5786 },
//                             { latitude: 42.3314, longitude: -83.0458 },
//                         ]}
//                         strokeWidth={4}
//                         strokeColor="#2F80ED"
//                     />
//                 </MapView>


//                 <View style={styles.viewfilterContainer}>
//                     {['Top Ten', 'View All'].map((item) => (
//                         <TouchableOpacity
//                             key={item}
//                             style={[
//                                 styles.filterBtn,
//                                 viewFilter === item && styles.activeFilter,
//                             ]}
//                             onPress={() => setViewFilter(item)}
//                         >
//                             <Text
//                                 style={[
//                                     styles.filterText,
//                                     viewFilter === item && styles.activeFilterText,
//                                 ]}
//                             >
//                                 {item}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>

//                 {/* CUSTOM BOTTOM BAR */}
//                 <View style={styles.bottomBar}>
//                     {bottomItems.map((item) => (
//                         <TouchableOpacity
//                             key={item.name}
//                             style={styles.bottomItem}
//                             onPress={() => setActiveBottom(item.name)}
//                         >
//                             <Ionicons
//                                 name={item.icon}
//                                 size={24}
//                                 color={activeBottom === item.name ? '#2F80ED' : '#333'}
//                             />
//                             <Text
//                                 style={[
//                                     styles.bottomText,
//                                     activeBottom === item.name && styles.activeBottomText,
//                                 ]}
//                             >
//                                 {item.name}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>



//             </View>
//         </View>
//     );
// };

// export default MapScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5F5F5',
//         paddingTop: 5, // adjust if needed
//     },

//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//     },

//     title: {
//         fontSize: 20,
//         fontWeight: '600',
//     },

//     toggleContainer: {
//         flexDirection: 'row',
//         backgroundColor: '#E0E0E0',
//         borderRadius: 20,
//         padding: 3,
//     },

//     toggleBtn: {
//         paddingHorizontal: 15,
//         paddingVertical: 6,
//         borderRadius: 20,
//     },

//     activeToggle: {
//         backgroundColor: '#2F80ED',
//     },

//     toggleText: {
//         fontSize: 14,
//         color: '#333',
//     },

//     activeToggleText: {
//         color: '#fff',
//     },

//     filterContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         backgroundColor: '#D9D9D9',
//         borderRadius: 25,
//         marginHorizontal: 15,
//         padding: 0,
//     },
//     viewfilterContainer: {
//         flexDirection: 'row',
//         alignSelf: 'flex-end',
//         backgroundColor: '#D9D9D9',
//         borderRadius: 25,
//         marginRight: 15,
//         marginTop: 10,
//         padding: 2,
//     },

//     filterBtn: {
//         paddingVertical: 8,
//         paddingHorizontal: 15,
//         borderRadius: 20,
//     },

//     activeFilter: {
//         backgroundColor: '#2F80ED',
//     },

//     filterText: {
//         fontSize: 14,
//         color: '#333',
//     },

//     activeFilterText: {
//         color: '#fff',
//     },

//     mapContainer: {
//         flex: 1,
//         marginTop: 10,
//     },

//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },

//     topButtons: {
//         position: 'absolute',
//         top: 15,
//         right: 15,
//         flexDirection: 'row',
//     },

//     topTenBtn: {
//         backgroundColor: '#2F80ED',
//         paddingHorizontal: 14,
//         paddingVertical: 6,
//         borderRadius: 20,
//         marginRight: 8,
//     },

//     topTenText: {
//         color: '#fff',
//         fontSize: 13,
//         fontWeight: '500',
//     },

//     viewAllBtn: {
//         backgroundColor: '#fff',
//         paddingHorizontal: 14,
//         paddingVertical: 6,
//         borderRadius: 20,
//         elevation: 3,
//     },

//     viewAllText: {
//         color: '#333',
//         fontSize: 13,
//         fontWeight: '500',
//     },

//     bottomBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         height: 70,
//         backgroundColor: '#E6F3FF',
//         borderTopLeftRadius: 25,
//         borderTopRightRadius: 25,
//         paddingBottom: 10,
//     },

//     bottomItem: {
//         alignItems: 'center',
//     },

//     bottomText: {
//         fontSize: 12,
//         color: '#333',
//         marginTop: 4,
//     },

//     activeBottomText: {
//         color: '#2F80ED',
//         fontWeight: '600',
//     },

// });
