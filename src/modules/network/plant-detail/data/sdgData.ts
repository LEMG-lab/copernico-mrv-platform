import { SDGContribution } from "../types/plantDetail.types";

export const SDG_DATA: Record<number, {
    number: number;
    name: string;
    color: string;
    icon: string; // Lucide icon name
    description: string;
}> = {
    1: {
        number: 1,
        name: "Fin de la Pobreza",
        color: "#E5243B",
        icon: "users",
        description: "Poner fin a la pobreza en todas sus formas"
    },
    2: {
        number: 2,
        name: "Hambre Cero",
        color: "#DDA63A",
        icon: "wheat",
        description: "Poner fin al hambre, lograr seguridad alimentaria"
    },
    3: {
        number: 3,
        name: "Salud y Bienestar",
        color: "#4C9F38",
        icon: "heart-pulse",
        description: "Garantizar una vida sana y promover el bienestar"
    },
    4: {
        number: 4,
        name: "Educacion de Calidad",
        color: "#C5192D",
        icon: "graduation-cap",
        description: "Garantizar educacion inclusiva y equitativa de calidad"
    },
    5: {
        number: 5,
        name: "Igualdad de Genero",
        color: "#FF3A21",
        icon: "equal",
        description: "Lograr la igualdad de genero y empoderar a mujeres"
    },
    6: {
        number: 6,
        name: "Agua Limpia y Saneamiento",
        color: "#26BDE2",
        icon: "droplets",
        description: "Garantizar disponibilidad y gestion sostenible del agua"
    },
    8: {
        number: 8,
        name: "Trabajo Decente y Crecimiento",
        color: "#A21942",
        icon: "briefcase",
        description: "Promover crecimiento economico sostenido e inclusivo"
    },
    9: {
        number: 9,
        name: "Industria, Innovacion e Infraestructura",
        color: "#FD6925",
        icon: "factory",
        description: "Construir infraestructura resiliente y fomentar innovacion"
    },
    10: {
        number: 10,
        name: "Reduccion de las Desigualdades",
        color: "#DD1367",
        icon: "scale",
        description: "Reducir la desigualdad en y entre los paises"
    },
    11: {
        number: 11,
        name: "Ciudades y Comunidades Sostenibles",
        color: "#FD9D24",
        icon: "building-2",
        description: "Lograr ciudades y asentamientos inclusivos y sostenibles"
    },
    12: {
        number: 12,
        name: "Produccion y Consumo Responsables",
        color: "#BF8B2E",
        icon: "recycle",
        description: "Garantizar modalidades de consumo y produccion sostenibles"
    },
    13: {
        number: 13,
        name: "Accion por el Clima",
        color: "#3F7E44",
        icon: "cloud-sun",
        description: "Adoptar medidas urgentes para combatir el cambio climatico"
    },
    14: {
        number: 14,
        name: "Vida Submarina",
        color: "#0A97D9",
        icon: "fish",
        description: "Conservar y utilizar sosteniblemente los oceanos y mares"
    },
    15: {
        number: 15,
        name: "Vida de Ecosistemas Terrestres",
        color: "#56C02B",
        icon: "trees",
        description: "Proteger, restaurar y promover uso sostenible de ecosistemas"
    },
    17: {
        number: 17,
        name: "Alianzas para Lograr los Objetivos",
        color: "#19486A",
        icon: "handshake",
        description: "Fortalecer los medios de implementacion y alianzas"
    }
};

export const LARVALINK_SDG_CONTRIBUTIONS: SDGContribution[] = [
    {
        sdg_number: 1,
        sdg_name: "Fin de la Pobreza",
        sdg_icon_color: "#E5243B",
        contribution_description: "LarvaLINK genera empleo e ingresos en comunidades donde se instalan las plantas y cadenas de suministro. El modelo descentralizado permite que comunidades rurales y periurbanas participen activamente en la economia circular, creando fuentes de ingreso formal donde antes no existian.",
        metrics: [
            { indicator: "Empleos directos creados", value: "25+", unit: "por planta comercial" },
            { indicator: "Empleos indirectos", value: "100+", unit: "por planta comercial" },
            { indicator: "Comunidades beneficiadas", value: "8", unit: "comunidades" }
        ],
        is_primary: false
    },
    {
        sdg_number: 2,
        sdg_name: "Hambre Cero",
        sdg_icon_color: "#DDA63A",
        contribution_description: "La produccion de proteina alternativa (ProLINK) e insumos agricolas como biofertilizantes (TerraLINK) fortalece la seguridad alimentaria. Una planta de 30 toneladas por dia produce aproximadamente 535 toneladas anuales de proteina sostenible y 2,190 toneladas de fertilizante organico.",
        metrics: [
            { indicator: "Proteina producida anual", value: "535", unit: "toneladas" },
            { indicator: "Fertilizante organico anual", value: "2,190", unit: "toneladas" },
            { indicator: "Agricultores beneficiados", value: "45+", unit: "productores" }
        ],
        is_primary: true
    },
    {
        sdg_number: 3,
        sdg_name: "Salud y Bienestar",
        sdg_icon_color: "#4C9F38",
        contribution_description: "Al retirar residuos organicos de rellenos sanitarios y tiraderos, LarvaLINK elimina focos de infeccion, reduce emisiones de metano dañinas para la salud respiratoria, y produce alimentos con trazabilidad blockchain que garantizan inocuidad verificable.",
        metrics: [
            { indicator: "Residuos retirados de rellenos", value: "10,950", unit: "tons/año" },
            { indicator: "Focos de infeccion eliminados", value: "Multiples", unit: "sitios" },
            { indicator: "Trazabilidad de productos", value: "100%", unit: "blockchain" }
        ],
        is_primary: false
    },
    {
        sdg_number: 4,
        sdg_name: "Educacion de Calidad",
        sdg_icon_color: "#C5192D",
        contribution_description: "A traves de programas de formacion tecnica, vinculacion con universidades como la Universidad Autonoma Chapingo, y el Centro de Investigacion, Desarrollo e Innovacion (CIDI), LarvaLINK desarrolla capital humano especializado en biotecnologia, blockchain e IoT.",
        metrics: [
            { indicator: "Alianzas academicas", value: "3+", unit: "universidades" },
            { indicator: "Horas de capacitacion", value: "2,400+", unit: "horas/año" },
            { indicator: "Becarios formados", value: "12+", unit: "estudiantes" }
        ],
        is_primary: false
    },
    {
        sdg_number: 5,
        sdg_name: "Igualdad de Genero",
        sdg_icon_color: "#FF3A21",
        contribution_description: "El proyecto contempla una fuerza laboral con 70% de participacion femenina, con programas de capacitacion e inclusion en todas las etapas operativas, desde la operacion de planta hasta roles tecnicos especializados.",
        metrics: [
            { indicator: "Participacion femenina", value: "70%", unit: "de la fuerza laboral" },
            { indicator: "Mujeres en roles tecnicos", value: "45%", unit: "de posiciones" },
            { indicator: "Programas de inclusion", value: "3", unit: "programas activos" }
        ],
        is_primary: false
    },
    {
        sdg_number: 6,
        sdg_name: "Agua Limpia y Saneamiento",
        sdg_icon_color: "#26BDE2",
        contribution_description: "El manejo adecuado de residuos organicos reduce significativamente la generacion de lixiviados que contaminan mantos acuiferos. Ademas, existen proyectos piloto para tratamiento de sargazo y lirio acuatico que afectan cuerpos de agua.",
        metrics: [
            { indicator: "Lixiviados evitados", value: "Significativo", unit: "reduccion" },
            { indicator: "Proyectos de bioremediacion", value: "2", unit: "pilotos activos" },
            { indicator: "Agua ahorrada", value: "125,000+", unit: "m3/año" }
        ],
        is_primary: false
    },
    {
        sdg_number: 8,
        sdg_name: "Trabajo Decente y Crecimiento Economico",
        sdg_icon_color: "#A21942",
        contribution_description: "LarvaLINK genera empleos formales con salarios 4.8 veces superiores al minimo, desarrolla proveedores locales y crea nuevas cadenas de valor. La planta ALFA genera 8 empleos directos; una planta comercial de 30 toneladas por dia genera 25 empleos directos y mas de 100 indirectos.",
        metrics: [
            { indicator: "Salario vs minimo", value: "4.8x", unit: "veces superior" },
            { indicator: "Empleos directos (30 t/d)", value: "25", unit: "empleos" },
            { indicator: "Empleos indirectos", value: "100+", unit: "empleos" },
            { indicator: "Proveedores locales", value: "78%", unit: "compras locales" }
        ],
        is_primary: true
    },
    {
        sdg_number: 9,
        sdg_name: "Industria, Innovacion e Infraestructura",
        sdg_icon_color: "#FD6925",
        contribution_description: "El proyecto representa tecnologia Deep Tech integrando bioconversion con blockchain, inteligencia artificial e IoT. La infraestructura modular con trazabilidad digital establece estandares replicables para la industria de bioconversion en Mexico y Latinoamerica.",
        metrics: [
            { indicator: "Tecnologias integradas", value: "4", unit: "BSF, Blockchain, AI, IoT" },
            { indicator: "Patentes en proceso", value: "2", unit: "solicitudes" },
            { indicator: "Transacciones blockchain", value: "15,000+", unit: "TPS capacidad" }
        ],
        is_primary: true
    },
    {
        sdg_number: 10,
        sdg_name: "Reduccion de las Desigualdades",
        sdg_icon_color: "#DD1367",
        contribution_description: "A traves de las Fundaciones +1 A.C. y FRQTAL, LarvaLINK garantiza la participacion de comunidades vulnerables y pueblos originarios en la economia circular, con transparencia de donaciones verificada mediante blockchain.",
        metrics: [
            { indicator: "Fundaciones activas", value: "2", unit: "+1 A.C. y FRQTAL" },
            { indicator: "Comunidades indigenas", value: "3+", unit: "participantes" },
            { indicator: "Donaciones verificadas", value: "100%", unit: "en blockchain" }
        ],
        is_primary: false
    },
    {
        sdg_number: 11,
        sdg_name: "Ciudades y Comunidades Sostenibles",
        sdg_icon_color: "#FD9D24",
        contribution_description: "Al procesar residuos organicos municipales, LarvaLINK reduce la basura en rellenos, elimina olores y mejora la gestion de residuos urbanos. En Mexico se generan 465,000 toneladas diarias de desechos organicos que actualmente saturan la infraestructura municipal.",
        metrics: [
            { indicator: "Residuos municipales Mexico", value: "465,000", unit: "tons/dia" },
            { indicator: "Capacidad de procesamiento", value: "30+", unit: "tons/dia por planta" },
            { indicator: "Reduccion de olores", value: "95%+", unit: "en zona de planta" }
        ],
        is_primary: false
    },
    {
        sdg_number: 12,
        sdg_name: "Produccion y Consumo Responsables",
        sdg_icon_color: "#BF8B2E",
        contribution_description: "Este es uno de los ODS centrales del proyecto. LarvaLINK materializa la economia circular al transformar residuos en productos utiles con trazabilidad de extremo a extremo. Una planta de 30 toneladas por dia convierte 10,950 toneladas anuales de residuos en recursos valiosos.",
        metrics: [
            { indicator: "Residuos convertidos/año", value: "10,950", unit: "toneladas" },
            { indicator: "Tasa de circularidad", value: "94%", unit: "de materiales" },
            { indicator: "Productos generados", value: "5+", unit: "lineas de producto" },
            { indicator: "Trazabilidad blockchain", value: "100%", unit: "end-to-end" }
        ],
        is_primary: true
    },
    {
        sdg_number: 13,
        sdg_name: "Accion por el Clima",
        sdg_icon_color: "#3F7E44",
        contribution_description: "El impacto climatico es cuantificable y verificable: una planta de 30 toneladas por dia evita 9,165 toneladas de CO2 equivalente por año, lo que representa una reduccion del 93% respecto al escenario sin intervencion. Esto equivale a retirar casi 2,000 vehiculos de circulacion o plantar cerca de 150,000 arboles maduros.",
        metrics: [
            { indicator: "CO2eq evitado/año", value: "9,165", unit: "toneladas" },
            { indicator: "Reduccion vs baseline", value: "93%", unit: "de emisiones" },
            { indicator: "Equivalente vehiculos", value: "2,000", unit: "autos retirados" },
            { indicator: "Equivalente arboles", value: "150,000", unit: "arboles plantados" }
        ],
        is_primary: true
    },
    {
        sdg_number: 14,
        sdg_name: "Vida Submarina",
        sdg_icon_color: "#0A97D9",
        contribution_description: "LarvaLINK mitiga residuos que terminan en rios y mares, y desarrolla proyectos especificos para bioconversion de sargazo y lirio acuatico. Ademas, la proteina de insecto reduce la presion sobre la sobrepesca utilizada para harina de pescado en acuacultura.",
        metrics: [
            { indicator: "Proyectos marinos", value: "2", unit: "sargazo y lirio" },
            { indicator: "Reduccion sobrepesca", value: "Significativa", unit: "alternativa a harina pescado" },
            { indicator: "Residuos evitados en mares", value: "Toneladas", unit: "anuales" }
        ],
        is_primary: false
    },
    {
        sdg_number: 15,
        sdg_name: "Vida de Ecosistemas Terrestres",
        sdg_icon_color: "#56C02B",
        contribution_description: "TerraLINK (biofertilizante) regenera suelos degradados, mejorando su estructura, retencion hidrica y fertilidad natural. El frass es rico en nitrogeno, fosforo, potasio, materia organica y quitina, que promueve la salud radicular y la actividad microbiana benefica.",
        metrics: [
            { indicator: "Hectareas regeneradas", value: "500+", unit: "hectareas" },
            { indicator: "Mejora NDVI promedio", value: "32%", unit: "incremento" },
            { indicator: "Contenido NPK del frass", value: "4-3-3", unit: "ratio" },
            { indicator: "Materia organica", value: "45%+", unit: "contenido" }
        ],
        is_primary: true
    },
    {
        sdg_number: 17,
        sdg_name: "Alianzas para Lograr los Objetivos",
        sdg_icon_color: "#19486A",
        contribution_description: "LarvaLINK opera mediante alianzas estrategicas con gobiernos (CONAGUA, SENASICA, SEMARNAT), academia (Universidad Autonoma Chapingo, Academia Mexicana de Ingenieria), empresas (Grupo Nutec), fundaciones y comunidades. El modelo de gobernanza incluye participacion de multiples actores del ecosistema.",
        metrics: [
            { indicator: "Alianzas gubernamentales", value: "3+", unit: "instituciones" },
            { indicator: "Alianzas academicas", value: "2+", unit: "universidades" },
            { indicator: "Alianzas empresariales", value: "5+", unit: "empresas" },
            { indicator: "Actores en gobernanza", value: "Multiples", unit: "stakeholders" }
        ],
        is_primary: false
    }
];
