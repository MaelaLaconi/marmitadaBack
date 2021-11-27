import {Logger, Module} from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, Logger]
})
export class RecipeModule {}
