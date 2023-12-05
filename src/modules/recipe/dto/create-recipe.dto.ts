export class CreateRecipeDto {
  name: string;
  ingredients: string;
  preparation: string;
  imageUrl?: string;
  userId?: number;
}
