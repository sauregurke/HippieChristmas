import { StyleSheet, Image, ImageSource } from 'react-native';
//import { Image, type ImageSource } from 'expo-image';

type Props = {
    imgSource: ImageSource; //seems redundant. but type defines the *shape* of something
    selectedImage?: string;
    // this is typescript btw
}

export default function ImageViewer({ imgSource, selectedImage }: Props) {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
    
    return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    }
})
