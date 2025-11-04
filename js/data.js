// Listing data extracted from the actual Split Lease website
const listingsData = [
    {
        id: 1,
        title: "One Platt | Studio",
        location: "Civic Center, Manhattan",
        neighborhood: "civic-center",
        borough: "manhattan",
        coordinates: { lat: 40.7074, lng: -74.0078 },
        price: {
            starting: 228,
            full: 410
        },
        type: "Entire Place",
        squareFeet: null,
        maxGuests: 2,
        bedrooms: 0,
        bathrooms: 1,
        kitchen: "Kitchenette",
        host: {
            name: "Robert",
            image: "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409086161x522086459925635800/Robert.PNG",
            verified: false
        },
        images: [
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730412994589x303901094126468740/Splitlease%20Listing%201.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730412965089x318901765491606900/Splitlease%20Listing%202.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730412978693x378654612206313100/Splitlease%20Listing%203.png"
        ],
        isNew: true,
        description: "• Studio • 1 bathroom • Kitchenette"
    },
    {
        id: 2,
        title: "Completely Renovated! Fully Furnished 1BR",
        location: "Manhattan Valley, Manhattan",
        neighborhood: "manhattan-valley",
        borough: "manhattan",
        coordinates: { lat: 40.7989, lng: -73.9662 },
        price: {
            starting: 236,
            full: 330
        },
        type: "Entire Place",
        squareFeet: null,
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        kitchen: "Full Kitchen",
        host: {
            name: "Herbert",
            image: "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409100287x106329658851495860/herbert.PNG",
            verified: false
        },
        images: [
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413031802x451041173459507300/Splitlease%20Listing%204.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413044073x134745615303687200/Splitlease%20Listing%205.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413055698x654513207172114300/Splitlease%20Listing%206.png"
        ],
        isNew: true,
        description: "• 1 bedroom • 1 bathroom • Full Kitchen"
    },
    {
        id: 3,
        title: "Studio – Clean, Modern, Great Location",
        location: "Chinatown, Manhattan",
        neighborhood: "chinatown",
        borough: "manhattan",
        coordinates: { lat: 40.7158, lng: -73.9970 },
        price: {
            starting: 273,
            full: 358
        },
        type: "Entire Place",
        squareFeet: 400,
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        kitchen: "Full Kitchen",
        host: {
            name: "A. G.",
            image: "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409115104x181161173223309760/arthur.PNG",
            verified: false
        },
        images: [
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413070330x222901073518894400/Splitlease%20Listing%207.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413082474x975577863901301900/Splitlease%20Listing%208.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413093946x447303268798370400/Splitlease%20Listing%209.png"
        ],
        isNew: true,
        description: "• 1 bedroom • 1 bathroom • Full Kitchen"
    },
    {
        id: 4,
        title: "Furnished Studio Apt for Rent",
        location: "Greenwich Village, Manhattan",
        neighborhood: "greenwich-village",
        borough: "manhattan",
        coordinates: { lat: 40.7336, lng: -74.0027 },
        price: {
            starting: 328,
            full: 461
        },
        type: "Entire Place",
        squareFeet: 750,
        maxGuests: 3,
        bedrooms: 0,
        bathrooms: 1,
        kitchen: "Full Kitchen",
        host: {
            name: "Julia",
            image: "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409141343x409613303206629500/julia.PNG",
            verified: false
        },
        images: [
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413108778x207988749295402080/Splitlease%20Listing%2010.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413123209x122612598687411100/Splitlease%20Listing%2011.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413135065x424780875621139460/Splitlease%20Listing%2012.png"
        ],
        isNew: true,
        description: "• Studio • 1 bathroom • Full Kitchen"
    },
    {
        id: 5,
        title: "New NYC Loft",
        location: "Financial District, Manhattan",
        neighborhood: "financial-district",
        borough: "manhattan",
        coordinates: { lat: 40.7074, lng: -74.0113 },
        price: {
            starting: 291,
            full: 346
        },
        type: "Entire Place",
        squareFeet: 1200,
        maxGuests: 3,
        bedrooms: 2,
        bathrooms: 2,
        kitchen: "Full Kitchen",
        host: {
            name: "Samuel R",
            image: "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409157968x114901798371225990/samuel.PNG",
            verified: true
        },
        images: [
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413149658x206207424473874340/Splitlease%20Listing%2013.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413163513x913598173996433900/Splitlease%20Listing%2014.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413178609x491057970649830900/Splitlease%20Listing%2015.png"
        ],
        isNew: true,
        description: "• 2 bedrooms • 2 bathrooms • Full Kitchen"
    },
    {
        id: 6,
        title: "Spacious, Beautiful and Bright Private Room",
        location: "Clinton Hill, Brooklyn",
        neighborhood: "clinton-hill",
        borough: "brooklyn",
        coordinates: { lat: 40.6881, lng: -73.9666 },
        price: {
            starting: 307,
            full: 307
        },
        type: "Private Room",
        squareFeet: null,
        maxGuests: 1,
        bedrooms: 2,
        bathrooms: 1,
        kitchen: "Full Kitchen",
        host: {
            name: "Selena",
            image: "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409172448x313002107074554900/selena.PNG",
            verified: false
        },
        images: [
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413192937x252188036968253400/Splitlease%20Listing%2016.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413206633x576879476765729900/Splitlease%20Listing%2017.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413219322x308089936802674700/Splitlease%20Listing%2018.png"
        ],
        isNew: true,
        description: "• 2 bedrooms • 1 bathroom • Full Kitchen"
    },
    {
        id: 7,
        title: "Brooklyn Cozy Classy Duplex near NYC",
        location: "Canarsie, Brooklyn",
        neighborhood: "canarsie",
        borough: "brooklyn",
        coordinates: { lat: 40.6439, lng: -73.9065 },
        price: {
            starting: 225,
            full: 246
        },
        type: "Entire Place",
        squareFeet: null,
        maxGuests: 2,
        bedrooms: 0,
        bathrooms: 1,
        kitchen: "Kitchenette",
        host: {
            name: "Cynthia M",
            image: "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409188815x773479159735143000/cynthiam.PNG",
            verified: false
        },
        images: [
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413232986x547905507273934850/Splitlease%20Listing%2019.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413245785x173936445265356200/Splitlease%20Listing%2020.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730412994589x303901094126468740/Splitlease%20Listing%201.png"
        ],
        isNew: true,
        description: "• Studio • 1 bathroom • Kitchenette"
    },
    {
        id: 8,
        title: "Canarsie Classy Apartment",
        location: "Canarsie, Brooklyn",
        neighborhood: "canarsie",
        borough: "brooklyn",
        coordinates: { lat: 40.6419, lng: -73.9045 },
        price: {
            starting: 287,
            full: 307
        },
        type: "Entire Place",
        squareFeet: null,
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        kitchen: "Full Kitchen",
        host: {
            name: "Cynthia",
            image: "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409203960x303451834638118900/cynthia.PNG",
            verified: false
        },
        images: [
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730412965089x318901765491606900/Splitlease%20Listing%202.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730412978693x378654612206313100/Splitlease%20Listing%203.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413031802x451041173459507300/Splitlease%20Listing%204.png"
        ],
        isNew: true,
        description: "• 1 bedroom • 1 bathroom • Full Kitchen"
    },
    {
        id: 9,
        title: "Upper east side studio",
        location: "Upper East Side (UES), Manhattan",
        neighborhood: "ues",
        borough: "manhattan",
        coordinates: { lat: 40.7736, lng: -73.9566 },
        price: {
            starting: 322,
            full: 322
        },
        type: "Entire Place",
        squareFeet: null,
        maxGuests: 2,
        bedrooms: 0,
        bathrooms: 1,
        kitchen: "Full Kitchen",
        host: {
            name: "Natalia",
            image: "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409219008x120901643563062940/natalia.PNG",
            verified: false
        },
        images: [
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413044073x134745615303687200/Splitlease%20Listing%205.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413055698x654513207172114300/Splitlease%20Listing%206.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413070330x222901073518894400/Splitlease%20Listing%207.png"
        ],
        isNew: true,
        description: "• Studio • 1 bathroom • Full Kitchen"
    },
    {
        id: 10,
        title: "Brooklyn Shared Room with Full Kitchen",
        location: "Brooklyn",
        neighborhood: "brooklyn",
        borough: "brooklyn",
        coordinates: { lat: 40.6782, lng: -73.9442 },
        price: {
            starting: 229,
            full: 263
        },
        type: "Shared Room",
        squareFeet: 1400,
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        kitchen: "Full Kitchen",
        host: {
            name: "Sharath b",
            image: "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409234623x872087088552266600/sharathb.PNG",
            verified: true
        },
        images: [
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413082474x975577863901301900/Splitlease%20Listing%208.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413093946x447303268798370400/Splitlease%20Listing%209.png",
            "https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413108778x207988749295402080/Splitlease%20Listing%2010.png"
        ],
        isNew: true,
        description: "• 1 bedroom • 1 bathrooms • Full Kitchen"
    }
];

// AI Research prompt data
const aiResearchPrompt = {
    title: "Free, AI Deep Research",
    subtitle: "Save time & money with Insights from 100+ sources",
    buttonText: "Your unique logistics",
    icon: `<div class="aiResearchAtomIcon" style="width: 40px; height: 40px;"></div>`
};