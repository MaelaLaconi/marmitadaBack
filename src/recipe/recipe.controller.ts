import {ClassSerializerInterceptor, Controller, Get, UseInterceptors} from '@nestjs/common';
import {Observable} from "rxjs";
import {Recipe} from "./recipe.type";
import {RecipeService} from "./recipe.service";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {HttpInterceptor} from "../interceptors/http.interceptor";
import {RecipeEntity} from "../entities/recipe.entity";

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
  @Get()
  findFirst(): Observable<Recipe> {
    return this._recipeService.findFirst();
  }
}
