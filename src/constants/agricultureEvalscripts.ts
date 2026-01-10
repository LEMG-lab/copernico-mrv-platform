// src/constants/agricultureEvalscripts.ts

export const AGRICULTURE_EVALSCRIPTS = {
    // NDVI clasico para vegetacion
    ndvi: `//VERSION=3
function setup() {
  return {
    input: ["B04", "B08", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);
  
  // Colormap: rojo (bajo) -> amarillo -> verde (alto)
  let r, g, b;
  if (ndvi < 0.2) { r = 0.8; g = 0.2; b = 0.2; }
  else if (ndvi < 0.4) { r = 0.9; g = 0.6; b = 0.2; }
  else if (ndvi < 0.6) { r = 0.7; g = 0.8; b = 0.3; }
  else { r = 0.2; g = 0.7; b = 0.3; }
  
  return [r, g, b, sample.dataMask];
}`,

    // LAI (Leaf Area Index) - biomasa
    lai: `//VERSION=3
function setup() {
  return {
    input: ["B03", "B04", "B05", "B06", "B07", "B8A", "B11", "B12"],
    output: { bands: 1 }
  };
}

function evaluatePixel(s) {
  // Aproximacion simplificada de LAI
  let ndvi = (s.B8A - s.B04) / (s.B8A + s.B04);
  let lai = 3.618 * ndvi - 0.118;
  return [Math.max(0, Math.min(lai, 6))];
}`,

    // NDWI (humedad en vegetacion)
    ndwi: `//VERSION=3
function setup() {
  return {
    input: ["B03", "B08"],
    output: { bands: 1 }
  };
}

function evaluatePixel(s) {
  return [(s.B03 - s.B08) / (s.B03 + s.B08)];
}`,

    // Moisture Index (humedad suelo)
    moisture: `//VERSION=3
function setup() {
  return {
    input: ["B8A", "B11"],
    output: { bands: 1 }
  };
}

function evaluatePixel(s) {
  return [(s.B8A - s.B11) / (s.B8A + s.B11)];
}`
};
