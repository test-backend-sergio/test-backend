import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { ImageController } from './image.controller';
import { RecipeService } from '../recipe/recipe.service';
import { RecipeRepository } from '../recipe/recipe.repository';

@Module({
  imports: [AuthModule],
  controllers: [ImageController],
  providers: [RecipeService, RecipeRepository],
})
export class ImageModule {}
