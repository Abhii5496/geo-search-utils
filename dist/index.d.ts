interface LangTypes {
    lang?: "en" | "hi" | "bn" | "ta" | "te" | "mr" | "gu" | "kn" | "ml" | "zh-CN" | "zh-TW" | "ja" | "ko" | "de" | "fr" | "es" | "it" | "pt" | "ru" | "pl" | "vi" | "id" | "th" | "tr" | "ar" | "uk" | "af" | "ms" | "my" | "fil" | "sw" | "xh" | "zu" | "cy" | "string";
}

declare function getUrlData(shortUrl: string, lang?: LangTypes): Promise<string | {
    latitude: number;
    longitude: number;
    sourceUrl: string;
    address: {
        locality: string;
        city: string;
        postcode: string;
        plusCode: string;
        district: string;
        state: string;
        stateCode: string;
        countryName: string;
        countryCode: string;
        lookupSource: string;
        localityLanguageRequested: string;
        continent: string;
        continentCode: string;
    };
} | {
    error: string;
} | null>;
declare const getAddressByQuery: (query: string) => Promise<unknown>;
declare const searchAddress: (query: string) => Promise<unknown>;

export { getAddressByQuery, getUrlData, searchAddress };
