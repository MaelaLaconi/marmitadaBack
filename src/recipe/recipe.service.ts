import {
  ConflictException,
  Injectable,
  NotFoundException, UnprocessableEntityException,
} from '@nestjs/common';
import {
  catchError,
  defaultIfEmpty,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import { RecipeEntity } from './entities/recipe.entity';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {CreateRecipeDto} from "./dto/create-recipe.dto";
import {RecipesDao} from "./dao/recipes.dao";
import {Recipe} from './schemas/recipe.schema'

@Injectable()
export class RecipeService {

  /**
   * Constructor of the class
   */
  constructor(private readonly _recipesDao: RecipesDao) {
  }

  /**
   * create a new recipe and insert it in the database
   * @param recipe
   */
  create = (recipe: CreateRecipeDto): Observable<RecipeEntity> =>
    of(recipe).pipe(
      mergeMap((_: CreateRecipeDto) => this._recipesDao.save(_)),
      catchError( (e) =>
        e.code === 11000
          ? throwError(
            () =>
              new ConflictException(
                `Recipe with name '${recipe.name}' by the author '${recipe.author.pseudo}' already exists`,
              ),
          )
          : throwError( () => new UnprocessableEntityException(e.message)),
      ),
      map((_: Recipe) => new RecipeEntity(_)),
    );

  /**
   * Return all the recipes in database
   *
   * @returns {Observable<RecipeEntity[] | void>} array with all the recipes or void if there is none
   */
  findAll = (): Observable<RecipeEntity[] | void> =>
    this._recipesDao.find().pipe(
      filter((_: Recipe[]) => !!_),
      map((_: Recipe[]) => _.map((__: Recipe) => new RecipeEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns the recipe with the corresponding id
   *
   * @param {string} id of the recipe
   *
   * @returns {Observable<RecipeEntity>}
   */
  findById = (id: string): Observable<RecipeEntity> =>
    this._recipesDao.findById(id).pipe(
      catchError( (e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap( (_: Recipe) =>
        !!_
          ? of(new RecipeEntity(_))
          : throwError(
            () => new NotFoundException(`Recipe with id '${id}' not found`),
          ),
      ),
    );
  
  /**
   * Returns the recipes with the asked category
   *
   * @param {string} category of the recipes
   *
   * @returns {Observable<RecipeEntity[] | void>}
   */
  findByCategory = (category: string): Observable<RecipeEntity[] | void> =>
    this._recipesDao.findByCategory(category).pipe(
      catchError( (e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      filter((_: Recipe[]) => !!_),
      map((_: Recipe[]) => _.map((__: Recipe) => new RecipeEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns the recipes with the asked name
   *
   * @param {string} name of the recipes
   *
   * @returns {Observable<RecipeEntity[] | void>}
   */
  findByName = (name: string): Observable<RecipeEntity[] | void> =>
    this._recipesDao.findByName(name).pipe(
      catchError( (e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      filter((_: Recipe[]) => !!_),
      map((_: Recipe[]) => _.map((__: Recipe) => new RecipeEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Return all the recipes with distinct category in database
   *
   * @returns {Observable<RecipeEntity[] | void>} array with all the recipes or void if there is none
   */
  findAllCategories = (): Observable<string[] | void> =>
    this._recipesDao.findAllCategories().pipe(
      catchError( (e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      filter((_: string[]) => !!_),
      // map((_: string[]) => _.map((__: string) => __)),
      defaultIfEmpty(undefined),
    );


  /**
   * Return all the distinct names in the database
   *
   * @returns {Observable<RecipeEntity[] | void>} array with all the recipes or void if there is none
   */
  findAllNames = (): Observable<string[] | void> =>
    this._recipesDao.findAllNames().pipe(
      catchError( (e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      filter((_: string[]) => !!_),
      // map((_: string[]) => _.map((__: string) => __)),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns randomly one recipe of the list
   *
   * @returns {Observable<RecipeEntity | void>}
   */
  findRandom = (): Observable<RecipeEntity | void> =>
    this._recipesDao.find().pipe(
      filter((_: Recipe[]) => !!_),
      map((_: Recipe[]) => _[Math.floor(Math.random() * _.length)]),
      map((_: Recipe) => new RecipeEntity(_)),
      defaultIfEmpty(undefined),
    );


  /**
   * Deletes one recipe in recipes list
   *
   * @param {string} id of the recipe to delete
   *
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._recipesDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Recipe) =>
        !!_
          ? of(undefined)
          : throwError(
            () => new NotFoundException(`Recipe with id '${id}' not found`),
          ),
      ),
    );

  /**
   * Update a recipe in recipes list
   *
   * @param {string} id of the recipe to update
   * @param recipe data to update
   *
   * @returns {Observable<RecipeEntity>}
   */
  update = (id: string, recipe: UpdateRecipeDto): Observable<RecipeEntity> =>
    this._recipesDao.findByIdAndUpdate(id, recipe).pipe(
      catchError((e) =>
        e.code === 11000
          ? throwError(
            () =>
              new ConflictException(
                `People with pseudo '${recipe.author.pseudo}' already exists`,
              ),
          )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Recipe) =>
        !!_
          ? of(new RecipeEntity(_))
          : throwError(
            () => new NotFoundException(`People with id '${id}' not found`),
          ),
      ),
    );

  /**
   * return all the sorted recipes
   * @param sortMethod : string with the element to sort
   */
  findAndSort = (sortMethod: string): Observable<Recipe[] | void> =>
    this._recipesDao.findAndSort(sortMethod).pipe(
      filter((_: Recipe[]) => !!_),
      map((_: Recipe[]) => _.map((__: Recipe) => new RecipeEntity(__))),
      defaultIfEmpty(undefined),
    );

}
