export class GameEntity {
  id: string;
  title: string;
  developer: string;
  image: string;
  category: string;
  popular?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}
