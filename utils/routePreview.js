// USEI IA
// Converte o trajeto (lat/lng reais) numa string de pontos 2D, prontos pra
// desenhar como uma <Polyline> do react-native-svg num espaço de tamanho fixo.
// Não é uma projeção geográfica real — é só uma miniatura visual do formato do percurso.
export function pathToSvgPoints(path, width, height, padding = 8) {
    if (!path || path.length < 2) {
        return ''
    }

    const lats = path.map(p => p.latitude)
    const lngs = path.map(p => p.longitude)

    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)

    const latRange = maxLat - minLat || 1
    const lngRange = maxLng - minLng || 1

    const usableWidth = width - padding * 2
    const usableHeight = height - padding * 2

    return path
        .map(point => {
            const x = padding + ((point.longitude - minLng) / lngRange) * usableWidth
            // Latitude cresce pra cima, mas Y de tela cresce pra baixo — por isso o "1 - ..."
            const y = padding + (1 - (point.latitude - minLat) / latRange) * usableHeight
            return `${x.toFixed(1)},${y.toFixed(1)}`
        })
        .join(' ')
}