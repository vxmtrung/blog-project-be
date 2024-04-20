import { IsNotEmpty } from 'class-validator'

export class CreatePostDto {
    @IsNotEmpty({ message: 'Field $property cannot be empty.'})
    title: string;

    @IsNotEmpty({ message: 'Field $property cannot be empty.'})
    body: string;
}
