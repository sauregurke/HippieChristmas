import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
//import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable"
import Ionicons from "react-native-vector-icons/Ionicons"
import { dummyPosts } from "../../components/dummyData.js"

export default function MyPosts() {
    const [posts, setPosts] = useState(dummyPosts)

    type Item = {
        id: string;
        title: string;
        description: string;
        category: string;
        image: string;
        location: string;
    }

    // To be reimplemented once auth is done
    //const renderItem = ({item: Item}) => {
    //    <TouchableOpacity style={styles.itemContainer}>
     //       <Image source={{ uri: item.image }} style={styles.image} />
    //        <View style={styles.title}>{ Item.title }</View>
    //    </TouchableOpacity>
    //}

    const handleDelete = (id: string) => {
        setPosts(posts.filter((item) => item.id !== id))
    }

    // To be reimplemented once auth is done
    const renderDeleteAction = (id: string) => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
            <View style={styles.deleteButton}>
                <Ionicons
                    name="trash-bin"
                    size={60}
                    color='red'
                    />
            </View>
        </TouchableOpacity>
    )

    return (
        <GestureHandlerRootView style={{ flex: 1 }}> 
            <View style={styles.itemContainer}>
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        
                            <View style={styles.itemContainer}>
                                <View style={styles.itemBox}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>{item.title}</Text>
                                    </View>
                                </View>
                            </View>
                        
                    )}
                    style={styles.list}
                    />
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        padding: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 0,
    },
    container: {
        flex: 1,
      },
    itemContainer: {
        flex: 1,
        width: '100%',
        flexDirection: "row",
        padding: 1,
        marginBottom: 10,
        backgroundColor: "#f2f2f2",
    },
    itemBox: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: "#f2f2f2",
        borderRadius: 12, // adjust this
        borderWidth: 3,
        borderColor: '#f2350f',
        padding: 10

    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8, 
        resizeMode: "cover"
    },
    title: {
        flexDirection: 'row',
        padding: 6,
        marginTop: 4,
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: 5,
        paddingLeft: 15
      },
})