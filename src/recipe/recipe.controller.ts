import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.type';
import { RecipeService } from './recipe.service';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { RecipeEntity } from './entities/recipe.entity';
import { HandlerParams } from './validators/handler-params';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@ApiTags('recipes')
@Controller('recipes')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class RecipeController {
  /**
   * class constructor
   * @param _recipeService Service to access recipes
   */
  constructor(private readonly _recipeService: RecipeService) {}

  /**
   * Handler to answer to GET /recipes/first route
   *
   * @returns {Observable<RecipeEntity>} First Recipe in the database
   */
  @ApiOkResponse({
    description: 'Return the first recipe',
    type: RecipeEntity,
  })
  @ApiNoContentResponse({ description: 'There is no recipe here.' })
  @Get('first')
  findFirst(): Observable<Recipe | void> {
    return this._recipeService.findFirst();
  }

  /**
   * Handler to answer to GET /recipes/:id route
   *
   * @param {HandlerParams} params list of route params to take recipe id
   *
   * @returns {Observable<RecipeEntity>} Recipe corresponding to the id asked
   */
  @ApiOkResponse({
    description: 'Return the recipe with the id asked',
    type: RecipeEntity,
  })
  @ApiNotFoundResponse({
    description: 'Recipe with the given "id" doesn\'t exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter provided is not valid',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the recipe in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('/:id')
  findById(@Param() params: HandlerParams): Observable<RecipeEntity> {
    return this._recipeService.findById(params.id);
  }

  /**
   * Handler to answer to GET /recipes route
   *
   * @returns {Observable<RecipeEntity[] | void>} array of all the known recipes
   */
  @ApiOkResponse({
    description: 'Return all the known recipes',
    type: RecipeEntity,
    isArray: true,
  })
  @ApiNoContentResponse({
    description: 'No recipes are in database',
  })
  @Get()
  findAll(): Observable<Recipe[] | void> {
    return this._recipeService.findAll();
  }

  /**
   * Handler to answer to DELETE /recipes/:id route
   *
   * @param id
   *
   * @returns Observable<void>
   */

  @ApiNoContentResponse({
    description: 'The recipe has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Recipe with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the recipe in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param('id') id: string): Observable<void> {
    return this._recipeService.delete(id);
  }

  /**
   * Handler to answer to /recipes route
   *
   * @param id
   * @param updateRecipenDto
   *
   * @returns Observable<Recipe>
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Observable<Recipe> {
    return this._recipeService.update(id, updateRecipeDto);
  }
}
