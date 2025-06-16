# Geo Search Utils

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

## Supported URL Patterns

The package can extract coordinates from various Google Maps URL formats without requiring an API key:

1. **Pattern 1**: `@latitude,longitude,zoomz`
   ```
   https://www.google.com/maps/@51.5074,-0.1278,15z
   ```

2. **Pattern 2**: `latitude,longitude?`
   ```
   https://www.google.com/maps/19.910945,+72.994643?
   ```

3. **Pattern 3**: `q=latitude,longitude`
   ```
   https://www.google.com/maps?q=40.7128,-74.0060
   ```

4. **Pattern 4**: `!3dlatitude!4dlongitude`
   ```
   https://www.google.com/maps/place/London/@51.5074,-0.1278!3d51.5074!4d-0.1278
   ```

## Installation

```bash
npm install geo-search-utils
```

## Usage

### Address Search

```typescript
import { getAddressByQuery, searchAddress } from "geo-search-utils"

// Example 1: Basic address search
const searchResults = await getAddressByQuery("London, UK")
console.log(searchResults)

// Example 2: Using searchAddress function
const results = await searchAddress("New York, USA")
console.log(results)
```

### URL Processing (No API Key Required!)

```typescript
import { expandUrl, extractCoordinates } from "geo-search-utils"

// Example 1: Extract coordinates from a URL with @ pattern
const coords1 = extractCoordinates("https://www.google.com/maps/@51.5074,-0.1278,15z")
console.log(coords1)
// Output: { latitude: 51.5074, longitude: -0.1278, full_url: "...", source: "pattern1" }

// Example 2: Extract coordinates from a URL with q= pattern
const coords2 = extractCoordinates("https://www.google.com/maps?q=40.7128,-74.0060")
console.log(coords2)
// Output: { latitude: 40.7128, longitude: -74.0060, full_url: "...", source: "pattern3" }

// Example 3: Expand a short URL
const expandedUrl = await expandUrl("https://maps.app.goo.gl/abc123")
console.log(expandedUrl)
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

- Object containing:
  - `latitude`: The latitude coordinate
  - `longitude`: The longitude coordinate
  - `full_url`: The original URL
  - `source`: The pattern used to extract coordinates ("pattern1" to "pattern4")

## Examples

### Basic Address Search

```typescript
import { getAddressByQuery } from "geo-search-utils"

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
import { expandUrl, extractCoordinates } from "geo-search-utils"

async function processMapUrl() {
  try {
    // Extract coordinates from different URL patterns
    const urls = [
      "https://www.google.com/maps/@51.5074,-0.1278,15z",
      "https://www.google.com/maps/19.910945,+72.994643?",
      "https://www.google.com/maps?q=40.7128,-74.0060",
      "https://www.google.com/maps/place/London/@51.5074,-0.1278!3d51.5074!4d-0.1278"
    ]

    for (const url of urls) {
      const coords = extractCoordinates(url)
      console.log(`URL: ${url}`)
      console.log("Coordinates:", coords)
    }

    // Expand a short URL
    const shortUrl = "https://maps.app.goo.gl/abc123"
    const expandedUrl = await expandUrl(shortUrl)
    console.log("Expanded URL:", expandedUrl)
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
