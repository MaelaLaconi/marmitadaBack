import { Injectable } from '@nestjs/common';
import {Recipe} from "./recipe.type";
import {RECIPES} from '../static/_recipes'
import {Observable, of} from "rxjs";

@Injectable()
export class RecipeService {
  private _recipes: Recipe[];
  
  constructor() {
    this._recipes =[].concat(RECIPES);
  }
  
  findFirst = (): Observable<Recipe | void> =>
    of(this._recipes[0]);
}
