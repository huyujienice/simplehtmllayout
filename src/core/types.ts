export interface MidParams {
  marginpaddingLayout?: Set<string>;
  positionLayoutSet?: Set<string>;
  widthStyleSet?: Set<string>;
  heightStyleSet?: Set<string>;
}

export interface PluginOptions {
  cssUnit?: string;
}

export interface Map<K, V> {
  clear(): void;
  delete(key: K): boolean;
  entries(): IterableIterator<[K, V]>;
  forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
  get(key: K): V;
  has(key: K): boolean;
  keys(): IterableIterator<K>;
  set(key: K, value?: V): Map<K, V>;
  size: number;
  values(): IterableIterator<V>;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  [Symbol.toStringTag]: string;
}

export interface Set<T> {
  add(value: T): Set<T>;
  clear(): void;
  delete(value: T): boolean;
  entries(): IterableIterator<[T, T]>;
  forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
  has(value: T): boolean;
  keys(): IterableIterator<T>;
  size: number;
  values(): IterableIterator<T>;
  [Symbol.iterator]():IterableIterator<T>;
  [Symbol.toStringTag]: string;
}