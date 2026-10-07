// ##########################################################
// Bibliotecas
// ##########################################################
npx expo install expo-location react-native-maps
npx expo install expo-camera react-native-view-shot expo-sharing
npx expo install expo-file-system  @react-native-async-storage/async-storage
npx expo install phosphor-react-native react-native-svg expo-linear-gradient



// ##########################################################
// src/app/(tabs)/index.jsx
// ##########################################################
    // Salvar Foto no Storage
    useEffect(() => {
		if ( !photoUri || !isRecording ) {
			return
		}
		if ( processedPhotoRef.current === timestamp ) {
			return // já processada
		}

		processedPhotoRef.current = timestamp

		const photo = {
			id: timestamp,
			uri: photoUri,
			latitude: Number(latitude),
			longitude: Number(longitude),
			timestamp: Number(timestamp)
		}

		setWalk(current => current
			? { ...current, photos: [...current.photos, photo] }
			: current
		)

		router.setParams({ photoUri: undefined, latitude: undefined, longitude: undefined, timestamp: undefined })
	}, [photoUri, latitude, longitude, timestamp, isRecording])


    // Compartilhar Foto
    async function handleSharePhoto() {
		if (!photoCaptureRef.current) return

		try {
			const uri = await captureRef(photoCaptureRef, {
				format: 'png',
				quality: 1,
			})

			const isAvailable = await Sharing.isAvailableAsync()

			if (!isAvailable) {
				console.log('Compartilhamento não disponível neste dispositivo')
				return
			}

			await Sharing.shareAsync(uri)
		} catch (error) {
			console.error('Erro ao compartilhar foto:', error)
		}
	}


// Estilo
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EFEFEF'
	},
});



// ##########################################################
// src/app/(tabs)/walk.jsx
// ##########################################################



// Estilo
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list: {
		padding: 16,
		gap: 12,
	},
	screenTitle: {
		fontSize: 28,
		fontWeight: '800',
		marginBottom: 16,
		color: 'white'
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
	},
	emptyText: {
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
	},
});


// ##########################################################
// src/app/camera/index.jsx
// ##########################################################
    // Ainda não obteve a permissão da câmera
    if ( !cameraPermission ) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    // A permissão da câmera foi negada
    if ( !cameraPermission.granted ) { 
        return ( 
            <View style={styles.center}>
                <Text style={styles.permissionText}>Precisamos de acesso à câmera.</Text>
                <Pressable style={styles.permissionButton} onPress={requestPermissions} >
                    <Text style={styles.permissionButtonText}>Permitir câmera</Text>
                </Pressable>
            </View>
        );
    }

    // Ainda não obteve a permissão da localização
    if ( locationPermission === null ) { 
        requestPermissions(); 
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // A permissão da localização foi negada
    if ( locationPermission !== 'granted' ) { 
        return ( 
            <View style={styles.center}> 
                <MapPinIcon size={48} color="#333" /> 
                <Text style={styles.permissionText}>Precisamos da sua localização para registrar onde a foto foi tirada.</Text> 
                <Pressable style={styles.permissionButton} onPress={requestPermissions} > 
                    <Text style={styles.permissionButtonText}>Permitir localização</Text>
                </Pressable>
            </View>
        );
    }


// Estilo
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, backgroundColor: 'black', 
    }, 
    camera: { 
        flex: 1, 
    }, 
    center: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 30, 
        backgroundColor: 'white', 
    }, 
    permissionText: { 
        fontSize: 16, 
        textAlign: 'center', 
        marginVertical: 20, 
    }, 
    permissionButton: { 
        paddingHorizontal: 24, 
        paddingVertical: 14, 
        borderRadius: 10, 
        backgroundColor: '#222', 
    }, 
    permissionButtonText: { 
        color: 'white', 
        fontSize: 16, 
        fontWeight: '600', 
    }, 
    closeButton: { 
        position: 'absolute', 
        top: 50, 
        left: 20, 
        width: 48, 
        height: 48, 
        borderRadius: 24, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 
    bottomControls: { 
        position: 'absolute', 
        bottom: 40, 
        left: 0, 
        right: 0, 
        alignItems: 'center', 
    }, 
    captureButton: { 
        width: 72, 
        height: 72, 
        borderRadius: 36, 
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        borderWidth: 4, 
        borderColor: 'white', 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 
    captureButtonDisabled: { 
        opacity: 0.5, 
    }, 
});


// ##########################################################
// src/components/home/camera-fab.jsx
// ##########################################################



// Estilo
const styles = StyleSheet.create({
	cameraButton: {
		position: 'absolute',
		right: 20,
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#ffca3a',
		justifyContent: 'center',
		alignItems: 'center',

		// sombra no iOS
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,

		// sombra no Android
		elevation: 5,
	},
});



// ##########################################################
// src/components/home/map-section.jsx
// ##########################################################



// Estilo
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



// ##########################################################
// src/components/home/photo-detail-modal.jsx
// ##########################################################



// Estilo
const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.95)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalImage: {
		width: '100%',
		height: '100%',
	},
	modalCloseButton: {
		position: 'absolute',
		top: 50,
		right: 20,
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: 'rgba(255,255,255,0.2)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	captureArea: {
		width: '90%',
		aspectRatio: 3 / 4,
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: 'black',
	},
	statsOverlay: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingTop: 70,
		paddingHorizontal: 20,
		paddingBottom: 24,
	},
	statsRoute: {
		backgroundColor: 'rgba(255,255,255,0.15)',
		borderRadius: 8,
		padding: 4,
	},
	statsText: {
		flex: 1,
	},
	statsDetail: {
		color: 'white',
		fontSize: 13,
		opacity: 0.85,
		marginTop: 2,
	},
	modalShareButton: {
		position: 'absolute',
		top: 50,
		left: 20,
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: 'rgba(255,255,255,0.2)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	routePreview: {
		alignSelf: 'flex-start',
		marginBottom: 14,
	},
	statsRow: {
		flexDirection: 'row',
		gap: 36,
		marginBottom: 8,
	},
	statBlock: {},
	statLabel: {
		color: 'rgba(255,255,255,0.7)',
		fontSize: 12,
		fontWeight: '700',
		letterSpacing: 1,
		marginBottom: 2,
	},
	statValue: {
		color: 'white',
		fontSize: 34,
		fontWeight: '800',
	},
	statsDate: {
		color: 'rgba(255,255,255,0.75)',
		fontSize: 13,
		fontWeight: '600',
	},
});



// ##########################################################
// src/components/home/viewing-banner.jsx
// ##########################################################



// Estilo
const styles = StyleSheet.create({
	viewingBanner: {
		position: 'absolute',
		top: 60,
		left: 20,
		right: 20,
		backgroundColor: 'rgba(0,0,0,0.7)',
		borderRadius: 10,
		paddingVertical: 8,
		paddingHorizontal: 12,
		alignItems: 'center',
	},
	viewingBannerText: {
		color: 'white',
		fontWeight: '600',
	},
});



// ##########################################################
// src/components/home/walk-action-button.jsx
// ##########################################################



// Estilo
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



// ##########################################################
// src/components/walks/walk-item.jsx
// ##########################################################



// Estilo
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: '#8ac926',
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        padding: 12,
        gap: 12,
        alignItems: 'center',
    },
    deleteButton: {
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    itemInfo: {
        flex: 1,
        gap: 4,
    },
    itemDate: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemDetail: {
        fontSize: 14,
        color: '#666',
    },
});