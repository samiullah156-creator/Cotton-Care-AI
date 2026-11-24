// src/services/product-api.ts

// THIS IS A MOCK API - NOW USES LOCAL STORAGE

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // URLs
  suitableFor: string[]; // Array of disease names
  category: string;
  stock: number;
}

const LOCAL_STORAGE_PRODUCTS_KEY = 'cottonCareProducts';
const LOCAL_STORAGE_PRODUCTS_VERSION_KEY = 'cottonCareProductsVersion';
const PRODUCTS_SEED_VERSION = '2';

// Initial seed data if local storage is empty
const MOCK_PRODUCTS_SEED_DATA: Product[] = [
   {
     id: 'prod1',
     name: 'Neem Oil Spray',
     description: 'Organic broad-spectrum insecticide and fungicide. Helps control aphids and reduces powdery mildew pressure. Apply every 7–14 days as needed.',
     price: 15.99,
     images: [
       'https://images.unsplash.com/photo-1590517663343-2f0b7f9ea2f6?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: ['Aphids', 'Powdery mildew'],
     category: 'Organic',
     stock: 50,
   },
   {
     id: 'prod2',
     name: 'Bacillus thuringiensis (Bt) Bio-Insecticide',
     description: 'Biological insecticide effective against caterpillars like armyworm. Safe for beneficial insects when used as directed.',
     price: 22.5,
     images: [
       'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: ['Army worm'],
     category: 'Biological',
     stock: 30,
   },
   {
     id: 'prod3',
     name: 'Copper Fungicide (Protectant)',
     description: 'Protectant copper fungicide for bacterial blight and fungal leaf spots. Apply as a preventive barrier on foliage.',
     price: 18.0,
     images: [
       'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: ['Bacterial blight', 'Target spot', 'Cotton Boll Rot'],
     category: 'Chemical',
     stock: 100,
   },
   {
     id: 'prod4',
     name: 'Systemic Fungicide (Curative + Preventive)',
     description: 'Systemic fungicide for powdery mildew and target spot. Absorbed by the plant to protect new growth.',
     price: 25.0,
     images: [
       'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: ['Powdery mildew', 'Target spot'],
     category: 'Chemical',
     stock: 20,
   },
   {
     id: 'prod5',
     name: 'Insecticidal Soap Concentrate',
     description: 'Contact insecticide for soft-bodied pests. Best for early aphid pressure; ensure good coverage on leaf undersides.',
     price: 12.99,
     images: [
       'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: ['Aphids'],
     category: 'Organic',
     stock: 75,
   },
   {
     id: 'prod6',
     name: 'Cotton Growth Fertilizer (NPK Blend)',
     description: 'Balanced nutrients to support vegetative growth and boll development. Use based on soil test recommendations.',
     price: 19.99,
     images: [
       'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: [],
     category: 'Fertilizer',
     stock: 150,
   },
   {
     id: 'prod7',
     name: 'Seed Treatment (Fungicide + Insecticide)',
     description: 'Pre-sowing seed treatment to improve early vigor and reduce seedling disease risk. Apply uniformly and let seeds dry before sowing.',
     price: 14.75,
     images: [
       'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: ['Cotton Boll Rot', 'Target spot'],
     category: 'Seed Care',
     stock: 60,
   },
   {
     id: 'prod8',
     name: 'Foliar Micronutrient Mix (Zn + B + Mg)',
     description: 'Micronutrient spray for improved flowering and boll retention. Use during key growth stages as per label.',
     price: 11.5,
     images: [
       'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: [],
     category: 'Fertilizer',
     stock: 110,
   },
   {
     id: 'prod9',
     name: 'Sticky Trap Cards (Pest Monitoring Pack)',
     description: 'Yellow sticky traps for monitoring flying pests and early warning. Useful for integrated pest management.',
     price: 8.25,
     images: [
       'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: ['Aphids'],
     category: 'Monitoring',
     stock: 250,
   },
   {
     id: 'prod10',
     name: 'Soil Moisture Meter (Field Probe)',
     description: 'Quick field moisture readings to improve irrigation timing and reduce plant stress. Helps maintain consistent growth.',
     price: 29.99,
     images: [
       'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: [],
     category: 'Smart Tools',
     stock: 40,
   },
   {
     id: 'prod11',
     name: 'Bio-Fungicide (Trichoderma Blend)',
     description: 'Biological fungicide to support soil health and suppress disease pressure. Suitable for preventive programs.',
     price: 16.4,
     images: [
       'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: ['Cotton Boll Rot', 'Target spot'],
     category: 'Biological',
     stock: 85,
   },
   {
     id: 'prod12',
     name: 'Boll Support Spray (K + Amino Acids)',
     description: 'Foliar potassium + amino acids to support boll filling during peak demand periods. Use as a supplement (not a replacement for soil fertility).',
     price: 17.9,
     images: [
       'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
     ],
     suitableFor: [],
     category: 'Fertilizer',
     stock: 95,
   },
 ];


// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function getProductsFromLocalStorage(): Product[] {
  if (typeof window === 'undefined') return [...MOCK_PRODUCTS_SEED_DATA]; // Fallback for SSR or non-browser
  try {
    const storedVersion = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_VERSION_KEY);
    if (storedVersion !== PRODUCTS_SEED_VERSION) {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(MOCK_PRODUCTS_SEED_DATA));
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_VERSION_KEY, PRODUCTS_SEED_VERSION);
      return [...MOCK_PRODUCTS_SEED_DATA];
    }

    const storedProducts = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    } else {
      // Initialize local storage with seed data if it's empty
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(MOCK_PRODUCTS_SEED_DATA));
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_VERSION_KEY, PRODUCTS_SEED_VERSION);
      return [...MOCK_PRODUCTS_SEED_DATA];
    }
  } catch (error) {
    console.error("Error accessing localStorage for products:", error);
    return [...MOCK_PRODUCTS_SEED_DATA]; // Fallback to seed data on error
  }
}

function saveProductsToLocalStorage(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products to localStorage:", error);
  }
}


export async function getProducts(diseaseFilter?: string): Promise<Product[]> {
  await delay(100); // Shorter delay as it's local
  let products = getProductsFromLocalStorage();

  if (diseaseFilter) {
    const filtered = products.filter(p => p.suitableFor.includes(diseaseFilter));
    // If filter yields no results for the current local storage, return all local storage products as a fallback
    // This behavior might need adjustment based on desired UX (e.g., show "no products match filter" instead)
    return filtered.length > 0 ? filtered : products;
  }
  return products;
}

export async function getProductById(productId: string): Promise<Product | null> {
  await delay(50);
  const products = getProductsFromLocalStorage();
  const product = products.find(p => p.id === productId);
  return product || null;
}

export async function addProduct(newProductData: Omit<Product, 'id'>): Promise<Product> {
  await delay(200);
  let products = getProductsFromLocalStorage();
  const newProduct: Product = {
    ...newProductData,
    id: `prod${Math.random().toString(36).substring(2, 8)}`, // Generate mock ID
  };
  products.push(newProduct);
  saveProductsToLocalStorage(products);
  console.log("Local Storage: Added product", newProduct);
  return newProduct;
}

export async function updateProduct(productId: string, updatedProductData: Partial<Product>): Promise<Product | null> {
  await delay(200);
  let products = getProductsFromLocalStorage();
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex === -1) {
    return null;
  }
  const updatedProduct = { ...products[productIndex], ...updatedProductData };
  products[productIndex] = updatedProduct;
  saveProductsToLocalStorage(products);
  console.log("Local Storage: Updated product", updatedProduct);
  return updatedProduct;
}

export async function deleteProduct(productId: string): Promise<boolean> {
  await delay(200);
  let products = getProductsFromLocalStorage();
  const initialLength = products.length;
  const filteredProducts = products.filter(p => p.id !== productId);
  
  if (products.length === filteredProducts.length) {
     console.log(`Local Storage: Product ${productId} not found for deletion.`);
     return false; // Product not found
  }

  saveProductsToLocalStorage(filteredProducts);
  console.log(`Local Storage: Deleting product ${productId}. Success: true`);
  return true;
}
