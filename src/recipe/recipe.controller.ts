import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.type';
import { RecipeService } from './recipe.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import {HttpInterceptor} from "../interceptors/http.interceptor";
import {RecipeEntity} from "./entities/recipe.entity";
import {HandlerParams} from "./validators/handler-params";
import {CreateRecipeDto} from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { HandlerCategory } from "./validators/handler-category";

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
   * Handler to answer to GET /recipe/random route
   *
   * @returns Observable<RecipeEntity | void>
   */
  @ApiOkResponse({
    description: 'Returns one recipe randomly',
    type: RecipeEntity,
  })
  @ApiNoContentResponse({ description: 'No person exists in database' })
  @Get('random')
  findRandom(): Observable<RecipeEntity | void> {
    return this._recipeService.findRandom();
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
    description: 'The request can\'t be performed in the database',
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
   * @param {HandlerParams} params
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
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._recipeService.delete(params.id);
  }

  /**
   * Handler to answer to PUT /recipes/:id route
   *
   *
   * @returns Observable<RecipeEntity>
   * @param params
   * @param updatePersonDto
   */
  @ApiOkResponse({
    description: 'The recipe has been successfully updated',
    type: RecipeEntity,
  })
  @ApiNotFoundResponse({
    description: 'Recipe with the given "id" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The recipe already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
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
  @ApiBody({ description: 'Payload to update a recipe', type: UpdateRecipeDto })
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updatePersonDto: UpdateRecipeDto,
  ): Observable<RecipeEntity> {
    return this._recipeService.update(params.id, updatePersonDto);
  }
  
  @ApiCreatedResponse({
    description: 'The recipe has been successfuly created',
    type: RecipeEntity,
  })
  @ApiConflictResponse({
    description: 'The recipe already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'The payload provided is not good',
  })
  @ApiBody({
    description: 'Payload to create a new recipe',
    type: CreateRecipeDto,
  })
  @Post()
  create(@Body() recipe: CreateRecipeDto): Observable<RecipeEntity> {
    return this._recipeService.create(recipe);
  }

  /**
   * Handler to answer to GET /recipes/:category route
   *
   * @param {HandlerParams} params list of route params to take recipe category
   *
   * @returns {Observable<RecipeEntity>} Recipe corresponding to the category asked
   */
  @ApiOkResponse({
    description: 'Return the recipes with the category asked',
    type: RecipeEntity,
  })
  @ApiNotFoundResponse({
    description: 'Recipe with the given recipy doesn\'t exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter provided is not valid',
  })
  @ApiUnprocessableEntityResponse({
    description: 'The request can\'t be performed in the database',
  })
  @ApiParam({
    name: 'category',
    description: 'Category of the recipe in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('/category/:category')
  findByCategory(@Param() params: HandlerCategory): Observable<Recipe[] | void> {
    return this._recipeService.findByCategory(params.category);
  }

}
