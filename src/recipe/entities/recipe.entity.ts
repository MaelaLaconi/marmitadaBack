import {Exclude, Expose, Type} from "class-transformer";
import {AuthorEntity} from "./author.entity";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class RecipeEntity {

  @ApiProperty({
    name: 'category',
    description: 'Category of the recipe',
    example: 'sweet/salty'
  })
  @Expose()
  @Type(() => String)
  category: string;

  @ApiProperty({
    name: 'id',
    description: 'Unique id for the recipe',
    example: '5763cd4d9d2a4f259b53c901'
  })
  @Expose()
  @Type(() => String)
  id: string;
  
  @ApiProperty({
    name: 'name',
    description: 'Name of the dish made with this recipe',
    example: 'Tadaramisu'
  })
  @Expose()
  @Type(() => String)
  name: string;
  
  @ApiProperty({
    name: 'description',
    description: 'A description of the dish made with this recipe',
    example: 'Un dessert italien à base de mascarponne, de biscuit boudoire, de sucre et de café'
  })
  @Expose()
  @Type(() => String)
  description: string;
  
  @ApiProperty({
    name: 'author',
    description: 'Author',
  })
  @Expose()
  @Type(() => AuthorEntity)
  author: AuthorEntity;
  
  @ApiProperty({
    name: 'ingredients',
    description: 'List of the ingredients needed for this recipe',
    example: ['first ingredient', 'second ingredient', 'third ingredient'],
    isArray: true,
  })
  @Expose()
  @Type(() => Array)
  ingredients: string[];
  
  @ApiProperty({
    name: 'steps',
    description: 'List of steps to follow for this recipe',
    example: ['First do this.', 'Then do that.', 'Let cool down in the freezer and set the toppings.'],
    isArray: true,
  })
  @Expose()
  @Type(() => Array)
  steps: string[];
  
  @ApiProperty({
    name: 'difficulty',
    description: 'Difficulty of the recipe. Between 0 and 5.',
    example: 4
  })
  @Expose()
  @Type(() => Number)
  difficulty: number;
  
  @ApiProperty({
    name: 'preparationTime',
    description: 'An approximation of the time needed to do this recipe.',
    example: 30
  })
  @Expose()
  @Type(() => Number)
  preparationTime: number;
  
  @ApiProperty({
    name: 'cookingTime',
    description: 'An approximation of the time needed to cook the dish.',
    example: 5
  })
  @Expose()
  @Type(() => Number)
  cookingTime: number;
  
  constructor(partial: Partial<RecipeEntity>) {
    Object.assign(this, partial);
  }
}
