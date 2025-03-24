import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import { SwipeListView } from 'react-native-swipe-list-view'
import React, { useState } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
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

    // Implement once Firebase integration is complete
    const handleDelete = (item: Item) => {
        setPosts(posts.filter((post) => post.id !== item.id))
    }

    const renderDeleteAction = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
            <View style={styles.deleteButton}>
                <Ionicons
                    name="trash-bin"
                    size={60}
                    color='red'
                    />
            </View>
        </TouchableOpacity>
    )

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
        <View style={styles.itemBox}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        </View>
        </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}> 
            <SwipeListView
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderHiddenItem={ renderDeleteAction }
                rightOpenValue={ -65 }
                disableRightSwipe
                style={styles.list}
                />
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
        backgroundColor: '#ffffff',
        borderRadius: 14, // adjust this
        borderWidth: 2,
        borderColor: '#f2350f',
        padding: 10

    },
    deleteButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
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