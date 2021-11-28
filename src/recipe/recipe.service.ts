import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {Recipe} from "./recipe.type";
import {RECIPES} from '../static/_recipes'
import {find, from, mergeMap, Observable, of, throwError} from "rxjs";
import {map, tap} from "rxjs/operators";
import {RecipeEntity} from "./entities/recipe.entity";
import {CreateRecipeDto} from "./dto/create-recipe.dto";

@Injectable()
export class RecipeService {
  private _recipes: Recipe[];

  /**
   * Constructor of the class
   */
  constructor() {
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
    of(this._recipes).pipe(
      map((_: Recipe[]) => (!!_ && !!_.length ? _ : undefined)),
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
    from(this._recipes).pipe(
      find((_: Recipe) => _.id === id),
      mergeMap((_: Recipe) =>
        !!_
        ? of(new RecipeEntity(_))
        : throwError(
            () => new NotFoundException(`Recipe with id '${id} not found`),
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
