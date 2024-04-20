import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import PostResponseDTO from './dto/post.response.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostResponseDTO> {
    return this.postsService.AddNew(createPostDto);
  }

  @Get('/:id')
  async getPost(@Param('id') id: string): Promise<any> {
    return this.postsService.findOne(id);
  }

  @Get()
  async getAllPosts(): Promise<Array<PostResponseDTO>> {
    return this.postsService.findAll();
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string): Promise<any> {
    return this.postsService.delete(id);
  }

}
