export type Recipe = {
  category: string;
  id: string;
  name: string;
  description: string;
  author: Author;
  ingredients: string[];
  steps: string[];
  difficulty: number;
  preparationTime: number;
  cookingTime: number;
}

export type Author = {
  pseudo: string;
  firstname?: string;
  lastname?: string;
}
