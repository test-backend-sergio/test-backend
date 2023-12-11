import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PermissionGuard } from '../auth/permission.guard';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly groupService: RecipeService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.groupService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Patch(':id/image')
  addImage(@Param('id') id: string, @Body() imageUrl: string) {
    return this.groupService.addImage(+id, imageUrl);
  }
  @UseGuards(AuthGuard, PermissionGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.groupService.update(+id, updateRecipeDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
