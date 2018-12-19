# Array

## `tap(fun)`

```js
Kasen([1, 2, 3])
  .tap((v, k) => console.log(`${k}: ${v}`))
  .toJs();
// => [1, 2, 3]
```

## `map(fun)`

```js
Kasen([1, 2, 3])
  .map(v => v + 1)
  .toJs();
// => [2, 3, 4]

Kasen([1, 2, 3])
  .map((v, k) => v + k)
  .toJs();
// => [1, 3, 5]

Kasen([1, 2, 3])
  .map.if(false, v => v + 1)
  .toJs();
// => [1, 2, 3]

Kasen.map([1, 2, 3], v => v + 1);
// => [2, 3, 4]
```

## `pluck(key)`

```js
Kasen([{ id: 1, name: "alpha" }, { id: 2, name: "beta" }, { id: 3, name: "gamma" }])
  .pluck("id")
  .toJs();
// => [1, 2, 3]

Kasen([{ id: 1, name: "alpha" }, { id: 2, name: "beta" }, { id: 3, name: "gamma" }])
  .pluck.if(false, "id")
  .toJs();
// => [{ id: 1, name: "alpha" }, { id: 2, name: "beta" }, { id: 3, name: "gamma" }]

Kasen.pluck([{ id: 1, name: "alpha" }, { id: 2, name: "beta" }, { id: 3, name: "gamma" }], "id");
// => [1, 2, 3]
```

## `filter(fun)`

```js
Kasen([1, 0, 2, null, 3, undefined])
  .filter()
  .toJs();
// => [1, 2, 3]

Kasen([1, 0, 2, null, 3, undefined])
  .filter.if(false)
  .toJs();
// => [1, 0, 2, null, 3, undefined]

Kasen.filter([1, 0, 2, null, 3, undefined]);
// => [1, 2, 3]

Kasen([1, 2, 3])
  .filter(v => v % 2 === 1)
  .toJs();
// => [1, 3]

Kasen([1, 2, 3])
  .filter.if(false, v => v % 2 === 1)
  .toJs();
// => [1, 2, 3]

Kasen([1, 2, 3])
  .filter((v, k) => k % 2 === 1)
  .toJs();
// => [2]

Kasen([1, 2, 3])
  .filter.if(false, (v, k) => k % 2 === 1)
  .toJs();
// => [1, 2, 3]

Kasen.filter([1, 2, 3], (v, k) => k % 2 === 1);
// => [2]
```

## `filterNot(fun)`

## `reverse()`

## `take(num)`

## `takeLast(num)`

## `takeWhile(fun)`

## `takeUntil(fun)`

## `skip(num)`

## `skipLast(num)`

## `skipWhile(fun)`

## `skipUntil(fun)`

## `set(index, value)`

## `update(index, fun)`

## `delete(index)`

## `clear()`

## `concat(...values)`

## `insert(index, value)`

## `push(...values)`

## `pop()`

## `unshift(...values)`

## `shift()`

## `splice()`

## `setIn(keys, value)`

## `updateIn(keys, fun)`

## `deleteIn(keys)`

## `flatten()`

## `flatMap(fun)`

## `zip(...arrays)`

## `zipAll(...arrays)`

## `zipWith(fun, ...arrays)`

## `sort(fun)`

## `unique(fun)`

## `chunk(num)`

## `sliding(num, step)`

## `range(start, end, step)`

## `repeat(value, num)`

## `copy()`

## `memoize()`

## `isEmpty()`

## `count(fun)`

## `get(index, protection)`

## `has(index)`

## `includes(value)`

## `getIn(keys, protection)`

## `hasIn(keys)`

## `head()`

## `first()`

## `tail()`

## `init()`

## `tail()`

## `splitAt(index)`

## `toJs()`

## `toArray()`

## `toObject()`

## `reduce(fun, init)`

## `reduceRight(fun, init)`

## `reduceWhile(fun, init)`

## `scan(fun, init)`

## `scanRight(fun, init)`

## `partition(fun)`

## `join()`

## `groupBy(fun)`

## `every(fun)`

## `some(fun)`

## `find(fun)`

## `findLast(fun)`

## `findEntry(fun)`

## `findLastEntry(fun)`

## `findKey(fun)`

## `findLastKey(fun)`

## `findIndex(fun)`

## `findLastIndex(fun)`

## `keyOf(value)`

## `lastKeyOf(value)`

## `indexOf(value)`

## `lastIndexOf(value)`

## `sum(fun)`

## `max(fun)`

## `mix(fun)`

## `equals(value)`

## `hashCode()`

## `keys()`

## `values()`

## `entries()`

## `forEach(fun)`
