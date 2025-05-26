import { Coordinates, extractCoordinatesFromUrl } from "./utils"

export async function getUrlData(shortUrl: string) {
  if (!shortUrl.trim()) {
    return ""
  }
  try {
    const response = await fetch(shortUrl, {
      method: "HEAD",
      redirect: "follow",
    })
    const expandedUrl = response.url
    if (expandedUrl) {
      const coordinates: Coordinates | null = extractCoordinatesFromUrl(expandedUrl)
      return coordinates || expandedUrl
    }
    return expandedUrl
  } catch (error) {
    console.error(error)
    return null
  }
}
