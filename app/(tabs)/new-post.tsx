import {
    Keyboard,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native"
import { useState, useEffect } from 'react';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker'
//import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker'
import GetLocation, { Location } from 'react-native-get-location'
import MapView, { Marker } from 'react-native-maps'

import Ionicons from 'react-native-vector-icons/Ionicons'

import ImageViewer from "../../components/ImageViewer";
import { useNavigation } from "@react-navigation/native";

const DefaultImage = require('../../assets/images/icon.png') // TODO create image placeholder

export default function NewPost() {
    const [location, setLocation] = useState<Location | null>(null)
    const [loading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [itemTitle, setItemTitle] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [selectedValue, setSelectedValue] = useState(null) // might be the cause of log warnings on startup

    // Madison, WI - Birthplace of HC
    const defaultLatitude = 43.0722
    const defaultLongitude = -89.4008
    
    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
          })
          .then(location => {
            setLoading(false)
            setLocation(location)
          })
          console.log(location)
    
          setLoading(false)
    })
          
      
    const pickImageAsync = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            maxHeight: 1200,
            includeBase64: false,
            quality: 1,
            selectionLimit: 1, // look into adding more photos
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image selection')
            } else if (response.errorMessage) {
                console.log('Image selection error: ', response.errorMessage)
            } else if (response.assets && response.assets.length > 0) {
                console.log('Image selected: ', response.assets[0].uri)
                setSelectedImage(response.assets[0].uri)
            }
        });
    };

    const navigation = useNavigation()


    const openMapScreen = () => {
        // TODO implement with Pressable overlay on map screen
        console.log("Map screen triggered")
        //navigation.navigate('FullMap', { initialisedLocation: location })
    }

    const postItem = () => {
        console.log("attempting to post item")
    }

    const uploadImage = async (selectedImage: string | undefined, userId: string) => {
        if (!selectedImage) return null

        try {
            const fileName = 'images/${userId}/${Date.now()}.jpg'
            const reference = storage().ref(`uploads/${userId}/${fileName}`)

            // Upload the image to Firebase Storage
            await reference.putFile(selectedImage);

            // public url
            const downloadURL = await reference.getDownloadURL();

            // Store the URL and metadata in Firestore
            await firestore().collection('images').add({
                userId,
                imageUrl: downloadURL,
                uploadedAt: firestore.FieldValue.serverTimestamp(),
            });
            
            console.log("Uploaded image:", downloadURL);
            return downloadURL;
        } catch (error) {
            console.error("Couldn't upload image: ", error)
            return null
         }
    }

    return (

        <GestureHandlerRootView style={styles.globalContainer}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Pressable onPress={pickImageAsync}>
                            <View style={styles.imageContainer}>
                                <ImageViewer imgSource={selectedImage || DefaultImage} />
                            </View>
                        </Pressable>
                        <View style={styles.container}>
                            <View style={styles.textContainer}>

                                <Text style={styles.label}>Title</Text>
                                <TextInput // item title
                                    style={styles.titleTextBox}
                                    onChangeText={setItemTitle}
                                    value={itemTitle}
                                    placeholder="Give us a name"
                                    placeholderTextColor={'grey'}
                                />

                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    style={styles.textBox}
                                    onChangeText={setItemDescription}
                                    value={itemDescription}
                                    multiline={true}
                                    placeholder="Tell us about it!"
                                    placeholderTextColor={'grey'}
                                />

                                <Text style={styles.label}>Category</Text>
                                <View style={styles.width}>
                                <Picker
                                    style = { styles.picker }
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue) =>
                                        setSelectedValue(itemValue)}>
                                    <Picker.Item label="Furniture" value="furniture" />
                                    <Picker.Item label="Appliances" value="appliances" />
                                    <Picker.Item label="Electronics" value="electronics" />
                                    <Picker.Item label="Miscellaneous" value="miscellaneous" />
                                </Picker>
                                </View>
                                <Text style={styles.label}>Location</Text>
                                <Pressable style={styles.mapPreviewContainer}>
                                    <MapView
                                        style={styles.mapPreview}
                                        initialRegion={{
                                            latitude: location?.latitude ?? defaultLatitude,
                                            longitude: location?.longitude ?? defaultLongitude,
                                            latitudeDelta: 0.01,
                                            longitudeDelta: 0.01,
                                        }}>
                                        <Marker
                                            coordinate={{
                                                latitude: location?.latitude ?? defaultLatitude,
                                                longitude: location?.longitude ?? defaultLongitude,
                                            }}>
                                                <Ionicons name="pin" size={30} color='#f2350f'/>
                                        </Marker>
                                    </MapView>
                                </Pressable>
                                
                            </View>
                        </View>
                        <View style={styles.postButtonView}>
                        <TouchableOpacity style={styles.postButton} onPress={postItem}>

                            <Text style={styles.postButtonText}>Share</Text>

                        </TouchableOpacity>
                    </View>
                    </ScrollView>


            </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    )

}

const styles = StyleSheet.create({
    width: {
        width: '100%',
    },
    globalContainer: {
        // flex: 1,
    },
    scrollContainer: {
        //flexGrow: 1,
        padding: 0,
        //paddingBottom: 60 // dubious
    },
    container: {
        flexDirection: 'column',
        backgroundColor: '#f2f2f2', // orig #f2500f
        paddingLeft: 12,
        padding: 0,
    },
    imageContainer: {
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
    picker: {
        //height: 100,
        //borderWidth: 3,
        //borderColor: '#F2350F',
    },
    postButtonView: {
        marginTop: 40, // dubious
        alignItems: 'center',
        justifyContent: 'flex-end', // move to bottom of scroll view
        backgroundColor: 'transparent'
    },
    postButton: {
        //position: 'absolute',
        //bottom: 10, 
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