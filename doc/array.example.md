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
Kasen([
  { id: 1, name: "alpha" },
  { id: 2, name: "beta" },
  { id: 3, name: "gamma" }
])
  .pluck("id")
  .toJs();
// => [1, 2, 3]

Kasen([
  { id: 1, name: "alpha" },
  { id: 2, name: "beta" },
  { id: 3, name: "gamma" }
])
  .pluck.if(false, "id")
  .toJs();
// => [{ id: 1, name: "alpha" }, { id: 2, name: "beta" }, { id: 3, name: "gamma" }]

Kasen.pluck(
  [{ id: 1, name: "alpha" }, { id: 2, name: "beta" }, { id: 3, name: "gamma" }],
  "id"
);
// => [1, 2, 3]
```

## `filter(fun)`

```js
Kasen([1, 0, 2, null, 3, undefined])
  .filter() // equals to filter(v => v)
  .toJs();
// => [1, 2, 3]

Kasen([1, 2, 3])
  .filter(v => v % 2 === 1)
  .toJs();
// => [1, 3]

Kasen([1, 2, 3])
  .filter.if(false, v => v % 2 === 1)
  .toJs();
// => [1, 2, 3]

Kasen.filter([1, 2, 3], v => v % 2 === 1);
// => [1, 3]

Kasen([1, 2, 3])
  .filter((v, k) => k % 2 === 1)
  .toJs();
// => [2]
```

## `filterNot(fun)`

```js
Kasen([1, 2, 3])
  .filterNot(v => v % 2 === 1)
  .toJs();
// => [2]

Kasen([1, 2, 3])
  .filterNot.if(false, v => v % 2 === 1)
  .toJs();
// => [1, 2, 3]

Kasen.filterNot([1, 2, 3], v => v % 2 === 1);
// => [2]

Kasen([1, 2, 3])
  .filterNot((v, k) => k % 2 === 1)
  .toJs();
// => [1, 3]
```

## `reverse()`

```js
Kasen([1, 2, 3])
  .reverse()
  .toJs();
// => [3, 2, 1]

Kasen.reverse([1, 2, 3]);
// => [3, 2, 1]
```

## `take(num)`

```js
Kasen([1, 2, 3])
  .take(2)
  .toJs();
// => [1, 2]

Kasen.take([1, 2, 3], 2);
// => [1, 2]
```

## `takeLast(num)`

```js
Kasen([1, 2, 3])
  .takeLast(2)
  .toJs();
// => [2, 3]

Kasen.takeLast([1, 2, 3], 2);
// => [2, 3]
```

## `takeWhile(fun)`

```js
Kasen([1, 3, 4, 5])
  .takeWhile(v => v % 2 === 1)
  .toJs();
// => [1, 3]

Kasen([1, 3, 4, 5])
  .takeWhile((v, k) => k % 2 === 0)
  .toJs();
// => [1]

Kasen.takeWhile([1, 3, 4, 5], v => v % 2 === 1);
// => [1, 3]
```

## `takeUntil(fun)`

```js
Kasen([1, 3, 4, 5])
  .takeUntil(v => v % 2 === 0)
  .toJs();
// => [1, 3]

Kasen([1, 3, 4, 5])
  .takeUntil((v, k) => k % 2 === 1)
  .toJs();
// => [1]

Kasen.takeUntil([1, 3, 4, 5], v => v % 2 === 0);
// => [1, 3]
```

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
