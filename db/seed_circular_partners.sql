-- ============================================
-- SEED DATA: CircularLINK Partners Module
-- Generated: 2026-01-13
-- ============================================
-- ============================================
-- 1. PARTNER CATEGORIES (15 registros)
-- ============================================
INSERT INTO partner_categories (id, label, icon_name, color_hex)
VALUES (
        'cat_restaurant',
        'Restaurante',
        'utensils',
        '#E74C3C'
    ),
    ('cat_hotel', 'Hotel', 'building', '#9B59B6'),
    (
        'cat_hospital',
        'Hospital',
        'hospital',
        '#3498DB'
    ),
    (
        'cat_school',
        'Escuela/Universidad',
        'graduation-cap',
        '#F39C12'
    ),
    (
        'cat_supermarket',
        'Supermercado',
        'shopping-cart',
        '#2ECC71'
    ),
    (
        'cat_food_factory',
        'Procesadora de Alimentos',
        'industry',
        '#1ABC9C'
    ),
    (
        'cat_central_abasto',
        'Central de Abasto',
        'warehouse',
        '#E67E22'
    ),
    (
        'cat_catering',
        'Catering/Banquetes',
        'truck',
        '#FF6B6B'
    ),
    (
        'cat_corporate',
        'Comedor Corporativo',
        'briefcase',
        '#5D6D7E'
    ),
    ('cat_coffee', 'Cafetería', 'coffee', '#8B4513'),
    (
        'cat_bakery',
        'Panadería',
        'bread-slice',
        '#D4A574'
    ),
    (
        'cat_bar',
        'Bar/Antro',
        'glass-martini',
        '#8E44AD'
    ),
    (
        'cat_event',
        'Salón de Eventos',
        'calendar',
        '#FF69B4'
    ),
    ('cat_gym', 'Gimnasio/Spa', 'dumbbell', '#00CED1'),
    ('cat_other', 'Otro', 'ellipsis-h', '#95A5A6') ON CONFLICT (id) DO NOTHING;
-- ============================================
-- 2. PARTNER TIERS (5 registros)
-- ============================================
INSERT INTO partner_tiers (id, label, min_monthly_kg, multiplier, color_hex)
VALUES ('tier_bronze', 'Bronce', 0, 1.00, '#CD7F32'),
    ('tier_silver', 'Plata', 100, 1.10, '#C0C0C0'),
    ('tier_gold', 'Oro', 500, 1.25, '#FFD700'),
    (
        'tier_platinum',
        'Platino',
        2000,
        1.50,
        '#E5E4E2'
    ),
    (
        'tier_champion',
        'Campeón',
        10000,
        2.00,
        '#50C878'
    ) ON CONFLICT (id) DO NOTHING;
-- ============================================
-- 3. CIRCULAR PARTNERS (10 registros)
-- ============================================
INSERT INTO circular_partners (
        id,
        slug,
        name,
        category_id,
        tier_id,
        description,
        logo_url,
        address,
        city,
        state,
        latitude,
        longitude,
        is_verified,
        status,
        total_collected_kg,
        monthly_average_kg,
        created_at
    )
VALUES (
        'partner_001',
        'el-bajio-roma',
        'El Bajío Roma',
        'cat_restaurant',
        'tier_gold',
        'Cocina tradicional mexicana desde 1972. Comprometidos con la sustentabilidad.',
        'https://placehold.co/200x200/E74C3C/white?text=EB',
        'Av. Coyoacán 2021, Col. Del Valle',
        'Ciudad de México',
        'CDMX',
        19.3785,
        -99.1734,
        true,
        'active',
        15725,
        1310,
        '2024-06-15'
    ),
    (
        'partner_002',
        'casa-oaxaca-polanco',
        'Casa Oaxaca',
        'cat_restaurant',
        'tier_platinum',
        'Alta cocina oaxaqueña en el corazón de Polanco.',
        'https://placehold.co/200x200/9B59B6/white?text=CO',
        'Av. Presidente Masaryk 513, Polanco',
        'Ciudad de México',
        'CDMX',
        19.4326,
        -99.1932,
        true,
        'active',
        29400,
        2450,
        '2024-04-20'
    ),
    (
        'partner_003',
        'ceda-iztapalapa',
        'CEDA Iztapalapa',
        'cat_central_abasto',
        'tier_champion',
        'La central de abasto más grande del mundo.',
        'https://placehold.co/200x200/E67E22/white?text=CEDA',
        'Eje 6 Sur, Central de Abasto',
        'Ciudad de México',
        'CDMX',
        19.3725,
        -99.0891,
        true,
        'active',
        712500,
        59375,
        '2024-01-10'
    ),
    (
        'partner_004',
        'starbucks-reforma',
        'Starbucks Reforma 222',
        'cat_coffee',
        'tier_silver',
        'Café premium con compromiso ambiental.',
        'https://placehold.co/200x200/8B4513/white?text=SB',
        'Paseo de la Reforma 222, Juárez',
        'Ciudad de México',
        'CDMX',
        19.4271,
        -99.1639,
        true,
        'active',
        3920,
        327,
        '2024-08-01'
    ),
    (
        'partner_005',
        'hospital-angeles-puebla',
        'Hospital Ángeles Puebla',
        'cat_hospital',
        'tier_platinum',
        'Hospital de alta especialidad comprometido con la gestión responsable de residuos.',
        'https://placehold.co/200x200/3498DB/white?text=HA',
        'Av. Kepler 2143, Reserva Territorial Atlixcáyotl',
        'Puebla',
        'Puebla',
        19.0187,
        -98.2412,
        true,
        'active',
        126000,
        10500,
        '2024-03-15'
    ),
    (
        'partner_006',
        'la-docena-condesa',
        'La Docena Oyster Bar',
        'cat_restaurant',
        'tier_gold',
        'Mariscos y ostras frescas en la Condesa.',
        'https://placehold.co/200x200/1ABC9C/white?text=LD',
        'Av. Álvaro Obregón 31, Condesa',
        'Ciudad de México',
        'CDMX',
        19.4114,
        -99.1707,
        true,
        'active',
        8450,
        704,
        '2024-07-22'
    ),
    (
        'partner_007',
        'hilton-reforma',
        'Hilton Mexico City Reforma',
        'cat_hotel',
        'tier_platinum',
        'Hotel de lujo con programa integral de sustentabilidad.',
        'https://placehold.co/200x200/9B59B6/white?text=H',
        'Av. Juárez 70, Centro Histórico',
        'Ciudad de México',
        'CDMX',
        19.4352,
        -99.1412,
        true,
        'active',
        45600,
        3800,
        '2024-02-01'
    ),
    (
        'partner_008',
        'unam-cu-cafeteria',
        'Cafetería Central CU',
        'cat_school',
        'tier_gold',
        'Cafetería principal de Ciudad Universitaria.',
        'https://placehold.co/200x200/F39C12/white?text=UNAM',
        'Circuito Interior s/n, Ciudad Universitaria',
        'Ciudad de México',
        'CDMX',
        19.3262,
        -99.1761,
        true,
        'active',
        18200,
        1517,
        '2024-05-10'
    ),
    (
        'partner_009',
        'soriana-santa-fe',
        'Soriana Santa Fe',
        'cat_supermarket',
        'tier_gold',
        'Supermercado con programa de reducción de merma.',
        'https://placehold.co/200x200/2ECC71/white?text=S',
        'Av. Vasco de Quiroga 3800, Santa Fe',
        'Ciudad de México',
        'CDMX',
        19.3659,
        -99.2614,
        true,
        'active',
        24300,
        2025,
        '2024-04-05'
    ),
    (
        'partner_010',
        'pujol-polanco',
        'Pujol',
        'cat_restaurant',
        'tier_champion',
        'Uno de los mejores restaurantes del mundo. Pionero en sustentabilidad gastronómica.',
        'https://placehold.co/200x200/2C3E50/white?text=P',
        'Tennyson 133, Polanco',
        'Ciudad de México',
        'CDMX',
        19.4321,
        -99.1987,
        true,
        'active',
        12800,
        1067,
        '2024-01-20'
    ) ON CONFLICT (id) DO NOTHING;
-- ============================================
-- 4. ACHIEVEMENTS (20 registros)
-- ============================================
INSERT INTO achievements (
        id,
        title,
        description,
        icon_url,
        rarity,
        target_value,
        metric_type,
        reward_xp,
        reward_seeds
    )
VALUES -- Partner Achievements
    (
        'ach_first_delivery',
        'Primera Entrega',
        'Completaste tu primera entrega de residuos',
        'truck',
        'common',
        1,
        'deliveries',
        50,
        100
    ),
    (
        'ach_month_consistent',
        'Mes Consistente',
        '4 semanas consecutivas de entregas',
        'calendar-check',
        'common',
        4,
        'streak_weeks',
        100,
        200
    ),
    (
        'ach_quarter_perfect',
        'Trimestre Impecable',
        '12 semanas consecutivas sin falta',
        'award',
        'rare',
        12,
        'streak_weeks',
        250,
        500
    ),
    (
        'ach_year_perfect',
        'Año Perfecto',
        '52 semanas de entregas consistentes',
        'crown',
        'legendary',
        52,
        'streak_weeks',
        1000,
        2000
    ),
    (
        'ach_100kg',
        'Centenario',
        'Alcanzaste 100 kg de residuos entregados',
        'weight',
        'common',
        100,
        'total_kg',
        50,
        100
    ),
    (
        'ach_1000kg',
        'Una Tonelada',
        'Alcanzaste 1,000 kg de residuos entregados',
        'dumbbell',
        'common',
        1000,
        'total_kg',
        150,
        300
    ),
    (
        'ach_10000kg',
        'Diez Toneladas',
        'Alcanzaste 10,000 kg de residuos entregados',
        'mountain',
        'rare',
        10000,
        'total_kg',
        500,
        1000
    ),
    (
        'ach_referrer',
        'Embajador',
        'Referiste a 5 nuevos partners',
        'users',
        'rare',
        5,
        'referrals',
        300,
        600
    ),
    -- Consumer Achievements
    (
        'ach_first_scan',
        'Curioso Verde',
        'Tu primer escaneo en un partner certificado',
        'qrcode',
        'common',
        1,
        'scans',
        25,
        50
    ),
    (
        'ach_10_scans',
        'Explorador',
        'Escaneaste en 10 ocasiones',
        'compass',
        'common',
        10,
        'scans',
        75,
        150
    ),
    (
        'ach_50_scans',
        'Aventurero',
        'Escaneaste en 50 ocasiones',
        'map',
        'common',
        50,
        'scans',
        200,
        400
    ),
    (
        'ach_100_scans',
        'Veterano',
        'Escaneaste en 100 ocasiones',
        'medal',
        'rare',
        100,
        'scans',
        500,
        1000
    ),
    (
        'ach_5_partners',
        'Diversificado',
        'Visitaste 5 partners diferentes',
        'store',
        'common',
        5,
        'unique_partners',
        50,
        100
    ),
    (
        'ach_20_partners',
        'Coleccionista',
        'Visitaste 20 partners diferentes',
        'collection',
        'rare',
        20,
        'unique_partners',
        150,
        300
    ),
    (
        'ach_first_donation',
        'Corazón Generoso',
        'Hiciste tu primera donación',
        'heart',
        'common',
        1,
        'donations',
        100,
        200
    ),
    (
        'ach_10_donations',
        'Filantrópico',
        'Realizaste 10 donaciones',
        'hand-holding-heart',
        'rare',
        10,
        'donations',
        300,
        600
    ),
    (
        'ach_referral',
        'Influyente',
        'Invitaste a tu primer amigo',
        'user-plus',
        'common',
        1,
        'referrals',
        100,
        200
    ),
    (
        'ach_10_referrals',
        'Líder de Manada',
        'Invitaste a 10 amigos',
        'users-cog',
        'rare',
        10,
        'referrals',
        400,
        800
    ),
    (
        'ach_streak_4',
        'Hábito Verde',
        '4 semanas consecutivas escaneando',
        'fire',
        'common',
        4,
        'streak_weeks',
        150,
        300
    ),
    (
        'ach_early_adopter',
        'Early Adopter',
        'Entre los primeros 1,000 usuarios',
        'rocket',
        'legendary',
        1,
        'special',
        500,
        1000
    ) ON CONFLICT (id) DO NOTHING;
-- ============================================
-- 5. REDEEMABLE ITEMS (10 registros)
-- ============================================
INSERT INTO redeemable_items (
        id,
        title,
        description,
        image_url,
        cost_seeds,
        type,
        provider_name,
        stock_quantity,
        is_active
    )
VALUES (
        'item_discount_10',
        '10% Descuento en Partner',
        'Válido en cualquier partner certificado CircularLINK',
        'https://placehold.co/300x200/2ECC71/white?text=10%25',
        200,
        'discount',
        'CircularLINK',
        9999,
        true
    ),
    (
        'item_discount_20',
        '20% Descuento Partner Destacado',
        'Válido en partners Gold, Platinum o Champion',
        'https://placehold.co/300x200/FFD700/white?text=20%25',
        350,
        'discount',
        'CircularLINK',
        9999,
        true
    ),
    (
        'item_terralink_1kg',
        'TerraLINK 1kg',
        'Fertilizante orgánico premium de LarvaLINK',
        'https://placehold.co/300x200/8B4513/white?text=TerraLINK',
        500,
        'product',
        'LarvaLINK',
        100,
        true
    ),
    (
        'item_composta_kit',
        'Kit de Composta Casera',
        'Todo lo necesario para compostar en casa',
        'https://placehold.co/300x200/2ECC71/white?text=Composta',
        1500,
        'product',
        'CircularLINK',
        50,
        true
    ),
    (
        'item_playera',
        'Playera CircularLINK',
        'Playera 100% algodón orgánico con logo',
        'https://placehold.co/300x200/3498DB/white?text=Playera',
        800,
        'product',
        'CircularLINK',
        200,
        true
    ),
    (
        'item_tour_planta',
        'Tour Planta BSF',
        'Visita guiada a una planta de bioconversión LarvaLINK',
        'https://placehold.co/300x200/9B59B6/white?text=Tour',
        2000,
        'experience',
        'LarvaLINK',
        20,
        true
    ),
    (
        'item_cena_chef',
        'Cena con Chef Sustentable',
        'Experiencia gastronómica en partner Champion',
        'https://placehold.co/300x200/E74C3C/white?text=Cena',
        5000,
        'experience',
        'CircularLINK',
        10,
        true
    ),
    (
        'item_donation_100',
        'Donación Equivalente $100',
        'Donamos $100 MXN a +1 A.C. en tu nombre',
        'https://placehold.co/300x200/FF69B4/white?text=%24100',
        400,
        'donation',
        '+1 A.C.',
        9999,
        true
    ),
    (
        'item_donation_500',
        'Donación Equivalente $500',
        'Donamos $500 MXN a FRQTAL Foundation en tu nombre',
        'https://placehold.co/300x200/FF69B4/white?text=%24500',
        1800,
        'donation',
        'FRQTAL Foundation',
        9999,
        true
    ),
    (
        'item_nft_founder',
        'NFT Fundador CircularLINK',
        'Token coleccionable exclusivo de fundadores',
        'https://placehold.co/300x200/2C3E50/white?text=NFT',
        3000,
        'product',
        'CircularLINK',
        100,
        true
    ) ON CONFLICT (id) DO NOTHING;
-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify data was inserted:
-- SELECT COUNT(*) as categories FROM partner_categories;
-- SELECT COUNT(*) as tiers FROM partner_tiers;
-- SELECT COUNT(*) as partners FROM circular_partners;
-- SELECT COUNT(*) as achievements FROM achievements;
-- SELECT COUNT(*) as items FROM redeemable_items;
-- ============================================
-- END OF SEED DATA
-- ============================================