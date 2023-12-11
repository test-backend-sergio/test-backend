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
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PermissionGuard } from '../auth/permission.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
          const id = req.params.id;
          const filename = `${id}.jpeg`;
          callback(null, filename);
        },
      }),
    }),
  )
  @Patch(':id/image')
  addImage(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    image.filename = `${id}.${image.mimetype.split('/')[1]}`;
    const imageUrl = `/uploads/${image.filename}`;
    return this.recipeService.addImage(+id, imageUrl);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
