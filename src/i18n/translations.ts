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
