import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31',
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

async function importData() {
  try {
    console.log('Fetching products from API...');
    const response = await axios.get('https://678024ce0476123f76a9be30.mockapi.io/products');
    const products = response.data;
    console.log(`Fetched ${products.length} products`);

    for (const product of products) {
      console.log(`Processing product: ${JSON.stringify(product)}`); // Log the entire product object
    
      // Upload image and get reference
      let imageRef = null;
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }
    
      // Use product.title or fallback to a default name
      const sanityProduct = {
        _type: 'product',
        name: product.name || 'Unnamed Product', // Use a fallback value if title is missing
        description: product.description || '', // Maps to 'description'
        price: product.price || 0, // Maps to 'price'
        category: product.category || '', // Maps to 'category'
        colors: product.colors || [], // Maps to 'colors'
        sizes: product.sizes || [], // Maps to 'sizes'
        rating: product.rating?.rate || 0, // Maps to 'rating'
        reviews: product.rating?.count || 0, // Maps to 'reviews'
        tags: product.category ? [product.category] : [], // Maps to 'tags'
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef,
              },
            }
          : undefined,
      };
    
      if (!sanityProduct.name || sanityProduct.name === 'Unnamed Product') {
        console.warn('Product name is missing or invalid:', sanityProduct);
        continue; 
      }
    
      // Upload product to Sanity
      console.log('Uploading product to Sanity:', sanityProduct.name);
      const result = await client.create(sanityProduct);
      console.log(`Product uploaded successfully: ${result._id}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();
