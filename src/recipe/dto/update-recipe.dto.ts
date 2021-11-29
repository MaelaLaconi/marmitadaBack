import { RecipeAuthorDto } from './recipe-author.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInstance,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRecipeDto {

  @ApiPropertyOptional({
    name: 'category',
    description: 'Category of the recipe',
    example: 'salty/sweet',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @ApiProperty({
    name: 'name',
    description: 'Name of the dish made with this recipe',
    example: 'Tadaramisu',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    name: 'description',
    description: 'A description of the dish made with this recipe',
    example:
      'Un dessert italien à base de mascarponne, de biscuit boudoire, de sucre et de café',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty({ name: 'author', description: 'Author' })
  @IsInstance(RecipeAuthorDto)
  @ValidateNested()
  @Type(() => RecipeAuthorDto)
  author: RecipeAuthorDto;

  @ApiPropertyOptional({
    name: 'ingredients',
    description: 'List of the ingredients needed for this recipe',
    example: ['first ingredient', 'second ingredient', 'third ingredient'],
    isArray: true,
  })
  @IsString({
    each: true,
  })
  @IsNotEmpty()
  @IsOptional()
  ingredients?: string[];

  @ApiPropertyOptional({
    name: 'steps',
    description: 'List of steps to follow for this recipe',
    example: [
      'First do this.',
      'Then do that.',
      'Let cool down in the freezer and set the toppings.',
    ],
  })
  @IsString({
    each: true,
  })
  @IsNotEmpty()
  @IsOptional()
  steps?: string[];

  @ApiPropertyOptional({
    name: 'difficulty',
    description: 'Difficulty of the recipe. Between 0 and 5.',
    example: 4,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  difficulty?: number;

  @ApiPropertyOptional({
    name: 'preparationTime',
    description: 'An approximation of the time needed to do this recipe.',
    example: 30,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  preparationTime?: number;

  @ApiPropertyOptional({
    name: 'cookingTime',
    description: 'An approximation of the time needed to cook the dish.',
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  cookingTime?: number;
}
