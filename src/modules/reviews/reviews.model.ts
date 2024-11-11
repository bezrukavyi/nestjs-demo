import { Document, Schema, Types } from 'mongoose';

export const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 5,
    },
    productId: {
      type: Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    message: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150,
      trim: true,
    },
  },
  { timestamps: true },
);

export interface Review extends Document {
  readonly message: string;
  readonly productId: Types.ObjectId;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
