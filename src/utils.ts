export interface Coordinates {
  latitude: number
  longitude: number
  full_url: string
  source: string
}

export interface LangTypes {
  lang?:
    | "en"
    | "hi"
    | "bn"
    | "ta"
    | "te"
    | "mr"
    | "gu"
    | "kn"
    | "ml"
    | "zh-CN"
    | "zh-TW"
    | "ja"
    | "ko"
    | "de"
    | "fr"
    | "es"
    | "it"
    | "pt"
    | "ru"
    | "pl"
    | "vi"
    | "id"
    | "th"
    | "tr"
    | "ar"
    | "uk"
    | "af"
    | "ms"
    | "my"
    | "fil"
    | "sw"
    | "xh"
    | "zu"
    | "cy"
    | "string"
}
interface LocalityDetail {
  name: string
  description?: string // Optional field
  isoName?: string // Optional field
  order: number
  isoCode?: string // Optional field
  wikidataId?: string // Optional field
  geonameId?: number // Optional field
}

interface AdministrativeInfo extends LocalityDetail {
  adminLevel: number
}

type InformativeInfo = LocalityDetail

interface LocalityInfo {
  administrative: AdministrativeInfo[]
  informative: InformativeInfo[]
}

export interface RawLocationData {
  latitude: number
  lookupSource: string
  longitude: number
  localityLanguageRequested: string
  continent: string
  continentCode: string
  countryName: string
  countryCode: string
  principalSubdivision: string
  principalSubdivisionCode: string
  city: string
  locality: string
  postcode: string // Can be an empty string
  plusCode: string
  localityInfo: LocalityInfo
}

type AddressResponse = {
  latitude: number
  longitude: number
  sourceUrl: string
  address: {
    locality: string
    city: string
    postcode: string
    plusCode: string
    district: string
    state: string
    stateCode: string
    countryName: string
    countryCode: string
    lookupSource: string
    localityLanguageRequested: string
    continent: string
    continentCode: string
  }
}
export function extractCoordinatesFromUrl(url: string): Coordinates | null {
  // Pattern 1: /@latitude,longitude,zoomz/
  const pattern1 = /\/@(-?\d+\.\d+),(-?\d+\.\d+),\d+(?:\.\d+)?z\//
  const match1 = url.match(pattern1)
  if (match1) {
    return {
      latitude: parseFloat(match1[1]),
      longitude: parseFloat(match1[2]),
      full_url: url,
      source: "pattern1",
    }
  }

  // Pattern 2: /latitude,longitude? (e.g., /19.910945,+72.994643?)
  const pattern2 = /\/(-?\d+\.\d+),\+?(-?\d+\.\d+)\?/
  const match2 = url.match(pattern2)
  if (match2) {
    return {
      latitude: parseFloat(match2[1]),
      longitude: parseFloat(match2[2]),
      full_url: url,
      source: "pattern2",
    }
  }

  // Pattern 3: q=latitude,longitude
  const pattern3 = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/
  const match3 = url.match(pattern3)
  if (match3) {
    return {
      latitude: parseFloat(match3[1]),
      longitude: parseFloat(match3[2]),
      full_url: url,
      source: "pattern3",
    }
  }

  // Pattern 4: !3dlatitude!4dlongitude
  const pattern4 = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/
  const match4 = url.match(pattern4)
  if (match4) {
    return {
      latitude: parseFloat(match4[1]),
      longitude: parseFloat(match4[2]),
      full_url: url,
      source: "pattern4",
    }
  }

  // If no patterns match
  return null
}

export const getAddress = async (
  latitude: number,
  longitude: number,
  lang: LangTypes | undefined
): Promise<RawLocationData | null> => {
  try {
    const res = await fetch(
      `https://api-bdc.io/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${
        lang?.lang ?? "en"
      }`
    )
    const data: RawLocationData = await res.json()
    return data
  } catch (error: Error | any) {
    return error
  }
}

export function transformLocationData(data: RawLocationData, sourceUrl: string): AddressResponse {
  const districtEntry = data.localityInfo.administrative.find(entry => entry.order === 9)

  return {
    latitude: data.latitude,
    longitude: data.longitude,
    sourceUrl,
    address: {
      countryName: data.countryName,
      countryCode: data.countryCode,
      state: data.principalSubdivision,
      stateCode: data.principalSubdivisionCode,
      postcode: data.postcode || "", // fallback if missing
      plusCode: data.plusCode || "",
      district: districtEntry?.name || "",
      lookupSource: data.lookupSource || "coordinates",
      localityLanguageRequested: data.localityLanguageRequested || "en",
      continent: data.continent,
      continentCode: data.continentCode,
      city: data.city,
      locality: data.locality,
    },
  }
}

export interface NominatimResponse {
  place_id: number
  lat: string
  lon: string
  type: string
  place_rank: number
  addresstype: string
  name: string
  display_name: string
}

export async function getAddressByQuery(
  query: string,
  retryCount = 0
): Promise<NominatimResponse[]> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
    )

    if (!res.ok) {
      throw new Error("Nominatim API error")
    }

    const fullData = await res.json()
    if (fullData.length === 0) {
      return []
    }

    // Extract only the required fields from the response
    const filteredData: NominatimResponse[] = fullData.map((item: NominatimResponse) => ({
      place_id: item.place_id,
      lat: item.lat,
      lon: item.lon,
      type: item.type,
      place_rank: item.place_rank,
      addresstype: item.addresstype,
      name: item.name,
      display_name: item.display_name,
    }))

    return filteredData
  } catch (error) {
    console.error(error)
    if (retryCount < 3) {
      // Wait for 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000))
      return getAddressByQuery(query, retryCount + 1)
    }
    return []
  }
}
