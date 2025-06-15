import {
  extractCoordinatesFromUrl,
  getAddress,
  LangTypes,
  Coordinates,
  transformLocationData,
  RawLocationData,
  getAddressByQuery,
} from "./utils"

export async function getDataByUrl(url: string, lang?: LangTypes) {
  if (!url.trim()) {
    return { error: "Empty URL" }
  }

  // Check if URL is a valid Google Maps URL
  const googleMapsRegex = /^https?:\/\/(www\.)?(google\.com\/maps|maps\.app\.goo\.gl)/i
  if (!googleMapsRegex.test(url)) {
    return { error: "Invalid Google Maps URL" }
  }
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
    })
    const expandedUrl = response.url
    if (expandedUrl) {
      const coordinates: Coordinates | null = extractCoordinatesFromUrl(expandedUrl)
      if (coordinates) {
        const data: RawLocationData | null = await getAddress(
          coordinates.latitude,
          coordinates.longitude,
          lang
        )
        if (data) {
          return transformLocationData(data, expandedUrl)
        }
      }
      return expandedUrl
    }
    return expandedUrl
  } catch (error) {
    console.error(error)
    return null
  }
}

export const searchAddress = async (query: string) => {
  try {
    const data = await getAddressByQuery(query)
    return data
  } catch (error) {
    console.log(error)
    return { error: true, message: "Something went wrong" }
  }
}
