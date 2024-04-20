import { Model, Types } from 'mongoose'
import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AuthorDocument } from './entities/author.entity';
import { PostDocument, Post} from 'src/posts/entities/post.entity';
import { validateOrReject } from 'class-validator';
import AuthorResponseDTO from './dto/author.response.dto';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import PostResponseDTO from 'src/posts/dto/post.response.dto';

@Injectable()
export class AuthorsService {
  private readonly logger = new Logger(AuthorsService.name);

  constructor(
    @InjectModel('Author') private authorModel: Model<AuthorDocument>,
    @InjectModel('Post') private postModel: Model<PostDocument>
  ) {}

  async addAuthor(requestDTO: CreateAuthorDto): Promise<AuthorResponseDTO> {
    await validateOrReject(requestDTO);
    try {
      const newAuthor = new this.authorModel();
      newAuthor.realname = requestDTO.name;
      newAuthor.nickname = requestDTO.nickname;
      newAuthor.birthday = requestDTO.birthDate;
      const author = await newAuthor.save();
      return AuthorResponseDTO.from(author);

    } catch (err) {
      throw new HttpException(
        'Error saving the author',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addPost(
    id: string,
    requestDTO: CreatePostDto,
  ): Promise<PostResponseDTO>{
    await validateOrReject(requestDTO);
    try {
      const newPost = new this.postModel(requestDTO as Post);
      const _id = new Types.ObjectId(id);
      const author = await this.authorModel.findById(_id).exec();
      newPost.author = author;
      newPost.creationDate = new Date().toISOString().slice(0, 10);
      const post = await newPost.save();
      // author.posts.push(post);
      // await author.save();
      return PostResponseDTO.from(post);
    } catch (err) {
      throw new HttpException(
        'Error saving the post',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Array<AuthorResponseDTO>> {
    try {
      const authors = await this.authorModel.find().exec();
      return authors.map(AuthorResponseDTO.from);
    } catch (error) {
      throw new HttpException('Error fetching authors', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<AuthorResponseDTO> {
    const _id = new Types.ObjectId(id);
    const author = await this.authorModel.findById(_id).exec();
    return AuthorResponseDTO.from(author);
  }

  async delete(id: string) {
    try {
      const _id = new Types.ObjectId(id);
      return await this.authorModel.findByIdAndDelete(_id).exec();
    } catch (error) {
      throw new HttpException(
        'Error deleting the author',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // create(createAuthorDto: CreateAuthorDto) {
  //   return 'This action adds a new author';
  // }

  // findAll() {
  //   return `This action returns all authors`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} author`;
  // }

  // update(id: number, updateAuthorDto: UpdateAuthorDto) {
  //   return `This action updates a #${id} author`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} author`;
  // }
}
