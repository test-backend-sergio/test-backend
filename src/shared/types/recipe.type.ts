import { Recipe } from '@prisma/client';

export type TOmitRecipe = Omit<Recipe, 'createdAt' | 'updatedAt' | 'deletedAt'>;
