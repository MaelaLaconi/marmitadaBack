import {Exclude, Expose, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class AuthorEntity {
  @Expose()
  @Type(() => String)
  @ApiProperty({
    name: 'pseudo',
    description: 'The author\'s pseudo',
    example: 'Gius'
  })
  pseudo: string;
  
  @Expose()
  @Type(() => String)
  @ApiProperty({
    name: 'firstname',
    description: 'Firstname of the author',
    example: 'Giuseppe',
    required: false,
  })
  firstname?: string;
  
  @Expose()
  @Type(() => String)
  @ApiProperty({
    name: 'lastname',
    description: 'Lastname of the author',
    example: 'Russo',
    required: false,
  })
  lastname?: string;
}
