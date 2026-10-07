import { Directory, File, Paths } from 'expo-file-system'

const photosDir = new Directory(Paths.document, 'photos')

function checkDirExists() {
    if ( !photosDir.exists ) {
        photosDir.create({ intermediates: true })
    }
}


export async function persistPhotos(photos = []) {
    checkDirExists()

    const persisted = []

    for (const photo of photos) {
        try {
            const sourceFile = new File(photo.uri)
            const extension = sourceFile.extension || '.jpg'
            const destFile = new File(photosDir, `${photo.id}${extension}`)

            await sourceFile.copy(destFile)

            persisted.push({ ...photo, uri: destFile.uri })
        } catch (error) {
            console.error('Erro ao mover foto para storage permanente:', error)
            persisted.push(photo)
        }
    }

    return persisted
}


export function deletePhotos(photos) {
    for (const photo of photos) {
        try {
            const file = new File(photo.uri)
            if (file.exists) {
                file.delete()
            }
        } catch (error) {
            console.error('Erro ao apagar foto:', error)
        }
    }
}