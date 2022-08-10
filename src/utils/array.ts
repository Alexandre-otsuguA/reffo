export const paginate = <T>(
  arr: T[],
  params: { page?: number; limit?: number }
) => {
  params.page ??= 1;
  params.limit ??= Infinity;

  return arr.slice(
    (params.page - 1) * params.limit,
    params.page * params.limit
  );
};
