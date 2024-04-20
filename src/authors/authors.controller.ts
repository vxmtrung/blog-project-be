import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import AuthorResponseDTO from './dto/author.response.dto';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import PostResponseDTO from 'src/posts/dto/post.response.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(): Promise<Array<AuthorResponseDTO>> {
    return this.authorsService.findAll();
  }

  @Post()
  add(@Body() requestDto: CreateAuthorDto): Promise<AuthorResponseDTO> {
    return this.authorsService.addAuthor(requestDto);
  }

  @Post(':id/posts')
  addPost(
    @Param('id') id: string,
    @Body() requestDto: CreatePostDto,
  ): Promise<PostResponseDTO> {
    return this.authorsService.addPost(id, requestDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.authorsService.delete(id);
  }
}
