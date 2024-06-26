/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
type ComputeRange<N extends number, Result extends Array<unknown> = []> = Result['length'] extends N ? Result : ComputeRange<N, [...Result, Result['length']]>;

type Index40 = ComputeRange<40>[number];

type IsTuple<T> = T extends readonly any[] & {
  length: infer Length;
} ? Length extends Index40 ? T : never : never;

type AllowedIndexes<Tuple extends ReadonlyArray<any>, Keys extends number = never> = Tuple extends readonly [] ? Keys : Tuple extends readonly [infer _, ...infer Tail] ? AllowedIndexes<Tail, Keys | Tail['length']> : Keys;

type DeepKeysPrefix<T, TPrefix> = TPrefix extends keyof T & (number | string) ? `${TPrefix}.${DeepKeys<T[TPrefix]> & string}` : never;

export type DeepKeys<T> = unknown extends T ? keyof T : object extends T ? string : T extends readonly any[] & IsTuple<T> ? AllowedIndexes<T> | DeepKeysPrefix<T, AllowedIndexes<T>> : T extends any[] ? never & 'Dynamic length array indexing is not supported' : T extends Date ? never : T extends object ? (keyof T & string) | DeepKeysPrefix<T, keyof T> : never;
