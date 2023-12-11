import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { RecipeService } from '../recipe/recipe.service';

@Controller('images')
export class ImageController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get(':id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    const recipe = await this.recipeService.findOne(+id);

    return res.sendFile(recipe.imageUrl, { root: 'uploads' });
  }
}
