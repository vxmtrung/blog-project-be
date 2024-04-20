import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: 'Post',
            schema: PostSchema
        }
    ])],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {}
