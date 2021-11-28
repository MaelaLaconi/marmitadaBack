import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RecipeAuthorDto {
  @ApiProperty({
    name: 'pseudo',
    description: "The author's pseudo",
    example: 'Gius',
  })
  @IsString()
  @IsNotEmpty()
  pseudo: string;

  @ApiPropertyOptional({
    name: 'firstname',
    description: 'Firstname of the author',
    example: 'Mclaughlin',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstname?: string;

  @ApiPropertyOptional({
    name: 'lastname',
    description: 'Lastname of the author',
    example: 'Russo',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastname?: string;
}
