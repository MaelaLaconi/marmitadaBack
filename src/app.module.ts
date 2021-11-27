import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [RecipeModule],
})
export class AppModule {}
