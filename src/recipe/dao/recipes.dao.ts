import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeDocument } from '../schemas/recipe.schema';
import { Model } from 'mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RecipeEntity } from '../entities/recipe.entity';
import { CreateRecipeDto } from '../dto/create-recipe.dto';

@Injectable()
export class RecipesDao {
  /**
   * Class constructor
   *
   * @param {Model<RecipeDocument>} _recipeModel instance of the model representing a Recipe
   */
  constructor(
    @InjectModel(Recipe.name)
    private readonly _recipeModel: Model<RecipeDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns RecipeModel[] or undefined
   *
   * @returns {Observable<Recipe[] | void>}
   */
  find = (): Observable<Recipe[] | void> =>
    from(this._recipeModel.find({})).pipe(
      filter((docs: RecipeDocument[]) => !!docs && docs.length > 0),
      map((docs: RecipeDocument[]) =>
        docs.map((_: RecipeDocument) => _.toJSON()),
      ),
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
    from(this._recipeModel.findById(id)).pipe(
      filter((doc: RecipeDocument) => !!doc),
      map((doc: RecipeDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if recipe already exists with index and add it in recipes list
   *
   * @param {CreateRecipeDto} recipe to create
   *
   * @returns {Observable<Recipe>} recipe as added in database
   */
  save = (recipe: CreateRecipeDto): Observable<Recipe> =>
    from(new this._recipeModel(recipe).save()).pipe(
      map((doc: RecipeDocument) => doc.toJSON()),
    );

  /**
   * Delete a recipe in people list
   *
   * @param {string} id
   *
   * @return {Observable<Recipe | void>}
   */
  findByIdAndRemove = (id: string): Observable<Recipe | void> =>
    from(this._recipeModel.findByIdAndRemove(id)).pipe(
      filter((doc: RecipeDocument) => !!doc),
      map((doc: RecipeDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
