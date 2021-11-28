import { RecipeAuthorDto } from './recipe-author.dto';

export class UpdateRecipeDto {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly author: RecipeAuthorDto;
  readonly ingredients: string[];
  readonly steps: string[];
  readonly difficulty: number;
  readonly preparationTime: number;
  readonly cookingTime: number;
}
