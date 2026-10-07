import { PersonSimpleRunIcon } from 'phosphor-react-native';
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
export default function MapSection({ mapRef, location, mapCenter, displayedPath }){

    return(
        <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
                latitude: mapCenter?.latitude ?? -18.9778,
                longitude: mapCenter?.longitude ?? -49.465,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
            showsUserLocation={true}
        >
            <Polyline
                coordinates={displayedPath}
                strokeWidth={5}
                strokeColor='#007AFF'
            />
            
            {location && (
                <Marker
                coordinate={location}
                title="Você está aqui"
                >
                    <View style={styles.marker}>
                        <PersonSimpleRunIcon size={22} color="black" weight="bold"/>
                    </View>
                </Marker>
            )}
        </MapView>
    )
}

const styles = StyleSheet.create({
	map: {
		flex: 1
	},
	marker: {
		width: 44,
		height: 44,
		backgroundColor: '#8ac926',
		borderRadius: 22,
		borderColor: '#ffffff',
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
});