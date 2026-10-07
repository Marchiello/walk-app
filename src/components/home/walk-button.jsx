import { PersonSimpleRunIcon } from 'phosphor-react-native';
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

export default function WalkButton( isRecording, onPress ){
    
    return (
        <TouchableOpacity
            style={[styles.walkButton, {bottom: Platform.OS == 'ios' ? 100 : 70, backgroundColor: isRecording }]}
            onPress={onPress}
        >
            <PersonSimpleRunIcon size={28} color="black" weight="bold"/>
            <Text style={styles.walkButtonText}>
                {isRecording ? 'Finalizar': 'Iniciar'}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
	walkButton: {
		position: 'absolute',
		// right: 20,
		left: 20,
		height: 50,
		paddingHorizontal: 25,
		borderRadius: 25,
		backgroundColor: '#8ac926',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		elevation: 5,
	},
	walkButtonText: {
		color: 'black',
		fontWeight: '600',
		fontSize: 16,
	},
});
