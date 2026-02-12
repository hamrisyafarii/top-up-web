export class GameEntity {
  id: string;
  title: string;
  slug: string;
  developer: string;
  image: string;
  category: string;
  popular?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}
