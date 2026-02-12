export type Games = {
  id: string;
  title: string;
  slug: string;
  developer: string;
  image: string;
  category: string;
  popular?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
