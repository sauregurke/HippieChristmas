import { StyleSheet, Image, ImageSourcePropType } from 'react-native';
//import { Image, type ImageSource } from 'expo-image';

type Props = {
    imgSource: { uri: string } | string; 
    selectedImage?: string;
  };
  
  export default function ImageViewer({ imgSource }: Props) {
    // handle the case of either string or object for imgSource
    const imageSource = typeof imgSource === 'string' ? { uri: imgSource } : imgSource;
    return <Image source={imageSource} style={styles.image} />;
  }

const styles = StyleSheet.create({
    image: {
        width: '80%',
        //width: 250,
        height: 250,
        borderRadius: 10,
    }
})
