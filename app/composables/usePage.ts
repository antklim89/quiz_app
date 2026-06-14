

export function usePage() {
  const route = useRoute();

  const resultPage = computed(() => {
    if (typeof route.query.page !== 'string') throw new Error('Invalid page query parameter');
    const page = Number.parseInt((route.query.page), 10);
    if (Number.isNaN(page) || page < 1 || page > 10) throw new Error('Invalid page query parameter');
    return page;
  });


  return resultPage;
}
