//import { useNavigation } from "@react-navigation/native"
import { View, FlatList, Image, Text, StyleSheet } from "react-native"
import { dummyPosts } from '../../components/dummyData'
//import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Index() {
    return (
        /* I removed scrollview, FlatList scrolls! */
        <View style={styles.container}>
            <FlatList 
                data={dummyPosts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    //<Pressable 
                    //style={styles.itemContainer}
                    //onPress={() => useNavigation().navigate('ItemDetail', { item })}>
                    //onPress={() => null}>
                        <View style={styles.tile}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    //</Pressable>
                    
                )}
            />
        </View>
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
