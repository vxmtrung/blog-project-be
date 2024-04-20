import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AuthorSchema } from 'src/authors/entities/author.entity';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: 'Post',
            schema: PostSchema
        },
        {
            name: 'Author',
            schema: AuthorSchema
        }
    ])],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {}
