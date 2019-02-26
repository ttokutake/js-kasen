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
  .filter((v, k) => k % 2 === 1)
  .toJs();
// => [2]

Kasen([1, 2, 3])
  .filter.if(false, v => v % 2 === 1)
  .toJs();
// => [1, 2, 3]

Kasen.filter([1, 2, 3], v => v % 2 === 1);
// => [1, 3]
```

## `filterNot(fun)`

```js
Kasen([1, 2, 3])
  .filterNot(v => v % 2 === 1)
  .toJs();
// => [2]

Kasen([1, 2, 3])
  .filterNot((v, k) => k % 2 === 1)
  .toJs();
// => [1, 3]

Kasen([1, 2, 3])
  .filterNot.if(false, v => v % 2 === 1)
  .toJs();
// => [1, 2, 3]

Kasen.filterNot([1, 2, 3], v => v % 2 === 1);
// => [2]
```

## `reverse()`

```js
Kasen([1, 2, 3])
  .reverse()
  .toJs();
// => [3, 2, 1]

Kasen([1, 2, 3])
  .reverse.if(false)
  .toJs();
// => [1, 2, 3]

Kasen.reverse([1, 2, 3]);
// => [3, 2, 1]
```

## `take(num)`

```js
Kasen([1, 2, 3])
  .take(2)
  .toJs();
// => [1, 2]

Kasen([1, 2, 3])
  .take.if(false, 2)
  .toJs();
// => [1, 2, 3]

Kasen.take([1, 2, 3], 2);
// => [1, 2]
```

## `takeLast(num)`

```js
Kasen([1, 2, 3])
  .takeLast(2)
  .toJs();
// => [2, 3]

Kasen([1, 2, 3])
  .takeLast.if(false, 2)
  .toJs();
// => [1, 2, 3]

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

Kasen([1, 3, 4, 5])
  .takeWhile.if(false, v => v % 2 === 1)
  .toJs();
// => [1, 3, 4, 5]

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

Kasen([1, 3, 4, 5])
  .takeUntil.if(false, v => v % 2 === 0)
  .toJs();
// => [1, 3, 4, 5]

Kasen.takeUntil([1, 3, 4, 5], v => v % 2 === 0);
// => [1, 3]
```

## `skip(num)`

```js
Kasen([1, 2, 3])
  .skip(2)
  .toJs();
// => [3]

Kasen([1, 2, 3])
  .skip.if(false, 2)
  .toJs();
// => [1, 2, 3]

Kasen.skip([1, 2, 3], 2);
// => [3]
```

## `skipLast(num)`

```js
Kasen([1, 2, 3])
  .skipLast(2)
  .toJs();
// => [1]

Kasen([1, 2, 3])
  .skipLast.if(false, 2)
  .toJs();
// => [1, 2, 3]

Kasen.skipLast([1, 2, 3], 2);
// => [1]
```

## `skipWhile(fun)`

```js
Kasen([1, 3, 4, 5])
  .skipWhile(v => v % 2 === 1)
  .toJs();
// => [4, 5]

Kasen([1, 3, 4, 5])
  .skipWhile((v, k) => k % 2 === 0)
  .toJs();
// => [3, 4, 5]

Kasen([1, 3, 4, 5])
  .skipWhile.if(false, v => v % 2 === 1)
  .toJs();
// => [1, 3, 4, 5]

Kasen.skipWhile([1, 3, 4, 5], v => v % 2 === 1);
// => [4, 5]
```

## `skipUntil(fun)`

```js
Kasen([1, 3, 4, 5])
  .skipUntil(v => v % 2 === 0)
  .toJs();
// => [4, 5]

Kasen([1, 3, 4, 5])
  .skipUntil((v, k) => k % 2 === 1)
  .toJs();
// => [3, 4, 5]

Kasen([1, 3, 4, 5])
  .skipUntil.if(false, v => v % 2 === 0)
  .toJs();
// => [1, 3, 4, 5]

Kasen.skipUntil([1, 3, 4, 5], v => v % 2 === 0);
// => [4, 5]
```

## `set(index, value)`

```js
Kasen([1, 2, 3])
  .set(0, 10)
  .toJs();
// => [10, 2, 3]

Kasen([1, 2, 3])
  .set(3, 10)
  .toJs();
// => [1, 2, 3]

Kasen([1, 2, 3])
  .set(-1, 10)
  .toJs();
// => [1, 2, 10]

Kasen([1, 2, 3])
  .set.if(false, 0, 10)
  .toJs();
// => [1, 2, 3]

Kasen.set([1, 2, 3], 0, 10);
// => [10, 2, 3]
```

## `update(index, fun)`

```js
Kasen([1, 2, 3])
  .update(0, v => v + 10)
  .toJs();
// => [11, 2, 3]

Kasen([1, 2, 3])
  .update(3, v => v + 10)
  .toJs();
// => [1, 2, 3]

Kasen([1, 2, 3])
  .update(-1, v => v + 10)
  .toJs();
// => [1, 2, 13]

Kasen([1, 2, 3])
  .update.if(false, 0, v => v + 10)
  .toJs();
// => [1, 2, 3]

Kasen.update([1, 2, 3], 0, v => v + 10);
// => [11, 2, 3]
```

## `delete(index)`

```js
Kasen([1, 2, 3])
  .delete(0)
  .toJs();
// => [2, 3]

Kasen([1, 2, 3])
  .delete(3)
  .toJs();
// => [1, 2, 3]

Kasen([1, 2, 3])
  .delete(-1)
  .toJs();
// => [1, 2]

Kasen([1, 2, 3])
  .delete.if(false, 0)
  .toJs();
// => [1, 2, 3]

Kasen.delete([1, 2, 3], 0);
// => [2, 3]
```

## `clear()`

```js
Kasen([1, 2, 3])
  .clear()
  .toJs();
// => []

Kasen([1, 2, 3])
  .clear.if(false)
  .toJs();
// => [1, 2, 3]
```

## `concat(...values)`

```js
Kasen([1, 2, 3])
  .concat([4, 5, 6])
  .toJs();
// => [1, 2, 3, 4, 5, 6]

Kasen([1, 2, 3])
  .concat([4, 5, 6], [7, 8, 9])
  .toJs();
// => [1, 2, 3, 4, 5, 6, 7, 8, 9]

Kasen([1, 2, 3])
  .concat(4, [5, 6])
  .toJs();
// => [1, 2, 3, 4, 5, 6]

Kasen([1, 2, 3])
  .concat.if(false, [4, 5, 6])
  .toJs();
// => [1, 2, 3]

Kasen.concat([1, 2, 3], [4, 5, 6]);
// => [1, 2, 3, 4, 5, 6, 7]
```

## `insert(index, value)`

```js
Kasen([1, 2, 3])
  .insert(0, 10)
  .toJs();
// => [10, 1, 2, 3]

Kasen([1, 2, 3])
  .insert(3, 10)
  .toJs();
// => [1, 2, 3, 10]

Kasen([1, 2, 3])
  .insert(-1, 10)
  .toJs();
// => [1, 2, 10, 3]

Kasen([1, 2, 3])
  .insert.if(false, 0, 10)
  .toJs();
// => [1, 2, 3]

Kasen.insert([1, 2, 3], 0, 10);
// => [10, 1, 2, 3]
```

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
