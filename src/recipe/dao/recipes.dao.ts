import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Recipe, RecipeDocument} from "../schemas/recipe.schema";
import {Model} from "mongoose";
import {defaultIfEmpty, from, Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

@Injectable()
export class RecipesDao {
  /**
   * Class constructor
   *
   * @param {Model<RecipeDocument>} _recipeModel instance of the model representing a Recipe
   */
  constructor(
    @InjectModel(Recipe.name)
    private readonly _recipeModel: Model<RecipeDocument>
  ) {}
  
  /**
   * Call mongoose method, call toJSON on each result and returns RecipeModel[] or undefined
   *
   * @returns {Observable<Recipe[] | void>}
   */
  find = (): Observable<Recipe[] | void> =>
    from(this._recipeModel.find({})).pipe(
      filter( (docs: RecipeDocument[]) => !!docs && docs.length > 0),
      map( (docs: RecipeDocument[]) =>
        docs.map((_: RecipeDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );
  
}
