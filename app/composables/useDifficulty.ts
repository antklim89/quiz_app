import { DIFFICULTIES } from '~/constants';
import type { Difficulty } from '~/types';


export function useDifficulty() {
  const route = useRoute();
  const difficulty = computed(() => {
    if (typeof route.params.difficulty !== 'string' || !DIFFICULTIES.includes(route.params.difficulty as Difficulty)) {
      throw new Error('Invalid difficulty query parameter');
    }
    return route.params.difficulty as Difficulty;
  });


  return difficulty;
}
