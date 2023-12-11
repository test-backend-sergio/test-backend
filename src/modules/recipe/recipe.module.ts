import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeRepository } from './recipe.repository';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [AuthModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
})
export class RecipeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'recipe', method: RequestMethod.POST });
  }
}
