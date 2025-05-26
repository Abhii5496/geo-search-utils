"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  getUrlData: () => getUrlData
});
module.exports = __toCommonJS(index_exports);

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

// src/index.ts
async function getUrlData(shortUrl) {
  if (!shortUrl.trim()) {
    return "";
  }
  try {
    const response = await fetch(shortUrl, {
      method: "HEAD",
      redirect: "follow"
    });
    const expandedUrl = response.url;
    if (expandedUrl) {
      const coordinates = extractCoordinatesFromUrl(expandedUrl);
      return coordinates || expandedUrl;
    }
    return expandedUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUrlData
});
