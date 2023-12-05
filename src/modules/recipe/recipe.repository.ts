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
        description: createRecipeDto.description,
        admId: createRecipeDto.admId,
      },
      select: {
        id: true,
        description: true,
      },
    });

    return createdRecipe;
  }

  async addPersonsToRecipe(groupId: number, personsId: number[]) {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    try {
      await prismaInstance.personRecipe.createMany({
        data: personsId.map((personId) => {
          return {
            personId: personId,
            groupId: groupId,
          };
        }),
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<TOmitRecipe[]> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const allRecipes: TOmitRecipe[] = await prismaInstance.recipe.findMany({
      select: {
        id: true,
        description: true,
        personRecipe: {
          select: {
            person: true,
          },
          where: {
            deletedAt: null,
          },
        },
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
        description: true,
        personRecipe: {
          select: {
            person: true,
          },
          where: {
            deletedAt: null,
          },
        },
      },
    });

    return recipe;
  }

  async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<TOmitRecipe> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const updatedRecipe: TOmitRecipe = await prismaInstance.recipe.update({
      where: {
        id: id,
      },
      data: {
        description: updateRecipeDto.description,
        admId: updateRecipeDto.admId,
      },
      select: {
        id: true,
        description: true,
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
        description: true,
      },
    });

    return deletedRecipe;
  }
}
