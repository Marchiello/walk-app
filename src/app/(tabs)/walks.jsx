import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { getWalks } from "../../../services/walk.js";
export default function WalksScreen(){
    // Estado para a lista de caminhadas
    let [walks, setWalks] = useState([])

    useFocusEffect(
        () => {
            async function loadWalks(){
                let savedWalks = await getWalks()
                setWalks(savedWalks)
            }
            loadWalks()
        }
    )

    if (walks.length == 0) {
        return(
            <ThemedView>
                <ThemedText>Minhas caminhadas</ThemedText>
                <ThemedText>Nenhuma caminhada registrada</ThemedText>
            </ThemedView>
        )
    }
    
    return (
        <>
        </>
    )
}