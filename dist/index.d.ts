interface Coordinates {
  latitude: number
  longitude: number
  full_url: string
  source: string
}

declare function getFullUrl(shortUrl: string): Promise<string | Coordinates | null>

export { getFullUrl }
