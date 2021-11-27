import {Exclude, Expose, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class AuthorEntity {
  @Expose()
  @Type(() => String)
  @ApiProperty({
    name: 'pseudo',
    description: 'The author\'s pseudo',
    example: 'Giuseppe'
  })
  pseudo: string;
  firstname?: string;
  lastname?: string;
}
