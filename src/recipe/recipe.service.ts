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
    this._addRecipe(recipe).pipe(
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
      map((_: R) => new RecipeEntity(_)),
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
   * Deletes one recipe in people list
   *
   * @param {string} id of the recipe to delete
   *
   * @returns {Observable<void>}
   */
  /**
   * Deletes one person in people list
   *
   * @param {string} id of the person to delete
   *
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._recipesDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: R) =>
        !!_
          ? of(undefined)
          : throwError(
            () => new NotFoundException(`Person with id '${id}' not found`),
          ),
      ),
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
   * Update a recipe in people list
   *
   * @param {string} id of the person to update
   * @param person data to update
   *
   * @returns {Observable<PersonEntity>}
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
      mergeMap((_: R) =>
        !!_
          ? of(new RecipeEntity(_))
          : throwError(
            () => new NotFoundException(`People with id '${id}' not found`),
          ),
      ),
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
