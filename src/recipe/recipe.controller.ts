import {ClassSerializerInterceptor, Controller, Get, UseInterceptors} from '@nestjs/common';
import {Observable} from "rxjs";
import {Recipe} from "./recipe.type";
import {RecipeService} from "./recipe.service";
import {ApiNoContentResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {HttpInterceptor} from "../interceptors/http.interceptor";
import {RecipeEntity} from "./entities/recipe.entity";

@ApiTags('recipe')
@Controller('recipe')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class RecipeController {
  /**
   * class constructor
   * @param _recipeService Service to access recipes
   */
  constructor(private readonly _recipeService: RecipeService) {}
  
  @ApiOkResponse({
    description: 'Return the first recipe',
    type: RecipeEntity
  })
  @ApiNoContentResponse({description: 'There is no recipe here.'})
  @Get()
  findFirst(): Observable<Recipe | void> {
    return this._recipeService.findFirst();
  }
}
