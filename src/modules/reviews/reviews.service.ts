import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDto, UpdateReviewDto } from './reviews.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Model } from 'mongoose';
import { Review } from './reviews.model';
import { parseSortField } from 'src/common/dto/pagination.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel('Review') private readonly reviewModel: Model<Review>) {}

  async search(productId: string, pagination: PaginationDto): Promise<Review[]> {
    const { limit, page, sort } = pagination;
    const offset = (page - 1) * limit;
    const sortProperty = parseSortField(sort, ['createdAt', 'rating']);

    return this.reviewModel.find({ productId }).skip(offset).limit(limit).sort(sortProperty).exec();
  }

  async update(id: string, params: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();

    if (!review) {
      throw new Error('Review not found');
    }

    review.set(params);

    return review.save();
  }

  async create(params: CreateReviewDto): Promise<Review> {
    const review = this.reviewModel.create(params);

    return review;
  }

  async deleteById(id: string): Promise<boolean> {
    await this.reviewModel.findById(id);

    const result = await this.reviewModel.deleteOne({ _id: id });

    return result.deletedCount === 1;
  }
}
