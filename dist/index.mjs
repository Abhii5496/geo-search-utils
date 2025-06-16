// src/utils.ts
function extractCoordinatesFromUrl(url) {
  const pattern1 = /\/@(-?\d+\.\d+),(-?\d+\.\d+),\d+(?:\.\d+)?z\//;
  const match1 = url.match(pattern1);
  if (match1) {
    return {
      latitude: parseFloat(match1[1]),
      longitude: parseFloat(match1[2]),
      full_url: url,
      source: "pattern1"
    };
  }
  const pattern2 = /\/(-?\d+\.\d+),\+?(-?\d+\.\d+)\?/;
  const match2 = url.match(pattern2);
  if (match2) {
    return {
      latitude: parseFloat(match2[1]),
      longitude: parseFloat(match2[2]),
      full_url: url,
      source: "pattern2"
    };
  }
  const pattern3 = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match3 = url.match(pattern3);
  if (match3) {
    return {
      latitude: parseFloat(match3[1]),
      longitude: parseFloat(match3[2]),
      full_url: url,
      source: "pattern3"
    };
  }
  const pattern4 = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;
  const match4 = url.match(pattern4);
  if (match4) {
    return {
      latitude: parseFloat(match4[1]),
      longitude: parseFloat(match4[2]),
      full_url: url,
      source: "pattern4"
    };
  }
  return null;
}
var getAddress = async (latitude, longitude, lang) => {
  try {
    const res = await fetch(
      `https://api-bdc.io/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${lang?.lang ?? "en"}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
function transformLocationData(data, sourceUrl) {
  const districtEntry = data.localityInfo.administrative.find((entry) => entry.order === 9);
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    sourceUrl,
    address: {
      countryName: data.countryName,
      countryCode: data.countryCode,
      state: data.principalSubdivision,
      stateCode: data.principalSubdivisionCode,
      postcode: data.postcode || "",
      // fallback if missing
      plusCode: data.plusCode || "",
      district: districtEntry?.name || "",
      lookupSource: data.lookupSource || "coordinates",
      localityLanguageRequested: data.localityLanguageRequested || "en",
      continent: data.continent,
      continentCode: data.continentCode,
      city: data.city,
      locality: data.locality
    }
  };
}
async function getAddressByQuery(query, retryCount = 0) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
    );
    if (!res.ok) {
      throw new Error("Nominatim API error");
    }
    const fullData = await res.json();
    if (fullData.length === 0) {
      return [];
    }
    const filteredData = fullData.map((item) => ({
      place_id: item.place_id,
      lat: item.lat,
      lon: item.lon,
      type: item.type,
      place_rank: item.place_rank,
      addresstype: item.addresstype,
      name: item.name,
      display_name: item.display_name
    }));
    return filteredData;
  } catch (error) {
    console.error(error);
    if (retryCount < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      return getAddressByQuery(query, retryCount + 1);
    }
    return [];
  }
}

// src/index.ts
async function getDataByUrl(url, lang) {
  if (!url.trim()) {
    return { error: "Empty URL" };
  }
  const googleMapsRegex = /^https?:\/\/(www\.)?(google\.com\/maps|maps\.app\.goo\.gl)/i;
  if (!googleMapsRegex.test(url)) {
    return { error: "Invalid Google Maps URL" };
  }
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow"
    });
    const expandedUrl = response.url;
    if (expandedUrl) {
      const coordinates = extractCoordinatesFromUrl(expandedUrl);
      if (coordinates) {
        const data = await getAddress(
          coordinates.latitude,
          coordinates.longitude,
          lang
        );
        if (data) {
          return transformLocationData(data, expandedUrl);
        }
      }
      return expandedUrl;
    }
    return expandedUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}
var searchAddress = async (query) => {
  try {
    const data = await getAddressByQuery(query);
    return data;
  } catch (error) {
    console.log(error);
    return { error: true, message: "Something went wrong" };
  }
};
export {
  getDataByUrl,
  searchAddress
};
