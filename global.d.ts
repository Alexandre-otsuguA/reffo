declare type OptionalProps<T> = {
  [K in keyof Required<T>]?: Pick<T, K> extends Required<Pick<T, K>>
    ? T[K]
    : T[K] | undefined;
};

declare type FilterProps<T, U> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends U ? K : never;
  }[keyof T]
>;

declare type Entries<T> = [keyof T, T[keyof T]][];
