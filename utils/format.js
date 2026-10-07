export function formatDistance(meters) {
	if (meters >= 1000) {
		return `${(meters / 1000).toFixed(2)} km`
	}
	return `${Math.round(meters)} m`
}

export function formatDuration(startedAt, finishedAt) {
	const totalMinutes = Math.round((finishedAt - startedAt) / 60000)
	const hours = Math.floor(totalMinutes / 60)
	const minutes = totalMinutes % 60

	if (hours > 0) {
		return `${hours}h ${minutes}min`
	}
	return `${minutes}min`
}

export function formatDate(timestamp) {
	return new Date(timestamp).toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}