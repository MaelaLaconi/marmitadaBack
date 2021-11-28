import {Logger, Module} from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Recipe, RecipeSchema} from "./schemas/recipe.schema";
import {RecipesDao} from "./dao/recipes.dao";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService, Logger, RecipesDao],
})
export class RecipeModule {}
