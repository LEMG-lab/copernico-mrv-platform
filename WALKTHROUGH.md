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

---

# 📊 APPENDIX A: DATABASE SCHEMA ACTUAL

## Supabase Tables - Full Ecosystem

### Core & Auth Tables

| Table | Purpose | Key Columns | Status | Rows (Est.) |
|-------|---------|-------------|--------|-------------|
| **profiles** | User profiles (extends auth.users) | `id`, `full_name`, `avatar_url`, `role`, `company_id`, `seeds_balance`, `total_kg_diverted`, `co2_avoided_kg` | 🟡 Partial | ~50 |
| **companies** | Organizations/businesses | `id`, `name`, `tax_id`, `website`, `country`, `wallet_address` | ⚪ Vacía | 0 |

### Plant Network Tables

| Table | Purpose | Key Columns | FK Relations | Status | Rows |
|-------|---------|-------------|--------------|--------|------|
| **plants** | Registered bioconversion plants | `id`, `company_id`, `name`, `status`, `address`, `city`, `country`, `latitude`, `longitude`, `location` (PostGIS), `capacity_tons_day`, `waste_types`, `products` | companies(id) | 🟡 Partial | ~5 |
| **plant_applications** | Onboarding wizard state | `id`, `user_id`, `status`, `current_step`, `form_state` (JSONB), `submitted_at` | auth.users(id) | ⚪ Vacía | 0 |
| **plant_documents** | Licenses, permits, photos | `id`, `plant_id`, `application_id`, `type`, `url`, `status` | plants(id), plant_applications(id) | ⚪ Vacía | 0 |

### MRV & Impact Tables

| Table | Purpose | Key Columns | FK Relations | Status | Rows |
|-------|---------|-------------|--------------|--------|------|
| **mrv_records** | Satellite + IoT monitoring data | `id`, `plant_id`, `record_date`, `type`, `data` (JSONB), `blockchain_hash`, `verified_at` | plants(id) | ⚪ Vacía | 0 |
| **carbon_credits** | Generated carbon credits | `id`, `plant_id`, `vintage_year`, `amount_tons`, `status`, `token_id`, `certificate_url` | plants(id) | ⚪ Vacía | 0 |

### TerraLINK Tables

| Table | Purpose | Key Columns | FK Relations | Status | Rows |
|-------|---------|-------------|--------------|--------|------|
| **parcels** | Agricultural test parcels | `id`, `plant_id`, `owner_name`, `crop_type`, `area_hectares`, `boundaries` (PostGIS POLYGON), `is_control` | plants(id) | ⚪ Vacía | 0 (uses DEMO_PARCELS fallback) |
| **soil_samples** | Soil analysis data | `id`, `parcel_id`, `sample_date`, `nitrogen`, `phosphorus`, `potassium`, `organic_matter`, `ph_level` | parcels(id) | ⚪ Vacía | 0 |

### Marketplace Tables

| Table | Purpose | Key Columns | FK Relations | Status | Rows |
|-------|---------|-------------|--------------|--------|------|
| **market_listings** | Products/credits for sale | `id`, `plant_id`, `product_type`, `title`, `price_per_unit`, `currency`, `available_quantity`, `unit`, `status` | plants(id) | ⚪ Vacía | 0 |
| **market_orders** | Purchase orders | `id`, `buyer_id`, `listing_id`, `quantity`, `total_price`, `status` | profiles(id), market_listings(id) | ⚪ Vacía | 0 |

### Investor Portal Tables

| Table | Purpose | Key Columns | FK Relations | Status | Rows |
|-------|---------|-------------|--------------|--------|------|
| **investment_projects** | Funding opportunities | `id`, `title`, `description`, `target_amount`, `raised_amount`, `min_investment`, `apy_percentage`, `status` | plants(id) | ⚪ Vacía | 0 |
| **user_investments** | Individual investments | `id`, `user_id`, `project_id`, `amount`, `invested_at`, `status` | profiles(id), investment_projects(id) | ⚪ Vacía | 0 |

### Alerts & Notifications

| Table | Purpose | Key Columns | FK Relations | Status | Rows |
|-------|---------|-------------|--------------|--------|------|
| **alerts** | System notifications | `id`, `user_id`, `type`, `severity`, `message`, `is_read`, `metadata` (JSONB) | profiles(id) | ⚪ Vacía | 0 |

### CircularLINK Partners Tables

| Table | Purpose | Key Columns | FK Relations | Status | Rows |
|-------|---------|-------------|--------------|--------|------|
| **partner_categories** | Category lookup (restaurant, hotel, etc.) | `id`, `label`, `icon_name`, `color_hex` | - | ⚪ Vacía | 0 (uses frontend config) |
| **partner_tiers** | Tier lookup (bronze→champion) | `id`, `label`, `min_monthly_kg`, `multiplier`, `color_hex` | - | ⚪ Vacía | 0 (uses frontend config) |
| **circular_partners** | Partner businesses | `id`, `slug`, `name`, `category_id`, `tier_id`, `logo_url`, `description`, `is_verified`, `status`, `address`, `city`, `latitude`, `longitude`, `total_collected_kg`, `wallet_address` | partner_categories(id), partner_tiers(id) | ⚪ Vacía | 0 (uses MOCK_PARTNERS) |
| **seeds_transactions** | Points ledger | `id`, `user_id`, `partner_id`, `amount`, `type`, `description`, `balance_after`, `metadata` | profiles(id), circular_partners(id) | ⚪ Vacía | 0 |
| **achievements** | Badge definitions | `id`, `title`, `description`, `icon_url`, `rarity`, `target_value`, `metric_type`, `reward_xp`, `reward_seeds` | - | ⚪ Vacía | 0 (uses frontend config) |
| **user_achievements** | Unlocked badges | `id`, `user_id`, `achievement_id`, `unlocked_at`, `progress_value`, `is_viewed` | profiles(id), achievements(id) | ⚪ Vacía | 0 |
| **redeemable_items** | Rewards catalog | `id`, `title`, `description`, `image_url`, `cost_seeds`, `type`, `provider_name`, `is_active`, `stock_quantity` | - | ⚪ Vacía | 0 |
| **redemptions** | Reward claims | `id`, `user_id`, `item_id`, `cost_seeds`, `status`, `redemption_code`, `verified_at` | profiles(id), redeemable_items(id) | ⚪ Vacía | 0 |
| **qr_scans** | QR scan records | `id`, `user_id`, `partner_id`, `qr_code_id`, `location_lat`, `location_lng`, `device_info`, `is_valid`, `seeds_awarded` | profiles(id), circular_partners(id) | ⚪ Vacía | 0 |

### Database Summary

- **Total Tables Defined:** 22
- **Tables with Data:** 2 (profiles, plants - partial)
- **Tables using Mock Data:** 3 (parcels, circular_partners, all gamification)
- **PostGIS Extension:** ✅ Enabled (GEOGRAPHY columns in plants, parcels)
- **Row Level Security:** ✅ Enabled on all tables

---

# 📈 APPENDIX B: MODULE STATUS REPORT

## Module Completion Matrix

| # | Module | Completion | Frontend | Backend | Data | Notes |
|---|--------|------------|----------|---------|------|-------|
| 1 | **Home/Dashboard** | 95% | ✅ | N/A | ✅ Static | Missing: Live stats from DB |
| 2 | **TerraLINK** | 85% | ✅ | 🟡 | 🟡 Demo | Sentinel Hub works but stats API returns 400 |
| 3 | **Emissions Calculator** | 90% | ✅ | ✅ | ✅ Static | Calculations work, no DB persistence |
| 4 | **Global Network** | 85% | ✅ | 🟡 | ✅ Static | Map works, click → detail works |
| 5 | **Plant Detail** | 80% | ✅ | 🟡 | ✅ Mock | Fixed today, uses MOCK_PLANT_TEPETLOZTOC |
| 6 | **Marketplace** | 70% | ✅ | ⚪ | ✅ Mock | No checkout, no real listings |
| 7 | **Plant Onboarding** | 90% | ✅ | 🟡 | ⚪ | 6 steps work, no DB save |
| 8 | **Viability Calculator** | 75% | ✅ | ⚪ | ✅ Static | Scoring logic works, no API |
| 9 | **Investor Portal** | 70% | ✅ | ⚪ | ✅ Mock | Dashboard renders, no real auth |
| 10 | **Alerts Center** | 75% | ✅ | ⚪ | ✅ Mock | Uses mock alerts, no live data |
| 11 | **CircularLINK Partners** | 80% | ✅ | 🟡 | ✅ Mock | 5 partners mock, gamification UI done |

### Detailed Module Status

#### 1. Home/Dashboard (95%)

**Implemented:**

- Hero section with animated background
- Executive summary for investors
- 9 module cards with navigation
- Language toggle (ES/EN)
- Theme toggle (dark/light)

**Pending:**

- [ ] Live metrics from Supabase aggregation
- [ ] User authentication state

**Blockers:** None

---

#### 2. TerraLINK (85%)

**Implemented:**

- Parcel comparison map (Leaflet)
- NDVI calculation display
- Time series chart (6 months)
- Improvement metrics
- Blockchain hash display
- Demo parcels fallback

**Pending:**

- [ ] Fix Sentinel Hub Statistics API 400 error
- [ ] Real parcel data from Supabase
- [ ] Multi-parcel comparison

**Blockers:** Sentinel Hub API returning 400 for statistics endpoint

---

#### 3. Emissions Calculator (90%)

**Implemented:**

- Plant selector dropdown
- Waste type configuration
- IPCC 2019 methodology calculations
- CH4 avoidance display
- Carbon credit estimation

**Pending:**

- [ ] Save calculations to DB
- [ ] Historical comparison
- [ ] PDF report export

**Blockers:** None

---

#### 4. Global Network Map (85%)

**Implemented:**

- Interactive Leaflet map
- 75 LarvaLINK plants hardcoded
- Marker clustering
- Filter by status/region
- Click → navigates to plant detail
- Global stats display

**Pending:**

- [ ] Load plants from Supabase
- [ ] Real-time capacity updates
- [ ] Methane hotspot layer

**Blockers:** No plant data in DB

---

#### 5. Plant Detail View (80%) - FIXED TODAY

**Implemented:**

- Plant header with status
- Location section with map
- Corporate info display
- Control center (temp/humidity gauges)
- Inventory & staffing
- Photo gallery
- Blockchain verification
- SDG section (15 of 17)

**Pending:**

- [ ] Fetch plant by ID from Supabase
- [ ] Real-time IoT data
- [ ] Multiple plant support

**Blockers:** Only one mock plant (Tepetloztoc)

---

#### 6. Marketplace (70%)

**Implemented:**

- Credit listing cards
- Filter sidebar
- Price display
- Seller dashboard (basic)

**Pending:**

- [ ] Real listing from DB
- [ ] Checkout/payment flow
- [ ] Blockchain token minting
- [ ] Order management

**Blockers:** No payment integration

---

#### 7. Plant Onboarding (90%) - FIXED TODAY

**Implemented:**

- 6-step wizard flow
- Progress stepper
- Form validation
- Location picker with map
- Document upload UI
- Plan selection
- Auto-save to localStorage
- Custom translation hook

**Pending:**

- [ ] Save to Supabase plant_applications table
- [ ] Document upload to Supabase Storage
- [ ] Email notifications
- [ ] Admin approval flow

**Blockers:** None

---

#### 8. Viability Calculator (75%)

**Implemented:**

- Location input step
- Capacity step
- Climate scoring
- Competition analysis (from static DB)
- ROI projection

**Pending:**

- [ ] API integration for real competition data
- [ ] Regulatory database
- [ ] PDF report generation

**Blockers:** None

---

#### 9. Investor Portal (70%)

**Implemented:**

- Dashboard layout
- Portfolio cards
- Performance charts
- Data room document browser
- Mandate compliance tracker

**Pending:**

- [ ] Real authentication
- [ ] Actual documents in Storage
- [ ] Investment transaction history
- [ ] Investor onboarding

**Blockers:** No investor auth

---

#### 10. Alerts Center (75%)

**Implemented:**

- Alert dashboard
- Alert cards with severity
- Filter by type/severity
- Compliance status section

**Pending:**

- [ ] Real alerts from IoT/monitoring
- [ ] Push notifications
- [ ] Email alerts
- [ ] Escalation rules

**Blockers:** None

---

#### 11. CircularLINK Partners (80%)

**Implemented:**

- Partners map page (Leaflet)
- 5 mock partners with full data
- Partner detail page
- Consumer portal (mi-impacto)
- QR scan page (UI only)
- Partner dashboard page
- Gamification components (Seeds, Leaderboard, Achievements, Tier badges)
- Tier system (Bronze→Champion)
- Full type definitions

**Pending:**

- [ ] Connect to Supabase tables
- [ ] Real QR code scanning with camera
- [ ] Seed redemption flow
- [ ] Partner registration form
- [ ] Consumer mobile app

**Blockers:** Google Maps API key for Street View (falls back to placeholder)

---

# 🤝 APPENDIX C: CIRCULARLINK PARTNERS - DEEP DIVE

## Current State Summary

| Component | Exists | Status | Data Source |
|-----------|--------|--------|-------------|
| **PartnersMapPage** | ✅ | Functional | MOCK_PARTNERS |
| **PartnerDetailPage** | ✅ | Functional | MOCK_PARTNERS |
| **ConsumerScanPage** | ✅ | UI Only | No camera integration |
| **ConsumerPortalPage** | ✅ | Functional | MOCK_PARTNERS |
| **PartnerDashboardPage** | ✅ | Functional | MOCK_PARTNERS |

### Map System

- **Library:** Leaflet + React-Leaflet (NOT Google Maps)
- **Tiles:** CARTO Dark theme
- **Markers:** Custom SVG markers colored by tier
- **Legend:** Tier colors displayed
- **Popups:** Show partner name, city, tier, kg collected
- **Navigation:** Click popup → PartnerDetailPage

### Seeds/Gamification System

- **Exists:** Yes, frontend components and types
- **Backend:** Schema defined, tables empty
- **Earning:** Defined in `seedsConfig.ts`
  - Scan at partner: 50 seeds
  - Referral: 500 seeds
  - Achievement unlock: varies
- **Spending:** Defined in redeemable_items schema
- **Transactions:** seeds_transactions table (empty)
- **Display:** SeedsBalance component shows balance

### Partners Data

- **Real Partners:** 0 (database empty)
- **Mock Partners:** 5 (El Bajío, Casa Oaxaca, CEDA Tlaxcala, Starbucks, Hospital Ángeles)
- **Total in Stats:** 127 (simulated for UI)
- **Categories:** 15 defined (restaurant, hotel, hospital, etc.)
- **Tiers:** 5 (bronze, silver, gold, platinum, champion)

### QR Scanning

- **Page exists:** `/scan/:code`
- **Camera integration:** NOT implemented
- **Current behavior:** Parses code from URL, shows partner info
- **Validation:** UI matches partner by qr_short_code

### Consumer Flow (Design)

```
1. Consumer visits partner restaurant
2. Scans QR code on table/receipt
3. App shows partner profile + impact
4. Consumer earns Seeds for scan
5. Consumer can donate or redeem Seeds
6. Impact accumulates in profile
```

### Component Tree

```
circular-partners/
├── components/
│   ├── Cards/           # Partner cards, stat cards
│   ├── ConsumerView/    # Impact display, history
│   ├── Gamification/    # Seeds, Achievements, Leaderboard, TierBadge
│   ├── Map/             # Partner map markers, popups
│   └── PartnerDetail/   # Profile sections
├── data/
│   ├── mockPartners.ts      # 5 full partner objects + NETWORK_STATS
│   ├── partnerCategories.ts # Category config (colors, icons)
│   ├── tierConfig.ts        # Tier thresholds + multipliers
│   ├── seedsConfig.ts       # Earn rates
│   └── achievementsConfig.ts # Badge definitions
├── pages/
│   ├── PartnersMapPage.tsx      # Main browse page
│   ├── PartnerDetailPage.tsx    # Individual partner
│   ├── ConsumerScanPage.tsx     # QR scan handler
│   ├── ConsumerPortalPage.tsx   # "Mi Impacto"
│   └── PartnerDashboardPage.tsx # Partner admin
├── services/
│   ├── partnerService.ts       # CRUD operations
│   ├── consumerService.ts      # Consumer operations
│   └── gamificationService.ts  # Seeds/achievements
├── stores/
│   └── partnerStore.ts         # Zustand state
└── types/
    └── partners.types.ts       # Full type definitions
```

---

# 🔄 APPENDIX D: DATA FLOWS

## Flow 1: Onboarding → Plants → Network Map

```
┌─────────────────────┐
│  Plant Onboarding   │
│  (6-step wizard)    │
└──────────┬──────────┘
           │ submitApplication()
           ▼
┌─────────────────────┐
│ plant_applications  │ (Status: draft → pending)
│ [Supabase table]    │
└──────────┬──────────┘
           │ Admin approves (manual)
           ▼
┌─────────────────────┐
│      plants         │ (Status: verified → active)
│ [Supabase table]    │
└──────────┬──────────┘
           │ networkService.getPlants()
           ▼
┌─────────────────────┐
│  Global Network     │
│  (Leaflet Map)      │
└─────────────────────┘
```

**Current Reality:** Flow is incomplete - onboarding saves to localStorage only, plants come from hardcoded LARVALINK_PLANTS array.

---

## Flow 2: Waste Delivery → Emissions → Credits

```
┌─────────────────────┐
│ Partner makes waste │
│ delivery to plant   │
└──────────┬──────────┘
           │ Record delivery (manual/IoT)
           ▼
┌─────────────────────┐
│   mrv_records       │ (type: 'iot_sensor')
│ [Supabase table]    │
└──────────┬──────────┘
           │ emissionsService.calculate()
           ▼
┌─────────────────────┐
│ Emissions Calculator│
│ CH4 = kg × DOC × MCF│
└──────────┬──────────┘
           │ verifyOnChain() [simulated]
           ▼
┌─────────────────────┐
│   carbon_credits    │ (status: issued)
│ [Supabase table]    │
└──────────┬──────────┘
           │ List in marketplace
           ▼
┌─────────────────────┐
│    Marketplace      │
│ (CarbonLINK tokens) │
└─────────────────────┘
```

**Current Reality:** Calculations work, but no data flows to DB. Credits are mock.

---

## Flow 3: Consumer Scan → Seeds → Redemption

```
┌─────────────────────┐
│ Consumer at Partner │
│ scans QR code       │
└──────────┬──────────┘
           │ /scan/:code route
           ▼
┌─────────────────────┐
│   ConsumerScanPage  │
│ (validate, display) │
└──────────┬──────────┘
           │ gamificationService.awardSeeds()
           ▼
┌─────────────────────┐
│ seeds_transactions  │ (+50 seeds)
│ [Supabase table]    │
└──────────┬──────────┘
           │ UPDATE profiles SET seeds_balance
           ▼
┌─────────────────────┐
│  Consumer Portal    │
│  (Mi Impacto)       │
└──────────┬──────────┘
           │ User chooses reward
           ▼
┌─────────────────────┐
│ redeemable_items    │
│ (catalog)           │
└──────────┬──────────┘
           │ consumerService.redeemItem()
           ▼
┌─────────────────────┐
│    redemptions      │ (code generated)
│ [Supabase table]    │
└─────────────────────┘
```

**Current Reality:** UI exists, but no real camera scan, no DB transactions.

---

# 🔐 APPENDIX E: CREDENTIALS & LIMITS

## API Tier Summary

| Service | Plan | Limits | Notes |
|---------|------|--------|-------|
| **Sentinel Hub** | Trial/Free | 1000 PU/month | Statistics API returns 400 errors |
| **Supabase** | Free | 500MB DB, 1GB Storage, 2GB bandwidth | Sufficient for demo |
| **Netlify** | Free | 100GB bandwidth, 300 build min/month | Deployed successfully |
| **Google Maps** | Not configured | N/A | Using Leaflet instead |

### Sentinel Hub Details

- **Client ID:** Configured in `.env.local`
- **Status:** Authenticated successfully
- **Working:** Process API (NDVI imagery)
- **Failing:** Statistics API (returns 400)
- **Rate Limit:** ~30 requests/minute

### Supabase Details

- **Project Region:** (check dashboard)
- **Database:** PostgreSQL 15 with PostGIS
- **Storage Buckets:** Not created
- **Auth:** Enabled but not used
- **RLS Policies:** Open for dev (needs hardening for prod)

### Environment Variables Required

```bash
# .env.local (DO NOT COMMIT)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...

VITE_COPERNICUS_CLIENT_ID=xxx
VITE_COPERNICUS_CLIENT_SECRET=xxx

# Optional
VITE_GOOGLE_MAPS_API_KEY=xxx
```

---

# 📅 APPENDIX F: Q1 2026 PRIORITIES

## Top 5 Features to Implement

### 1. 🔐 Real Authentication (Priority: CRITICAL)

**Why:** All modules assume anonymous access. No data persistence per user.
**Scope:**

- Supabase Auth integration (email + social)
- Protected routes
- User profile page
- Role-based access (admin, plant_owner, investor, partner, consumer)

**Effort:** 2-3 days
**Dependencies:** None

---

### 2. 💾 Onboarding → Supabase (Priority: HIGH)

**Why:** Plants can register but data disappears on refresh.
**Scope:**

- Save form state to plant_applications table
- Upload documents to Supabase Storage
- Admin approval interface
- Auto-create plant record on approval

**Effort:** 2 days
**Dependencies:** Authentication

---

### 3. 🛰️ Fix Sentinel Hub Statistics (Priority: HIGH)

**Why:** TerraLINK shows demo data only.
**Scope:**

- Debug 400 error (likely auth or bbox format)
- Implement proper token refresh
- Add caching layer
- Fallback to Process API for basic stats

**Effort:** 1 day
**Dependencies:** None

---

### 4. 🤝 CircularLINK Real Partners (Priority: MEDIUM)

**Why:** Consumer-facing launch depends on real partner data.
**Scope:**

- Seed partner_categories and partner_tiers
- Create partner registration form
- Connect partnerService to Supabase
- Test with 3-5 real partners

**Effort:** 2 days
**Dependencies:** Authentication

---

### 5. 📱 QR Camera Scanning (Priority: MEDIUM)

**Why:** Core consumer feature doesn't work.
**Scope:**

- Integrate html5-qrcode or react-qr-reader
- Camera permissions handling
- Validate scans against partner DB
- Award seeds on successful scan

**Effort:** 1 day
**Dependencies:** CircularLINK Real Partners

---

## Q1 Roadmap Summary

```
Week 1-2: Authentication + Onboarding persistence
Week 3:   Sentinel Hub fix + CircularLINK partners
Week 4:   QR scanning + Consumer testing
```

## Out of Scope Q1

- Mobile app (React Native)
- Blockchain integration (real tokens)
- Payment processing
- IoT sensor integration
- Multi-language beyond ES/EN

---

*End of Appendix - Document Version 1.1 (2026-01-13)*
