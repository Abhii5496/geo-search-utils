# Location Utils

=======

A powerful TypeScript utility that enables you to use Google Maps features without requiring an API
key! Extract location data, search addresses, and process Google Maps URLs - all without the need
for API authentication.

## 🌟 Key Features

- **No API Key Required!** - Use Google Maps features without authentication
- Extract coordinates and location data from Google Maps URLs
- Address search functionality using OpenStreetMap
- Expand shortened Google Maps URLs to their full form
- TypeScript support with full type definitions

## Why Choose This Package?

- **Zero Configuration** - No API keys or complex setup required
- **Cost Effective** - No usage limits or billing concerns
- **Privacy Focused** - No need to share API keys or credentials
- **Easy Integration** - Simple API with TypeScript support

## Installation

```bash
npm install location-utils
```

## Usage

### Address Search

```typescript
import { getAddressByQuery, searchAddress } from "location-utils"

// Example 1: Basic address search
const searchResults = await getAddressByQuery("London, UK")
console.log(searchResults)

// Example 2: Using searchAddress function
const results = await searchAddress("New York, USA")
console.log(results)
```

### URL Processing (No API Key Required!)

```typescript
import { getDataByUrl, extractCoordinates } from "location-utils"

// Expand a short URL without API key
const expandedUrl = await getDataByUrl("https://maps.app.goo.gl/abc123")
console.log(expandedUrl)

// Extract coordinates from a URL
const coordinates = extractCoordinates("https://www.google.com/maps?q=51.5074,-0.1278")
console.log(coordinates)
// Output: { lat: 51.5074, lng: -0.1278 }
```

## API Reference

### Address Search Functions

#### `getAddressByQuery(query: string)`

Searches for an address using OpenStreetMap provider.

Parameters:

- `query`: The address to search for

Returns:

- Promise with search results containing location data

#### `searchAddress(query: string)`

Alternative function for address search with additional features.

Parameters:

- `query`: The address to search for

Returns:

- Promise with search results

### URL Functions (No API Key Required!)

#### `expandUrl(shortUrl: string)`

Expands a Google Maps short URL to its full form without requiring an API key.

Parameters:

- `shortUrl`: The shortened Google Maps URL

Returns:

- Promise with the expanded URL

#### `extractCoordinates(url: string)`

Extracts coordinates from various Google Maps URL patterns without API authentication.

Parameters:

- `url`: The Google Maps URL containing coordinates

Returns:

- Object containing latitude and longitude

## Examples

### Basic Address Search

```typescript
import { getAddressByQuery } from "location-utils"

async function findLocation() {
  try {
    const results = await getAddressByQuery("Eiffel Tower, Paris")
    console.log("Search results:", results)
  } catch (error) {
    console.error("Error:", error)
  }
}
```

### URL Processing (No API Key Required!)

```typescript
import { getDataByUrl, extractCoordinates } from "location-utils"

async function processMapUrl() {
  try {
    // Expand a short URL without API key
    // Example urls
    //  'https://www.google.com/maps/@51.5074,-0.1278,15z',
    //   'https://www.google.com/maps/19.910945,+72.994643?',
    //   'https://www.google.com/maps?q=40.7128,-74.0060',
    //   'https://www.google.com/maps/place/London/@51.5074,-0.1278!3d51.5074!4d-0.1278'

    const shortUrl = "https://maps.app.goo.gl/abc123"
    const expandedUrl = await getDataByUrl(shortUrl)
    console.log("Expanded URL:", expandedUrl)

    // Extract coordinates
    const coords = extractCoordinates(expandedUrl)
    console.log("Coordinates:", coords)
  } catch (error) {
    console.error("Error:", error)
  }
}
```

## Error Handling

All functions include proper error handling and will throw errors in the following cases:

- Invalid URLs
- Network errors
- Invalid response formats
- Missing or malformed data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project in any way you want.

## Author

[@Abhii5496](https://github.com/Abhii5496)
