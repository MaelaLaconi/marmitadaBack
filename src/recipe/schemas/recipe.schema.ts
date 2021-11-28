import * as mongoose from "mongoose";
import { Document } from "mongoose";
import {Prop, raw, Schema, SchemaFactory} from "@nestjs/mongoose";

export type RecipeDocument = Recipe & Document

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      // delete obsolete data
      delete ret._id;
    },
  },
  versionKey: false,
})
export class Recipe {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;
  
  @Prop({
    type: String,
    required: true,
    trim: true,
    minlenght: 2,
  })
  name: string;
  
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  description: string;
  
  @Prop(
    raw({
      pseudo: {
        type: String,
        trim: true,
        required: true,
      },
      firstname: {
        type: String,
        trim: true,
        required: false,
      },
      lastname: {
        type: String,
        trim: true,
        required: false,
      }
    })
  )
  author: any;
  
  @Prop({
    type: [String],
    required: true,
    trim: true,
  })
  ingredients: string[];
  
  @Prop({
    type: [String],
    required: true,
    trim: true,
  })
  steps: string[];
  
  @Prop({
    type: Number,
    required: true,
  })
  difficulty: number;
  
  @Prop({
    type: Number,
    required: true,
  })
  preparationTime: number;
  
  @Prop({
    type: Number,
    required: true,
  })
  cookingTime: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
