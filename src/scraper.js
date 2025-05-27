const axios = require('axios');
const cheerio = require('cheerio');

// Configuración de axios con timeout
const axiosInstance = axios.create({
    timeout: 5000, // 15 segundos de timeout
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
});

// Función para logging detallado
function logError(store, error, attempt = 1) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Error en ${store} (Intento ${attempt}):\n`, {
        mensaje: error.message,
        código: error.code,
        respuesta: error.response?.status,
        datos: error.response?.data,
        url: error.config?.url
    });
}

async function scrapProductWalmart(barcode) {
    return retryRequest(async () => {
    try {
        const url = `https://www.walmart.com.gt/${barcode}?_q=${barcode}&map=ft`;
        const response = await axiosInstance.get(url);
        const $ = cheerio.load(response.data);

        // Verificar si hay resultados
        const noResults = $('.search-no-results-title, .vtex-search-result-3-x-searchNotFoundInfo').length > 0;
        if (noResults) {
            throw new Error('Producto no encontrado en Walmart');
        }

        // Extraer datos del producto desde JSON-LD
        let productData = null;
        $('script[type="application/ld+json"]').each((_, element) => {
            try {
                const data = JSON.parse($(element).html());
                if (data['@type'] === 'ItemList' && Array.isArray(data.itemListElement)) {
                    for (const itemList of data.itemListElement) {
                        if (itemList.item && itemList.item['@type'] === 'Product') {
                            const prod = itemList.item;
                            productData = {
                                nombre: prod.name || '',
                                precio: prod.offers?.lowPrice || prod.offers?.price || '',
                                imagen: prod.image || ''
                            };
                            return false; // Romper el bucle each
                        }
                    }
                } else if (data['@type'] === 'Product') {
                    productData = {
                        nombre: data.name || '',
                        precio: data.offers?.lowPrice || data.offers?.price || '',
                        imagen: data.image || ''
                    };
                    return false; // Romper el bucle each
                }
            } catch (e) { /* Continuar con el siguiente script */ }
        });

        if (!productData || !productData.nombre) {
            throw new Error('No se pudo extraer la información del producto de Walmart');
        }
        return productData;
    } catch (error) {
        logError('Walmart', error, i + 1);
        if (error.code === 'ECONNABORTED') {
            throw new Error('Tiempo de espera agotado al conectar con Walmart');
        }
        throw new Error(`Error al obtener datos del producto en Walmart: ${error.message}`);
    }
    });
}

async function scrapProductLaTorre(barcode) {
    return retryRequest(async () => {
    try {
        const url = `https://www.latorre.com.gt/${barcode}?_q=${barcode}&map=ft`;
        const response = await axiosInstance.get(url);
        const $ = cheerio.load(response.data);

        // Verificar si hay resultados
        const noResults = $('.vtex-search-result-3-x-searchNotFoundInfo, .search-no-results-title').length > 0;
        if (noResults) {
            throw new Error('Producto no encontrado en La Torre');
        }

        // Extraer datos del producto desde JSON-LD
        let productData = null;
        $('script[type="application/ld+json"]').each((_, element) => {
            try {
                const data = JSON.parse($(element).html());
                if (data['@type'] === 'ItemList' && Array.isArray(data.itemListElement)) {
                    for (const itemList of data.itemListElement) {
                        if (itemList.item && itemList.item['@type'] === 'Product') {
                            const prod = itemList.item;
                            productData = {
                                nombre: prod.name || '',
                                precio: prod.offers?.lowPrice || prod.offers?.price || '',
                                imagen: prod.image || ''
                            };
                            return false;
                        }
                    }
                } else if (data['@type'] === 'Product') {
                    productData = {
                        nombre: data.name || '',
                        precio: data.offers?.lowPrice || data.offers?.price || '',
                        imagen: data.image || ''
                    };
                    return false;
                }
            } catch (e) { /* Continuar con el siguiente script */ }
        });

        if (!productData || !productData.nombre) {
            throw new Error('No se pudo extraer la información del producto de La Torre');
        }
        return productData;
    } catch (error) {
        logError('La Torre', error, i + 1);
        if (error.code === 'ECONNABORTED') {
            throw new Error('Tiempo de espera agotado al conectar con La Torre');
        }
        throw new Error(`Error al obtener datos del producto en La Torre: ${error.message}`);
    }
    });
}

async function scrapProductPaiz(barcode) {
    return retryRequest(async () => {
    try {
        const url = `https://www.paiz.com.gt/${barcode}?_q=${barcode}&map=ft`;
        const response = await axiosInstance.get(url);
        const $ = cheerio.load(response.data);

        // Verificar si hay resultados
        const noResults = $('.vtex-search-result-3-x-searchNotFoundInfo, .search-no-results-title').length > 0;
        if (noResults) {
            throw new Error('Producto no encontrado en Paiz');
        }

        // Extraer datos del producto desde JSON-LD
        let productData = null;
        $('script[type="application/ld+json"]').each((_, element) => {
            try {
                const data = JSON.parse($(element).html());
                if (data['@type'] === 'ItemList' && Array.isArray(data.itemListElement)) {
                    for (const itemList of data.itemListElement) {
                        if (itemList.item && itemList.item['@type'] === 'Product') {
                            const prod = itemList.item;
                            productData = {
                                nombre: prod.name || '',
                                precio: prod.offers?.lowPrice || prod.offers?.price || '',
                                imagen: prod.image || ''
                            };
                            return false;
                        }
                    }
                } else if (data['@type'] === 'Product') {
                    productData = {
                        nombre: data.name || '',
                        precio: data.offers?.lowPrice || data.offers?.price || '',
                        imagen: data.image || ''
                    };
                    return false;
                }
            } catch (e) { /* Continuar con el siguiente script */ }
        });

        if (!productData || !productData.nombre) {
            throw new Error('No se pudo extraer la información del producto de Paiz');
        }
        return productData;
    } catch (error) {
        logError('Paiz', error, i + 1);
        if (error.code === 'ECONNABORTED') {
            throw new Error('Tiempo de espera agotado al conectar con Paiz');
        }
        throw new Error(`Error al obtener datos del producto en Paiz: ${error.message}`);
    }
    });
}

async function scrapProductMaxi(barcode) {
    return retryRequest(async () => {
    try {
        const url = `https://www.maxidespensa.com.gt/${barcode}?_q=${barcode}&map=ft`;
        const response = await axiosInstance.get(url);
        const $ = cheerio.load(response.data);

        // Verificar si hay resultados
        const noResults = $('.vtex-search-result-3-x-searchNotFoundInfo, .search-no-results-title').length > 0;
        if (noResults) {
            throw new Error('Producto no encontrado en Maxidespensa');
        }

        // Extraer datos del producto desde JSON-LD
        let productData = null;
        $('script[type="application/ld+json"]').each((_, element) => {
            try {
                const data = JSON.parse($(element).html());
                if (data['@type'] === 'ItemList' && Array.isArray(data.itemListElement)) {
                    for (const itemList of data.itemListElement) {
                        if (itemList.item && itemList.item['@type'] === 'Product') {
                            const prod = itemList.item;
                            productData = {
                                nombre: prod.name || '',
                                precio: prod.offers?.lowPrice || prod.offers?.price || '',
                                imagen: prod.image || ''
                            };
                            return false; // Romper el bucle each
                        }
                    }
                } else if (data['@type'] === 'Product') {
                    productData = {
                        nombre: data.name || '',
                        precio: data.offers?.lowPrice || data.offers?.price || '',
                        imagen: data.image || ''
                    };
                    return false; // Romper el bucle each
                }
            } catch (e) { /* Continuar con el siguiente script */ }
        });

        if (!productData || !productData.nombre) {
            throw new Error('No se pudo extraer la información del producto de Maxidespensa');
        }
        return productData;
    } catch (error) {
        logError('Maxidespensa', error, i + 1);
        if (error.code === 'ECONNABORTED') {
            throw new Error('Tiempo de espera agotado al conectar con Maxidespensa');
        }
        throw new Error(`Error al obtener datos del producto en Maxidespensa: ${error.message}`);
    }
    });
}

// Función de reintento
async function retryRequest(fn, retries = 4, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

async function scrapProduct(barcode) {
    const [maxidespensa, walmart, latorre, paiz] = await Promise.allSettled([
        scrapProductMaxi(barcode),
        scrapProductWalmart(barcode),
        scrapProductLaTorre(barcode),
        scrapProductPaiz(barcode)
    ]);
    return {
        maxidespensa: maxidespensa.status === 'fulfilled' ? maxidespensa.value : null,
        walmart: walmart.status === 'fulfilled' ? walmart.value : null,
        latorre: latorre.status === 'fulfilled' ? latorre.value : null,
        paiz: paiz.status === 'fulfilled' ? paiz.value : null
    };
}

module.exports = {
    scrapProduct,
    scrapProductMaxi,
    scrapProductWalmart,
    scrapProductLaTorre,
    scrapProductPaiz
};