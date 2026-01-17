export const translations = {
    es: {
        heroTitle: "MetaBioconversión 3.0",
        heroSubtitle: "Transformando residuos en valor regenerativo y activos digitales verificables.",
        executiveSummary: "Resumen Ejecutivo para Inversionistas",
        summaryText: "LarvaLINK escala la bioconversión de residuos orgánicos utilizando tecnología de insectos (Hermetia illucens) para producir proteína sostenible y fertilizantes de alta potencia, mientras genera créditos de carbono verificables mediante monitoreo satelital y blockchain.",
        stats: {
            plants: "Plantas Activas",
            processed: "Residuos Procesados (Tons)",
            avoided: "CO2eq Evitado (Tons)",
            ndvi: "Mejora NDVI (Suelo)"
        },
        modules: {
            terralink: {
                title: "Impacto TerraLINK",
                desc: "Verificación científica de regeneración de suelos usando Copernicus Sentinel-2.",
                action: "Ver Análisis Espectral"
            },
            emissions: {
                title: "Calculadora Emisiones",
                desc: "Cuantificación de metano evitado según metodología IPCC 2019 + GWP20.",
                action: "Calcular Reducción"
            },
            network: {
                title: "Red Global BSF",
                desc: "Mapa interactivo de operaciones y detección de oportunidades con Sentinel-5P.",
                action: "Explorar Mapa"
            },
            marketplace: {
                title: "Mercado de Créditos",
                desc: "Plataforma de comercio de activos verificados (Carbon, Circular, Bio) con blockchain.",
                action: "Ir al Marketplace"
            },
            plantOnboarding: {
                title: "Registro de Plantas",
                desc: "Únete a la red global LarvaLINK, verifica tu impacto y vende créditos.",
                action: "Iniciar Onboarding",
                wizard: {
                    steps: {
                        basic: "Info Básica",
                        location: "Ubicación",
                        operations: "Operaciones",
                        sensors: "Sensores",
                        verification: "Verificación",
                        plan: "Plan"
                    },
                    common: {
                        next: "Siguiente",
                        prev: "Anterior",
                        save: "Guardado",
                        contactSupport: "Contactar soporte",
                        faq: "Ver preguntas frecuentes",
                        help: "¿Necesitas ayuda?"
                    },
                    step1: {
                        title: "Información de la Empresa",
                        corpData: "Datos Corporativos",
                        companyName: "Nombre de la Empresa",
                        plantName: "Nombre de la Planta",
                        plantNameDesc: "Si tienes múltiples plantas, registra cada una por separado.",
                        taxId: "RFC / Tax ID",
                        founded: "Año Fundación",
                        website: "Sitio Web (Opcional)",
                        contactData: "Contacto Principal",
                        contactName: "Nombre Completo",
                        contactRole: "Cargo / Rol",
                        contactEmail: "Email",
                        contactPhone: "Teléfono",
                        roles: {
                            owner: "Dueño / Fundador",
                            manager: "Gerente de Planta",
                            ops: "Director de Operaciones",
                            admin: "Administrador"
                        },
                        placeholders: {
                            companyName: "Ej. BioCycle Solutions S.A.",
                            plantName: "Ej. Planta Norte - QRO",
                            selectRole: "Selecciona..."
                        },
                        validation: "Por favor completa los campos obligatorios (*)"
                    },
                    step2: {
                        title: "Ubicación de la Planta",
                        subtitle: "Necesitamos la ubicación exacta para la verificación satelital.",
                        pinpoint: "Pinpoint Exacto",
                        satelliteNote: "Usaremos estas coordenadas para obtener imágenes satelitales históricas de Sentinel-2 y verificar la existencia de la infraestructura.",
                        address: "Dirección Calle y Número",
                        city: "Ciudad",
                        state: "Estado / Provincia",
                        zip: "Código Postal",
                        country: "País",
                        placeholders: {
                            address: "Ej. Carretera Federal 45 Km 10"
                        },
                        validation: "Por favor completa la dirección y ubicación en el mapa."
                    },
                    step3: {
                        title: "Datos de Operación",
                        capacity: "Capacidad de Procesamiento",
                        utilization: "Utilización Actual",
                        operatingSince: "Operando desde",
                        wasteTypes: "Tipos de Residuo (Insumos)",
                        products: "Productos Generados",
                        validation: "Por favor completa la capacidad y selecciona al menos un residuo y un producto."
                    },
                    step4: {
                        title: "Configuración IoT",
                        question: "¿Tu planta tiene sensores IoT instalados?",
                        yesSensors: "Sí, tengo sensores",
                        yesSensorsDesc: "Puedo conectar mis dispositivos para monitoreo en tiempo real.",
                        noSensors: "No, o prefiero reportar manualmente",
                        noSensorsDesc: "Subiré reportes diarios o semanales via CSV/Web.",
                        sensorsList: "Sensores Instalados",
                        addSensor: "Agregar Sensor",
                        noSensorsAdded: "No has agregado sensores.",
                        sensorType: "Tipo",
                        sensorLocation: "Ubicación",
                        sensorSerial: "Serial (Opcional)",
                        frequency: "Frecuencia Envío",
                        integration: "Integración",
                        benefitsTitle: "Beneficios de automatizar con sensores",
                        benefit1: "Verificación 'Nivel Oro' (créditos valen +15%)",
                        benefit2: "Alertas automáticas de anomalías",
                        benefit3: "Mayor confianza ante compradores internacionales",
                        viewKits: "Ver kits de inicio de Global Force IoT",
                        placeholders: {
                            sensorLocation: "Ej. Zona Cría",
                            sensorSerial: "SN-12345"
                        },
                        validation: "Si indicaste que tienes sensores, agrega al menos uno."
                    },
                    step5: {
                        title: "Documentos de Verificación",
                        legalDocs: "Legales y Permisos",
                        visualEvidence: "Evidencia Visual",
                        visualEvidenceDesc: "Sube fotos claras de: Recepción de materia prima, Zona de Bio-reactores, Cosecha y Producto final.",
                        photoPlaceholder: "Foto",
                        uploadPhotos: "Subir Fotos de Instalación",
                        uploaded: "subidas",
                        videoCallTitle: "Videollamada de Verificación",
                        videoCallDesc: "Recomendamos agendar una llamada rápida de 15 min para mostrar tu planta en vivo. Esto acelera tu aprobación a 24 horas.",
                        scheduleLater: "Agendar para después",
                        validation: "Sube tu licencia de operación y al menos 1 foto."
                    },
                    step6: {
                        title: "Selecciona tu Plan de Red",
                        subtitle: "Basado en tu capacidad ({{capacity}} tons/día), te recomendamos el plan",
                        recommended: "Recomendado",
                        monthly: "Mensual",
                        annual: "Anual",
                        saveOffer: "Ahorra 17%",
                        selected: "Seleccionado",
                        select: "Seleccionar",
                        summaryTitle: "Resumen y Pago",
                        selectedPlan: "Plan Seleccionado",
                        totalToday: "Total a Pagar Hoy",
                        futureCommission: "Comisión futura",
                        perCredit: "por crédito vendido",
                        creditCard: "Tarjeta de Crédito / Débito",
                        acceptTerms: "Acepto los",
                        termsConditions: "Términos de Servicio",
                        completePay: "Completar Registro y Pagar 💳",
                        processing: "Procesando...",
                        year: "año",
                        month: "mes",
                        commission: "comisión venta créditos"
                    }
                },
                options: {
                    waste: {
                        fruit_veg: "Frutas y Verduras",
                        brewery: "Residuos Cerveceros",
                        manure: "Estiercol",
                        slaughter: "Rastro / Matadero",
                        supermarket: "Mermas Supermercado"
                    },
                    products: {
                        larva: "Larva Viva",
                        dry_larva: "Larva Seca",
                        frass: "Frass (Fertilizante)",
                        oil: "Aceite de Insecto",
                        chiton: "Quitina"
                    },
                    sensorTypes: {
                        temperature: "Temperatura",
                        humidity: "Humedad",
                        weight: "Báscula",
                        co2: "CO2",
                        camera: "Cámara / Visión"
                    },
                    frequency: {
                        realtime: "Tiempo Real (recomendado)",
                        hourly: "Cada Hora",
                        daily: "Diario"
                    },
                    documents: {
                        license: "Licencia de Operación / Acta",
                        environmental: "Permiso Ambiental",
                        sanitary: "Permiso Sanitario"
                    },
                    plans: {
                        starter: {
                            name: "Starter",
                            features: ["Registro manual de datos", "Cálculo básico de emisiones", "Acceso a Marketplace (solo venta)"]
                        },
                        growth: {
                            name: "Growth",
                            features: ["Integración IoT básica (3 sensores)", "Verificación satelital mensual", "Reportes de impacto verificados", "Comisión reducida (15%)"]
                        },
                        scale: {
                            name: "Scale",
                            features: ["IoT Avanzado (Ilimitado)", "Monitoreo espectral semanal", "API de datos en tiempo real", "Soporte dedicado 24/7"]
                        },
                        partner: {
                            name: "Partner",
                            features: ["Solución a medida"]
                        }
                    }
                }
            },
            viability: {
                title: "Calculadora Viabilidad",
                desc: "Herramienta de análisis para nuevos proyectos BSF: clima, mercado y potencial.",
                action: "Evaluar Proyecto"
            },
            investorPortal: {
                title: "Portal Inversionistas",
                desc: "Dashboard exclusivo para LPs y Partners: métricas financieras y cumplimiento.",
                action: "Acceso Seguro"
            },
            alerts: {
                title: "Centro de Alertas",
                desc: "Monitoreo de alertas operativas, compliance y oportunidades en tiempo real.",
                action: "Ver Alertas"
            }
        },
        actions: {
            download: "Descargar Reporte PDF",
            contact: "Contactar Equipo IR"
        },
        sources: "Fuentes de Datos e Integridad",
        // Navigation
        nav: {
            dashboard: "Dashboard",
            network: "Red Global",
            mrv: "MRV",
            terralink: "TerraLINK",
            circularlink: "CircularLINK",
            dataRoom: "Data Room",
            marketplace: "Marketplace"
        },
        // Data Room
        dataRoom: {
            title: "Investor Data Room",
            subtitle: "Acceso completo a documentación para due diligence",
            accessGranted: "Acceso Completo Autorizado",
            ndaSigned: "NDA firmado el 1 de Diciembre, 2025",
            docsAvailable: "documentos disponibles",
            searchPlaceholder: "Buscar documentos...",
            all: "Todos",
            categories: {
                pitch: "Pitch & Resumen",
                financial: "Financiero",
                legal: "Legal",
                technical: "Técnico",
                qa: "Q&A"
            },
            noResults: "No se encontraron documentos.",
            downloadAll: "Descargar Todo",
            downloadZip: "Paquete completo ZIP",
            scheduleCall: "Agendar Llamada",
            withFounders: "Con el equipo fundador",
            // Document translations
            documents: {
                '1': { name: 'LarvaLINK Investor Deck Q4 2025', desc: 'Deck completo con modelo de negocio, análisis de mercado y proyecciones' },
                '2': { name: 'One-Pager Resumen Ejecutivo', desc: 'Resumen ejecutivo de una página' },
                '3': { name: 'Video Pitch (5 min)', desc: 'Presentación en video del proyecto' },
                '4': { name: 'Modelo Financiero Proyecciones 5 Años', desc: 'Modelo DCF con análisis de sensibilidad y múltiples escenarios' },
                '5': { name: 'Estado de Resultados YTD 2025', desc: 'Estado de pérdidas y ganancias año actual' },
                '6': { name: 'Proyección Ingresos Créditos Carbono', desc: 'Forecast de ingresos por créditos de carbono' },
                '7': { name: 'Desglose Uso de Fondos', desc: 'Distribución detallada del uso de fondos' },
                '8': { name: 'Cap Table (Actual)', desc: 'Tabla de capitalización actual' },
                '9': { name: 'Acta Constitutiva', desc: 'Documentos de incorporación de la empresa' },
                '10': { name: 'Resumen Portafolio IP', desc: 'Resumen de propiedad intelectual' },
                '11': { name: 'Template Contrato SAFE', desc: 'Plantilla de acuerdo SAFE' },
                '12': { name: 'Permisos Ambientales (Todas las Plantas)', desc: 'Permisos ambientales vigentes' },
                '13': { name: 'Certificación Créditos Carbono (Verra)', desc: 'Certificación de créditos de carbono' },
                '14': { name: 'Technology Whitepaper v2.3', desc: 'Proceso de bioconversión BSF, optimización de rendimiento e integración IoT' },
                '15': { name: 'Metodología Verificación Satelital', desc: 'Metodología de verificación con satélites' },
                '16': { name: 'Blueprint Arquitectura IoT', desc: 'Diseño de arquitectura IoT' },
                '17': { name: 'Auditoría Smart Contracts Blockchain', desc: 'Auditoría de contratos inteligentes' },
                '18': { name: 'FAQ Due Diligence Técnico', desc: 'Preguntas frecuentes técnicas' },
                '19': { name: 'FAQ Cumplimiento Regulatorio', desc: 'Preguntas frecuentes regulatorias' },
                '20': { name: 'Reporte ESG & Métricas de Impacto', desc: 'Informe de impacto ambiental, social y gobernanza' },
                '21': { name: 'Roadmap de Ejecución 2025-2027', desc: 'Hoja de ruta de escalabilidad y expansión' },
                '22': { name: 'AXA Future Risks Report 2025', desc: 'Análisis global de riesgos futuros y relevancia para LarvaLINK' }
            },
            // Document Viewer UI
            viewer: {
                backToDataRoom: "Volver al Data Room",
                section: "Sección",
                sections: "Secciones",
                aiAssisted: "Asistido",
                confidential: "CONFIDENCIAL",
                footer: "DOCUMENTO CONFIDENCIAL | NO CONSTITUYE OFERTA PÚBLICA DE VALORES",
                facebookVideo: "Video de Facebook",
                facebookPost: "Publicación de Facebook",
                listenPodcast: "Escuchar Podcast Generado por IA",
                openInNotebook: "Abre en NotebookLM para reproducir",
                viewLink: "Ver Enlace"
            },
            // AI Assistant
            aiAssistant: {
                title: "Asistente de IA",
                status: "Gemini Activo",
                context: "Contexto:",
                suggestedQuestions: "Preguntas sugeridas",
                askQuestion: "Hacer otra pregunta",
                questions: {
                    keyPoints: "¿Cuáles son los puntos clave de este documento?",
                    risks: "¿Qué riesgos menciona este documento?",
                    metrics: "¿Puedes resumir las métricas principales?",
                    dueDiligence: "¿Qué preguntas de due diligence aplican aquí?"
                }
            },
            // Section title translations for document content
            sectionTitles: {
                'RESUMEN EJECUTIVO': 'EXECUTIVE SUMMARY',
                'HIGHLIGHTS': 'HIGHLIGHTS',
                'DESCARGA': 'DOWNLOAD',
                'ADVERTENCIA IMPORTANTE': 'IMPORTANT WARNING',
                'EL PROBLEMA': 'THE PROBLEM',
                'LA SOLUCIÓN': 'THE SOLUTION',
                'MÉTRICAS OPERATIVAS CLAVE': 'KEY OPERATIONAL METRICS',
                'PRODUCTOS': 'PRODUCTS',
                'MODELO DE NEGOCIO': 'BUSINESS MODEL',
                'STACK TECNOLÓGICO': 'TECHNOLOGY STACK',
                'OPORTUNIDAD DE INVERSIÓN': 'INVESTMENT OPPORTUNITY',
                'EQUIPO FUNDADOR': 'FOUNDING TEAM',
                'ESTADO ACTUAL': 'CURRENT STATUS',
                'PRÓXIMOS PASOS': 'NEXT STEPS',
                'RESUMEN DE LA RONDA': 'ROUND SUMMARY',
                'DISTRIBUCIÓN GENERAL DE FONDOS': 'GENERAL FUND DISTRIBUTION',
                'GOBERNANZA Y TRANSPARENCIA': 'GOVERNANCE AND TRANSPARENCY',
                'ESTADO DE DESARROLLO': 'DEVELOPMENT STATUS',
                'ESTADO DEL PROYECTO': 'PROJECT STATUS',
                'DATOS CONSTITUTIVOS': 'INCORPORATION DATA',
                'ACTIVOS DE PROPIEDAD INTELECTUAL': 'INTELLECTUAL PROPERTY ASSETS',
                'TÉRMINOS DE REFERENCIA': 'TERMS OF REFERENCE',
                'PLANTA PILOTO ALFA': 'ALPHA PILOT PLANT',
                'RESUMEN FINANCIERO': 'FINANCIAL SUMMARY',
                'SUPUESTOS CLAVE': 'KEY ASSUMPTIONS',
                'ESTADO DE RESULTADOS': 'INCOME STATEMENT',
                'POTENCIAL DE ABATIMIENTO': 'ABATEMENT POTENTIAL',
                'ESTRUCTURA ACCIONARIA': 'SHARE STRUCTURE'
            },
            // Full section content translations for key documents
            sectionContent: {
                // Document 1 content
                doc1_section1: {
                    title: 'RESUMEN EJECUTIVO',
                    content: `Presentación completa de la oportunidad de inversión en LarvaLINK.

**Contenido:**
1. Visión y Misión
2. El Problema: Desperdicio de Alimentos
3. La Solución: Tecnología BSF + Blockchain
4. Modelo de Negocio
5. Tracción y Roadmap`
                },
                doc1_section2: {
                    title: 'HIGHLIGHTS',
                    content: `* **Mercado:** USD 800M TAM (México)
* **Tecnología:** Propietaria con integración IoT + Blockchain
* **Equipo:** Fundadores con experiencia en biotecnología y tecnología
* **Status:** Planta piloto operativa`
                },
                doc1_section3: {
                    title: 'DESCARGA',
                    content: `El documento completo está disponible para descarga en formato PPTX (24.5 MB).`
                },
                // Document 2: One Pager
                doc2_section1: {
                    title: '⚠️ ADVERTENCIA IMPORTANTE',
                    content: `Este documento describe una **STARTUP PRE-REVENUE**. LarvaLINK tiene USD 0 en ventas comerciales a la fecha. La planta piloto ALFA inició operaciones el 11 de octubre de 2025. Todas las proyecciones financieras son ESTIMACIONES, no resultados históricos. Invertir en startups conlleva riesgo significativo de pérdida total del capital.`
                },
                doc2_section2: {
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
                doc2_section3: {
                    title: '2. LA SOLUCIÓN: METABIOCONVERSIÓN 3.0',
                    content: `LarvaLINK transforma residuos orgánicos en productos de alto valor mediante bioconversión con **Hermetia illucens** (mosca soldado negra), integrada con:

* **ThermoLINK:** Sistema de bioconversión con control térmico pasivo
* **TrackLINK:** Trazabilidad blockchain sobre Global Force
* **METAFEED:** Inteligencia artificial para optimización de procesos
* **IoT Industrial:** Red de sensores para monitoreo en tiempo real

**Proceso aeróbico = CERO emisiones de metano**`
                },
                doc2_section4: {
                    title: '3. MÉTRICAS OPERATIVAS CLAVE',
                    content: `| Parámetro | Valor |
|-----------|-------|
| Feed Conversion Ratio (FCR) | 1.5 a 2.0:1 |
| Ciclo de bioconversión | 14 días |
| Temperatura óptima | 27°C |
| Humedad óptima | 70% |
| Rendimiento biomasa | 20-25% del sustrato |`
                },
                doc2_section5: {
                    title: '4. PRODUCTOS',
                    content: `| Producto | Descripción | Especificación |
|----------|-------------|----------------|
| **ProLINK** | Harina proteica | 40-45% proteína |
| **LipiLINK** | Aceite | Alto contenido ácido láurico |
| **TerraLINK** | Biofertilizante | NPK natural + quitina |
| **Larva viva** | Mascotas/pesca | Producto fresco |`
                },
                doc2_section6: {
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
                doc2_section7: {
                    title: '6. STACK TECNOLÓGICO',
                    content: `| Componente | Estado |
|------------|--------|
| ThermoLINK | ✅ OPERATIVO |
| TrackLINK | 🔄 EN DESARROLLO |
| METAFEED IA | 🔄 EN DESARROLLO |
| IoT Sensores | 📦 Hardware adquirido |
| Global Force | ✅ Mainnet activo 18+ meses |`
                },
                doc2_section8: {
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
                doc2_section9: {
                    title: '8. EQUIPO FUNDADOR',
                    content: `* **Dr. Roberto Rendón Medel** - Director General
* **Mtro. Ing. Luis Maumejean Navarrete** - Director Tecnología
* **Luis E. Maumejean Godoy** - Director Operaciones`
                },
                doc2_section10: {
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
                doc2_section11: {
                    title: '10. PRÓXIMOS PASOS',
                    content: `Para inversionistas interesados:

1. Solicitar acceso al Data Room completo
2. Agendar visita a planta ALFA
3. Sesión de Q&A con equipo fundador
4. Revisión de contrato RPU con asesor legal

**Contacto:** investors@larvalink.mx`
                },
                // Document 3: Video Pitch
                doc3_section1: {
                    title: '🎬 VIDEO: ENTREVISTA LARVALINK',
                    content: `Conoce más sobre el proyecto LarvaLINK en esta entrevista donde explicamos nuestra visión y tecnología.

[VIDEO:https://www.youtube.com/embed/wzn90p886Wk]

**Puntos destacados:**
* Visión del proyecto y equipo fundador
* Tecnología de bioconversión BSF
* Impacto ambiental y social
* Roadmap de crecimiento`
                },
                doc3_section2: {
                    title: 'VIDEO: GIRA DEMOSTRATIVA BIOCONVERSIÓN',
                    content: `Nuestro municipio participó en una gira demostrativa sobre bioconversión de residuos orgánicos en la planta piloto LarvaLINK.

[FACEBOOK:1488251963302744]

**Descripción:**
Este video muestra la visita de funcionarios municipales a nuestra planta de bioconversión BSF, donde pudieron observar el proceso completo de transformación de residuos orgánicos.`
                },
                doc3_section3: {
                    title: '🎙️ PODCAST: LARVALINK & SUSTAINABLE DEVELOPMENT GOALS',
                    content: `**Generado con NotebookLM de Google**

Escucha un análisis profundo sobre cómo LarvaLINK contribuye a los Objetivos de Desarrollo Sostenible (ODS) de la ONU.

[NOTEBOOKLM:https://notebooklm.google.com/notebook/0460aa6e-bc71-4d68-b34d-6f96eae8a011?artifactId=f1b26f4e-1967-4b95-8cba-6ac9ad10b1f3]

Este podcast fue generado automáticamente por la IA de Google NotebookLM, analizando la documentación técnica y de impacto de LarvaLINK.`
                },
                doc3_section4: {
                    title: '📰 PUBLICACIONES EN FACEBOOK',
                    content: `Nuestras últimas actualizaciones en redes sociales:

[FBPOST:https://www.facebook.com/61571603422059/posts/122150230556720114/]

[FBPOST:https://www.facebook.com/photo?fbid=122142349112720114&set=pcb.122142349586720114]`
                },
                doc3_section5: {
                    title: 'TRANSCRIPCIÓN',
                    content: `> "Hola, soy Roberto Rendón, CEO de LarvaLINK. Estamos transformando la gestión de residuos en México..."

El video cubre:
* Recorrido por la planta piloto
* Explicación del proceso ThermoLINK
* Demostración de la plataforma TrackLINK
* Entrevistas con el equipo`
                },
                doc3_section6: {
                    title: 'MÁS RECURSOS',
                    content: `Para ver más contenido multimedia sobre LarvaLINK:

* **Facebook:** [@LarvaLINK](https://www.facebook.com/61571603422059)
* **Sitio Web:** [larvalink.mx](https://larvalink.mx)

Próximamente agregaremos más videos y podcasts generados con NotebookLM.`
                },
                // Document 4: Financial Model
                doc4_section1: {
                    title: 'RESUMEN FINANCIERO (ESCENARIO BASE)',
                    content: `| Año | Ingresos (USD) | EBITDA (USD) | Margen |
|-----|----------------|--------------|--------|
| 2026 | $850,000 | -$120,000 | -14% |
| 2027 | $2,400,000 | $650,000 | 27% |
| 2028 | $5,800,000 | $2,100,000 | 36% |
| 2029 | $12,500,000 | $5,200,000 | 41% |
| 2030 | $24,000,000 | $10,800,000 | 45% |`
                },
                doc4_section2: {
                    title: 'SUPUESTOS CLAVE',
                    content: `* **Precio Harina:** $1,800 USD/ton
* **Precio Aceite:** $2,200 USD/ton
* **Costo Sustrato:** $0-$10 USD/ton (promedio)
* **Expansión:** 1 nueva planta cada 18 meses`
                },
                // Document 5: P&L YTD
                doc5_section1: {
                    title: 'ESTADO DE RESULTADOS',
                    content: `**Ingresos:** USD 0 (Pre-revenue)

**Gastos Operativos:**
* R&D: $45,000
* Nómina: $60,000
* Infraestructura Piloto: $85,000
* Legales/Admin: $15,000

**Burn Rate Mensual Promedio:** $18,000 USD`
                },
                // Document 6: Carbon Forecast
                doc6_section1: {
                    title: 'POTENCIAL DE ABATIMIENTO',
                    content: `Cada tonelada de residuo orgánico desviado de relleno sanitario evita la emisión de ~1.5 a 2.5 tCO2e (principalmente metano).

| Año | Residuos Procesados (ton) | Créditos (tCO2e) | Ingreso Est. @$15 |
|-----|---------------------------|------------------|-------------------|
| 2026 | 5,000 | 7,500 | $112,500 |
| 2027 | 15,000 | 22,500 | $337,500 |
| 2028 | 40,000 | 60,000 | $900,000 |`
                },
                // Document 7: Use of Funds
                doc7_section1: {
                    title: '⚠️ DISCLAIMER',
                    content: `Los montos presentados son **PROYECCIONES** basadas en estimaciones actuales. La asignación final puede ajustarse según condiciones de mercado y necesidades operativas. LarvaLINK se reserva el derecho de reasignar hasta 15% entre categorías previa notificación a inversionistas.`
                },
                doc7_section2: {
                    title: '1. RESUMEN DE LA RONDA',
                    content: `| Concepto | Valor |
|----------|-------|
| Instrumento | Revenue Participation Units (RPUs) |
| Total RPUs emitidos | 88 unidades |
| Precio por RPU | USD 11,111 |
| Total ronda (si 100% colocado) | USD 978,888 |
| Inversión mínima | 1 RPU = USD 11,111 |`
                },
                doc7_section3: {
                    title: '2. DISTRIBUCIÓN GENERAL DE FONDOS',
                    content: `| Categoría | Monto USD | % | Timeline |
|-----------|-----------|---|----------|
| Infraestructura y Equipamiento | ~$587,333 | 60% | Q1-Q2 2026 |
| Capital de Trabajo (12 meses) | ~$244,722 | 25% | Continuo |
| Desarrollo Tecnológico | ~$146,833 | 15% | Q1-Q3 2026 |
| **TOTAL** | **$978,888** | **100%** | **18 meses** |`
                },
                doc7_section4: {
                    title: '3. DETALLE: INFRAESTRUCTURA Y EQUIPAMIENTO (60%)',
                    content: `| Concepto | % del CAPEX |
|----------|-------------|
| Naves de cría y engorda | 35% |
| Equipos de procesamiento (cribado, secado, renderizado) | 25% |
| Sistemas IoT y automatización | 15% |
| Infraestructura civil y utilities | 15% |
| Contingencia | 10% |`
                },
                doc7_section5: {
                    title: '4. DETALLE: DESARROLLO TECNOLÓGICO (15%)',
                    content: `* **TrackLINK** (smart contracts, backend, frontend)
* **Sensores IoT** (hardware, instalación, integración)
* **METAFEED IA** (desarrollo modelo predictivo)
* **Dashboard inversionistas**
* **Auditoría smart contracts** (CertiK o similar)`
                },
                doc7_section6: {
                    title: '5. DETALLE: CAPITAL DE TRABAJO (25%)',
                    content: `OPEX proyectado para 12 meses:

* Nómina equipo operativo
* Insumos y materiales operativos
* Servicios (electricidad, agua, mantenimiento)
* Logística y transporte
* Gastos administrativos`
                },
                doc7_section7: {
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
                doc7_section8: {
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
                },
                // Document 8: Cap Table
                doc8_section1: {
                    title: 'ESTRUCTURA ACCIONARIA',
                    content: `| Accionista | % Propiedad | Rol |
|------------|-------------|-----|
| Fundadores | 85% | Operativo |
| Advisors | 5% | Estratégico |
| ESOP Pool | 10% | Talento Futuro |

**Nota:** La ronda actual es de RPUs (Revenue Participation Units) y no diluye el Cap Table.`
                },
                // Document 9: Articles of Incorporation
                doc9_section1: {
                    title: 'DATOS CONSTITUTIVOS',
                    content: `* **Razón Social:** Rendón Agroenlace S.A. de C.V.
* **Fecha Constitución:** 15 de Marzo de 2024
* **Notaría:** Número 128, CDMX
* **Objeto Social:** Biotecnología, gestión de residuos, producción agrícola y pecuaria.
* **RFC:** RAG240315XXX`
                },
                // Document 10: IP Portfolio
                doc10_section1: {
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
                },
                // Document 11: SAFE Agreement
                doc11_section1: {
                    title: 'TÉRMINOS DE REFERENCIA',
                    content: `Este documento es un **template estándar** Y-Combinator SAFE (Post-Money Valuation Cap).

**Términos Propuestos (para rondas Equity futuras):**
* Valuation Cap: USD 5,000,000
* Discount: 20%
* Pro-rata rights: Sí (para tickets mayores a $50k)`
                },
                doc11_section2: {
                    title: 'NOTA SOBRE RPUS',
                    content: `La ronda actual utiliza **Revenue Participation Units (RPUs)**, no SAFEs. Ver documento "Use of Funds" y contrato RPU específico.`
                },
                // Document 12: Environmental Permits
                doc12_section1: {
                    title: 'PLANTA PILOTO ALFA',
                    content: `**Estado:** Cumplimiento total

| Permiso | Autoridad | Estado | Vigencia |
|---------|-----------|--------|----------|
| Licencia de Funcionamiento | Municipal | ✅ Vigente | Anual |
| Plan de Manejo de Residuos | Estatal (Edomex) | ✅ Autorizado | 5 años |
| Uso de Suelo | Municipal | ✅ Industrial | Indefinido |
| Dictamen Protección Civil | Municipal | ✅ Aprobado | Anual |`
                },
                // Document 13: Carbon Certification
                doc13_section1: {
                    title: 'ESTADO DEL PROYECTO',
                    content: `**Estándar:** Verra (VCS)
**Metodología:** AMP0006 - Reduction of methane emissions from anaerobic digestion of manure (adaptación para compostaje/bioconversión).

**Fase Actual:** Pre-factibilidad
* Engagement con desarrollador de proyecto de carbono: Iniciado
* PDD (Project Design Document): En redacción
* Validación Tercera Parte: Programada Q3 2026`
                },
                // Document 14: Technology Whitepaper
                doc14_section1: {
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
                doc14_section2: {
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
                doc14_section3: {
                    title: 'SISTEMA THERMOLINK',
                    content: `Sistema de control térmico pasivo que aprovecha el calor metabólico generado por las larvas durante la bioconversión.

**Características:**
* Control térmico pasivo
* Diseño modular escalable
* Ventilación optimizada
* Estado: **OPERATIVO**`
                },
                doc14_section4: {
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
                doc14_section5: {
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
                doc14_section6: {
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
                doc14_section7: {
                    title: 'EUDR COMPLIANCE',
                    content: `**European Union Deforestation Regulation**

TrackLINK está diseñado para cumplir con los requerimientos de trazabilidad EUDR:

* Due Diligence Statements automáticos
* Trazabilidad desde origen hasta producto final
* Compatibilidad con TRACES UE
* Geolocalización de origen de sustratos`
                },
                doc14_section8: {
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
                doc14_section9: {
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
                doc14_section10: {
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
                },
                // Document 15: Satellite Verification
                doc15_section1: {
                    title: 'MRV DIGITAL CON IMÁGENES SATELITALES',
                    content: `Metodología para verificar:
1. Existencia física de las plantas (infraestructura)
2. Actividad operativa (firmas térmicas)
3. Impacto en zona circundante

**Fuentes de Datos:**
* Sentinel-2 (Óptico)
* Sentinel-1 (Radar SAR)
* Landsat 8/9`
                },
                // Document 16: IoT Architecture
                doc16_section1: {
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
                },
                // Document 17: Smart Contract Audit
                doc17_section1: {
                    title: 'RESUMEN DE HALLAZGOS',
                    content: `**Estado:** Auditoría Interna + Revisión por Pares

**Vulnerabilidades Críticas:** 0 encontradas
**Vulnerabilidades Medias:** 2 corregidas
**Vulnerabilidades Bajas:** 5 (optimizaciones de gas)

**Próximo Paso:** Auditoría externa por firma certificada (CertiK/OpenZeppelin) en Q2 2026.`
                },
                // Document 18: Tech FAQ
                doc18_section1: {
                    title: 'PREGUNTAS FRECUENTES',
                    content: `**1. ¿Qué pasa si las larvas escapan?**
La BSF (Hermetia illucens) no es una plaga, no transmite enfermedades y no se alimenta en estado adulto. Si escapan, mueren rápidamente sin causar daño ecológico.

**2. ¿Cómo controlan los olores?**
El sistema ThermoLINK mantiene condiciones aeróbicas que minimizan la generación de metano y olores putrefactos. Usamos biofiltros activos.

**3. ¿Tienen patente?**
Tenemos secretos industriales protegidos y marcas registradas. No patentamos el proceso biológico básico (es open source natural), sino la integración tecnológica específica.`
                },
                // Document 19: Regulatory FAQ
                doc19_section1: {
                    title: 'CUMPLIMIENTO NORMATIVO',
                    content: `**Sanidad Animal (SENASICA):**
Cumplimos con la regulación para producción de insectos para consumo animal.

**Licencia Ambiental:**
Operamos bajo normas estatales de manejo de residuos de manejo especial.

**Seguridad Social:**
Todo el personal está inscrito en IMSS y cumple con normativa laboral mexicana.`
                },
                // Document 20: ESG Report
                doc20_section1: {
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
                },
                // Document 21: Roadmap
                doc21_section1: {
                    title: '🚀 VISIÓN GENERAL',
                    content: `## Nuestro camino es claro. El momento es ahora.

LarvaLINK tiene un plan de ejecución definido para escalar desde nuestra planta piloto actual hasta un ecosistema de 360 toneladas/día de capacidad de procesamiento.

[TIMELINE:START]`
                },
                doc21_section2: {
                    title: '📅 DICIEMBRE 2025',
                    content: `## Cierre de Ronda Seed VIP

✅ **Venta de los últimos 45 RPUs Seed VIP**
* Completar la ronda de financiamiento inicial
* Capital objetivo: ~$500,000 USD adicionales

✅ **Plantas CIDI y ALFA financiadas y asignadas**
* Infraestructura asegurada
* Equipos principales adquiridos
* Terrenos y permisos en orden`
                },
                doc21_section3: {
                    title: '📅 ENERO 2026',
                    content: `## Inicio de Operaciones

🔄 **Inicio de ciclos de ecosistema de Planta ALFA**
* Capacidad: 1 a 5 ton/día
* Primeras colonias reproductoras establecidas
* Ciclos de bioconversión iniciados
* Equipo operativo completo contratado`
                },
                doc21_section4: {
                    title: '📅 FEBRERO - MARZO 2026',
                    content: `## Primera Producción Comercial

🏭 **Inicio de operación de la planta piloto Alfa 1 (4T)**
* Procesamiento sostenido de 4 toneladas/día
* Primera producción comercial de ProLINK y TerraLINK

📊 **Producción, trazabilidad y datos en tiempo real validados**
* Sistema TrackLINK operativo
* IoT integrado y transmitiendo
* Primeros BatchNFT en blockchain`
                },
                doc21_section5: {
                    title: '📅 MAYO - JUNIO 2026',
                    content: `## Preparación para Escala

💰 **Inicio de búsqueda para financiamiento institucional**
* Target: Planta T30 (30 toneladas/día)
* Preparación de pitch para fondos VC/PE
* Due diligence documentación lista

🎯 **Capitalización para escalar a 30T/día**
* Meta de levantamiento: Serie A
* Valoración objetivo basada en métricas operativas reales`
                },
                doc21_section6: {
                    title: '📅 2026 - 2027',
                    content: `## Escalamiento Masivo

🏗️ **Escalamiento a 360 Toneladas/día**
* Despliegue de múltiples plantas modulares
* Red distribuida de procesamiento
* Optimización continua con METAFEED IA

🌟 **Ecosistema 1 Completado**
* Ciclo cerrado de economía circular
* Impacto ambiental medible y verificado
* Créditos de carbono en producción`
                },
                doc21_section7: {
                    title: '📅 A PARTIR DE 2027',
                    content: `## Expansión Global

🌎 **Expansión internacional**
* Primeros mercados objetivo: LATAM, Europa
* Modelo de licenciamiento definido
* Partners estratégicos identificados

📜 **Primeras licencias o ecosistemas fuera de México**
* Réplica del modelo probado
* Tecnología exportable
* BaaS (Bioconversion as a Service) activo`
                },
                doc21_section8: {
                    title: '📈 RESUMEN DE MILESTONES',
                    content: `| Fecha | Milestone | Capacidad |
|-------|-----------|-----------
| Dic 2025 | Cierre Seed VIP | - |
| Ene 2026 | Inicio ciclos ALFA | 1-5 T/día |
| Feb-Mar 2026 | Primera producción | 4 T/día |
| May-Jun 2026 | Búsqueda Serie A | - |
| 2026-2027 | Ecosistema 1 | 360 T/día |
| 2027+ | Expansión Internacional | Ilimitada |

**El futuro de la bioconversión comienza aquí.**`
                },
                // Document 22: Future Risks Report
                doc22_section1: {
                    title: '📊 FUTURE RISKS REPORT 2025',
                    content: `## Análisis Global de Riesgos Futuros

El **AXA Future Risks Report 2025** es uno de los estudios más completos sobre riesgos globales, basado en encuestas a más de 3,500 expertos en gestión de riesgos de 57 países.

Este análisis es fundamental para entender el contexto en el que opera LarvaLINK y cómo nuestras soluciones abordan varios de los riesgos identificados.

[LINK:https://www.axa.com/en/news/future-risks-report-2025|Ver Reporte Completo AXA|Future Risks Report 2025 - Análisis oficial]`
                },
                doc22_section2: {
                    title: '🌡️ CAMBIO CLIMÁTICO: RIESGO #1',
                    content: `## El Cambio Climático permanece como el principal riesgo global

El cambio climático se mantiene como el **riesgo número 1** tanto para expertos como para la población general. México ocupa el **#2** en países más preocupados.

**LarvaLINK es parte de la solución:**
* Reducción de emisiones de metano de residuos orgánicos
* Captura y verificación de créditos de carbono
* Economía circular que desplaza producción intensiva

[IMG:/images/future-risks/climate-change.png]`
                },
                doc22_section3: {
                    title: '📈 TOP 10 RIESGOS GLOBALES 2020-2025',
                    content: `## Evolución de los principales riesgos mundiales

La siguiente visualización muestra cómo han evolucionado los 10 principales riesgos globales en los últimos 5 años:

[IMG:/images/future-risks/global-risks-timeline.jpg]

**Tendencias clave:**
* Cambio climático consistentemente en #1 desde 2021
* Ciberseguridad subiendo rápidamente
* Inestabilidad geopolítica en aumento
* IA y Big Data emergiendo como nuevo riesgo`
                },
                doc22_section4: {
                    title: '🌎 RIESGOS POR REGIÓN GEOGRÁFICA',
                    content: `## Perspectiva regional de riesgos 2025

Los riesgos varían significativamente según la región geográfica:

[IMG:/images/future-risks/risks-by-geography.png]

**Américas:**
1. Cambio climático
2. Ciberseguridad  
3. IA y Big Data

**Relevancia para LarvaLINK:** Nuestras operaciones en México están en una región donde el cambio climático es la preocupación #1.`
                },
                doc22_section5: {
                    title: '📋 COMPARATIVA: EXPERTOS VS POBLACIÓN',
                    content: `## ¿Qué piensan los expertos vs la población general?

El reporte compara las percepciones de expertos en gestión de riesgos con la población general:

[IMG:/images/future-risks/axa-top10-comparison.png]

**Insights clave:**
* Los expertos priorizan la inestabilidad geopolítica (#2)
* La población general se preocupa más por amenazas de seguridad (#2)
* Ambos grupos coinciden en que el cambio climático es el riesgo #1
* Las mujeres dan mayor prioridad a los riesgos de salud`
                },
                doc22_section6: {
                    title: '🔗 RELEVANCIA PARA LARVALINK',
                    content: `## Cómo LarvaLINK mitiga riesgos globales

Nuestra solución aborda directamente varios de los principales riesgos identificados:

| Riesgo Global | Cómo LarvaLINK Contribuye |
|---------------|---------------------------|
| **Cambio Climático** | Reducción de GEI, créditos de carbono verificados |
| **Recursos Naturales** | Economía circular, valorización de residuos |
| **Seguridad Alimentaria** | Producción sostenible de proteína animal |
| **Pandemias** | Eliminación de vectores en residuos orgánicos |

[LINK:https://www.axa.com/en/news/future-risks-report-2025|Descargar Reporte Completo|PDF oficial del AXA Future Risks Report 2025]`
                }
            }
        },
        // Partners Hub
        partners: {
            circularEconomy: "Economía Circular",
            title: "CircularLINK Partners",
            subtitle: "Ecosistema de comercios certificados y consumidores comprometidos con la economía circular",
            stats: {
                activePartners: "Partners activos",
                kgTraced: "kg trazados",
                co2Avoided: "kg CO2 evitado",
                consumers: "Consumidores",
                donated: "Donado"
            },
            explore: "Explora el Ecosistema",
            map: {
                title: "Mapa de Partners",
                desc: "Explora 127+ comercios certificados en todo México"
            },
            impact: {
                title: "Mi Impacto",
                desc: "Semillas, logros y recompensas por tus compras sustentables"
            },
            dashboard: {
                title: "Dashboard Partner",
                desc: "Métricas, entregas y acceso a tu código QR"
            },
            scanDemo: {
                title: "Demo Escaneo QR",
                desc: "Prueba la experiencia del consumidor"
            },
            cta: {
                haveBusiness: "¿Tienes un negocio?",
                joinNetwork: "Únete a la red de comercios comprometidos con la sustentabilidad",
                register: "Registrar mi negocio"
            }
        },
        // Marketplace
        marketplace: {
            title: "Marketplace de Impacto",
            subtitle: "Adquiere activos ambientales verificados directamente de plantas de bioconversión.",
            myPortfolio: "Mi Portafolio",
            volume24h: "Volumen 24h",
            avgPrice: "Precio Promedio (Carbon)",
            availableCredits: "Créditos Disponibles",
            activePlants: "Plantas Activas",
            searchPlaceholder: "Buscar por planta, país o ID...",
            sortBy: "Ordenar por:",
            sortOptions: {
                recommended: "Recomendados",
                priceLow: "Precio: Menor a Mayor",
                priceHigh: "Precio: Mayor a Menor",
                ratingHigh: "Rating: Mayor a Menor",
                recent: "Recientes"
            }
        },
        // Investor Portal Page
        investorPage: {
            title: "Portal de Inversionistas",
            welcome: "Bienvenida,",
            lastUpdate: "Última actualización",
            goToDataRoom: "Ir al Data Room",
            verifiedImpact: "Impacto Verificado",
            blockchainTitle: "Trazabilidad Blockchain",
            blockchainDesc: "Cada tonelada de CO2 y residuo es tokenizada y registrada en Polygon.",
            viewExplorer: "Ver en Explorador",
            sdgTitle: "Contribución a Objetivos de Desarrollo Sostenible",
            footer: {
                confidential: "Confidential",
                irSupport: "Soporte IR",
                privacy: "Privacidad",
                terms: "Términos"
            }
        }
    },
    en: {
        heroTitle: "MetaBioconversion 3.0",
        heroSubtitle: "Transforming waste into regenerative value and verifiable digital assets.",
        executiveSummary: "Investor Executive Summary",
        summaryText: "LarvaLINK scales organic waste bioconversion using insect technology (Hermetia illucens) to produce sustainable protein and high-potency fertilizers, while generating carbon credits verifiable through satellite monitoring and blockchain.",
        stats: {
            plants: "Active Plants",
            processed: "Waste Processed (Tons)",
            avoided: "CO2eq Avoided (Tons)",
            ndvi: "NDVI Improvement (Soil)"
        },
        modules: {
            terralink: {
                title: "TerraLINK Impact",
                desc: "Scientific verification of soil regeneration using Copernicus Sentinel-2.",
                action: "View Spectral Analysis"
            },
            emissions: {
                title: "Emissions Calculator",
                desc: "Methane avoidance quantification per IPCC 2019 + GWP20 methodology.",
                action: "Calculate Reduction"
            },
            network: {
                title: "BSF Global Network",
                desc: "Interactive operations map and Sentinel-5P opportunity detection.",
                action: "Explore Map"
            },
            marketplace: {
                title: "Asset Marketplace",
                desc: "Trading platform for verified assets (Carbon, Circular, Bio) secured by blockchain.",
                action: "Go to Marketplace"
            },
            plantOnboarding: {
                title: "Plant Onboarding",
                desc: "Join the LarvaLINK global network, verify your impact, and sell credits.",
                action: "Start Onboarding",
                wizard: {
                    steps: {
                        basic: "Basic Info",
                        location: "Location",
                        operations: "Operations",
                        sensors: "Sensors",
                        verification: "Verification",
                        plan: "Plan"
                    },
                    common: {
                        next: "Next",
                        prev: "Previous",
                        save: "Saved",
                        contactSupport: "Contact support",
                        faq: "View FAQ",
                        help: "Need help?"
                    },
                    step1: {
                        title: "Company Information",
                        corpData: "Corporate Data",
                        companyName: "Company Name",
                        plantName: "Plant Name",
                        plantNameDesc: "If you have multiple plants, register each one separately.",
                        taxId: "Tax ID / VAT",
                        founded: "Year Founded",
                        website: "Website (Optional)",
                        contactData: "Primary Contact",
                        contactName: "Full Name",
                        contactRole: "Role / Position",
                        contactEmail: "Email",
                        contactPhone: "Phone",
                        roles: {
                            owner: "Owner / Founder",
                            manager: "Plant Manager",
                            ops: "Operations Director",
                            admin: "Administrator"
                        },
                        placeholders: {
                            companyName: "e.g. BioCycle Solutions Inc.",
                            plantName: "e.g. North Plant - QRO",
                            selectRole: "Select..."
                        },
                        validation: "Please complete mandatory fields (*)"
                    },
                    step2: {
                        title: "Plant Location",
                        subtitle: "We need the exact location for satellite verification.",
                        pinpoint: "Exact Pinpoint",
                        satelliteNote: "We will use these coordinates to retrieve historical Sentinel-2 satellite imagery and verify infrastructure existence.",
                        address: "Street Address",
                        city: "City",
                        state: "State / Province",
                        zip: "Postal Code",
                        country: "Country",
                        placeholders: {
                            address: "e.g. Federal Highway 45 Km 10"
                        },
                        validation: "Please complete the address and map location."
                    },
                    step3: {
                        title: "Operations Data",
                        capacity: "Processing Capacity",
                        utilization: "Current Utilization",
                        operatingSince: "Operating Since",
                        wasteTypes: "Waste Types (Inputs)",
                        products: "Generated Products",
                        validation: "Please complete capacity and select at least one waste type and product."
                    },
                    step4: {
                        title: "IoT Configuration",
                        question: "Do you have IoT sensors installed?",
                        yesSensors: "Yes, I have sensors",
                        yesSensorsDesc: "I can connect my devices for real-time monitoring.",
                        noSensors: "No, or I prefer manual reporting",
                        noSensorsDesc: "I will upload daily or weekly reports via CSV/Web.",
                        sensorsList: "Installed Sensors",
                        addSensor: "Add Sensor",
                        noSensorsAdded: "No sensors added.",
                        sensorType: "Type",
                        sensorLocation: "Location",
                        sensorSerial: "Serial (Optional)",
                        frequency: "Data Frequency",
                        integration: "Integration",
                        benefitsTitle: "Benefits of automated sensors",
                        benefit1: "'Gold Level' Verification (credits worth +15%)",
                        benefit2: "Automatic anomaly alerts",
                        benefit3: "Higher trust from international buyers",
                        viewKits: "View Global Force IoT starter kits",
                        placeholders: {
                            sensorLocation: "e.g. Breeding Zone",
                            sensorSerial: "SN-12345"
                        },
                        validation: "If you indicated you have sensors, please add at least one."
                    },
                    step5: {
                        title: "Verification Documents",
                        legalDocs: "Legal & Permits",
                        visualEvidence: "Visual Evidence",
                        visualEvidenceDesc: "Upload clear photos of: Raw material reception, Bio-reactor zone, Harvest, and Final product.",
                        photoPlaceholder: "Photo",
                        uploadPhotos: "Upload Facility Photos",
                        uploaded: "uploaded",
                        videoCallTitle: "Verification Call",
                        videoCallDesc: "We recommend scheduling a quick 15-min call to show your plant live. This speeds up approval to 24 hours.",
                        scheduleLater: "Schedule later",
                        validation: "Upload your operating license and at least 1 photo."
                    },
                    step6: {
                        title: "Select your Network Plan",
                        subtitle: "Based on your capacity ({{capacity}} tons/day), we recommend the plan",
                        recommended: "Recommended",
                        monthly: "Monthly",
                        annual: "Annual",
                        saveOffer: "Save 17%",
                        selected: "Selected",
                        select: "Select",
                        summaryTitle: "Summary & Payment",
                        selectedPlan: "Selected Plan",
                        totalToday: "Total Due Today",
                        futureCommission: "Future commission",
                        perCredit: "per credit sold",
                        creditCard: "Credit / Debit Card",
                        acceptTerms: "I accept the",
                        termsConditions: "Terms of Service",
                        completePay: "Complete Registration & Pay 💳",
                        processing: "Processing...",
                        year: "year",
                        month: "month",
                        commission: "credit sales commission"
                    }
                },
                options: {
                    waste: {
                        fruit_veg: "Fruits & Vegetables",
                        brewery: "Brewery Waste",
                        manure: "Manure",
                        slaughter: "Slaughterhouse",
                        supermarket: "Supermarket Waste"
                    },
                    products: {
                        larva: "Live Larvae",
                        dry_larva: "Dried Larvae",
                        frass: "Frass (Fertilizer)",
                        oil: "Insect Oil",
                        chiton: "Chitin"
                    },
                    sensorTypes: {
                        temperature: "Temperature",
                        humidity: "Humidity",
                        weight: "Weight/Scale",
                        co2: "CO2",
                        camera: "Camera / Vision"
                    },
                    frequency: {
                        realtime: "Real-time (Recommended)",
                        hourly: "Hourly",
                        daily: "Daily"
                    },
                    documents: {
                        license: "Operating License / Deed",
                        environmental: "Environmental Permit",
                        sanitary: "Sanitary Permit"
                    },
                    plans: {
                        starter: {
                            name: "Starter",
                            features: ["Manual data entry", "Basic emissions calc", "Marketplace access (sales only)"]
                        },
                        growth: {
                            name: "Growth",
                            features: ["Basic IoT integration (3 sensors)", "Monthly satellite verification", "Verified impact reports", "Reduced commission (15%)"]
                        },
                        scale: {
                            name: "Scale",
                            features: ["Advanced IoT (Unlimited)", "Weekly spectral monitoring", "Real-time Data API", "24/7 Dedicated Support"]
                        },
                        partner: {
                            name: "Partner",
                            features: ["Custom solution"]
                        }
                    }
                }
            },
            viability: {
                title: "Viability Calculator",
                desc: "Analysis tool for new BSF projects: climate, market and potential assessment.",
                action: "Evaluate Project"
            },
            investorPortal: {
                title: "Investor Portal",
                desc: "Exclusive dashboard for LPs and Partners: financial metrics and compliance.",
                action: "Secure Access"
            },
            alerts: {
                title: "Alerts Center",
                desc: "Real-time monitoring of operational alerts, compliance and opportunities.",
                action: "View Alerts"
            }
        },
        actions: {
            download: "Download PDF Report",
            contact: "Contact IR Team"
        },
        sources: "Data Sources & Integrity",
        // Navigation
        nav: {
            dashboard: "Dashboard",
            network: "Global Network",
            mrv: "MRV",
            terralink: "TerraLINK",
            circularlink: "CircularLINK",
            dataRoom: "Data Room",
            marketplace: "Marketplace"
        },
        // Data Room
        dataRoom: {
            title: "Investor Data Room",
            subtitle: "Full access to documentation for due diligence",
            accessGranted: "Full Access Authorized",
            ndaSigned: "NDA signed on December 1, 2025",
            docsAvailable: "documents available",
            searchPlaceholder: "Search documents...",
            all: "All",
            categories: {
                pitch: "Pitch & Summary",
                financial: "Financial",
                legal: "Legal",
                technical: "Technical",
                qa: "Q&A"
            },
            noResults: "No documents found.",
            downloadAll: "Download All",
            downloadZip: "Complete ZIP package",
            scheduleCall: "Schedule Call",
            withFounders: "With the founding team",
            // Document translations
            documents: {
                '1': { name: 'LarvaLINK Investor Deck Q4 2025', desc: 'Full investor deck with business model, market analysis, and projections' },
                '2': { name: 'One-Pager Executive Summary', desc: 'One-page executive summary' },
                '3': { name: 'Video Pitch (5 min)', desc: 'Video presentation of the project' },
                '4': { name: 'Financial Model 5-Year Projections', desc: 'DCF model with sensitivity analysis and multiple scenarios' },
                '5': { name: 'P&L Statement YTD 2025', desc: 'Profit and loss statement year to date' },
                '6': { name: 'Carbon Credit Revenue Forecast', desc: 'Carbon credit revenue forecast' },
                '7': { name: 'Use of Funds Breakdown', desc: 'Detailed breakdown of fund allocation' },
                '8': { name: 'Cap Table (Current)', desc: 'Current capitalization table' },
                '9': { name: 'Articles of Incorporation', desc: 'Company incorporation documents' },
                '10': { name: 'IP Portfolio Summary', desc: 'Intellectual property summary' },
                '11': { name: 'SAFE Agreement Template', desc: 'SAFE agreement template' },
                '12': { name: 'Environmental Permits (All Plants)', desc: 'Active environmental permits' },
                '13': { name: 'Carbon Credit Certification (Verra)', desc: 'Carbon credit certification' },
                '14': { name: 'Technology Whitepaper v2.3', desc: 'BSF bioconversion process, yield optimization, and IoT integration' },
                '15': { name: 'Satellite Verification Methodology', desc: 'Satellite verification methodology' },
                '16': { name: 'IoT Architecture Blueprint', desc: 'IoT architecture design' },
                '17': { name: 'Blockchain Smart Contract Audit', desc: 'Smart contract audit report' },
                '18': { name: 'Technical Due Diligence FAQ', desc: 'Technical frequently asked questions' },
                '19': { name: 'Regulatory Compliance FAQ', desc: 'Regulatory frequently asked questions' },
                '20': { name: 'ESG & Impact Metrics Report', desc: 'Environmental, social, and governance impact report' },
                '21': { name: 'Execution Roadmap 2025-2027', desc: 'Scalability and expansion roadmap' },
                '22': { name: 'AXA Future Risks Report 2025', desc: 'Global future risks analysis and relevance for LarvaLINK' }
            },
            // Document Viewer UI
            viewer: {
                backToDataRoom: "Back to Data Room",
                section: "Section",
                sections: "Sections",
                aiAssisted: "Assisted",
                confidential: "CONFIDENTIAL",
                footer: "CONFIDENTIAL DOCUMENT | NOT A PUBLIC SECURITIES OFFERING",
                facebookVideo: "Facebook Video",
                facebookPost: "Facebook Post",
                listenPodcast: "Listen to AI-Generated Podcast",
                openInNotebook: "Open in NotebookLM to play",
                viewLink: "View Link"
            },
            // AI Assistant
            aiAssistant: {
                title: "AI Assistant",
                status: "Gemini Active",
                context: "Context:",
                suggestedQuestions: "Suggested questions",
                askQuestion: "Ask another question",
                questions: {
                    keyPoints: "What are the key points of this document?",
                    risks: "What risks does this document mention?",
                    metrics: "Can you summarize the main metrics?",
                    dueDiligence: "What due diligence questions apply here?"
                }
            },
            // Section title translations for document content (EN version)
            sectionTitles: {
                'RESUMEN EJECUTIVO': 'EXECUTIVE SUMMARY',
                'HIGHLIGHTS': 'HIGHLIGHTS',
                'DESCARGA': 'DOWNLOAD',
                'ADVERTENCIA IMPORTANTE': 'IMPORTANT WARNING',
                'EL PROBLEMA': 'THE PROBLEM',
                'LA SOLUCIÓN': 'THE SOLUTION',
                'MÉTRICAS OPERATIVAS CLAVE': 'KEY OPERATIONAL METRICS',
                'PRODUCTOS': 'PRODUCTS',
                'MODELO DE NEGOCIO': 'BUSINESS MODEL',
                'STACK TECNOLÓGICO': 'TECHNOLOGY STACK',
                'OPORTUNIDAD DE INVERSIÓN': 'INVESTMENT OPPORTUNITY',
                'EQUIPO FUNDADOR': 'FOUNDING TEAM',
                'ESTADO ACTUAL': 'CURRENT STATUS',
                'PRÓXIMOS PASOS': 'NEXT STEPS',
                'RESUMEN DE LA RONDA': 'ROUND SUMMARY',
                'DISTRIBUCIÓN GENERAL DE FONDOS': 'GENERAL FUND DISTRIBUTION',
                'GOBERNANZA Y TRANSPARENCIA': 'GOVERNANCE AND TRANSPARENCY',
                'ESTADO DE DESARROLLO': 'DEVELOPMENT STATUS',
                'ESTADO DEL PROYECTO': 'PROJECT STATUS',
                'DATOS CONSTITUTIVOS': 'INCORPORATION DATA',
                'ACTIVOS DE PROPIEDAD INTELECTUAL': 'INTELLECTUAL PROPERTY ASSETS',
                'TÉRMINOS DE REFERENCIA': 'TERMS OF REFERENCE',
                'PLANTA PILOTO ALFA': 'ALPHA PILOT PLANT',
                'RESUMEN FINANCIERO': 'FINANCIAL SUMMARY',
                'SUPUESTOS CLAVE': 'KEY ASSUMPTIONS',
                'ESTADO DE RESULTADOS': 'INCOME STATEMENT',
                'POTENCIAL DE ABATIMIENTO': 'ABATEMENT POTENTIAL',
                'ESTRUCTURA ACCIONARIA': 'SHARE STRUCTURE'
            },
            // Full section content translations for key documents (EN version)
            sectionContent: {
                // Document 1 content
                doc1_section1: {
                    title: 'EXECUTIVE SUMMARY',
                    content: `Complete presentation of the investment opportunity in LarvaLINK.

**Contents:**
1. Vision and Mission
2. The Problem: Food Waste
3. The Solution: BSF + Blockchain Technology
4. Business Model
5. Traction and Roadmap`
                },
                doc1_section2: {
                    title: 'HIGHLIGHTS',
                    content: `* **Market:** USD 800M TAM (Mexico)
* **Technology:** Proprietary with IoT + Blockchain integration
* **Team:** Founders with experience in biotechnology and technology
* **Status:** Pilot plant operational`
                },
                doc1_section3: {
                    title: 'DOWNLOAD',
                    content: `The complete document is available for download in PPTX format (24.5 MB).`
                },
                // Document 2: One Pager
                doc2_section1: {
                    title: '⚠️ IMPORTANT WARNING',
                    content: `This document describes a **PRE-REVENUE STARTUP**. LarvaLINK has USD 0 in commercial sales to date. The ALFA pilot plant began operations on October 11, 2025. All financial projections are ESTIMATES, not historical results. Investing in startups carries significant risk of total capital loss.`
                },
                doc2_section2: {
                    title: '1. THE PROBLEM',
                    content: `**Organic Waste in Mexico:**
* Daily volume: 465,000+ tons/day
* Percentage to landfills: 97%
* Generated methane is 25x more potent than CO2

**Import Dependency:**
* Mexico imports most of its fish meal
* Millions of tons of imported soy for animal feed
* Vulnerability in protein supply chain`
                },
                doc2_section3: {
                    title: '2. THE SOLUTION: METABIOCONVERSION 3.0',
                    content: `LarvaLINK transforms organic waste into high-value products through bioconversion with **Hermetia illucens** (black soldier fly), integrated with:

* **ThermoLINK:** Bioconversion system with passive thermal control
* **TrackLINK:** Blockchain traceability on Global Force
* **METAFEED:** Artificial intelligence for process optimization
* **Industrial IoT:** Sensor network for real-time monitoring

**Aerobic process = ZERO methane emissions**`
                },
                doc2_section4: {
                    title: '3. KEY OPERATIONAL METRICS',
                    content: `| Parameter | Value |
|-----------|-------|
| Feed Conversion Ratio (FCR) | 1.5 to 2.0:1 |
| Bioconversion cycle | 14 days |
| Optimal temperature | 27°C |
| Optimal humidity | 70% |
| Biomass yield | 20-25% of substrate |`
                },
                doc2_section5: {
                    title: '4. PRODUCTS',
                    content: `| Product | Description | Specification |
|---------|-------------|---------------|
| **ProLINK** | Protein meal | 40-45% protein |
| **LipiLINK** | Oil | High lauric acid content |
| **TerraLINK** | Biofertilizer | Natural NPK + chitin |
| **Live larvae** | Pets/fishing | Fresh product |`
                },
                doc2_section6: {
                    title: '5. BUSINESS MODEL: 8 REVENUE STREAMS',
                    content: `1. **ProLINK** (protein meal): Sales to balanced feed manufacturers
2. **LipiLINK** (oil): Cosmetics, pharmaceuticals, food
3. **TerraLINK** (biofertilizer): Agricultural sector
4. **Live larvae:** Exotic pets, sport fishing
5. **Processing services** (tipping fees): Waste disposal fees
6. **Carbon credits:** Avoided methane (High Integrity Offsets)
7. **BaaS TrackLINK:** Blockchain traceability for third parties
8. **Licensing:** MetaBioconversion 3.0 model`
                },
                doc2_section7: {
                    title: '6. TECHNOLOGY STACK',
                    content: `| Component | Status |
|-----------|--------|
| ThermoLINK | ✅ OPERATIONAL |
| TrackLINK | 🔄 IN DEVELOPMENT |
| METAFEED AI | 🔄 IN DEVELOPMENT |
| IoT Sensors | 📦 Hardware acquired |
| Global Force | ✅ Mainnet active 18+ months |`
                },
                doc2_section8: {
                    title: '7. INVESTMENT OPPORTUNITY',
                    content: `**Instrument:** Revenue Participation Units (RPUs)
**NOT EQUITY.** It is participation in gross revenue.

| Concept | Value |
|---------|-------|
| Total RPUs issued | 88 units |
| Price per RPU | USD 11,111 |
| Total round | USD 978,888 |
| Minimum investment | 1 RPU |`
                },
                doc2_section9: {
                    title: '8. FOUNDING TEAM',
                    content: `* **Dr. Roberto Rendón Medel** - CEO
* **Mtro. Ing. Luis Maumejean Navarrete** - CTO
* **Luis E. Maumejean Godoy** - COO`
                },
                doc2_section10: {
                    title: '9. CURRENT STATUS (December 2025)',
                    content: `**ALFA PILOT PLANT**
* Location: Papalotla, State of Mexico
* Operations start: October 11, 2025
* Capacity: 1.5 tons/day
* Phase: Breeding stock development
* Anchor client: Grupo Nutec (LOI signed)

**WHAT WE HAVE TODAY:**
✅ Operational physical facilities
✅ Working team
✅ BSF colonies in development
✅ LOI signed with anchor client
✅ IoT hardware acquired
✅ Access to Global Force infrastructure

**WHAT WE DON'T HAVE YET:**
❌ Active commercial production
❌ Sales made (USD 0)
❌ Transactions on TrackLINK blockchain
❌ IoT sensors installed (Q1 2026)
❌ Certifications (in process)`
                },
                doc2_section11: {
                    title: '10. NEXT STEPS',
                    content: `For interested investors:

1. Request access to complete Data Room
2. Schedule visit to ALFA plant
3. Q&A session with founding team
4. RPU contract review with legal advisor

**Contact:** investors@larvalink.mx`
                },
                // Document 3: Video Pitch
                doc3_section1: {
                    title: '🎬 VIDEO: LARVALINK INTERVIEW',
                    content: `Learn more about the LarvaLINK project in this interview where we explain our vision and technology.

[VIDEO:https://www.youtube.com/embed/wzn90p886Wk]

**Key highlights:**
* Project vision and founding team
* BSF bioconversion technology
* Environmental and social impact
* Growth roadmap`
                },
                doc3_section2: {
                    title: 'VIDEO: BIOCONVERSION DEMONSTRATION TOUR',
                    content: `Our municipality participated in a demonstration tour on organic waste bioconversion at the LarvaLINK pilot plant.

[FACEBOOK:1488251963302744]

**Description:**
This video shows the visit of municipal officials to our BSF bioconversion plant, where they could observe the complete process of organic waste transformation.`
                },
                doc3_section3: {
                    title: '🎙️ PODCAST: LARVALINK & SUSTAINABLE DEVELOPMENT GOALS',
                    content: `**Generated with Google NotebookLM**

Listen to an in-depth analysis of how LarvaLINK contributes to the UN Sustainable Development Goals (SDGs).

[NOTEBOOKLM:https://notebooklm.google.com/notebook/0460aa6e-bc71-4d68-b34d-6f96eae8a011?artifactId=f1b26f4e-1967-4b95-8cba-6ac9ad10b1f3]

This podcast was automatically generated by Google NotebookLM AI, analyzing LarvaLINK's technical and impact documentation.`
                },
                doc3_section4: {
                    title: '📰 FACEBOOK POSTS',
                    content: `Our latest social media updates:

[FBPOST:https://www.facebook.com/61571603422059/posts/122150230556720114/]

[FBPOST:https://www.facebook.com/photo?fbid=122142349112720114&set=pcb.122142349586720114]`
                },
                doc3_section5: {
                    title: 'TRANSCRIPT',
                    content: `> "Hi, I'm Roberto Rendón, CEO of LarvaLINK. We're transforming waste management in Mexico..."

The video covers:
* Pilot plant tour
* ThermoLINK process explanation
* TrackLINK platform demonstration
* Team interviews`
                },
                doc3_section6: {
                    title: 'MORE RESOURCES',
                    content: `To see more multimedia content about LarvaLINK:

* **Facebook:** [@LarvaLINK](https://www.facebook.com/61571603422059)
* **Website:** [larvalink.mx](https://larvalink.mx)

We'll be adding more videos and podcasts generated with NotebookLM soon.`
                },
                // Document 4: Financial Model
                doc4_section1: {
                    title: 'FINANCIAL SUMMARY (BASE SCENARIO)',
                    content: `| Year | Revenue (USD) | EBITDA (USD) | Margin |
|------|---------------|--------------|--------|
| 2026 | $850,000 | -$120,000 | -14% |
| 2027 | $2,400,000 | $650,000 | 27% |
| 2028 | $5,800,000 | $2,100,000 | 36% |
| 2029 | $12,500,000 | $5,200,000 | 41% |
| 2030 | $24,000,000 | $10,800,000 | 45% |`
                },
                doc4_section2: {
                    title: 'KEY ASSUMPTIONS',
                    content: `* **Meal Price:** $1,800 USD/ton
* **Oil Price:** $2,200 USD/ton
* **Substrate Cost:** $0-$10 USD/ton (average)
* **Expansion:** 1 new plant every 18 months`
                },
                // Document 5: P&L YTD
                doc5_section1: {
                    title: 'INCOME STATEMENT',
                    content: `**Revenue:** USD 0 (Pre-revenue)

**Operating Expenses:**
* R&D: $45,000
* Payroll: $60,000
* Pilot Infrastructure: $85,000
* Legal/Admin: $15,000

**Average Monthly Burn Rate:** $18,000 USD`
                },
                // Document 6: Carbon Forecast
                doc6_section1: {
                    title: 'ABATEMENT POTENTIAL',
                    content: `Each ton of organic waste diverted from landfill avoids the emission of ~1.5 to 2.5 tCO2e (mainly methane).

| Year | Waste Processed (tons) | Credits (tCO2e) | Est. Revenue @$15 |
|------|------------------------|-----------------|-------------------|
| 2026 | 5,000 | 7,500 | $112,500 |
| 2027 | 15,000 | 22,500 | $337,500 |
| 2028 | 40,000 | 60,000 | $900,000 |`
                },
                // Document 7: Use of Funds
                doc7_section1: {
                    title: '⚠️ DISCLAIMER',
                    content: `The amounts presented are **PROJECTIONS** based on current estimates. Final allocation may be adjusted according to market conditions and operational needs. LarvaLINK reserves the right to reallocate up to 15% between categories with prior notice to investors.`
                },
                doc7_section2: {
                    title: '1. ROUND SUMMARY',
                    content: `| Concept | Value |
|---------|-------|
| Instrument | Revenue Participation Units (RPUs) |
| Total RPUs issued | 88 units |
| Price per RPU | USD 11,111 |
| Total round (if 100% placed) | USD 978,888 |
| Minimum investment | 1 RPU = USD 11,111 |`
                },
                doc7_section3: {
                    title: '2. GENERAL FUND DISTRIBUTION',
                    content: `| Category | Amount USD | % | Timeline |
|----------|------------|---|----------|
| Infrastructure and Equipment | ~$587,333 | 60% | Q1-Q2 2026 |
| Working Capital (12 months) | ~$244,722 | 25% | Ongoing |
| Technology Development | ~$146,833 | 15% | Q1-Q3 2026 |
| **TOTAL** | **$978,888** | **100%** | **18 months** |`
                },
                doc7_section4: {
                    title: '3. DETAIL: INFRASTRUCTURE AND EQUIPMENT (60%)',
                    content: `| Concept | % of CAPEX |
|---------|------------|
| Breeding and fattening sheds | 35% |
| Processing equipment (screening, drying, rendering) | 25% |
| IoT and automation systems | 15% |
| Civil infrastructure and utilities | 15% |
| Contingency | 10% |`
                },
                doc7_section5: {
                    title: '4. DETAIL: TECHNOLOGY DEVELOPMENT (15%)',
                    content: `* **TrackLINK** (smart contracts, backend, frontend)
* **IoT Sensors** (hardware, installation, integration)
* **METAFEED AI** (predictive model development)
* **Investor dashboard**
* **Smart contract audit** (CertiK or similar)`
                },
                doc7_section6: {
                    title: '5. DETAIL: WORKING CAPITAL (25%)',
                    content: `Projected OPEX for 12 months:

* Operating team payroll
* Operating inputs and materials
* Services (electricity, water, maintenance)
* Logistics and transportation
* Administrative expenses`
                },
                doc7_section7: {
                    title: '6. FUND RELEASE MILESTONES',
                    content: `**PHASE 1: ROUND CLOSE** (40%)
* Condition: RPU contract signatures
* Use: Initial working capital, critical infrastructure

**PHASE 2: FIRST COMMERCIAL SALE** (25%)
* Condition: Collected invoice from client (not LOI)
* Use: Capacity expansion, technology

**PHASE 3: TRACKLINK MVP OPERATIONAL** (20%)
* Condition: First BatchNFT on Global Force mainnet
* Use: Technology scale, certifications

**PHASE 4: TARGET CAPACITY** (15%)
* Condition: Sustained target processing
* Use: Next round preparation, optimization`
                },
                doc7_section8: {
                    title: '7. GOVERNANCE AND TRANSPARENCY',
                    content: `**REPORTS:**
* Monthly: Operational
* Quarterly: Audited financials
* Digital dashboard with 24/7 access

**AUDIT:**
* Annual by independent third party
* Investors can request supporting documentation

**APPROVALS:**
* Investor committee with information rights
* Approval thresholds for major expenses
* Prior notice for significant changes in use of funds`
                },
                // Document 8: Cap Table
                doc8_section1: {
                    title: 'SHARE STRUCTURE',
                    content: `| Shareholder | % Ownership | Role |
|-------------|-------------|------|
| Founders | 85% | Operational |
| Advisors | 5% | Strategic |
| ESOP Pool | 10% | Future Talent |

**Note:** The current round is for RPUs (Revenue Participation Units) and does not dilute the Cap Table.`
                },
                // Document 9: Articles of Incorporation
                doc9_section1: {
                    title: 'INCORPORATION DATA',
                    content: `* **Legal Name:** Rendón Agroenlace S.A. de C.V.
* **Incorporation Date:** March 15, 2024
* **Notary:** Number 128, CDMX
* **Corporate Purpose:** Biotechnology, waste management, agricultural and livestock production.
* **Tax ID:** RAG240315XXX`
                },
                // Document 10: IP Portfolio
                doc10_section1: {
                    title: 'INTELLECTUAL PROPERTY ASSETS',
                    content: `**Registered Trademarks:**
* LarvaLINK® (Class 40, 42, 31)
* ThermoLINK® (In process)
* ProLINK® (In process)

**Trade Secrets:**
* BSF diet formulations
* Passive thermal control algorithm (ThermoLINK)
* METAFEED system architecture

**Software (Copyright):**
* TrackLINK source code
* Smart Contracts (Global Force)`
                },
                // Document 11: SAFE Agreement
                doc11_section1: {
                    title: 'TERMS OF REFERENCE',
                    content: `This document is a **standard template** Y-Combinator SAFE (Post-Money Valuation Cap).

**Proposed Terms (for future Equity rounds):**
* Valuation Cap: USD 5,000,000
* Discount: 20%
* Pro-rata rights: Yes (for tickets over $50k)`
                },
                doc11_section2: {
                    title: 'NOTE ON RPUS',
                    content: `The current round uses **Revenue Participation Units (RPUs)**, not SAFEs. See "Use of Funds" document and specific RPU contract.`
                },
                // Document 12: Environmental Permits
                doc12_section1: {
                    title: 'ALFA PILOT PLANT',
                    content: `**Status:** Full compliance

| Permit | Authority | Status | Validity |
|--------|-----------|--------|----------|
| Operating License | Municipal | ✅ Current | Annual |
| Waste Management Plan | State (Edomex) | ✅ Authorized | 5 years |
| Land Use | Municipal | ✅ Industrial | Indefinite |
| Civil Protection Assessment | Municipal | ✅ Approved | Annual |`
                },
                // Document 13: Carbon Certification
                doc13_section1: {
                    title: 'PROJECT STATUS',
                    content: `**Standard:** Verra (VCS)
**Methodology:** AMP0006 - Reduction of methane emissions from anaerobic digestion of manure (adapted for composting/bioconversion).

**Current Phase:** Pre-feasibility
* Engagement with carbon project developer: Initiated
* PDD (Project Design Document): In drafting
* Third Party Validation: Scheduled Q3 2026`
                },
                // Document 14: Technology Whitepaper
                doc14_section1: {
                    title: 'DEVELOPMENT STATUS',
                    content: `**OPERATIONAL:**
* ALFA pilot plant (since October 11, 2025)
* BSF bioconversion protocols
* Breeding colonies in development
* Access to Global Force infrastructure

**IN DEVELOPMENT:**
* TrackLINK: Blockchain traceability system
* METAFEED AI: Predictive optimization
* Investor dashboard
* IoT Integration: Hardware acquired, installation Q1 2026

**PLANNED:**
* Smart contract audit (Q2 2026)
* ISO/HACCP certifications (Q2-Q4 2026)
* Plant network expansion (2026-2028)`
                },
                doc14_section2: {
                    title: 'PART I: BSF BIOTECHNOLOGY',
                    content: `## Hermetia illucens Biology

**Taxonomy:** Order Diptera, Family Stratiomyidae

**Life cycle:** egg → larva (6 instars) → prepupa → pupa → adult

| Parameter | Optimal Value |
|-----------|---------------|
| Cycle duration | 14 days |
| Temperature | 27°C |
| Relative humidity | 70% |
| Eggs per female | 500-900 |

## Bioconversion Process (8 steps)

1. Substrate reception
2. Pre-treatment and classification
3. Diet formulation
4. Larval feeding
5. Growth monitoring
6. Larvae harvest
7. Post-processing (drying, rendering)
8. Packaging and distribution

## Operational Parameters

| Metric | Value |
|--------|-------|
| FCR (Feed Conversion Ratio) | 1.5 to 2.0:1 |
| Biomass yield | 20-25% of substrate |
| Target mortality | <5% |`
                },
                doc14_section3: {
                    title: 'THERMOLINK SYSTEM',
                    content: `Passive thermal control system that leverages metabolic heat generated by larvae during bioconversion.

**Features:**
* Passive thermal control
* Modular scalable design
* Optimized ventilation
* Status: **OPERATIONAL**`
                },
                doc14_section4: {
                    title: 'PRODUCTS AND SPECIFICATIONS',
                    content: `## ProLINK (Protein Meal)
* Crude protein: 40-45%
* Applications: aquaculture, poultry, swine, pet food

## LipiLINK (Oil)
* High lauric acid content
* Applications: cosmetics, pharmaceuticals, food

## TerraLINK (Frass/Biofertilizer)
* Natural NPK content
* Residual chitin (biopesticide)
* Agricultural applications`
                },
                doc14_section5: {
                    title: 'PART II: BLOCKCHAIN INFRASTRUCTURE',
                    content: `## Global Force Blockchain

| Specification | Value |
|---------------|-------|
| Origin | Swiss Tech Capital AG, Zug |
| Time in production | 18+ months mainnet |
| TPS | High speed |
| Consensus | RBPS (Reputation-Based Proof of Stake) |
| Cost per transaction | Minimal |

**Dual-Layer Architecture:**
* Performance Layer
* Integrity Layer

**Interoperability:**
Bridges with BTC, ETH, SOL, BSC, Polygon, Avalanche`
                },
                doc14_section6: {
                    title: 'TRACKLINK SYSTEM',
                    content: `## Technical Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express.js, PostgreSQL, Prisma |
| Blockchain | Global Force |
| Smart Contracts | Solidity 0.8.x, Hardhat |
| Frontend | React 18, TypeScript, Tailwind, Redux |

## 3-Layer Architecture

1. **Data Ingestion:** IoT → Database
2. **Blockchain Anchor:** Database → Blockchain
3. **Query & Display:** Blockchain + Database → User

## Smart Contracts

* **BatchRegistry:** Processed batch registry
* **ImpactCredits:** Tokenized carbon credits
* **BatchNFT:** Digital passports per batch`
                },
                doc14_section7: {
                    title: 'EUDR COMPLIANCE',
                    content: `**European Union Deforestation Regulation**

TrackLINK is designed to comply with EUDR traceability requirements:

* Automatic Due Diligence Statements
* Traceability from origin to final product
* Compatibility with EU TRACES
* Geolocation of substrate origins`
                },
                doc14_section8: {
                    title: 'PART III: IOT AND ARTIFICIAL INTELLIGENCE',
                    content: `## Sensor Network

| Type | Measurement |
|------|-------------|
| Temperature | BME680 or similar |
| Relative humidity | Ambient |
| Weight | Load cells |
| CO2/gases | MQ series |
| Electrical consumption | Energy monitoring |

## Gateway and Communication

* Hardware: Raspberry Pi / industrial
* Protocols: MQTT, LoRaWAN/4G
* Frequency: Real-time
* Local edge computing

## METAFEED System (AI)

* Substrate classification (computer vision)
* FCR optimization (predictive model)
* Anomaly detection
* Mortality prediction
* **Status: IN DEVELOPMENT**`
                },
                doc14_section9: {
                    title: 'PART IV: COMPETITIVE COMPARISON',
                    content: `## vs BSF Competitors

| Competitor | Funding | Model | Status |
|------------|---------|-------|--------|
| Ynsect (France) | €625M | Megafactory | Financial problems |
| Protix | Significant | Industrial | Operational |
| InnovaFeed | Significant | Industrial | Operational |

## LarvaLINK Technological Moat

* **ONLY** with complete blockchain integration
* Modular model vs megafactories
* BaaS as additional revenue stream
* Institutional relationships in Mexico
* EUDR compliance focus`
                },
                doc14_section10: {
                    title: 'PART V: IMPLEMENTATION',
                    content: `## ALFA Pilot Plant

| Detail | Value |
|--------|-------|
| Location | Papalotla/Tepetlaoxtoc, State of Mexico |
| Operations start | October 11, 2025 |
| Installed capacity | 1.5 tons/day |
| Current phase | Breeding stock development |

## 2026 Roadmap

| Quarter | Milestone |
|---------|-----------|
| Q1 | IoT installation, first commercial production |
| Q2 | TrackLINK MVP, first BatchNFT on mainnet |
| Q3 | METAFEED beta, certifications |
| Q4 | Capacity expansion, next round preparation |`
                },
                // Document 15: Satellite Verification
                doc15_section1: {
                    title: 'DIGITAL MRV WITH SATELLITE IMAGERY',
                    content: `Methodology to verify:
1. Physical existence of plants (infrastructure)
2. Operational activity (thermal signatures)
3. Impact on surrounding area

**Data Sources:**
* Sentinel-2 (Optical)
* Sentinel-1 (SAR Radar)
* Landsat 8/9`
                },
                // Document 16: IoT Architecture
                doc16_section1: {
                    title: 'ARCHITECTURE DIAGRAM',
                    content: `**Level 1: Sensors (Edge)**
* Temperature/Humidity (BME680)
* CO2/NH3 (MQ-135)
* Weight (Load Cells)

**Level 2: Gateway (Fog)**
* Raspberry Pi 4 / Industrial Gateway
* MQTT protocol over WiFi/LoRa

**Level 3: Cloud & Blockchain**
* AWS IoT Core -> Lambda -> RDS
* Hash -> Global Force Blockchain`
                },
                // Document 17: Smart Contract Audit
                doc17_section1: {
                    title: 'FINDINGS SUMMARY',
                    content: `**Status:** Internal Audit + Peer Review

**Critical Vulnerabilities:** 0 found
**Medium Vulnerabilities:** 2 fixed
**Low Vulnerabilities:** 5 (gas optimizations)

**Next Step:** External audit by certified firm (CertiK/OpenZeppelin) in Q2 2026.`
                },
                // Document 18: Tech FAQ
                doc18_section1: {
                    title: 'FREQUENTLY ASKED QUESTIONS',
                    content: `**1. What happens if larvae escape?**
BSF (Hermetia illucens) is not a pest, does not transmit diseases, and does not feed in the adult state. If they escape, they die quickly without causing ecological damage.

**2. How do you control odors?**
The ThermoLINK system maintains aerobic conditions that minimize methane and putrid odor generation. We use active biofilters.

**3. Do you have patents?**
We have protected trade secrets and registered trademarks. We don't patent the basic biological process (it's naturally open source), but rather the specific technological integration.`
                },
                // Document 19: Regulatory FAQ
                doc19_section1: {
                    title: 'REGULATORY COMPLIANCE',
                    content: `**Animal Health (SENASICA):**
We comply with regulations for insect production for animal consumption.

**Environmental License:**
We operate under state regulations for special waste management.

**Social Security:**
All personnel are registered with IMSS and comply with Mexican labor regulations.`
                },
                // Document 20: ESG Report
                doc20_section1: {
                    title: 'IMPACT METRICS',
                    content: `**Environmental (E):**
* Waste diverted: 120 tons (pilot)
* CO2e avoided: 250 tons
* Water saved vs traditional agriculture: 95%

**Social (S):**
* Jobs created: 8 direct
* Community training: 2 workshops delivered

**Governance (G):**
* Blockchain transparency activated
* Ethics committee established`
                },
                // Document 21: Roadmap
                doc21_section1: {
                    title: '🚀 GENERAL VISION',
                    content: `## Our path is clear. The time is now.

LarvaLINK has a defined execution plan to scale from our current pilot plant to an ecosystem of 360 tons/day processing capacity.

[TIMELINE:START]`
                },
                doc21_section2: {
                    title: '📅 DECEMBER 2025',
                    content: `## Seed VIP Round Close

✅ **Sale of the last 45 Seed VIP RPUs**
* Complete initial financing round
* Target capital: ~$500,000 USD additional

✅ **CIDI and ALFA plants financed and assigned**
* Infrastructure secured
* Main equipment acquired
* Land and permits in order`
                },
                doc21_section3: {
                    title: '📅 JANUARY 2026',
                    content: `## Operations Start

🔄 **Start of ALFA Plant ecosystem cycles**
* Capacity: 1 to 5 tons/day
* First breeding colonies established
* Bioconversion cycles initiated
* Full operating team hired`
                },
                doc21_section4: {
                    title: '📅 FEBRUARY - MARCH 2026',
                    content: `## First Commercial Production

🏭 **Start of operation of pilot plant Alfa 1 (4T)**
* Sustained processing of 4 tons/day
* First commercial production of ProLINK and TerraLINK

📊 **Production, traceability and real-time data validated**
* TrackLINK system operational
* IoT integrated and transmitting
* First BatchNFTs on blockchain`
                },
                doc21_section5: {
                    title: '📅 MAY - JUNE 2026',
                    content: `## Preparation for Scale

💰 **Start of search for institutional financing**
* Target: T30 Plant (30 tons/day)
* Pitch preparation for VC/PE funds
* Due diligence documentation ready

🎯 **Capitalization to scale to 30T/day**
* Fundraising goal: Series A
* Target valuation based on real operational metrics`
                },
                doc21_section6: {
                    title: '📅 2026 - 2027',
                    content: `## Massive Scaling

🏗️ **Scaling to 360 Tons/day**
* Deployment of multiple modular plants
* Distributed processing network
* Continuous optimization with METAFEED AI

🌟 **Ecosystem 1 Completed**
* Closed circular economy loop
* Measurable and verified environmental impact
* Carbon credits in production`
                },
                doc21_section7: {
                    title: '📅 FROM 2027 ONWARDS',
                    content: `## Global Expansion

🌎 **International expansion**
* Initial target markets: LATAM, Europe
* Licensing model defined
* Strategic partners identified

📜 **First licenses or ecosystems outside Mexico**
* Replication of proven model
* Exportable technology
* BaaS (Bioconversion as a Service) active`
                },
                doc21_section8: {
                    title: '📈 MILESTONES SUMMARY',
                    content: `| Date | Milestone | Capacity |
|------|-----------|----------|
| Dec 2025 | Seed VIP Close | - |
| Jan 2026 | ALFA cycles start | 1-5 T/day |
| Feb-Mar 2026 | First production | 4 T/day |
| May-Jun 2026 | Series A search | - |
| 2026-2027 | Ecosystem 1 | 360 T/day |
| 2027+ | International Expansion | Unlimited |

**The future of bioconversion starts here.**`
                },
                // Document 22: Future Risks Report
                doc22_section1: {
                    title: '📊 FUTURE RISKS REPORT 2025',
                    content: `## Global Future Risks Analysis

The **AXA Future Risks Report 2025** is one of the most comprehensive studies on global risks, based on surveys of more than 3,500 risk management experts from 57 countries.

This analysis is fundamental to understanding the context in which LarvaLINK operates and how our solutions address several of the identified risks.

[LINK:https://www.axa.com/en/news/future-risks-report-2025|View Complete AXA Report|Future Risks Report 2025 - Official analysis]`
                },
                doc22_section2: {
                    title: '🌡️ CLIMATE CHANGE: RISK #1',
                    content: `## Climate Change remains the top global risk

Climate change remains the **#1 risk** for both experts and the general population. Mexico ranks **#2** in most concerned countries.

**LarvaLINK is part of the solution:**
* Reduction of methane emissions from organic waste
* Capture and verification of carbon credits
* Circular economy that displaces intensive production

[IMG:/images/future-risks/climate-change.png]`
                },
                doc22_section3: {
                    title: '📈 TOP 10 GLOBAL RISKS 2020-2025',
                    content: `## Evolution of the main global risks

The following visualization shows how the top 10 global risks have evolved over the past 5 years:

[IMG:/images/future-risks/global-risks-timeline.jpg]

**Key trends:**
* Climate change consistently at #1 since 2021
* Cybersecurity rising rapidly
* Geopolitical instability increasing
* AI and Big Data emerging as new risk`
                },
                doc22_section4: {
                    title: '🌎 RISKS BY GEOGRAPHIC REGION',
                    content: `## Regional risk perspective 2025

Risks vary significantly by geographic region:

[IMG:/images/future-risks/risks-by-geography.png]

**Americas:**
1. Climate change
2. Cybersecurity  
3. AI and Big Data

**Relevance for LarvaLINK:** Our operations in Mexico are in a region where climate change is the #1 concern.`
                },
                doc22_section5: {
                    title: '📋 COMPARISON: EXPERTS VS POPULATION',
                    content: `## What do experts think vs the general population?

The report compares the perceptions of risk management experts with the general population:

[IMG:/images/future-risks/axa-top10-comparison.png]

**Key insights:**
* Experts prioritize geopolitical instability (#2)
* General population is more concerned about security threats (#2)
* Both groups agree that climate change is the #1 risk
* Women give higher priority to health risks`
                },
                doc22_section6: {
                    title: '🔗 RELEVANCE FOR LARVALINK',
                    content: `## How LarvaLINK mitigates global risks

Our solution directly addresses several of the main identified risks:

| Global Risk | How LarvaLINK Contributes |
|-------------|---------------------------|
| **Climate Change** | GHG reduction, verified carbon credits |
| **Natural Resources** | Circular economy, waste valorization |
| **Food Security** | Sustainable animal protein production |
| **Pandemics** | Vector elimination in organic waste |

[LINK:https://www.axa.com/en/news/future-risks-report-2025|Download Complete Report|Official AXA Future Risks Report 2025 PDF]`
                }
            }
        },
        // Partners Hub
        partners: {
            circularEconomy: "Circular Economy",
            title: "CircularLINK Partners",
            subtitle: "Ecosystem of certified businesses and consumers committed to circular economy",
            stats: {
                activePartners: "Active Partners",
                kgTraced: "kg traced",
                co2Avoided: "kg CO2 avoided",
                consumers: "Consumers",
                donated: "Donated"
            },
            explore: "Explore the Ecosystem",
            map: {
                title: "Partners Map",
                desc: "Explore 127+ certified businesses across Mexico"
            },
            impact: {
                title: "My Impact",
                desc: "Seeds, achievements and rewards for your sustainable purchases"
            },
            dashboard: {
                title: "Partner Dashboard",
                desc: "Metrics, deliveries and access to your QR code"
            },
            scanDemo: {
                title: "QR Scan Demo",
                desc: "Try the consumer experience"
            },
            cta: {
                haveBusiness: "Have a business?",
                joinNetwork: "Join the network of businesses committed to sustainability",
                register: "Register my business"
            }
        },
        // Marketplace
        marketplace: {
            title: "Impact Marketplace",
            subtitle: "Acquire verified environmental assets directly from bioconversion plants.",
            myPortfolio: "My Portfolio",
            volume24h: "24h Volume",
            avgPrice: "Avg Price (Carbon)",
            availableCredits: "Available Credits",
            activePlants: "Active Plants",
            searchPlaceholder: "Search by plant, country or ID...",
            sortBy: "Sort by:",
            sortOptions: {
                recommended: "Recommended",
                priceLow: "Price: Low to High",
                priceHigh: "Price: High to Low",
                ratingHigh: "Rating: High to Low",
                recent: "Recent"
            }
        },
        // Investor Portal Page
        investorPage: {
            title: "Investor Portal",
            welcome: "Welcome,",
            lastUpdate: "Last update",
            goToDataRoom: "Go to Data Room",
            verifiedImpact: "Verified Impact",
            blockchainTitle: "Blockchain Traceability",
            blockchainDesc: "Each ton of CO2 and waste is tokenized and recorded on Polygon.",
            viewExplorer: "View in Explorer",
            sdgTitle: "Contribution to Sustainable Development Goals",
            footer: {
                confidential: "Confidential",
                irSupport: "IR Support",
                privacy: "Privacy",
                terms: "Terms"
            }
        }
    }
};
