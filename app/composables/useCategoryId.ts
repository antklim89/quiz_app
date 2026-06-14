import { CATEGORIES } from '~/constants';
import type { CategoryId } from '~/types';


export function useCategoryId() {
  const route = useRoute();
  const categoryId = computed(() => {
    if (typeof route.params.categoryId !== 'string' || !Object.keys(CATEGORIES).includes(route.params.categoryId)) {
      throw createError('Invalid category id query parameter');
    }
    return route.params.categoryId as CategoryId;
  });

  return categoryId;
}
