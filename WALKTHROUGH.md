# 🦟 LARVALINK-MRV ECOSYSTEM WALKTHROUGH

## Complete Technical & Functional Documentation

**Last Updated:** 2026-01-13
**Version:** 3.0 (MetaBioconversión)
**Status:** ✅ Production Live

---

## 📍 DEPLOYMENT & ACCESS

| Environment | URL | Status |
|-------------|-----|--------|
| **Production** | <https://larvalink-mrv.netlify.app> | ✅ Live |
| **Local Dev** | <http://localhost:3000> | ✅ Active |
| **GitHub** | <https://github.com/LEMG-lab/copernico-mrv-platform> | ✅ Main |
| **Netlify Admin** | <https://app.netlify.com/projects/larvalink-mrv> | ✅ Active |

---

## 🏗️ TECH STACK

### Frontend

- **Framework:** React 18.3 + TypeScript 5.7
- **Build Tool:** Vite 6.x
- **Styling:** TailwindCSS 3.4
- **Routing:** React Router DOM 7.x
- **State Management:** Zustand 5.x
- **Charts:** Recharts 3.x
- **Maps:** Leaflet + React-Leaflet 4.x
- **Animations:** CSS Keyframes (custom)

### Backend & Services

- **Database:** Supabase (PostgreSQL + PostGIS)
- **Authentication:** Supabase Auth (currently bypassed for demo)
- **Satellite Data:** Copernicus Sentinel Hub API
- **Storage:** Supabase Storage
- **Hosting:** Netlify CDN

### External APIs

- **Sentinel Hub** - NDVI, satellite imagery, statistics
- **Google Maps** - Street View integration
- **OpenStreetMap** - Base maps via Leaflet

---

## 📁 PROJECT STRUCTURE

```
/Users/lemg/.gemini/antigravity/scratch/LarvaLINK-MRV/
├── src/
│   ├── api/                    # API clients & config
│   │   ├── config.ts           # API endpoints, map defaults
│   │   ├── auth.ts             # Copernicus OAuth
│   │   ├── stac.ts             # STAC catalog queries
│   │   └── supabase.ts         # Supabase client
│   │
│   ├── components/             # Shared UI components
│   │   ├── Navigation.tsx      # Global nav with language toggle
│   │   ├── ModuleCard.tsx      # Dashboard module cards
│   │   ├── ExecutiveSummary.tsx# Investor summary section
│   │   ├── Header/             # Site header
│   │   ├── Sidebar/            # Collapsible sidebar
│   │   └── SynapticBackground.tsx # Animated background
│   │
│   ├── modules/                # Feature modules (main content)
│   │   ├── terralink-impact/   # 🛰️ Satellite verification
│   │   ├── emissions-calculator/# 💨 Methane calculations
│   │   ├── global-network/     # 🌍 BSF plant map
│   │   ├── marketplace/        # 🪙 Credit trading
│   │   ├── plant-onboarding/   # 📝 Registration wizard
│   │   ├── viability-calculator/# 📊 Project analysis
│   │   ├── investor-portal/    # 💼 LP dashboard
│   │   ├── alerts-system/      # 🔔 Compliance alerts
│   │   ├── circular-partners/  # 🤝 B2C partner network
│   │   └── network/plant-detail/# 🏭 Plant detail views
│   │
│   ├── pages/                  # Route entry points
│   │   ├── InvestorDashboard.tsx # Home page
│   │   ├── MRVDashboard.tsx    # Legacy MRV view
│   │   └── HomePage/           # Alternative home
│   │
│   ├── stores/                 # Zustand state stores
│   │   ├── uiStore.ts          # Theme, language, UI state
│   │   ├── appStore.ts         # Auth, search, notifications
│   │   └── networkStore.ts     # Network data state
│   │
│   ├── services/               # Business logic services
│   │   └── mrvService.ts       # Sentinel Hub API wrapper
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useCopernicus.ts    # Satellite data hook
│   │
│   ├── i18n/                   # Internationalization
│   │   └── translations.ts     # ES/EN translations
│   │
│   ├── lib/                    # Utilities
│   │   └── supabase.ts         # Supabase client init
│   │
│   ├── types/                  # TypeScript definitions
│   │   ├── index.ts            # Main type exports
│   │   └── mrv.ts              # MRV-specific types
│   │
│   ├── constants/              # Static data
│   │   ├── locations.ts        # Geo coordinates
│   │   └── agricultureEvalscripts.ts # NDVI scripts
│   │
│   ├── App.tsx                 # Main router
│   ├── main.tsx                # Entry point + ErrorBoundary
│   └── index.css               # Global styles
│
├── db/                         # Database schemas
│   ├── schema.sql              # Core tables
│   ├── schema_full_ecosystem.sql
│   ├── schema_circular_partners.sql
│   └── seed*.sql               # Seed data
│
├── scripts/                    # Utility scripts
│   ├── seedCircularPartners.ts
│   └── testBackend.ts
│
├── public/                     # Static assets
├── dist/                       # Production build
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── AUDIT.md                    # Audit documentation
```

---

## 🧭 ROUTING MAP

```typescript
// App.tsx - All routes
<Routes>
  {/* Main Dashboard */}
  <Route path="/" element={<InvestorDashboard />} />
  
  {/* Core Modules */}
  <Route path="/terralink" element={<TerraLinkDashboard />} />
  <Route path="/emissions" element={<EmissionsCalculatorDashboard />} />
  <Route path="/network" element={<GlobalNetworkDashboard />} />
  <Route path="/network/plant/:id" element={<PlantDetailPage />} />
  <Route path="/marketplace" element={<MarketplacePage />} />
  <Route path="/marketplace/seller" element={<SellerDashboard />} />
  <Route path="/plant-onboarding" element={<OnboardingWizard />} />
  <Route path="/viability" element={<ViabilityCalculatorPage />} />
  <Route path="/investor-portal" element={<InvestorPortalPage />} />
  <Route path="/data-room" element={<DataRoomPage />} />
  <Route path="/alerts" element={<AlertsPage />} />
  
  {/* CircularLINK Partners */}
  <Route path="/partners" element={<PartnersMapPage />} />
  <Route path="/partners/:slug" element={<PartnerDetailPage />} />
  <Route path="/scan/:code" element={<ConsumerScanPage />} />
  <Route path="/dashboard/partner" element={<PartnerDashboardPage />} />
  <Route path="/mi-impacto" element={<ConsumerPortalPage />} />
  
  {/* Legacy */}
  <Route path="/mrv" element={<MRVDashboard />} />
</Routes>
```

---

## 📦 MODULE DEEP DIVES

---

### 1. 🏠 HOME / INVESTOR DASHBOARD

**Route:** `/`
**File:** `src/pages/InvestorDashboard.tsx`

#### Purpose

Landing page for investors showing high-level metrics and access to all modules.

#### Key Features

- **Hero Section:** "MetaBioconversión 3.0" branding with animated background
- **Executive Summary:** Investment thesis explanation
- **Live Stats:** Plants active, waste processed, CO2eq avoided, NDVI improvement
- **Module Grid:** 9 clickable cards linking to each module

#### Data Sources

- Static translations from `i18n/translations.ts`
- Stats are currently hardcoded (would connect to Supabase aggregates)

#### Components Used

- `Navigation` - Top nav bar with language/theme toggles
- `ExecutiveSummary` - Investor pitch section
- `ModuleCard` - Clickable module links
- `SynapticBackground` - Animated neural network background

#### Connections

- Links to ALL other modules
- Uses `useUIStore` for language/theme state

---

### 2. 🛰️ TERRALINK IMPACT (COPERNICUS)

**Route:** `/terralink`
**File:** `src/modules/terralink-impact/TerraLinkDashboard.tsx`

#### Purpose

Satellite-based verification of soil regeneration using Copernicus Sentinel-2 data. Compares NDVI (vegetation index) between LarvaLINK-treated parcels and control parcels.

#### Key Features

- **Parcel Map:** Interactive Leaflet map showing test parcels
- **NDVI Comparison:** Side-by-side satellite images with NDVI values
- **Phenological Timeline:** 6-month NDVI evolution chart
- **Improvement Metrics:** NDVI delta, moisture retention, biomass increase
- **Blockchain Hash:** SHA-256 verification hash for audit trail

#### Data Flow

```
terralinkService.getParcels() 
  → Supabase 'parcels' table (or DEMO_PARCELS fallback)
  → parcelAnalysisService.compareParcels()
    → mrvService.getNDVIStats() (Sentinel Hub API)
    → Generate time series with growth simulation
  → Display in ParcelComparison component
```

#### Files

- `TerraLinkDashboard.tsx` - Main dashboard
- `hooks/useNDVIComparison.ts` - Data fetching hook
- `services/terralinkService.ts` - Parcel data from Supabase
- `services/parcelAnalysisService.ts` - NDVI analysis logic
- `components/ParcelComparison.tsx` - Comparison UI
- `components/ParcelMap.tsx` - Leaflet map
- `components/NDVITimeSeries.tsx` - Recharts timeline
- `components/ImprovementMetrics.tsx` - Delta stats
- `components/VerificationBadge.tsx` - Blockchain hash display
- `types/parcel.types.ts` - Type definitions + DEMO_PARCELS

#### External APIs

- **Sentinel Hub Process API** - NDVI imagery
- **Sentinel Hub Statistics API** - Mean NDVI values

#### Demo Fallback

When Supabase has no parcels, uses hardcoded `DEMO_PARCELS`:

- Parcela A - TerraLINK (test): Tlaxcala region
- Parcela B - Control: Adjacent control plot

---

### 3. 💨 EMISSIONS CALCULATOR

**Route:** `/emissions`
**File:** `src/modules/emissions-calculator/EmissionsCalculatorDashboard.tsx`

#### Purpose

Calculate methane (CH4) emissions avoided by diverting organic waste from landfills to BSF bioconversion. Uses IPCC 2019 methodology with GWP20 factors.

#### Key Features

- **Plant Selector:** Dropdown to select LarvaLINK plant
- **Waste Input:** Configure waste types and tonnage
- **Real-time Calculation:** CH4 avoided based on waste composition
- **Carbon Credits:** Estimated VCU/tCO2eq generation
- **Methodology Panel:** Scientific explanation

#### Calculation Formula

```
CH4_avoided = Σ(waste_tonnage × DOC × DOC_f × MCF × 16/12 × GWP20)

Where:
- DOC = Degradable Organic Carbon (varies by waste type)
- DOC_f = Fraction of DOC that decomposes (0.5-0.8)
- MCF = Methane Correction Factor (0.4-1.0 based on landfill type)
- GWP20 = 80 (20-year Global Warming Potential for CH4)
```

#### Files

- `EmissionsCalculatorDashboard.tsx` - Main UI
- `components/PlantSelector.tsx` - Plant dropdown
- `components/WasteInputForm.tsx` - Waste configuration
- `components/EmissionsResults.tsx` - Results display
- `components/MethodologyPanel.tsx` - Scientific docs
- `hooks/useEmissionsCalculation.ts` - Calculation logic
- `services/emissionsService.ts` - Calculation service
- `services/methaneService.ts` - CH4 specific calculations
- `types/emissions.types.ts` - Type definitions

#### Data Sources

- Plant list from `global-network/data/larvalinkPlants.ts`
- Emission factors from IPCC 2019 defaults

---

### 4. 🌍 GLOBAL BSF NETWORK

**Route:** `/network`
**File:** `src/modules/global-network/GlobalNetworkDashboard.tsx`

#### Purpose

Interactive world map showing all BSF (Black Soldier Fly) bioconversion plants globally. Includes LarvaLINK plants, partners, and third-party operators.

#### Key Features

- **Interactive Map:** Leaflet with clustered markers
- **Plant Types:**
  - 🟢 LarvaLINK Owned/Operated
  - 🔵 Partner Plants
  - ⚪ Third-party BSF operators
  - 🟡 Methane Hotspots (opportunity detection)
- **Filters:** By status, region, capacity
- **Global Stats:** Total plants, capacity, CO2eq impact
- **Click Navigation:** Click plant → Plant Detail page

#### Data Flow

```
networkService.getPlants()
  → Combine LARVALINK_PLANTS + PARTNER_PLANTS + external data
  → GlobalMap renders markers
  → Click → Navigate to /network/plant/:id
```

#### Files

- `GlobalNetworkDashboard.tsx` - Main dashboard
- `components/GlobalMap.tsx` - Leaflet map with markers
- `components/StreetViewViewer.tsx` - Google Street View modal
- `components/NetworkStats.tsx` - Summary statistics
- `components/PlantFilters.tsx` - Filter controls
- `data/larvalinkPlants.ts` - LarvaLINK plant data (75 plants)
- `data/globalPlants.ts` - Aggregated plant list
- `services/networkService.ts` - Data service
- `types/network.types.ts` - Type definitions

#### Plant Data Example

```typescript
{
  id: "ll-045",
  name: "LarvaLINK Tepetloztoc",
  country: "Mexico",
  city: "Tepetloztoc de Hidalgo",
  coordinates: [-98.8184, 19.5595],
  capacity_tons_day: 50,
  status: "operativa",
  co2eq_avoided_ytd: 2847,
  verified: true,
  blockchain_hash: "0x7f3a2c1..."
}
```

---

### 5. 🏭 PLANT DETAIL VIEW

**Route:** `/network/plant/:id`
**File:** `src/modules/network/plant-detail/PlantDetailPage.tsx`

#### Purpose

Detailed view of a single bioconversion plant with operational metrics, environmental impact, and SDG contributions.

#### Key Sections

1. **Header:** Plant name, status badge, capacity
2. **Location Section:**
   - Interactive map with plant pin
   - Address, coordinates
   - Street View integration
3. **Corporate Info:** Company name, RFC, contact, website
4. **Control Center:**
   - Temperature gauges (35 zones)
   - Humidity monitoring
   - Real-time sensor data
5. **Inventory:** Larvae stock, frass production
6. **Staffing:** Employee count, gender diversity (70% women)
7. **Gallery:** Facility photos
8. **Metrics Section:** Production KPIs
9. **Blockchain Verification:** Hash + timestamp
10. **SDG Section:** 15 of 17 UN SDG contributions

#### Files

- `PlantDetailPage.tsx` - Main page
- `components/PlantHeader.tsx` - Header with status
- `components/LocationSection.tsx` - Map embed
- `components/MapWithStreetView.tsx` - Leaflet + Street View
- `components/CorporateInfo.tsx` - Company details
- `components/PlantEnvironment.tsx` - Temp/humidity gauges
- `components/PlantInventory.tsx` - Stock levels
- `components/PlantStaffing.tsx` - Employee info
- `components/PlantGallery.tsx` - Photo gallery
- `components/MetricsSection.tsx` - KPI cards
- `components/BlockchainVerification.tsx` - Hash display
- `components/SDGSection.tsx` - SDG grid
- `components/SDGCard.tsx` - Individual SDG tile
- `components/SDGDetailModal.tsx` - SDG detail popup
- `data/mockPlantData.ts` - Mock plant: MOCK_PLANT_TEPETLOZTOC
- `data/sdgData.ts` - SDG definitions + progress
- `types/plantDetail.types.ts` - Type definitions

#### SDG Tracking (15 Active)

- SDG 1: No Poverty (job creation)
- SDG 2: Zero Hunger (protein production)
- SDG 5: Gender Equality (70% women workforce)
- SDG 8: Decent Work
- SDG 12: Responsible Consumption
- SDG 13: Climate Action (CH4 avoided)
- SDG 15: Life on Land (soil regeneration)
- ...and 8 more

---

### 6. 🪙 MARKETPLACE

**Route:** `/marketplace`
**File:** `src/modules/marketplace/MarketplacePage.tsx`

#### Purpose

Trading platform for verified environmental credits generated by the LarvaLINK network.

#### Credit Types

| Credit | Description | Price Range |
|--------|-------------|-------------|
| **CarbonLINK** | Verified carbon offsets (VCU) | $12-35/ton |
| **CircularLINK** | Circular economy credits | $8-20/ton |
| **BioLINK** | Biodiversity/regeneration | $15-45/ton |
| **WaterLINK** | Water savings credits | $5-15/unit |
| **SocialLINK** | Social impact tokens | $3-10/unit |

#### Key Features

- **Browse Listings:** Filter by type, plant, verification level
- **Real-time Prices:** Market pricing (simulated)
- **Verification Levels:** Bronze, Silver, Gold, Platinum
- **Purchase Flow:** Add to cart → Checkout (simulated)
- **Seller Dashboard:** `/marketplace/seller` for plants to list credits

#### Files

- `MarketplacePage.tsx` - Buyer marketplace
- `SellerDashboard.tsx` - Seller listing management
- `components/CreditCard.tsx` - Credit listing card
- `components/CreditFilters.tsx` - Filter sidebar
- `components/PriceChart.tsx` - Price trends
- `types/marketplace.types.ts` - Types
- `data/mockCredits.ts` - Sample listings

---

### 7. 📝 PLANT ONBOARDING WIZARD

**Route:** `/plant-onboarding`
**File:** `src/modules/plant-onboarding/components/OnboardingWizard.tsx`

#### Purpose

6-step registration wizard for new bioconversion plants to join the LarvaLINK network.

#### Steps

1. **Basic Info:** Company name, plant name, tax ID, contact
2. **Location:** Address + map pin (for satellite verification)
3. **Operations:** Capacity, waste types, products, certifications
4. **Sensors:** IoT configuration (optional but recommended)
5. **Verification:** Document upload (licenses, photos)
6. **Plan Selection:** Subscription tier selection

#### Subscription Plans

| Plan | Price | Features |
|------|-------|----------|
| **Starter** | $49/mo | Manual data, basic calc |
| **Growth** | $199/mo | IoT (3 sensors), monthly satellite |
| **Scale** | $499/mo | Unlimited IoT, weekly monitoring |
| **Partner** | Custom | Enterprise features |

#### Files

- `components/OnboardingWizard.tsx` - Main wizard container
- `components/WelcomeScreen.tsx` - Landing page
- `components/ProgressStepper.tsx` - Step indicator
- `components/Step1BasicInfo.tsx` - Company details
- `components/Step2Location.tsx` - Location picker
- `components/Step3Operations.tsx` - Operational data
- `components/Step4Sensors.tsx` - IoT setup
- `components/Step5Verification.tsx` - Document upload
- `components/Step6Plan.tsx` - Plan selection
- `components/SuccessScreen.tsx` - Completion
- `components/LocationPicker.tsx` - Map component
- `components/DocumentUploader.tsx` - File upload
- `hooks/useOnboarding.ts` - Zustand store for wizard state
- `hooks/useTranslations.ts` - Custom i18n hook
- `services/onboardingService.ts` - Supabase integration
- `types/onboarding.types.ts` - Types
- `data/onboardingConfig.ts` - Plan pricing

#### Translation System

Uses custom `useTranslations` hook (not react-i18next) that reads from:

- `src/i18n/translations.ts` - Full ES/EN translation object
- `src/stores/uiStore.ts` - Current language state

---

### 8. 📊 VIABILITY CALCULATOR

**Route:** `/viability`
**File:** `src/modules/viability-calculator/ViabilityCalculatorPage.tsx`

#### Purpose

Feasibility analysis tool for potential BSF project investors/developers.

#### Analysis Factors

- **Climate Score:** Temperature, humidity suitability for BSF
- **Feedstock Availability:** Organic waste sources in region
- **Market Demand:** Protein/fertilizer buyers nearby
- **Competition:** Existing BSF operators
- **Infrastructure:** Roads, utilities, labor availability
- **Regulatory:** Environmental permits, incentives

#### Output

- **Viability Score:** 0-100 with A-F grade
- **ROI Projection:** 3-5 year financial model
- **Risk Assessment:** Key challenges
- **Recommendation:** Go/No-Go with reasoning

#### Files

- `ViabilityCalculatorPage.tsx` - Main page
- `components/LocationStep.tsx` - Target location input
- `components/CapacityStep.tsx` - Planned capacity
- `components/ResultsStep.tsx` - Analysis output
- `data/competitorDatabase.ts` - Known BSF operations
- `services/viabilityService.ts` - Scoring logic

---

### 9. 💼 INVESTOR PORTAL

**Route:** `/investor-portal`
**File:** `src/modules/investor-portal/InvestorPortalPage.tsx`

#### Purpose

Private dashboard for Limited Partners (LPs) and strategic investors.

#### Features

- **Portfolio Overview:** Investment allocation
- **Performance Metrics:** IRR, MOIC, cash-on-cash
- **Mandate Compliance:** ESG/impact thresholds
- **Document Access:** Reports, financials, legal docs
- **Alerts:** Important updates

#### Data Room

**Route:** `/data-room`
**File:** `src/modules/investor-portal/DataRoomPage.tsx`

Secure document repository:

- Quarterly reports
- Audited financials
- Impact verification certificates
- Legal agreements
- Technical documentation

#### Files

- `InvestorPortalPage.tsx` - Main portal
- `DataRoomPage.tsx` - Document browser
- `components/PortfolioCard.tsx` - Investment card
- `components/PerformanceChart.tsx` - Returns graph
- `components/MandateTracker.tsx` - ESG compliance
- `index.ts` - Module exports

---

### 10. 🔔 ALERTS CENTER

**Route:** `/alerts`
**File:** `src/modules/alerts-system/AlertsPage.tsx`

#### Purpose

Centralized compliance monitoring and alert management.

#### Alert Categories

- **Operational:** Sensor anomalies, capacity issues
- **Compliance:** Regulatory deadlines, permit expirations
- **Financial:** Payment reminders, pricing changes
- **Opportunities:** New partnerships, market openings

#### Severity Levels

- 🔴 Critical - Immediate action required
- 🟠 Warning - Attention needed
- 🟡 Info - FYI updates
- 🟢 Success - Positive confirmations

#### Files

- `AlertsPage.tsx` - Main dashboard
- `components/AlertsDashboard.tsx` - Overview
- `components/AlertCard.tsx` - Individual alert
- `components/AlertsList.tsx` - Filtered list
- `components/ComplianceStatus.tsx` - Compliance summary
- `data/alertRules.ts` - Predefined rules
- `data/mockAlerts.ts` - Sample alerts
- `data/mockCompliance.ts` - Compliance data
- `types/alerts.types.ts` - Types
- `services/alertsService.ts` - Alert logic

---

### 11. 🤝 CIRCULARLINK PARTNERS (B2C)

**Route:** `/partners`
**File:** `src/modules/circular-partners/pages/PartnersMapPage.tsx`

#### Purpose

Business-to-Consumer network connecting certified restaurants/hotels with consumers who want to track their environmental impact.

#### Partner Categories

- 🍽️ Restaurants
- 🏨 Hotels
- 🛒 Supermarkets
- 🎓 Universities
- 🏥 Hospitals
- 🎉 Event Catering

#### Certification Tiers

| Tier | Requirement | Badge |
|------|-------------|-------|
| **Champion** | >5000 kg/month | 🥇 |
| **Platinum** | 2000-5000 kg | 🪙 |
| **Gold** | 500-2000 kg | 🥈 |
| **Silver** | 100-500 kg | 🥉 |
| **Bronze** | <100 kg | 🟤 |

#### Consumer Portal

**Route:** `/mi-impacto`
Consumers can:

- Scan QR at partner locations
- Track personal impact (kg diverted, CO2 saved)
- Earn "Seeds" (loyalty points)
- Redeem rewards
- View leaderboards

#### Files

- `pages/PartnersMapPage.tsx` - Partner map
- `pages/PartnerDetailPage.tsx` - Partner profile
- `pages/ConsumerScanPage.tsx` - QR scanner
- `pages/PartnerDashboardPage.tsx` - Partner admin
- `pages/ConsumerPortalPage.tsx` - Consumer hub
- `components/Gamification/` - Seeds, badges, leaderboard
- `data/mockPartners.ts` - Sample partners
- `data/partnerCategories.ts` - Category definitions
- `data/tierConfig.ts` - Tier thresholds
- `data/seedsConfig.ts` - Points system
- `data/achievementsConfig.ts` - Badge definitions
- `services/partnerService.ts` - Partner operations
- `services/consumerService.ts` - Consumer operations
- `services/gamificationService.ts` - Points/badges
- `types/partners.types.ts` - Types

---

## 🔌 SERVICE INTEGRATIONS

### Supabase (Database)

**Config:** `src/lib/supabase.ts`

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

**Tables:**

- `plants` - Plant registrations
- `parcels` - Agricultural parcels for TerraLINK
- `soil_samples` - Soil analysis data
- `onboarding_applications` - Plant onboarding state
- `credits` - Marketplace listings
- `partners` - CircularLINK partners
- `consumer_scans` - QR scan records
- `users` - User profiles

### Sentinel Hub (Satellite)

**Config:** `src/api/config.ts`
**Service:** `src/services/mrvService.ts`

```typescript
// Process API for imagery
POST /api/v1/process
  → Returns NDVI visualizations

// Statistics API for analysis
POST /api/v1/statistics
  → Returns mean NDVI, cloud coverage
```

**Evalscripts:** `src/constants/agricultureEvalscripts.ts`

- NDVI calculation
- Moisture index
- True color
- False color infrared

### Google Maps

**Usage:** Street View in PlantDetailPage
**Loader:** `@googlemaps/js-api-loader`

---

## 🌐 INTERNATIONALIZATION (i18n)

### System

Custom translation system (NOT react-i18next for new components):

- **Store:** `src/stores/uiStore.ts` - `language: 'es' | 'en'`
- **Translations:** `src/i18n/translations.ts` - ES/EN objects
- **Hook:** `src/modules/plant-onboarding/hooks/useTranslations.ts`

### Usage

```typescript
// Old components (direct import)
import { translations } from '@/i18n/translations';
const t = translations[language];
return <h1>{t.modules.terralink.title}</h1>;

// New components (hook)
import { useTranslation } from '../hooks/useTranslations';
const { t } = useTranslation();
return <h1>{t('modules.plantOnboarding.wizard.step1.title')}</h1>;
```

### Language Toggle

Located in `Navigation.tsx` - switches between ES/EN globally.

---

## 📊 STATE MANAGEMENT

### UI Store (`src/stores/uiStore.ts`)

```typescript
{
  theme: 'dark' | 'light',
  language: 'es' | 'en',
  sidebarOpen: boolean,
  toggleTheme: () => void,
  setLanguage: (lang) => void,
  toggleSidebar: () => void
}
```

### App Store (`src/stores/appStore.ts`)

```typescript
{
  auth: AuthState,
  mapView: { center, zoom },
  searchFilters: SearchFilters,
  searchResults: STACItem[],
  selectedItem: STACItem | null,
  collections: STACCollection[],
  isLoading: boolean,
  notifications: AppNotification[]
}
```

### Network Store (`src/stores/networkStore.ts`)

```typescript
{
  plants: PlantLocation[],
  selectedPlant: PlantLocation | null,
  filters: PlantFilters,
  isLoading: boolean
}
```

### Onboarding Store (`useOnboarding` hook)

Zustand store in `src/modules/plant-onboarding/hooks/useOnboarding.ts`

```typescript
{
  current_step: OnboardingStep,
  completed_steps: OnboardingStep[],
  basic_info: PlantBasicInfo,
  location: PlantLocation,
  operations: PlantOperations,
  sensors: SensorConfig,
  documents: DocumentUploads,
  subscription: SubscriptionPlan,
  // Actions
  setStep, updateBasicInfo, updateLocation, ...
  startOnboarding, saveProgress, submitApplication
}
```

---

## 🎨 DESIGN SYSTEM

### Colors (Dark Theme Default)

```css
--bg-primary: #0F172A    /* Slate 900 */
--bg-secondary: #1E293B  /* Slate 800 */
--bg-card: #334155       /* Slate 700 */
--text-primary: #F8FAFC  /* Slate 50 */
--text-secondary: #94A3B8 /* Slate 400 */
--accent-green: #10B981  /* Emerald 500 */
--accent-blue: #3B82F6   /* Blue 500 */
--accent-yellow: #FBBF24 /* Amber 400 */
--error: #EF4444         /* Red 500 */
```

### Typography

- **Headers:** System UI / SF Pro
- **Body:** Inter (when loaded)
- **Monospace:** Fira Code (for hashes)

### Components

- Cards with `rounded-xl` corners
- Glassmorphism effects (`backdrop-blur`)
- Gradient borders
- Subtle shadows

### Animations

```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-right {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 🔧 ENVIRONMENT VARIABLES

```env
# .env.local (DO NOT COMMIT)

# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# Sentinel Hub (Copernicus)
VITE_COPERNICUS_CLIENT_ID=xxx
VITE_COPERNICUS_CLIENT_SECRET=xxx

# Google Maps (optional)
VITE_GOOGLE_MAPS_API_KEY=xxx
```

---

## 🚀 BUILD & DEPLOYMENT

### Local Development

```bash
cd /Users/lemg/.gemini/antigravity/scratch/LarvaLINK-MRV
npm install
npm run dev  # http://localhost:3000
```

### Production Build

```bash
npm run build  # Creates dist/ folder
# Note: TypeScript check disabled for faster builds
```

### Deploy to Netlify

```bash
npx netlify-cli deploy --prod --dir=dist
```

### GitHub

```bash
git add -A
git commit -m "message"
git push origin main
```

---

## 🐛 KNOWN ISSUES & FIXES APPLIED

### Fixed (2026-01-13)

1. **TerraLINK Crash** - Added fallback to DEMO_PARCELS when Supabase empty
2. **Plant Onboarding i18n** - Created custom useTranslations hook
3. **PlantDetailPage Crash** - Added missing imports

### Known Limitations

- Sentinel Hub Statistics API returns 400 (using fallback data)
- Some TypeScript errors in build (bypassed with `vite build` only)
- Recharts dimension warnings on initial render
- Street View requires Google Maps API key

---

## 📈 METRICS & MOCK DATA

### Global Stats (Homepage)

- Plants Active: 3 (+1 planned)
- Waste Processed: 1,642 tons
- CO2eq Avoided: 2,847 tons
- NDVI Improvement: +75%

### Network Stats

- Total LarvaLINK Plants: 75
- Global Capacity: 11,430 t/día
- Total CO2eq Avoided: 1,053,447 t
- Industry Value: $1,200M

### CircularLINK Partners

- Total Partners: 118
- Monthly Volume: 2.8M kg
- CO2 Saved: 5,126 t
- Active Users: 1,847
- Seeds Distributed: $486K value

---

## 🔮 FUTURE ROADMAP

### Planned Features

1. **Real Authentication** - Supabase Auth integration
2. **Live Sensor Data** - MQTT/WebSocket connections
3. **Mobile App** - React Native version
4. **Blockchain** - Actual on-chain verification (currently simulated)
5. **AI Advisor** - LLM-based project advisor
6. **API Gateway** - Public API for partners

### Performance Optimizations

1. Code splitting with dynamic imports
2. Image optimization
3. Service worker for offline
4. GraphQL for efficient data fetching

---

## 📞 SUPPORT & CONTACTS

**Technical:** <contacto@larvalink.com>
**Website:** <https://larvalink-mrv.netlify.app>
**GitHub:** <https://github.com/LEMG-lab/copernico-mrv-platform>

---

*This walkthrough was generated on 2026-01-13 and reflects the current state of the LarvaLINK-MRV ecosystem as deployed to production.*
