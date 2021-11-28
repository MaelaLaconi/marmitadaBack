import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as Config from 'config';

@Module({
  imports: [
    RecipeModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
  ],
})
export class AppModule {}
