import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from './entities/author.entity';
import { PostSchema } from 'src/posts/entities/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Author', schema: AuthorSchema },
      { name: 'Post', schema: PostSchema }
    ]),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [],
})
export class AuthorsModule {}
