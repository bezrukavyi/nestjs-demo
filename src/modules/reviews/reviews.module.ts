import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsController } from './reviews.controller';
import { ReviewSchema } from './reviews.model';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
