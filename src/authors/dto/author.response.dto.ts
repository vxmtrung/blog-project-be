import { AuthorDocument } from "../entities/author.entity";

export default class AuthorResponseDTO {
    constructor(
        public id: string,
        public name: string,
        public nickname: string,
        public birthDate: string,
        public post?: Array<any>,
    ) { }

    static from = ({
        _id,
        realname,
        nickname,
        birthday,
        posts,
    }: AuthorDocument): AuthorResponseDTO =>
        new AuthorResponseDTO(_id.toHexString(), realname, nickname, birthday, posts);
}