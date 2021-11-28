import {Injectable, NotFoundException} from '@nestjs/common';
import {Recipe} from "./recipe.type";
import {RECIPES} from '../static/_recipes'
import {find, from, mergeMap, Observable, of, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {RecipeEntity} from "./entities/recipe.entity";

@Injectable()
export class RecipeService {
  private _recipes: Recipe[];

  /**
   * Constructor of the class
   */
  constructor() {
    this._recipes = [].concat(RECIPES);
  }

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
}
