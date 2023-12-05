import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeRepository } from './recipe.repository';

@Module({
  imports: [AuthModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
})
export class RecipeModule {}
