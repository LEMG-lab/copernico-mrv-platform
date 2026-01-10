/**
 * Evalscripts para Sentinel Hub
 * Definición de algoritmos de procesamiento de imágenes
 */

export const EVALSCRIPTS = {
    trueColor: `//VERSION=3
function setup() { 
  return { 
    input: ["B04", "B03", "B02"], 
    output: { bands: 3 } 
  }; 
}

function evaluatePixel(s) { 
  // Multiplicador 2.5 para mejorar brillo
  return [s.B04 * 2.5, s.B03 * 2.5, s.B02 * 2.5]; 
}`,

    ndvi: `//VERSION=3
function setup() { 
  return { 
    input: ["B04", "B08"], 
    output: { bands: 1 } 
  }; 
}

function evaluatePixel(s) { 
  let val = (s.B08 - s.B04) / (s.B08 + s.B04);
  return [val]; 
}`,

    moisture: `//VERSION=3
function setup() { 
  return { 
    input: ["B8A", "B11"], 
    output: { bands: 1 } 
  }; 
}

function evaluatePixel(s) { 
  let val = (s.B8A - s.B11) / (s.B8A + s.B11);
  return [val]; 
}`
};

export type EvalScriptType = keyof typeof EVALSCRIPTS;
