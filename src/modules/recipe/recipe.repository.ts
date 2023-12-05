import { Injectable } from '@nestjs/common';
import PrismaInstance from 'src/shared/utils/prisma.client';
import { PrismaClient } from '@prisma/client';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { TOmitRecipe } from 'src/shared/types/recipe.type';

@Injectable()
export class RecipeRepository {
  async create(createRecipeDto: CreateRecipeDto): Promise<TOmitRecipe> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const createdRecipe: TOmitRecipe = await prismaInstance.recipe.create({
      data: {
        name: createRecipeDto.name,
        preparation: createRecipeDto.preparation,
        ingredients: createRecipeDto.ingredients,
        userId: createRecipeDto.userId,
      },
      select: {
        id: true,
        ingredients: true,
        imageUrl: true,
        name: true,
        preparation: true,
        userId: true,
      },
    });

    return createdRecipe;
  }

  async findAll(): Promise<TOmitRecipe[]> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const allRecipes: TOmitRecipe[] = await prismaInstance.recipe.findMany({
      select: {
        id: true,
        name: true,
        userId: true,
        imageUrl: true,
        ingredients: true,
        preparation: true,
      },
      where: {
        deletedAt: null,
      },
    });

    return allRecipes;
  }

  async findOne(id: number): Promise<TOmitRecipe> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const recipe: TOmitRecipe = await prismaInstance.recipe.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        imageUrl: true,
        ingredients: true,
        preparation: true,
      },
    });

    return recipe;
  }

  async addImage(id: number, imageUrl: string): Promise<TOmitRecipe> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const updatedRecipe: TOmitRecipe = await prismaInstance.recipe.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: {
        imageUrl: imageUrl,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        imageUrl: true,
        ingredients: true,
        preparation: true,
      },
    });

    return updatedRecipe;
  }

  async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<TOmitRecipe> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const updatedRecipe: TOmitRecipe = await prismaInstance.recipe.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: {
        name: updateRecipeDto.name,
        preparation: updateRecipeDto.preparation,
        ingredients: updateRecipeDto.ingredients,
        userId: updateRecipeDto.userId,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        imageUrl: true,
        ingredients: true,
        preparation: true,
      },
    });

    return updatedRecipe;
  }

  async remove(id: number): Promise<TOmitRecipe> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const deletedRecipe: TOmitRecipe = await prismaInstance.recipe.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        userId: true,
        imageUrl: true,
        ingredients: true,
        preparation: true,
      },
    });

    return deletedRecipe;
  }
}
