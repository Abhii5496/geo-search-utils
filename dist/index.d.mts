interface Coordinates {
    latitude: number;
    longitude: number;
    source: string;
}

declare function getUrlData(shortUrl: string): Promise<string | Coordinates | null>;

export { getUrlData };
