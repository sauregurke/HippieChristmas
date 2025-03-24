import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, TouchableOpacity, Button, StyleSheet, Linking } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps'
import { Location } from 'react-native-get-location'
import Ionicons from 'react-native-vector-icons/Ionicons'


type RootStackParamList = {
    ItemDetail: { 
      item: { 
        id: string; 
        title: string; 
        description: string; 
        category: string; 
        image: string; 
        location: Location; 
      }; 
    };
  };
  
  type ItemDetailRouteProp = RouteProp<RootStackParamList, "ItemDetail">;
  

export default function ItemDetail() {
    const route = useRoute<ItemDetailRouteProp>()
    const { item } = route.params
    const [location, setLocation] = useState<Location | null>(null)
    const [lastTap, setLastTap] = useState(0);

    useEffect(() => {
        setLocation(item.location)
    })

    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300; // threshold in ms

        if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
            openMaps(); // Double tap opens map app
        }

        setLastTap(now); // Update the last tap time
    };


    const openMaps = () => {

        try {
            if (location?.latitude && location?.longitude) {
                // Work out logic to open default maps app?
                // and to open that app directly instead of routing through browser?

                const latitude = location.latitude
                const longitude = location.longitude

                const googleMapsURL = `googlemaps://?daddr=${latitude},${longitude}&directionsmode=walking`
                const appleMapsURL = `maps://?daddr=${latitude},${longitude}&dirflg=w`

                console.log(appleMapsURL + "\n" + googleMapsURL)
                
                // This code doesn't work
                /*
                Linking.canOpenURL(googleMapsURL).then((supported) => {
                    if (supported) {
                        Linking.openURL(googleMapsURL)
                    } else {
                        Linking.openURL(appleMapsURL)
                    }
                })
                */

                Linking.openURL(appleMapsURL)
                
            } else {
                console.log("No location present for item " + item.title)
            }
        } catch (Error) {
            console.log("Could not open location for item " + item.title)
        }
    }

    const reserveItem = () => {
        console.log("attempting to reserve item " + item.title)
    }

    return (
        <View style = {styles.globalContainer} >
        <View style = {styles.container}>
            <Image source={{ uri: item.image }} style = {styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.description}>"{item.description}"</Text>
            <Pressable style={styles.mapPreviewContainer} onPress={handleDoubleTap}>
                <MapView
                    style={styles.mapPreview}
                    initialRegion={{
                        latitude: location?.latitude ?? 43.0722,
                        longitude: location?.longitude ?? -89.4008,

                        // Map zoom level
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}>   
                    <Marker
                        coordinate={{
                            latitude: location?.latitude ?? 43.0722,
                            longitude: location?.longitude ?? -89.4008,
                        }}
                        title={item.title}
                        >
                        <Ionicons name="pin" size={30} color='#f2350f'/>
                    </Marker>
                    
                </MapView>
            </Pressable>
        </View>
        <View style={styles.reserveButtonView}>
                <TouchableOpacity style={styles.reserveButton} onPress={reserveItem}>
                    <Text style={styles.reserveButtonText}>Reserve</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,


    },
    container: {
        flex: 1,
        padding: 14,
        backgroundColor: '#F2F2F2',
    },
    image: {
        width: '100%',
        height: '40%', // adjust for image proportion
        borderRadius: 14,
    },
    title: {
        paddingTop: 14,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#f2350f',
    },
    category: {
        paddingTop: 4,
        fontSize: 18,
        color: '#696969'
    },
    description: {
        paddingTop: 8,
        paddingStart: 8,
        fontSize: 24,
        color: '#000000'
    },
    mapPreviewContainer: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    mapPreview: {
        width: '100%',
        height: '100%',
    },
    reserveButtonView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0,
        backgroundColor: 'transparent',
    },
    reserveButton: {
        position: 'absolute',
        bottom: 30, 
        backgroundColor: '#f2350f',
        width: '95%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    reserveButtonText: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 24
    }
})