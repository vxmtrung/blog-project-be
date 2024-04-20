import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PostDocument } from "src/posts/entities/post.entity";
import { Document, Types } from "mongoose";


export type AuthorDocument = Author & Document<Types.ObjectId>

@Schema({ collection: 'authors'})
export class Author {
    @Prop({ required: true, type: String })
    realname: string;

    @Prop({ required: true, type: String })
    nickname: string;

    @Prop({ required: true, type: String })
    birthday: string;

    @Prop({ type: [{ type: Types.ObjectId }] })
    posts: Array<PostDocument>;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
