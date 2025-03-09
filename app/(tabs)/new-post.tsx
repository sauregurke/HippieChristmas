import { ScrollView, Text, View, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, Pressable, Keyboard } from "react-native"
import { useState, useEffect } from 'react';
//import BottomSheet from "@gorhom/bottom-sheet"
import * as ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import * as Location from 'react-native-geolocation-service'
import MapView, { Marker } from 'react-native-maps'
//import Constants from 'expo-constants' // for app bundle id REMOVE for production
//import { initializeApp } from 'firebase/app/'
//import { navigate } from 'expo-router/build/global-state/routing';
//import { initializeAuth, getReactNativePersistence } from 'firebase/auth';


import ImageViewer from "../../components/ImageViewer";
import { useNavigation } from "@react-navigation/native";

const DefaultImage = require('../../assets/images/icon.png') // TODO create image placeholder

export default function NewPost() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [itemTitle, setItemTitle] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [selectedValue, setSelectedValue] = useState(null) // might be the cause of log warnings on startup
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    //const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const pickImageAsync = async () => {
        // console.log("Bundle ID: ", bundleId) REMOVE for production
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          console.log(result)
          setSelectedImage(result.assets[0].uri);
        } else {
          // alert("No image selected.")
        }
    };

    useEffect(() => {
        async function getCurrentLocation() {

            console.log("grabbing location")

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // ... do we make this a big deal?
                // user could manually specify location
            }

            
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location)
        }

        // add timer to stop infinitely checking location, then uncomment this next line
        //getCurrentLocation()

        const interval = setInterval(getCurrentLocation, 900000)
        return () => clearInterval(interval)
    })

    const navigation = useNavigation()

    const openMapScreen = () => {
        console.log("Map screen triggered")
        // come back to this
        //navigation.navigate('FullMap', { initialisedLocation: location })
    }

    const postItem = () => {
        console.log("attempting to post item")
    }
    //const uploadImage = async (selectedImage, userId) => {
    //    if (!selectedImage) return null

    //    try {
    //        const filename = 'images/${userId}/${Date.now()}.jpg'
    //        const reference = storage().ref(filename)

    //        await reference.putFile(selectedImage)
    //        const url = await reference.getDownloadURL()
    //        return url
    //    } catch (error) {
    //        console.error("Couldn't upload image: ", error)
    //        return null
    //     }
    //}

    // scrap bottom sheet idea? 
    //const openBottomSheet = () => {
    //    bottomSheetRef.current?.expand()
    //}

    return (
        
        <GestureHandlerRootView style={styles.globalContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        
        <View style={styles.globalContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Pressable onPress={pickImageAsync}>
                <View style={styles.imageContainer}>
                    <ImageViewer imgSource={selectedImage || DefaultImage}/>
                </View>
            </Pressable>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput // item title
                    style={styles.titleTextBox}
                    onChangeText={setItemTitle}
                    value={itemTitle}
                    placeholder="Give us a name 🇦🇺" 
                    placeholderTextColor={'grey'}
                />
                <Text style={styles.label}>Description</Text>
                <TextInput // item title
                    style={styles.textBox}
                    onChangeText={setItemDescription}
                    value={itemDescription}
                    multiline={true}
                    placeholder="Tell us about it!" 
                    placeholderTextColor={'grey'}
                />
                <Text style={styles.label}>Category</Text>
                <View style={{ 
                    marginVertical: 0,
                    paddingLeft: 6,
                    width: '100%' }}>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedValue(value)}
                    
                    //selectedValue={setSelectedValue},
                    value = {selectedValue}
                    items={[
                        { label: 'Furniture', value: 'furniture' },
                        { label: 'Electronics', value: 'electronics' },
                        { label: 'Appliances', value: 'appliances' },
                        { label: 'ExpandThis', value: 'expandthis' },
                    ]}
                    style={{
                        ...pickerSelectStyles,
                        inputIOS: {
                            ...pickerSelectStyles.inputIOS,
                            height: 50,
                            width: '55%',
                            // Touch zone is anchored to the left of the box. Investigate.
                            backgroundColor: '#f2f2f2',
                            borderRadius: 8,
                            borderColor: "#f2350f",
                            borderWidth: 3,
                            paddingLeft: 10,              // text inside box
                            paddingVertical: 12,
                            //paddingHorizontal: 12,
                            fontSize: 20,
                            // color: 'grey'
                            marginBottom: 8,
                        },
                        iconContainer: {
                            top: 12,
                            right: 16,
                    }}}
                    
                    placeholder={{
                        label: 'Select a category...',
                        color: 'grey'
                        //value: 'ExpandThis',
                    }}
                    
                />
                </View>
                <Text style={styles.label}>Location - Coming Soon!</Text>
                {location && 
                    <Pressable onPress={ openMapScreen }>
                        <View style={styles.mapPreviewContainer}>
                            <MapView
                                style={styles.mapPreview}
                                initialRegion={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                >
                                    <Marker coordinate={location.coords} />
                                </MapView>
                        </View>
                    </Pressable>
                }
                </View>
            </View>
            </ScrollView>
            <View style={styles.postButtonView}>
            <TouchableOpacity style={styles.postButton} onPress={postItem}>
                
                    <Text style={styles.postButtonText}>Share</Text>
                
            </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    )

}

const styles = StyleSheet.create({
    globalContainer: {
        // flex: 1,
    },
    scrollContainer: {
        //flexGrow: 1,
        padding: 0,
        paddingBottom: 85 // dubious
    },
    container: {
      //flex: 1,
      //justifyContent: 'flex-start',
      flexDirection: 'column',
      backgroundColor: '#f2f2f2', // orig #f2500f
      //alignItems: 'center',
      paddingLeft: 12,
      padding: 0,
    },
    imageContainer: {
        //flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    textContainer: {
        padding: 0,
        width: '95%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    mapPreviewContainer: {
        width: '100%',
        height: 200,
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    mapPreview: {
        width: '100%',
        height: '100%',
    },
    image: {
      width: 300,
      height: 400,
      borderRadius: 20
    },
    label: {
        fontSize: 26, 
        fontWeight: 'bold', 
        //marginBottom: 8,
        marginLeft: 0,
        color: '#F2350F',
        paddingBottom: 3
    },
    titleTextBox: {
        height: 40, 
        width: '75%', 
        borderColor: '#F2350F',  // original #ccc
        borderWidth: 3, 
        borderRadius: 8, // rounded corners
        paddingLeft: 6,  // padding inside the box
        marginBottom: 10,
        marginLeft: 6,
        fontSize: 20,
        
    },
    textBox: {
        height: 30,
        width: '98%',  
        borderColor: '#F2350F', 
        borderWidth: 3,  
        borderRadius: 8, 
        minHeight: 55,
        paddingLeft: 6,  
        paddingTop: 7,
        marginBottom: 8,
        marginLeft: 6,
        fontSize: 20
    },
    postButtonView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        backgroundColor: 'transparent'
    },
    postButton: {
        //position: 'absolute',
        backgroundColor: '#f2350f',
        width: '95%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    postButtonText: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 24
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: { // TODO modify to suit HippieChristmas
        
    },
    placeholder: {
        color: '#000',
    },
    // add android here
})