import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [UserModule, AuthModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
