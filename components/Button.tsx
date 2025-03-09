import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'

type Props = {
    label: string;
    theme?: 'primary';
    onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
    if (theme === 'primary') {
        return (
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} 
                onPress={onPress}
                >
                    <Text style={styles.buttonLabel}>{label}</Text>
                </Pressable>
            </View>
     )
    }
    // fill in. I'm tired
}
const styles = StyleSheet.create({
    buttonContainer: {
        width: 300,
        height: 70,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        paddingRight: 10,
    },
    buttonLabel: {
        color: "black",
        fontSize: 18,
    }
})