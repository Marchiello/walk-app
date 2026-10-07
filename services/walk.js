import AsyncStorage from '@react-native-async-storage/async-storage'

const WALKS_KEY = '@walks'

export async function getWalks() {
    try {
        const data = await AsyncStorage.getItem(WALKS_KEY)

        if ( !data ) {
            return []
        }

        return JSON.parse(data)

    } catch (error) {
        console.error('Erro ao carregar caminhadas: ', error)
        return []
    }
}


export async function saveWalk(walk) {
    try {
        const walks = await getWalks()

        const updateWalks = [
            walk,
            ...walks.filter(item => item.id !== walk.id)
        ]

        await AsyncStorage.setItem(
            WALKS_KEY,
            JSON.stringify(updateWalks)
        )

        return walk

    } catch (error) {
        console.error('Erro ao salvar caminhada:', error);
        throw error
    }
}


export async function getWalk(id) {
    const walks = await getWalks()

    return walks.find(walk => walk.id === id)
}


export function createWalk() {
    const startedAt = Date.now()

    return {
        id: String(startedAt),
        startedAt: startedAt,
        finishedAt: null,
        distance: 0,
        path: [],
        photos: []
    }
}


export function finalizeWalk(walk, path, photos) {
    return {
        ...walk,
        finishedAt: Date.now(),
        path: path,
        photos: photos,
        distance: calculateDistance(path)
    }
}


export async function deleteWalk(id) {
    try {
        const walks = await getWalks()
        const updatedWalks = walks.filter(walk => walk.id !== id)

        await AsyncStorage.setItem(
            WALKS_KEY,
            JSON.stringify(updatedWalks)
        )
    } catch (error) {
        console.error('Erro ao apagar caminhada:', error)
        throw error
    }
}


// Distância entre dois pontos (metros) - fórmula de Haversine
function distanceBetween(a, b) {
    const R = 6371000 // raio da Terra em metros
    const toRad = (deg) => (deg * Math.PI) / 180

    const dLat = toRad(b.latitude - a.latitude)
    const dLon = toRad(b.longitude - a.longitude)

    const lat1 = toRad(a.latitude)
    const lat2 = toRad(b.latitude)

    const h = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2

    return 2 * R * Math.asin(Math.sqrt(h))
}


export function calculateDistance(path) {
    let total = 0

    for (let i = 1; i < path.length; i++) {
        total += distanceBetween(path[i - 1], path[i])
    }

    return total
}