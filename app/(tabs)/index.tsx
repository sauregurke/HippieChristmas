import { View, FlatList, Image, Text, StyleSheet, Pressable } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Location } from 'react-native-get-location'

import { dummyPosts } from '../../components/dummyData'

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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "ItemDetail">

//import ItemDetail from '../item-detail'

export default function Index() {
    const navigation = useNavigation<NavigationProp>()

    return (
        /* I removed scrollview, FlatList scrolls! */
        /*onPress={() => navigation.navigate('ItemDetail', { item })}>*/
        <GestureHandlerRootView>
        <View style={styles.container}>
            <FlatList 
                data={dummyPosts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <Pressable 
                        style={styles.tile}
                        onPress={() => navigation.navigate('ItemDetail', { item })}>
                        
                        <Image source={{ uri: item.image }} style={ styles.image } />
                        <Text style={styles.title}>{item.title}</Text>
                        
                    </Pressable>
                    
                )}
            />
        </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 0,
    },
    container: {
      flex: 1,
      padding: 10,
    },
    itemContainer: {

    },
    tile: {
        flex: 1,
        margin: 6,
        backgroundColor: "#f2350f", // white #fff
        borderRadius: 8,
        overflow: 'hidden', 
        alignItems: 'flex-start', // or center?
        maxWidth: '47%',
        //minHeight: '80%' // border problem
    },
    image: {
        width: "100%",
        height: 190,
        resizeMode: "cover"
    },
    title: {
        padding: 6,
        marginTop: 4,
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        //textAlign: "center",
    },
})
