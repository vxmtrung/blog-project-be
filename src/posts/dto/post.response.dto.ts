import { title } from "process";
import { PostDocument } from "../entities/post.entity";

export default class PostResponseDTO {
    constructor(
        public id: string,
        public title: string,
        public body: string,
        public creationDate: string,
        public author: any
    ) {}
    
    static from = ({
        _id, 
        title,
        body,
        creationDate,
        author
    }: PostDocument): PostResponseDTO => 
        new PostResponseDTO(
            _id.toHexString(),
            title,
            body,
            creationDate,
            author
        );
}
