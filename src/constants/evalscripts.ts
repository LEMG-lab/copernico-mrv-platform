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
}`,

  methane: `//VERSION=3
function setup() {
  return {
    input: ["CH4", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  // Rango típico de metano en ppb (~1600 fondo global)
  // Ajustamos visualización para resaltar anomalías > 1850 ppb
  let val = sample.CH4;
  let min = 1750;
  let max = 1950;
  
  if (val < min) return [0, 0, 0, 0]; // Transparente si es bajo

  // Normalizar
  let viz = (val - min) / (max - min);
  
  // Heatmap simple: Amarillo -> Rojo -> Violeta
  if (viz < 0.5) {
     // Amarillo (1,1,0) a Rojo (1,0,0)
     let t = viz * 2;
     return [1, 1 - t, 0, sample.dataMask];
  } else {
     // Rojo (1,0,0) a Violeta (0.5, 0, 0.5)
     let t = (viz - 0.5) * 2;
     return [1 - (t*0.5), 0, t*0.5, sample.dataMask];
  }
}`,
  methaneStats: `//VERSION=3
function setup() {
    return {
      input: ["CH4"],
      output: { bands: 1 }
    };
}

function evaluatePixel(sample) {
  return [sample.CH4];
} `
};

export type EvalScriptType = keyof typeof EVALSCRIPTS;
