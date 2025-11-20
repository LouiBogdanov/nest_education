import { CategoryEntity } from '../entities/category.entity';

export const category: CategoryEntity[] = [
  {
    id: 1,
    title: 'document 1',
    createdUserId: 12,
    createdDate: new Date('2025-11-07'),
    isCompleate: false,
  },
  {
    id: 2,
    title: 'document 2',
    createdUserId: 13,
    createdDate: new Date('2025-11-01'),
    isCompleate: true,
  },
  {
    id: 3,
    title: 'document 3',
    createdUserId: 14,
    createdDate: new Date('2025-11-06'),
    isCompleate: true,
  },
];
