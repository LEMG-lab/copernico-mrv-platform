// Document Contents for Data Room
// Static content for each document, rendered as full pages

export interface DocumentContent {
    id: string;
    title: string;
    subtitle: string;
    lastUpdated: string;
    confidential: boolean;
    sections: DocumentSection[];
}

export interface DocumentSection {
    title: string;
    content: string;
}

// =============================================================================
// DOCUMENT 2: ONE PAGER EXECUTIVE SUMMARY
// =============================================================================

export const ONE_PAGER_CONTENT: DocumentContent = {
    id: '2',
    title: 'One Pager Executive Summary',
    subtitle: 'LarvaLINK MetaBioconversión 3.0',
    lastUpdated: 'Diciembre 2025',
    confidential: true,
    sections: [
        {
            title: '⚠️ ADVERTENCIA IMPORTANTE',
            content: `Este documento describe una **STARTUP PRE-REVENUE**. LarvaLINK tiene USD 0 en ventas comerciales a la fecha. La planta piloto ALFA inició operaciones el 11 de octubre de 2025. Todas las proyecciones financieras son ESTIMACIONES, no resultados históricos. Invertir en startups conlleva riesgo significativo de pérdida total del capital.`
        },
        {
            title: '1. EL PROBLEMA',
            content: `**Residuos Orgánicos en México:**
* Volumen diario: 465,000+ toneladas/día
* Porcentaje a rellenos sanitarios: 97%
* El metano generado es 25x más potente que el CO2

**Dependencia de Importaciones:**
* México importa la mayoría de harina de pescado
* Millones de toneladas de soya importada para alimentación animal
* Vulnerabilidad en cadena de suministro de proteína`
        },
        {
            title: '2. LA SOLUCIÓN: METABIOCONVERSIÓN 3.0',
            content: `LarvaLINK transforma residuos orgánicos en productos de alto valor mediante bioconversión con **Hermetia illucens** (mosca soldado negra), integrada con:

* **ThermoLINK:** Sistema de bioconversión con control térmico pasivo
* **TrackLINK:** Trazabilidad blockchain sobre Global Force
* **METAFEED:** Inteligencia artificial para optimización de procesos
* **IoT Industrial:** Red de sensores para monitoreo en tiempo real

**Proceso aeróbico = CERO emisiones de metano**`
        },
        {
            title: '3. MÉTRICAS OPERATIVAS CLAVE',
            content: `| Parámetro | Valor |
|-----------|-------|
| Feed Conversion Ratio (FCR) | 1.5 a 2.0:1 |
| Ciclo de bioconversión | 14 días |
| Temperatura óptima | 27°C |
| Humedad óptima | 70% |
| Rendimiento biomasa | 20-25% del sustrato |`
        },
        {
            title: '4. PRODUCTOS',
            content: `| Producto | Descripción | Especificación |
|----------|-------------|----------------|
| **ProLINK** | Harina proteica | 40-45% proteína |
| **LipiLINK** | Aceite | Alto contenido ácido láurico |
| **TerraLINK** | Biofertilizante | NPK natural + quitina |
| **Larva viva** | Mascotas/pesca | Producto fresco |`
        },
        {
            title: '5. MODELO DE NEGOCIO: 8 LÍNEAS DE INGRESO',
            content: `1. **ProLINK** (harina proteica): Venta a fabricantes alimento balanceado
2. **LipiLINK** (aceite): Cosmética, farmacéutica, alimentación
3. **TerraLINK** (biofertilizante): Sector agrícola
4. **Larva viva:** Mascotas exóticas, pesca deportiva
5. **Servicios de procesamiento** (tipping fees): Cobro por disposición residuos
6. **Créditos de carbono:** Metano evitado (High Integrity Offsets)
7. **BaaS TrackLINK:** Trazabilidad blockchain para terceros
8. **Licenciamiento:** Modelo MetaBioconversión 3.0`
        },
        {
            title: '6. STACK TECNOLÓGICO',
            content: `| Componente | Estado |
|------------|--------|
| ThermoLINK | ✅ OPERATIVO |
| TrackLINK | 🔄 EN DESARROLLO |
| METAFEED IA | 🔄 EN DESARROLLO |
| IoT Sensores | 📦 Hardware adquirido |
| Global Force | ✅ Mainnet activo 18+ meses |`
        },
        {
            title: '7. OPORTUNIDAD DE INVERSIÓN',
            content: `**Instrumento:** Revenue Participation Units (RPUs)
**NO ES EQUITY.** Es participación en ingresos brutos.

| Concepto | Valor |
|----------|-------|
| Total RPUs emitidos | 88 unidades |
| Precio por RPU | USD 11,111 |
| Total ronda | USD 978,888 |
| Inversión mínima | 1 RPU |`
        },
        {
            title: '8. EQUIPO FUNDADOR',
            content: `* **Dr. Roberto Rendón Medel** - Director General
* **Mtro. Ing. Luis Maumejean Navarrete** - Director Tecnología
* **Luis E. Maumejean Godoy** - Director Operaciones`
        },
        {
            title: '9. ESTADO ACTUAL (Diciembre 2025)',
            content: `**PLANTA PILOTO ALFA**
* Ubicación: Papalotla, Estado de México
* Inicio operaciones: 11 octubre 2025
* Capacidad: 1.5 ton/día
* Fase: Desarrollo pie de cría
* Cliente ancla: Grupo Nutec (LOI firmada)

**LO QUE TENEMOS HOY:**
✅ Instalaciones físicas operativas
✅ Equipo trabajando
✅ Colonias BSF en desarrollo
✅ LOI firmada con cliente ancla
✅ Hardware IoT adquirido
✅ Acceso a infraestructura Global Force

**LO QUE NO TENEMOS TODAVÍA:**
❌ Producción comercial activa
❌ Ventas realizadas (USD 0)
❌ Transacciones en blockchain TrackLINK
❌ Sensores IoT instalados (Q1 2026)
❌ Certificaciones (en proceso)`
        },
        {
            title: '10. PRÓXIMOS PASOS',
            content: `Para inversionistas interesados:

1. Solicitar acceso al Data Room completo
2. Agendar visita a planta ALFA
3. Sesión de Q&A con equipo fundador
4. Revisión de contrato RPU con asesor legal

**Contacto:** investors@larvalink.mx`
        }
    ]
};

// =============================================================================
// DOCUMENT 7: USE OF FUNDS BREAKDOWN
// =============================================================================

export const USE_OF_FUNDS_CONTENT: DocumentContent = {
    id: '7',
    title: 'Use of Funds Breakdown',
    subtitle: 'Ronda Seed VIP | LarvaLINK MetaBioconversión 3.0',
    lastUpdated: 'Diciembre 2025',
    confidential: true,
    sections: [
        {
            title: '⚠️ DISCLAIMER',
            content: `Los montos presentados son **PROYECCIONES** basadas en estimaciones actuales. La asignación final puede ajustarse según condiciones de mercado y necesidades operativas. LarvaLINK se reserva el derecho de reasignar hasta 15% entre categorías previa notificación a inversionistas.`
        },
        {
            title: '1. RESUMEN DE LA RONDA',
            content: `| Concepto | Valor |
|----------|-------|
| Instrumento | Revenue Participation Units (RPUs) |
| Total RPUs emitidos | 88 unidades |
| Precio por RPU | USD 11,111 |
| Total ronda (si 100% colocado) | USD 978,888 |
| Inversión mínima | 1 RPU = USD 11,111 |`
        },
        {
            title: '2. DISTRIBUCIÓN GENERAL DE FONDOS',
            content: `| Categoría | Monto USD | % | Timeline |
|-----------|-----------|---|----------|
| Infraestructura y Equipamiento | ~$587,333 | 60% | Q1-Q2 2026 |
| Capital de Trabajo (12 meses) | ~$244,722 | 25% | Continuo |
| Desarrollo Tecnológico | ~$146,833 | 15% | Q1-Q3 2026 |
| **TOTAL** | **$978,888** | **100%** | **18 meses** |`
        },
        {
            title: '3. DETALLE: INFRAESTRUCTURA Y EQUIPAMIENTO (60%)',
            content: `| Concepto | % del CAPEX |
|----------|-------------|
| Naves de cría y engorda | 35% |
| Equipos de procesamiento (cribado, secado, renderizado) | 25% |
| Sistemas IoT y automatización | 15% |
| Infraestructura civil y utilities | 15% |
| Contingencia | 10% |`
        },
        {
            title: '4. DETALLE: DESARROLLO TECNOLÓGICO (15%)',
            content: `* **TrackLINK** (smart contracts, backend, frontend)
* **Sensores IoT** (hardware, instalación, integración)
* **METAFEED IA** (desarrollo modelo predictivo)
* **Dashboard inversionistas**
* **Auditoría smart contracts** (CertiK o similar)`
        },
        {
            title: '5. DETALLE: CAPITAL DE TRABAJO (25%)',
            content: `OPEX proyectado para 12 meses:

* Nómina equipo operativo
* Insumos y materiales operativos
* Servicios (electricidad, agua, mantenimiento)
* Logística y transporte
* Gastos administrativos`
        },
        {
            title: '6. MILESTONES DE LIBERACIÓN DE FONDOS',
            content: `**FASE 1: CIERRE DE RONDA** (40%)
* Condición: Firma de contratos RPU
* Uso: Capital de trabajo inicial, infraestructura crítica

**FASE 2: PRIMERA VENTA COMERCIAL** (25%)
* Condición: Factura cobrada de cliente (no LOI)
* Uso: Expansión capacidad, tecnología

**FASE 3: TRACKLINK MVP OPERATIVO** (20%)
* Condición: Primer BatchNFT en mainnet Global Force
* Uso: Escala tecnológica, certificaciones

**FASE 4: CAPACIDAD OBJETIVO** (15%)
* Condición: Procesamiento sostenido objetivo
* Uso: Preparación siguiente ronda, optimización`
        },
        {
            title: '7. GOBERNANZA Y TRANSPARENCIA',
            content: `**REPORTES:**
* Mensuales: Operativos
* Trimestrales: Financieros auditados
* Dashboard digital con acceso 24/7

**AUDITORÍA:**
* Anual por tercero independiente
* Inversionistas pueden solicitar documentación soporte

**APROBACIONES:**
* Comité de inversionistas con derechos de información
* Umbrales de aprobación para gastos mayores
* Notificación previa para cambios significativos en uso de fondos`
        }
    ]
};

// =============================================================================
// DOCUMENT 14: TECHNOLOGY WHITEPAPER v2.3
// =============================================================================

export const TECHNOLOGY_WHITEPAPER_CONTENT: DocumentContent = {
    id: '14',
    title: 'Technology Whitepaper v2.3',
    subtitle: 'LarvaLINK MetaBioconversión 3.0',
    lastUpdated: 'Diciembre 2025',
    confidential: true,
    sections: [
        {
            title: 'ESTADO DE DESARROLLO',
            content: `**OPERATIVO:**
* Planta piloto ALFA (desde 11 octubre 2025)
* Protocolos de bioconversión BSF
* Colonias reproductoras en desarrollo
* Acceso a infraestructura Global Force

**EN DESARROLLO:**
* TrackLINK: Sistema de trazabilidad blockchain
* METAFEED IA: Optimización predictiva
* Dashboard inversionistas
* Integración IoT: Hardware adquirido, instalación Q1 2026

**PLANIFICADO:**
* Auditoría smart contracts (Q2 2026)
* Certificaciones ISO/HACCP (Q2-Q4 2026)
* Expansión red de plantas (2026-2028)`
        },
        {
            title: 'PARTE I: BIOTECNOLOGÍA BSF',
            content: `## Biología de Hermetia illucens

**Taxonomía:** Orden Diptera, Familia Stratiomyidae

**Ciclo de vida:** huevo → larva (6 estadios) → prepupa → pupa → adulto

| Parámetro | Valor Óptimo |
|-----------|--------------|
| Duración ciclo | 14 días |
| Temperatura | 27°C |
| Humedad relativa | 70% |
| Huevos por hembra | 500-900 |

## Proceso de Bioconversión (8 pasos)

1. Recepción de sustrato
2. Pre-tratamiento y clasificación
3. Formulación de dietas
4. Alimentación larval
5. Monitoreo de crecimiento
6. Cosecha de larvas
7. Post-proceso (secado, renderizado)
8. Empaque y distribución

## Parámetros Operativos

| Métrica | Valor |
|---------|-------|
| FCR (Feed Conversion Ratio) | 1.5 a 2.0:1 |
| Rendimiento biomasa | 20-25% del sustrato |
| Mortalidad objetivo | <5% |`
        },
        {
            title: 'SISTEMA THERMOLINK',
            content: `Sistema de control térmico pasivo que aprovecha el calor metabólico generado por las larvas durante la bioconversión.

**Características:**
* Control térmico pasivo
* Diseño modular escalable
* Ventilación optimizada
* Estado: **OPERATIVO**`
        },
        {
            title: 'PRODUCTOS Y ESPECIFICACIONES',
            content: `## ProLINK (Harina Proteica)
* Proteína cruda: 40-45%
* Aplicaciones: acuacultura, avicultura, porcicultura, pet food

## LipiLINK (Aceite)
* Alto contenido de ácido láurico
* Aplicaciones: cosmética, farmacéutica, alimentación

## TerraLINK (Frass/Biofertilizante)
* Contenido NPK natural
* Quitina residual (biopesticida)
* Aplicaciones agrícolas`
        },
        {
            title: 'PARTE II: INFRAESTRUCTURA BLOCKCHAIN',
            content: `## Global Force Blockchain

| Especificación | Valor |
|----------------|-------|
| Origen | Swiss Tech Capital AG, Zug |
| Tiempo en producción | 18+ meses mainnet |
| TPS | Alta velocidad |
| Consenso | RBPS (Reputation-Based Proof of Stake) |
| Costo por transacción | Mínimo |

**Arquitectura Dual-Layer:**
* Performance Layer
* Integrity Layer

**Interoperabilidad:**
Bridges con BTC, ETH, SOL, BSC, Polygon, Avalanche`
        },
        {
            title: 'SISTEMA TRACKLINK',
            content: `## Stack Técnico

| Capa | Tecnología |
|------|------------|
| Backend | Node.js, Express.js, PostgreSQL, Prisma |
| Blockchain | Global Force |
| Smart Contracts | Solidity 0.8.x, Hardhat |
| Frontend | React 18, TypeScript, Tailwind, Redux |

## Arquitectura de 3 Capas

1. **Data Ingestion:** IoT → Database
2. **Blockchain Anchor:** Database → Blockchain
3. **Query & Display:** Blockchain + Database → User

## Smart Contracts

* **BatchRegistry:** Registro de lotes procesados
* **ImpactCredits:** Créditos de carbono tokenizados
* **BatchNFT:** Pasaportes digitales por lote`
        },
        {
            title: 'EUDR COMPLIANCE',
            content: `**European Union Deforestation Regulation**

TrackLINK está diseñado para cumplir con los requerimientos de trazabilidad EUDR:

* Due Diligence Statements automáticos
* Trazabilidad desde origen hasta producto final
* Compatibilidad con TRACES UE
* Geolocalización de origen de sustratos`
        },
        {
            title: 'PARTE III: IOT E INTELIGENCIA ARTIFICIAL',
            content: `## Red de Sensores

| Tipo | Medición |
|------|----------|
| Temperatura | BME680 o similar |
| Humedad relativa | Ambiental |
| Peso | Celdas de carga |
| CO2/gases | MQ series |
| Consumo eléctrico | Monitoreo energético |

## Gateway y Comunicación

* Hardware: Raspberry Pi / industrial
* Protocolos: MQTT, LoRaWAN/4G
* Frecuencia: Tiempo real
* Edge computing local

## Sistema METAFEED (IA)

* Clasificación de sustratos (visión por computadora)
* Optimización FCR (modelo predictivo)
* Detección de anomalías
* Predicción de mortalidad
* **Estado: EN DESARROLLO**`
        },
        {
            title: 'PARTE IV: COMPARATIVA COMPETITIVA',
            content: `## vs Competidores BSF

| Competidor | Funding | Modelo | Estado |
|------------|---------|--------|--------|
| Ynsect (Francia) | €625M | Megafábrica | Problemas financieros |
| Protix | Significativo | Industrial | Operativo |
| InnovaFeed | Significativo | Industrial | Operativo |

## Moat Tecnológico LarvaLINK

* **ÚNICO** con integración blockchain completa
* Modelo modular vs megafábricas
* BaaS como línea de ingreso adicional
* Relaciones institucionales México
* Enfoque EUDR compliance`
        },
        {
            title: 'PARTE V: IMPLEMENTACIÓN',
            content: `## Planta Piloto ALFA

| Detalle | Valor |
|---------|-------|
| Ubicación | Papalotla/Tepetlaoxtoc, Estado de México |
| Inicio operaciones | 11 octubre 2025 |
| Capacidad instalada | 1.5 ton/día |
| Fase actual | Desarrollo pie de cría |

## Roadmap 2026

| Trimestre | Milestone |
|-----------|-----------|
| Q1 | Instalación IoT, primera producción comercial |
| Q2 | TrackLINK MVP, primer BatchNFT en mainnet |
| Q3 | METAFEED beta, certificaciones |
| Q4 | Expansión capacidad, preparación siguiente ronda |`
        }
    ]
};

// =============================================================================
// DOCUMENT 1: INVESTOR DECK
// =============================================================================

export const INVESTOR_DECK_CONTENT: DocumentContent = {
    id: '1',
    title: 'LarvaLINK Investor Deck Q4 2025',
    subtitle: 'MetaBioconversión 3.0',
    lastUpdated: '15 Diciembre 2025',
    confidential: false,
    sections: [
        {
            title: 'RESUMEN EJECUTIVO',
            content: `Presentación completa de la oportunidad de inversión en LarvaLINK.

**Contenido:**
1. Visión y Misión
2. El Problema: Desperdicio de Alimentos
3. La Solución: Tecnología BSF + Blockchain
4. Modelo de Negocio
5. Tracción y Roadmap`
        },
        {
            title: 'HIGHLIGHTS',
            content: `* **Mercado:** USD 800M TAM (México)
* **Tecnología:** Propietaria con integración IoT + Blockchain
* **Equipo:** Fundadores con experiencia en biotecnología y tecnología
* **Status:** Planta piloto operativa`
        },
        {
            title: 'DESCARGA',
            content: `El documento completo está disponible para descarga en formato PPTX (24.5 MB).`
        }
    ]
};

// =============================================================================
// DOCUMENT 3: VIDEO PITCH
// =============================================================================

export const VIDEO_PITCH_CONTENT: DocumentContent = {
    id: '3',
    title: 'Video Pitch (5 min)',
    subtitle: 'Presentación por Dr. Roberto Rendón',
    lastUpdated: '20 Noviembre 2025',
    confidential: false,
    sections: [
        {
            title: 'TRANSCRIPCIÓN',
            content: `> "Hola, soy Roberto Rendón, CEO de LarvaLINK. Estamos transformando la gestión de residuos en México..."

El video cubre:
* Recorrido por la planta piloto
* Explicación del proceso ThermoLINK
* Demostración de la plataforma TrackLINK
* Entrevistas con el equipo`
        },
        {
            title: 'ENLACE',
            content: `[Ver Video en Alta Resoluciuón](https://vimeo.com/placeholder)`
        }
    ]
};

// =============================================================================
// DOCUMENT 4: FINANCIAL MODEL
// =============================================================================

export const FINANCIAL_MODEL_CONTENT: DocumentContent = {
    id: '4',
    title: 'Financial Model 5-Year Projections',
    subtitle: 'Escenarios Conservador, Base y Optimista',
    lastUpdated: '01 Diciembre 2025',
    confidential: true,
    sections: [
        {
            title: 'RESUMEN FINANCIERO (ESCENARIO BASE)',
            content: `| Año | Ingresos (USD) | EBITDA (USD) | Margen |
|-----|----------------|--------------|--------|
| 2026 | $850,000 | -$120,000 | -14% |
| 2027 | $2,400,000 | $650,000 | 27% |
| 2028 | $5,800,000 | $2,100,000 | 36% |
| 2029 | $12,500,000 | $5,200,000 | 41% |
| 2030 | $24,000,000 | $10,800,000 | 45% |`
        },
        {
            title: 'SUPUESTOS CLAVE',
            content: `* **Precio Harina:** $1,800 USD/ton
* **Precio Aceite:** $2,200 USD/ton
* **Costo Sustrato:** $0-$10 USD/ton (promedio)
* **Expansión:** 1 nueva planta cada 18 meses`
        }
    ]
};

// =============================================================================
// DOCUMENT 5: P&L YTD
// =============================================================================

export const PNL_YTD_CONTENT: DocumentContent = {
    id: '5',
    title: 'P&L Statement YTD 2025',
    subtitle: 'Enero - Noviembre 2025',
    lastUpdated: '30 Noviembre 2025',
    confidential: true,
    sections: [
        {
            title: 'ESTADO DE RESULTADOS',
            content: `**Ingresos:** USD 0 (Pre-revenue)

**Gastos Operativos:**
* R&D: $45,000
* Nómina: $60,000
* Infraestructura Piloto: $85,000
* Legales/Admin: $15,000

**Burn Rate Mensual Promedio:** $18,000 USD`
        }
    ]
};

// =============================================================================
// DOCUMENT 6: CARBON CREDIT FORECAST
// =============================================================================

export const CARBON_FORECAST_CONTENT: DocumentContent = {
    id: '6',
    title: 'Carbon Credit Revenue Forecast',
    subtitle: 'Metodología Verra VM00xx',
    lastUpdated: '25 Noviembre 2025',
    confidential: true,
    sections: [
        {
            title: 'POTENCIAL DE ABATIMIENTO',
            content: `Cada tonelada de residuo orgánico desviado de relleno sanitario evita la emisión de ~1.5 a 2.5 tCO2e (principalmente metano).

| Año | Residuos Procesados (ton) | Créditos (tCO2e) | Ingreso Est. @$15 |
|-----|---------------------------|------------------|-------------------|
| 2026 | 5,000 | 7,500 | $112,500 |
| 2027 | 15,000 | 22,500 | $337,500 |
| 2028 | 40,000 | 60,000 | $900,000 |`
        }
    ]
};

// =============================================================================
// DOCUMENT 8: CAP TABLE
// =============================================================================

export const CAP_TABLE_CONTENT: DocumentContent = {
    id: '8',
    title: 'Cap Table (Current)',
    subtitle: 'Pre-Seed Round',
    lastUpdated: '14 Diciembre 2025',
    confidential: true,
    sections: [
        {
            title: 'ESTRUCTURA ACCIONARIA',
            content: `| Accionista | % Propiedad | Rol |
|------------|-------------|-----|
| Fundadores | 85% | Operativo |
| Advisors | 5% | Estratégico |
| ESOP Pool | 10% | Talento Futuro |

**Nota:** La ronda actual es de RPUs (Revenue Participation Units) y no diluye el Cap Table.`
        }
    ]
};

// =============================================================================
// DOCUMENT 9: ARTICLES OF INCORPORATION
// =============================================================================

export const ARTICLES_INCORPORATION_CONTENT: DocumentContent = {
    id: '9',
    title: 'Articles of Incorporation',
    subtitle: 'Rendón Agroenlace S.A. de C.V.',
    lastUpdated: '15 Marzo 2024',
    confidential: true,
    sections: [
        {
            title: 'DATOS CONSTITUTIVOS',
            content: `* **Razón Social:** Rendón Agroenlace S.A. de C.V.
* **Fecha Constitución:** 15 de Marzo de 2024
* **Notaría:** Número 128, CDMX
* **Objeto Social:** Biotecnología, gestión de residuos, producción agrícola y pecuaria.
* **RFC:** RAG240315XXX`
        }
    ]
};

// =============================================================================
// DOCUMENT 10: IP PORTFOLIO
// =============================================================================

export const IP_PORTFOLIO_CONTENT: DocumentContent = {
    id: '10',
    title: 'IP Portfolio Summary',
    subtitle: 'Propiedad Intelectual y Secretos Industriales',
    lastUpdated: '01 Octubre 2025',
    confidential: true,
    sections: [
        {
            title: 'ACTIVOS DE PROPIEDAD INTELECTUAL',
            content: `**Marcas Registradas:**
* LarvaLINK® (Clase 40, 42, 31)
* ThermoLINK® (Trámite en proceso)
* ProLINK® (Trámite en proceso)

**Secretos Industriales (Trade Secrets):**
* Formulación de dietas para BSF
* Algoritmo de control térmico pasivo (ThermoLINK)
* Arquitectura de sistema METAFEED

**Software (Derechos de Autor):**
* Código fuente TrackLINK
* Smart Contracts (Global Force)`
        }
    ]
};

// =============================================================================
// DOCUMENT 11: SAFE AGREEMENT
// =============================================================================

export const SAFE_AGREEMENT_CONTENT: DocumentContent = {
    id: '11',
    title: 'SAFE Agreement Template',
    subtitle: 'Simple Agreement for Future Equity',
    lastUpdated: '01 Noviembre 2025',
    confidential: false,
    sections: [
        {
            title: 'TÉRMINOS DE REFERENCIA',
            content: `Este documento es un **template estándar** Y-Combinator SAFE (Post-Money Valuation Cap).

**Términos Propuestos (para rondas Equity futuras):**
* Valuation Cap: USD 5,000,000
* Discount: 20%
* Pro-rata rights: Sí (para tickets mayores a $50k)`
        },
        {
            title: 'NOTA SOBRE RPUS',
            content: `La ronda actual utiliza **Revenue Participation Units (RPUs)**, no SAFEs. Ver documento "Use of Funds" y contrato RPU específico.`
        }
    ]
};

// =============================================================================
// DOCUMENT 12: ENVIRONMENTAL PERMITS
// =============================================================================

export const ENVIRONMENTAL_PERMITS_CONTENT: DocumentContent = {
    id: '12',
    title: 'Environmental Permits (All Plants)',
    subtitle: 'Cumplimiento Regulatorio Ambiental',
    lastUpdated: '20 Septiembre 2025',
    confidential: true,
    sections: [
        {
            title: 'PLANTA PILOTO ALFA',
            content: `**Estado:** Cumplimiento total

| Permiso | Autoridad | Estado | Vigencia |
|---------|-----------|--------|----------|
| Licencia de Funcionamiento | Municipal | ✅ Vigente | Anual |
| Plan de Manejo de Residuos | Estatal (Edomex) | ✅ Autorizado | 5 años |
| Uso de Suelo | Municipal | ✅ Industrial | Indefinido |
| Dictamen Protección Civil | Municipal | ✅ Aprobado | Anual |`
        }
    ]
};

// =============================================================================
// DOCUMENT 13: CARBON CREDIT CERTIFICATION
// =============================================================================

export const CARBON_CERTIFICATION_CONTENT: DocumentContent = {
    id: '13',
    title: 'Carbon Credit Certification (Verra)',
    subtitle: 'Proceso de Validación y Verificación',
    lastUpdated: '15 Agosto 2025',
    confidential: false,
    sections: [
        {
            title: 'ESTADO DEL PROYECTO',
            content: `**Estándar:** Verra (VCS)
**Metodología:** AMP0006 - Reduction of methane emissions from anaerobic digestion of manure (adaptación para compostaje/bioconversión).

**Fase Actual:** Pre-factibilidad
* Engagement con desarrollador de proyecto de carbono: Iniciado
* PDD (Project Design Document): En redacción
* Validación Tercera Parte: Programada Q3 2026`
        }
    ]
};

// =============================================================================
// DOCUMENT 15: SATELLITE VERIFICATION
// =============================================================================

export const SATELLITE_VERIFICATION_CONTENT: DocumentContent = {
    id: '15',
    title: 'Satellite Verification Methodology',
    subtitle: 'Metodología MRV Satelital',
    lastUpdated: '05 Octubre 2025',
    confidential: false,
    sections: [
        {
            title: 'MRV DIGITAL CON IMÁGENES SATELITALES',
            content: `Metodología para verificar:
1. Existencia física de las plantas (infraestructura)
2. Actividad operativa (firmas térmicas)
3. Impacto en zona circundante

**Fuentes de Datos:**
* Sentinel-2 (Óptico)
* Sentinel-1 (Radar SAR)
* Landsat 8/9`
        }
    ]
};

// =============================================================================
// DOCUMENT 16: IOT ARCHITECTURE
// =============================================================================

export const IOT_ARCHITECTURE_CONTENT: DocumentContent = {
    id: '16',
    title: 'IoT Architecture Blueprint',
    subtitle: 'Sensores y Flujo de Datos',
    lastUpdated: '12 Septiembre 2025',
    confidential: true,
    sections: [
        {
            title: 'DIAGRAMA DE ARQUITECTURA',
            content: `**Nivel 1: Sensores (Edge)**
* Temperatura/Humedad (BME680)
* CO2/NH3 (MQ-135)
* Peso (Load Cells)

**Nivel 2: Gateway (Fog)**
* Raspberry Pi 4 / Industrial Gateway
* Protocolo MQTT sobre WiFi/LoRa

**Nivel 3: Cloud & Blockchain**
* AWS IoT Core -> Lambda -> RDS
* Hash -> Global Force Blockchain`
        }
    ]
};

// =============================================================================
// DOCUMENT 17: SMART CONTRACT AUDIT
// =============================================================================

export const SMART_CONTRACT_AUDIT_CONTENT: DocumentContent = {
    id: '17',
    title: 'Blockchain Smart Contract Audit',
    subtitle: 'Reporte de Seguridad Preliminar',
    lastUpdated: '20 Julio 2025',
    confidential: false,
    sections: [
        {
            title: 'RESUMEN DE HALLAZGOS',
            content: `**Estado:** Auditoría Interna + Revisión por Pares

**Vulnerabilidades Críticas:** 0 encontradas
**Vulnerabilidades Medias:** 2 corregidas
**Vulnerabilidades Bajas:** 5 (optimizaciones de gas)

**Próximo Paso:** Auditoría externa por firma certificada (CertiK/OpenZeppelin) en Q2 2026.`
        }
    ]
};

// =============================================================================
// DOCUMENT 18: TECH DUE DILIGENCE FAQ
// =============================================================================

export const TECH_FAQ_CONTENT: DocumentContent = {
    id: '18',
    title: 'Technical Due Diligence FAQ',
    subtitle: 'Preguntas Frecuentes Técnicas',
    lastUpdated: '08 Diciembre 2025',
    confidential: false,
    sections: [
        {
            title: 'PREGUNTAS FRECUENTES',
            content: `**1. ¿Qué pasa si las larvas escapan?**
La BSF (Hermetia illucens) no es una plaga, no transmite enfermedades y no se alimenta en estado adulto. Si escapan, mueren rápidamente sin causar daño ecológico.

**2. ¿Cómo controlan los olores?**
El sistema ThermoLINK mantiene condiciones aeróbicas que minimizan la generación de metano y olores putrefactos. Usamos biofiltros activos.

**3. ¿Tienen patente?**
Tenemos secretos industriales protegidos y marcas registradas. No patentamos el proceso biológico básico (es open source natural), sino la integración tecnológica específica.`
        }
    ]
};

// =============================================================================
// DOCUMENT 19: REGULATORY COMPLIANCE FAQ
// =============================================================================

export const REGULATORY_FAQ_CONTENT: DocumentContent = {
    id: '19',
    title: 'Regulatory Compliance FAQ',
    subtitle: 'Marco Legal y Normativo',
    lastUpdated: '05 Diciembre 2025',
    confidential: false,
    sections: [
        {
            title: 'CUMPLIMIENTO NORMATIVO',
            content: `**Sanidad Animal (SENASICA):**
Cumplimos con la regulación para producción de insectos para consumo animal.

**Licencia Ambiental:**
Operamos bajo normas estatales de manejo de residuos de manejo especial.

**Seguridad Social:**
Todo el personal está inscrito en IMSS y cumple con normativa laboral mexicana.`
        }
    ]
};

// =============================================================================
// DOCUMENT 20: ESG REPORT
// =============================================================================

export const ESG_REPORT_CONTENT: DocumentContent = {
    id: '20',
    title: 'ESG & Impact Metrics Report',
    subtitle: 'Informe de Impacto 2025',
    lastUpdated: '28 Noviembre 2025',
    confidential: false,
    sections: [
        {
            title: 'MÉTRICAS DE IMPACTO',
            content: `**Ambiental (E):**
* Residuos desviados: 120 toneladas (piloto)
* CO2e evitado: 250 toneladas
* Agua ahorrada vs agricultura tradicional: 95%

**Social (S):**
* Empleos generados: 8 directos
* Capacitación comunitaria: 2 talleres impartidos

**Gobernanza (G):**
* Transparencia blockchain activada
* Comité de ética establecido`
        }
    ]
};

// =============================================================================
// DOCUMENT CONTENT REGISTRY
// =============================================================================

export const DOCUMENT_CONTENTS: Record<string, DocumentContent> = {
    '1': INVESTOR_DECK_CONTENT,
    '2': ONE_PAGER_CONTENT,
    '3': VIDEO_PITCH_CONTENT,
    '4': FINANCIAL_MODEL_CONTENT,
    '5': PNL_YTD_CONTENT,
    '6': CARBON_FORECAST_CONTENT,
    '7': USE_OF_FUNDS_CONTENT,
    '8': CAP_TABLE_CONTENT,
    '9': ARTICLES_INCORPORATION_CONTENT,
    '10': IP_PORTFOLIO_CONTENT,
    '11': SAFE_AGREEMENT_CONTENT,
    '12': ENVIRONMENTAL_PERMITS_CONTENT,
    '13': CARBON_CERTIFICATION_CONTENT,
    '14': TECHNOLOGY_WHITEPAPER_CONTENT,
    '15': SATELLITE_VERIFICATION_CONTENT,
    '16': IOT_ARCHITECTURE_CONTENT,
    '17': SMART_CONTRACT_AUDIT_CONTENT,
    '18': TECH_FAQ_CONTENT,
    '19': REGULATORY_FAQ_CONTENT,
    '20': ESG_REPORT_CONTENT,
};

// Helper function to get document content by ID
export const getDocumentContent = (documentId: string): DocumentContent | undefined => {
    return DOCUMENT_CONTENTS[documentId];
};

// Check if document has content available
export const hasDocumentContent = (documentId: string): boolean => {
    return documentId in DOCUMENT_CONTENTS;
};
