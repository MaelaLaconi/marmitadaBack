import {
  ConflictException,
  Injectable,
  NotFoundException, UnprocessableEntityException,
} from '@nestjs/common';
import { Recipe } from './recipe.type';
import { RECIPES } from '../static/_recipes';
import {
  catchError,
  defaultIfEmpty,
  find,
  findIndex,
  from,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import { RecipeEntity } from './entities/recipe.entity';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {CreateRecipeDto} from "./dto/create-recipe.dto";
import {RecipesDao} from "./dao/recipes.dao";
import {Recipe as R} from './schemas/recipe.schema'

@Injectable()
export class RecipeService {
  private _recipes: Recipe[];

  /**
   * Constructor of the class
   */
  constructor(private readonly _recipesDao: RecipesDao) {
    this._recipes = [].concat(RECIPES);
  }

  create = (recipe: CreateRecipeDto): Observable<RecipeEntity> =>
    from(this._recipes).pipe(
      find(
        (_: Recipe) =>
          _.name.toLowerCase() === recipe.name.toLowerCase() &&
          _.author.pseudo.toLowerCase() === recipe.author.pseudo.toLowerCase(),
      ),
      mergeMap( (_: Recipe) =>
        !!_
          ? throwError(
            () =>
              new ConflictException(
                `Recipe with name '${recipe.name}' by the author '${recipe.author.pseudo} already exists in database'`,
              ),
          )
          : this._addRecipe(recipe),
      ),
    );
  
  /**
   * Return all the recipes in database
   *
   * @returns {Observable<RecipeEntity[] | void>} array with all the recipes or void if there is none
   */
  findAll = (): Observable<RecipeEntity[] | void> =>
    this._recipesDao.find().pipe(
      filter((_: R[]) => !!_),
      map((_: R[]) => _.map((__: R) => new RecipeEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Return the first recipe known
   *
   * @returns {Observable<RecipeEntity | void>} first recipe in the database
   */
  findFirst = (): Observable<RecipeEntity | void> =>
    of(this._recipes[0]);

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
            () =>new NotFoundException(`Recipe with id '${id}' not found`),
          ),
      ),
    );

  /**
   * Deletes one recipe in cookbook list
   *
   * @param {string} id of the recipe to delete
   *
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._findRecipesIndexOfList(id).pipe(
      tap((_: number) => this._recipes.splice(_, 1)),
      map(() => undefined),
    );

  /**
   * Finds index of array for current recipe
   *
   * @param {string} id of the recipe to find
   *
   * @returns {Observable<number>}
   *
   * @private
   */
  private _findRecipesIndexOfList = (id: string): Observable<number> =>
    from(this._recipes).pipe(
      findIndex((_: Recipe) => _.id === id),
      mergeMap((index: number) =>
        index > -1
          ? of(index)
          : throwError(
              () => new NotFoundException(`Recipe with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Update a recipe in recipe list
   *
   * @param {string} id of the recipe to update
   * @param recipe data to update
   *
   * @returns {Observable<RecipeEntity>}
   */
  update = (id: string, recipe: UpdateRecipeDto): Observable<RecipeEntity> =>
    from(this._recipes).pipe(
      find(
        (_: Recipe) =>
          /*_.author.pseudo.toLowerCase() ===
            recipe.author.pseudo.toLowerCase() &&*/
          _.name.toLowerCase() === recipe.name.toLowerCase() &&
          _.id.toLowerCase() !== id.toLowerCase(),
      ),
      mergeMap((_: Recipe) =>
        !!_
          ? throwError(
              () =>
                new ConflictException(
                  `Recipe with pseudo '${recipe.author.pseudo}' and name '${recipe.name}' already exists`,
                ),
            )
          : this._findRecipesIndexOfList(id),
      ),
      tap((index: number) => Object.assign(this._recipes[index], recipe)),
      map((index: number) => this._recipes[index]),
    );
  
  private _addRecipe = (recipe: CreateRecipeDto): Observable<RecipeEntity> =>
    of({
      ...recipe,
      id: this._createId(),
    }).pipe(
      tap((_: Recipe) => (this._recipes = this._recipes.concat(_))),
      map((_: Recipe) => new RecipeEntity(_)),
    );
  
  /**
   * Creates a new id
   *
   * @returns {string}
   *
   * @private
   */
  private _createId = (): string => `${new Date().getTime()}`;
}
