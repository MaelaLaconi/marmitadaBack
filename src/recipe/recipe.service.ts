import { Injectable } from '@nestjs/common';
import {Recipe} from "./recipe.type";
import {RECIPES} from '../static/_recipes'
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class RecipeService {
  private _recipes: Recipe[];
  
  constructor() {
    this._recipes =[].concat(RECIPES);
  }
  
  findAll = (): Observable<Recipe[] | void> =>
    of(this._recipes).pipe(
      map((_: Recipe[]) => (!!_ && !!_.length ? _ : undefined)),
    );
  
  /**
   * Return the first recipe known
   */
  findFirst = (): Observable<Recipe | void> =>
    of(this._recipes[0]);
}
