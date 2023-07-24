import mongoose from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - name
 *         - comment
 *         - rating
 *       properties:
 *         name:
 *           type: string
 *         comment:
 *           type: string
 *         rating:
 *           type: number
 */
const reviewsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamp: true
  }
);

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - _id
 *         - user
 *         - name
 *         - image
 *         - description
 *         - price
 *         - brand
 *         - category
 *         - numReviews
 *         - countInStock
 *         - rating
 *         - reviews
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           example: 1999
 *         brand:
 *           type: string
 *         category:
 *           type: string
 *         numReviews:
 *           type: number
 *           example: 40
 *         countInStock:
 *           type: number
 *           example: 10
 *         rating:
 *           type: number
 *           example: 4.5
 *         reviews:
 *           type: array
 *           default: []
 *           items:
 *             $ref: '#/components/schemas/Review'
 *         
 */
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    reviews: [reviewsSchema],
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamp: true
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
