/**
 * Filter Configuration for Split Lease Search
 * Maps frontend filter values to Supabase database IDs and values
 */

/**
 * Borough ID Mapping
 * Maps frontend select values to Supabase borough IDs
 */
const BOROUGH_IDS = {
    'bergen': '1607041299747x827062990768184900',
    'bronx': '1607041299714x866026028780297600',
    'brooklyn': '1607041299637x913970439175620100',
    'essex': '1607041299777x826854337748672500',
    'hudson': '1607041299803x542854758464683600',
    'manhattan': '1607041299687x679479834266385900',
    'queens': '1607041299828x406969561802059650'  // Corrected: validated via database query
};

/**
 * Week Pattern Mapping
 * Maps frontend select values to database text values
 */
const WEEK_PATTERNS = {
    'every-week': 'Every week',
    'one-on-off': 'One week on, one week off',
    'two-on-off': 'Two weeks on, two weeks off',
    'one-three-off': 'One week on, three weeks off'
};

/**
 * Price Tier Configuration
 * Defines min/max ranges for each price tier
 */
const PRICE_TIERS = {
    'under-200': { min: 0, max: 199.99 },
    '200-350': { min: 200, max: 350 },
    '350-500': { min: 350.01, max: 500 },
    '500-plus': { min: 500.01, max: 999999 },
    'all': null // No price filter
};

/**
 * Neighborhood ID Mapping
 * Maps frontend checkbox values (kebab-case) to Supabase neighborhood IDs
 */
const NEIGHBORHOOD_ID_MAP = {
    'alphabet-city': '1686665230140x391210370437286460',
    'central-harlem': '1686665230141x230398124637156930',
    'chinatown': '1686665230141x776267324259844400',
    'civic-center': '1686665230141x755924307821723600',
    'clinton': '1686665230141x109760773900222880',
    'east-village': '1686665230142x112378752684300980',
    'financial-district': '1686665230151x890139725988428000',
    'flatiron': '1686665230152x267314860159501250',
    'gramercy': '1686665230152x620128845984789800',
    'greenwich-village': '1686665230152x612341317545480300',
    'harlem': '1686665230152x605333115253335400',
    'hells-kitchen': '1686665230152x946040790740281700',
    'lenox-hill': '1686665230152x107491527623286400',
    'little-italy': '1686665230155x602601280086412900',
    'lower-east-side': '1686665230155x453679119750186400',
    'manhattan-valley': '1686665230155x464862775699738100',
    'meatpacking': '1686665230156x383426092121550660',
    'midtown': '1686665230156x919393222700867700',
    'morningside': '1686665230156x619700681333798900',
    'murray-hill': '1686665230156x189072522158048260',
    'noho': '1686665230156x796622800256194800',
    'soho': '1686665230165x715885378733032800',
    'sutton': '1686665230165x766503309591935400',
    'tribeca': '1686665230165x338198443257803600',
    'turtle-bay': '1686665230166x938784065484759300',
    'ues': '1686665230166x869557584945557300',
    'uws': '1686665230166x210607508191402500',
    'west-village': '1686665230366x524476031487277800',
    'yorkville': '1686665230367x729164037248075600'
};

/**
 * Sort Options Configuration
 * Maps frontend sort values to database fields and order
 */
const SORT_OPTIONS = {
    'recommended': {
        field: 'Modified Date',
        ascending: false,
        description: 'Our curated recommendations'
    },
    'price-low': {
        field: 'Standarized Minimum Nightly Price (Filter)',
        ascending: true,
        description: 'Lowest price first'
    },
    'most-viewed': {
        field: 'Metrics - Click Counter',
        ascending: false,
        description: 'Most popular listings'
    },
    'recent': {
        field: 'Created Date',
        ascending: false,
        description: 'Newest listings first'
    }
};

/**
 * Filter Helper Functions
 */

/**
 * Get borough ID from frontend value
 * @param {string} boroughValue - Frontend borough select value
 * @returns {string|null} Supabase borough ID
 */
function getBoroughId(boroughValue) {
    return BOROUGH_IDS[boroughValue] || null;
}

/**
 * Get week pattern text from frontend value
 * @param {string} weekPatternValue - Frontend week pattern select value
 * @returns {string|null} Database week pattern text
 */
function getWeekPattern(weekPatternValue) {
    return WEEK_PATTERNS[weekPatternValue] || null;
}

/**
 * Get price range from frontend tier value
 * @param {string} priceTierValue - Frontend price tier select value
 * @returns {Object|null} Object with min/max or null for all prices
 */
function getPriceRange(priceTierValue) {
    return PRICE_TIERS[priceTierValue] !== undefined ? PRICE_TIERS[priceTierValue] : null;
}

/**
 * Get sort configuration from frontend value
 * @param {string} sortByValue - Frontend sort select value
 * @returns {Object|null} Sort configuration with field and ascending
 */
function getSortConfig(sortByValue) {
    return SORT_OPTIONS[sortByValue] || SORT_OPTIONS['recommended'];
}

/**
 * Get neighborhood IDs from frontend checkbox values
 * @param {Array<string>} neighborhoodValues - Array of checkbox values (can be kebab-case or database IDs)
 * @returns {Array<string>} Array of Supabase neighborhood IDs
 */
function getNeighborhoodIds(neighborhoodValues) {
    if (!Array.isArray(neighborhoodValues)) {
        return [];
    }

    return neighborhoodValues
        .map(value => {
            // First check if it's already a Supabase/Bubble ID (contains 'x' and is long)
            if (typeof value === 'string' && value.includes('x') && value.length >= 20) {
                return value;
            }
            // Fallback to hardcoded mapping for backwards compatibility
            if (NEIGHBORHOOD_ID_MAP[value]) {
                return NEIGHBORHOOD_ID_MAP[value];
            }
            return undefined;
        })
        .filter(id => id !== undefined);
}

/**
 * Build filter object for Supabase query
 * @param {Object} filterInputs - Frontend filter values
 * @returns {Object} Filter configuration for Supabase
 */
function buildFilterConfig(filterInputs) {
    const config = {
        boroughs: [],
        weekPatterns: [],
        priceRange: null,
        neighborhoods: [],
        sort: getSortConfig(filterInputs.sortBy || 'recommended')
    };

    // Borough filter
    if (filterInputs.borough) {
        const boroughId = getBoroughId(filterInputs.borough);
        if (boroughId) {
            config.boroughs.push(boroughId);
        }
    }

    // Week pattern filter
    if (filterInputs.weekPattern) {
        const weekPattern = getWeekPattern(filterInputs.weekPattern);
        if (weekPattern) {
            config.weekPatterns.push(weekPattern);
        }
    }

    // Price tier filter
    if (filterInputs.priceTier && filterInputs.priceTier !== 'all') {
        config.priceRange = getPriceRange(filterInputs.priceTier);
    }

    // Neighborhood filter - convert checkbox values to database IDs
    if (filterInputs.neighborhoods && Array.isArray(filterInputs.neighborhoods)) {
        config.neighborhoods = getNeighborhoodIds(filterInputs.neighborhoods);
    }

    return config;
}

// Export for use in other scripts
window.FilterConfig = {
    BOROUGH_IDS,
    WEEK_PATTERNS,
    PRICE_TIERS,
    SORT_OPTIONS,
    NEIGHBORHOOD_ID_MAP,
    getBoroughId,
    getWeekPattern,
    getPriceRange,
    getSortConfig,
    getNeighborhoodIds,
    buildFilterConfig
};
