# Google Maps URL DATA

A TypeScript utility to expand Google Maps short URLs and extract coordinates from various URL
patterns.

## Installation

```bash
npm install google-maps-long-url
```

## Usage

```typescript
import { getFullUrl } from "google-maps-long-url"

// Expand short URL and extract coordinates
const result = await getFullUrl("https://maps.app.goo.gl/EXAMPLE")

// Handle long URLs directly
const coordinateData = await getFullUrl("https://www.google.com/maps/@37.7749,-122.4194,12z")
```

## Features

- Supports 4 different URL patterns for coordinate extraction
- Automatic URL expansion for Google Maps short links
- Returns either coordinates object or original URL
- TypeScript definitions included

## API

### `getFullUrl(url: string): Promise<string | Coordinates | null>`

- Returns coordinates object when pattern matched
- Returns expanded URL when no coordinates found
- Returns null for invalid URLs or network errors

## Building

```bash
npm run build  # Outputs to /dist
```

## Testing

```bash
npm test  # Runs test/index.ts
```

## License

MIT © [@Abhii5496](https://github.com/Abhii5496)
