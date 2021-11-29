import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as Config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RecipeModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


