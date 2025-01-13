import { Rule as ValidationRule } from '@sanity/types';

export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Product Name',
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        description: 'A detailed description of the product',
      },
      {
        name: 'price',
        type: 'number',
        title: 'Price',
        description: 'The price of the product',
      },
      {
        name: 'category',
        type: 'string',
        title: 'Category',
        description: 'The category this product belongs to',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Product Image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'colors',
        type: 'array',
        title: 'Available Colors',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
        description: 'Add available colors for the product',
      },
      {
        name: 'sizes',
        type: 'array',
        title: 'Available Sizes',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
        description: 'Add available sizes like S, M, L, etc.',
      },
      {
        name: 'rating',
        type: 'number',
        title: 'Rating',
        description: 'The average rating of the product',
        validation: (Rule: ValidationRule) => Rule.min(0).max(5).precision(1),
    },
      {
        name: 'reviews',
        type: 'number',
        title: 'Number of Reviews',
        description: 'The total number of reviews',
      },
      {
        name: 'tags',
        type: 'array',
        title: 'Tags',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
        description: 'Add tags like "new arrival", "bestseller", etc.',
      },
    ],
  };
  