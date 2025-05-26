interface Coordinates {
    latitude: number;
    longitude: number;
    source: string;
}

declare function getFullUrl(shortUrl: string): Promise<string | Coordinates | null>;

export { getFullUrl };
