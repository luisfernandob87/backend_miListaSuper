const axios = require('axios');
const cheerio = require('cheerio');

async function scrapProductWalmart(barcode) {
    try {
        const url = `https://www.walmart.com.gt/${barcode}?_q=${barcode}&map=ft`;
        const response = await axios.get(url);
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
        throw new Error(`Error al obtener datos del producto en Walmart: ${error.message}`);
    }
}

async function scrapProductLaTorre(barcode) {
    try {
        const url = `https://www.latorre.com.gt/${barcode}?_q=${barcode}&map=ft`;
        const response = await axios.get(url);
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
        throw new Error(`Error al obtener datos del producto en La Torre: ${error.message}`);
    }
}

async function scrapProductPaiz(barcode) {
    try {
        const url = `https://www.paiz.com.gt/${barcode}?_q=${barcode}&map=ft`;
        const response = await axios.get(url);
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
        throw new Error(`Error al obtener datos del producto en Paiz: ${error.message}`);
    }
}

async function scrapProductMaxi(barcode) {
    try {
        const url = `https://www.maxidespensa.com.gt/${barcode}?_q=${barcode}&map=ft`;
        const response = await axios.get(url);
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
        throw new Error(`Error al obtener datos del producto en Maxidespensa: ${error.message}`);
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