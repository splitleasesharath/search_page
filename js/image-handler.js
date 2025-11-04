/**
 * Image Handler for Listing and Host Images
 * Handles image loading with fallbacks
 */

// Image fallback URLs
const IMAGE_FALLBACKS = {
    listing: [
        'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730412994589x303901094126468740/Splitlease%20Listing%201.png',
        'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730412965089x318901765491606900/Splitlease%20Listing%202.png',
        'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730412978693x378654612206313100/Splitlease%20Listing%203.png',
        'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1730413031802x451041173459507300/Splitlease%20Listing%204.png'
    ],
    host: [
        'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409086161x522086459925635800/Robert.PNG',
        'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409100287x106329658851495860/herbert.PNG',
        'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409115104x181161173223309760/arthur.PNG',
        'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409141343x409613303206629500/julia.PNG'
    ]
};

/**
 * Handle image loading with fallbacks
 */
function setupImageHandlers() {
    // Handle listing images
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            const img = e.target;

            // Check if it's a listing image
            if (img.closest('.listing-images')) {
                handleListingImageError(img);
            }
            // Check if it's a host image
            else if (img.classList.contains('host-avatar')) {
                handleHostImageError(img);
            }
        }
    }, true);
}

function handleListingImageError(img) {
    console.log('📸 Listing image failed to load:', img.src);

    // Get listing ID from the card
    const card = img.closest('.listing-card');
    const listingId = card ? card.dataset.id : Math.random().toString(36).substr(2, 9);

    // Use a fallback image based on listing ID
    const fallbackIndex = Math.abs(listingId.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0)) % IMAGE_FALLBACKS.listing.length;
    const fallbackUrl = IMAGE_FALLBACKS.listing[fallbackIndex];

    if (img.src !== fallbackUrl) {
        console.log('🔄 Using fallback listing image');
        img.src = fallbackUrl;
    } else {
        // If even fallback fails, create a colored placeholder
        createImagePlaceholder(img, 'Listing Image', '#667eea');
    }
}

function handleHostImageError(img) {
    console.log('👤 Host image failed to load:', img.src);

    // Get host name from alt attribute or nearby text
    const hostName = img.alt || 'Host';
    const nameHash = hostName.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
    const fallbackIndex = Math.abs(nameHash) % IMAGE_FALLBACKS.host.length;
    const fallbackUrl = IMAGE_FALLBACKS.host[fallbackIndex];

    if (img.src !== fallbackUrl) {
        console.log('🔄 Using fallback host image');
        img.src = fallbackUrl;
    } else {
        // If even fallback fails, create a colored placeholder
        createImagePlaceholder(img, hostName, '#31135D');
    }
}

function createImagePlaceholder(img, text, backgroundColor) {
    console.log('🎨 Creating placeholder for:', text);

    // Create a canvas-based placeholder
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size based on image size
    const width = img.width || 300;
    const height = img.height || 200;
    canvas.width = width;
    canvas.height = height;

    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Add text
    ctx.fillStyle = 'white';
    ctx.font = `${Math.min(width, height) / 8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw text with word wrapping for long text
    const words = text.split(' ');
    let line = '';
    let lines = [];
    const maxWidth = width * 0.8;

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            lines.push(line);
            line = words[i] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    // Draw each line
    const lineHeight = Math.min(width, height) / 8;
    const startY = height / 2 - (lines.length - 1) * lineHeight / 2;

    lines.forEach((line, index) => {
        ctx.fillText(line.trim(), width / 2, startY + index * lineHeight);
    });

    // Convert canvas to data URL and set as image source
    img.src = canvas.toDataURL();
}

/**
 * Preload images for better user experience
 */
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        console.log('📦 Preloading image:', url);
    });
}

/**
 * Initialize image handling
 */
function initImageHandler() {
    setupImageHandlers();

    // Preload some common fallback images
    preloadImages([
        ...IMAGE_FALLBACKS.listing.slice(0, 2),
        ...IMAGE_FALLBACKS.host.slice(0, 2)
    ]);

    console.log('📸 Image handler initialized');
}

// Auto-initialize when DOM loads
if (typeof window !== 'undefined') {
    window.initImageHandler = initImageHandler;
    window.preloadImages = preloadImages;

    document.addEventListener('DOMContentLoaded', initImageHandler);
}