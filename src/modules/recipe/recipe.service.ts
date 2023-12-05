import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { TOmitRecipe } from 'src/shared/types/recipe.type';

@Injectable()
export class RecipeService {
  constructor(private readonly groupRepository: RecipeRepository) {}
  async create(createRecipeDto: CreateRecipeDto): Promise<TOmitRecipe> {
    const createdRecipe: TOmitRecipe =
      await this.groupRepository.create(createRecipeDto);

    return createdRecipe;
  }

  async findAll(): Promise<TOmitRecipe[]> {
    const allRecipes: TOmitRecipe[] = await this.groupRepository.findAll();
    return allRecipes;
  }

  async findOne(id: number): Promise<TOmitRecipe> {
    const recipe: TOmitRecipe = await this.groupRepository.findOne(id);

    return recipe;
  }

  async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<TOmitRecipe> {
    const updatedRecipe: TOmitRecipe = await this.groupRepository.update(
      id,
      updateRecipeDto,
    );
    return updatedRecipe;
  }

  async remove(id: number): Promise<TOmitRecipe> {
    const deletedRecipe: TOmitRecipe = await this.groupRepository.remove(id);
    return deletedRecipe;
  }
}
