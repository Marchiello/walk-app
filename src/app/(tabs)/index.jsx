import { ThemedView } from '@/components/themed-view';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { createWalk, finalizeWalk, saveWalk } from '../../../services/walk';
import MapSection from "../../components/home/map-section";
import WalkButton from '../../components/home/walk-button';

export default function HomeScreen(){
    
    let [location, setLocation] = useState(null)
    let [isRecording, setIsRecording] = useState(false)
    let [walk, setWalk] = useState(null)

    let mapRef = useRef()

    useEffect(() => {

        let subscription;

        async function startWatching(){
            let { status } = await Location.requestForegroundPermissionsAsync()
        
            if( status != 'granted' ){
                console.log('Permissão não concedida')
                return
            }


            let currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            })

            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,

            })

            subscription = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                distanceInterval: 5,
                timeInterval: 5000
            },
            (newLocation) => {
                let coords = {
                    latitude: newLocation.coords.latitude,
                    longitudde: newLocation.coords.longitude,
                }
                setLocation(newLocation)

                if( isRecording ){
                    setWalk(current => current
                        ? { ...current, path: [...current.path, coords]}
                        : current
                    )

                    mapRef.current?.animateToRegion(
                        {
                            latitude: coords.latitude,
                            longitude: coords.longitudde,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005
                        },
                        500
                    )
                }
            })

        }
        startWatching()
    }, [isRecording])

    function handleStartWalk(){
        let newWalk = createWalk()
        console.log('START')
        setWalk({
            ...newWalk,
            path: location ? [location] : []
        })
        setIsRecording(true)
    }

    async function handleStopWalk(){
        console.log('STOP')
        if (!walk) {
            return
        }

        setIsRecording(false)

        let finished = finalizeWalk(walk, walk.path, [])
        await saveWalk(finished)
        setWalk(finished)
    }

    let displayedPath = walk?.path ?? []
    let mapCenter = location ?? displayedPath[displayedPath.lenght-1] ?? displayedPath[0]

    return (
        <ThemedView style={styles.container}>
            <MapSection
                mapRef={mapRef}
                location={location}
                mapCenter={mapCenter}
                displayedPath={displayedPath}
            />

            <WalkButton
                isRecording={isRecording}
                onPress={isRecording ? handleStopWalk : handleStartWalk}
            />

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
})