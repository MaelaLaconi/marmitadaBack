import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class RecipeAuthorDto {
  @ApiProperty({
    name: 'pseudo',
    description: 'The author\'s pseudo',
    example: 'Gius'
  })
  @IsString()
  @IsNotEmpty()
  pseudo: string;
  
  @ApiProperty({
    name: 'firstname',
    description: 'Firstname of the author',
    example: 'Giuseppe',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstname?: string;
  
  @ApiProperty({
    name: 'lastname',
    description: 'Lastname of the author',
    example: 'Russo',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastname?: string;
}
