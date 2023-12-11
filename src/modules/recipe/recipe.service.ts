import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { TOmitRecipe } from 'src/shared/types/recipe.type';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}
  async create(createRecipeDto: CreateRecipeDto): Promise<TOmitRecipe> {
    const createdRecipe: TOmitRecipe =
      await this.recipeRepository.create(createRecipeDto);

    return createdRecipe;
  }

  async findAll(): Promise<TOmitRecipe[]> {
    const allRecipes: TOmitRecipe[] = await this.recipeRepository.findAll();
    return allRecipes;
  }

  async findOne(id: number): Promise<TOmitRecipe> {
    const recipe: TOmitRecipe = await this.recipeRepository.findOne(id);

    return recipe;
  }

  async addImage(id: number, imageUrl: string): Promise<TOmitRecipe> {
    const updatedRecipe: TOmitRecipe = await this.recipeRepository.addImage(
      id,
      imageUrl,
    );
    return updatedRecipe;
  }

  async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<TOmitRecipe> {
    const updatedRecipe: TOmitRecipe = await this.recipeRepository.update(
      id,
      updateRecipeDto,
    );
    return updatedRecipe;
  }

  async remove(id: number): Promise<TOmitRecipe> {
    const deletedRecipe: TOmitRecipe = await this.recipeRepository.remove(id);
    return deletedRecipe;
  }
}
