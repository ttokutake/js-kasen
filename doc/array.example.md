# Array

## `tap(fun)`

```js
Kasen([1, 2, 3])
  .tap((v, k) => console.log(`${k}: ${v}`))
  .toJS();
// => [1, 2, 3]
```

## `map(fun)`

```js
Kasen([1, 2, 3])
  .map(v => v + 1)
  .toJS();
// => [2, 3, 4]

Kasen([1, 2, 3])
  .map((v, k) => v + k)
  .toJS();
// => [1, 3, 5]

Kasen([1, 2, 3])
  .map.if(false, v => v + 1)
  .toJS();
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
  .toJS();
// => [1, 2, 3]

Kasen([
  { id: 1, name: "alpha" },
  { id: 2, name: "beta" },
  { id: 3, name: "gamma" }
])
  .pluck.if(false, "id")
  .toJS();
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
  .toJS();
// => [1, 2, 3]

Kasen([1, 2, 3])
  .filter(v => v % 2 === 1)
  .toJS();
// => [1, 3]

Kasen([1, 2, 3])
  .filter((v, k) => k % 2 === 1)
  .toJS();
// => [2]

Kasen([1, 2, 3])
  .filter.if(false, v => v % 2 === 1)
  .toJS();
// => [1, 2, 3]

Kasen.filter([1, 2, 3], v => v % 2 === 1);
// => [1, 3]
```

## `filterNot(fun)`

```js
Kasen([1, 2, 3])
  .filterNot(v => v % 2 === 1)
  .toJS();
// => [2]

Kasen([1, 2, 3])
  .filterNot((v, k) => k % 2 === 1)
  .toJS();
// => [1, 3]

Kasen([1, 2, 3])
  .filterNot.if(false, v => v % 2 === 1)
  .toJS();
// => [1, 2, 3]

Kasen.filterNot([1, 2, 3], v => v % 2 === 1);
// => [2]
```

## `reverse()`

```js
Kasen([1, 2, 3])
  .reverse()
  .toJS();
// => [3, 2, 1]

Kasen([1, 2, 3])
  .reverse.if(false)
  .toJS();
// => [1, 2, 3]

Kasen.reverse([1, 2, 3]);
// => [3, 2, 1]
```

## `take(num)`

```js
Kasen([1, 2, 3])
  .take(2)
  .toJS();
// => [1, 2]

Kasen([1, 2, 3])
  .take.if(false, 2)
  .toJS();
// => [1, 2, 3]

Kasen.take([1, 2, 3], 2);
// => [1, 2]
```

## `takeLast(num)`

```js
Kasen([1, 2, 3])
  .takeLast(2)
  .toJS();
// => [2, 3]

Kasen([1, 2, 3])
  .takeLast.if(false, 2)
  .toJS();
// => [1, 2, 3]

Kasen.takeLast([1, 2, 3], 2);
// => [2, 3]
```

## `takeWhile(fun)`

```js
Kasen([1, 3, 4, 5])
  .takeWhile(v => v % 2 === 1)
  .toJS();
// => [1, 3]

Kasen([1, 3, 4, 5])
  .takeWhile((v, k) => k % 2 === 0)
  .toJS();
// => [1]

Kasen([1, 3, 4, 5])
  .takeWhile.if(false, v => v % 2 === 1)
  .toJS();
// => [1, 3, 4, 5]

Kasen.takeWhile([1, 3, 4, 5], v => v % 2 === 1);
// => [1, 3]
```

## `takeUntil(fun)`

```js
Kasen([1, 3, 4, 5])
  .takeUntil(v => v % 2 === 0)
  .toJS();
// => [1, 3]

Kasen([1, 3, 4, 5])
  .takeUntil((v, k) => k % 2 === 1)
  .toJS();
// => [1]

Kasen([1, 3, 4, 5])
  .takeUntil.if(false, v => v % 2 === 0)
  .toJS();
// => [1, 3, 4, 5]

Kasen.takeUntil([1, 3, 4, 5], v => v % 2 === 0);
// => [1, 3]
```

## `skip(num)`

```js
Kasen([1, 2, 3])
  .skip(2)
  .toJS();
// => [3]

Kasen([1, 2, 3])
  .skip.if(false, 2)
  .toJS();
// => [1, 2, 3]

Kasen.skip([1, 2, 3], 2);
// => [3]
```

## `skipLast(num)`

```js
Kasen([1, 2, 3])
  .skipLast(2)
  .toJS();
// => [1]

Kasen([1, 2, 3])
  .skipLast.if(false, 2)
  .toJS();
// => [1, 2, 3]

Kasen.skipLast([1, 2, 3], 2);
// => [1]
```

## `skipWhile(fun)`

```js
Kasen([1, 3, 4, 5])
  .skipWhile(v => v % 2 === 1)
  .toJS();
// => [4, 5]

Kasen([1, 3, 4, 5])
  .skipWhile((v, k) => k % 2 === 0)
  .toJS();
// => [3, 4, 5]

Kasen([1, 3, 4, 5])
  .skipWhile.if(false, v => v % 2 === 1)
  .toJS();
// => [1, 3, 4, 5]

Kasen.skipWhile([1, 3, 4, 5], v => v % 2 === 1);
// => [4, 5]
```

## `skipUntil(fun)`

```js
Kasen([1, 3, 4, 5])
  .skipUntil(v => v % 2 === 0)
  .toJS();
// => [4, 5]

Kasen([1, 3, 4, 5])
  .skipUntil((v, k) => k % 2 === 1)
  .toJS();
// => [3, 4, 5]

Kasen([1, 3, 4, 5])
  .skipUntil.if(false, v => v % 2 === 0)
  .toJS();
// => [1, 3, 4, 5]

Kasen.skipUntil([1, 3, 4, 5], v => v % 2 === 0);
// => [4, 5]
```

## `set(index, value)`

```js
Kasen([1, 2, 3])
  .set(0, 10)
  .toJS();
// => [10, 2, 3]

Kasen([1, 2, 3])
  .set(3, 10)
  .toJS();
// => [1, 2, 3]

Kasen([1, 2, 3])
  .set(-1, 10)
  .toJS();
// => [1, 2, 10]

Kasen([1, 2, 3])
  .set.if(false, 0, 10)
  .toJS();
// => [1, 2, 3]

Kasen.set([1, 2, 3], 0, 10);
// => [10, 2, 3]
```

## `update(index, fun)`

```js
Kasen([1, 2, 3])
  .update(0, v => v + 10)
  .toJS();
// => [11, 2, 3]

Kasen([1, 2, 3])
  .update(3, v => v + 10)
  .toJS();
// => [1, 2, 3]

Kasen([1, 2, 3])
  .update(-1, v => v + 10)
  .toJS();
// => [1, 2, 13]

Kasen([1, 2, 3])
  .update.if(false, 0, v => v + 10)
  .toJS();
// => [1, 2, 3]

Kasen.update([1, 2, 3], 0, v => v + 10);
// => [11, 2, 3]
```

## `delete(index)`

```js
Kasen([1, 2, 3])
  .delete(0)
  .toJS();
// => [2, 3]

Kasen([1, 2, 3])
  .delete(3)
  .toJS();
// => [1, 2, 3]

Kasen([1, 2, 3])
  .delete(-1)
  .toJS();
// => [1, 2]

Kasen([1, 2, 3])
  .delete.if(false, 0)
  .toJS();
// => [1, 2, 3]

Kasen.delete([1, 2, 3], 0);
// => [2, 3]
```

## `clear()`

```js
Kasen([1, 2, 3])
  .clear()
  .toJS();
// => []

Kasen([1, 2, 3])
  .clear.if(false)
  .toJS();
// => [1, 2, 3]
```

## `concat(...values)`

```js
Kasen([1, 2, 3])
  .concat([4, 5, 6])
  .toJS();
// => [1, 2, 3, 4, 5, 6]

Kasen([1, 2, 3])
  .concat([4, 5, 6], [7, 8, 9])
  .toJS();
// => [1, 2, 3, 4, 5, 6, 7, 8, 9]

Kasen([1, 2, 3])
  .concat(4, [5, 6])
  .toJS();
// => [1, 2, 3, 4, 5, 6]

Kasen([1, 2, 3])
  .concat.if(false, [4, 5, 6])
  .toJS();
// => [1, 2, 3]

Kasen.concat([1, 2, 3], [4, 5, 6]);
// => [1, 2, 3, 4, 5, 6, 7]
```

## `insert(index, value)`

```js
Kasen([1, 2, 3])
  .insert(0, 10)
  .toJS();
// => [10, 1, 2, 3]

Kasen([1, 2, 3])
  .insert(3, 10)
  .toJS();
// => [1, 2, 3, 10]

Kasen([1, 2, 3])
  .insert(-1, 10)
  .toJS();
// => [1, 2, 10, 3]

Kasen([1, 2, 3])
  .insert.if(false, 0, 10)
  .toJS();
// => [1, 2, 3]

Kasen.insert([1, 2, 3], 0, 10);
// => [10, 1, 2, 3]
```

## `push(...values)`

```js
Kasen([1, 2, 3])
  .push(4)
  .toJS();
// => [1, 2, 3, 4]

Kasen([1, 2, 3])
  .push(4, 5, 6)
  .toJS();
// => [1, 2, 3, 4, 5, 6]

Kasen([1, 2, 3])
  .push.if(false, 4)
  .toJS();
// => [1, 2, 3]

Kasen.push([1, 2, 3], 4);
// => [1, 2, 3, 4]
```

## `pop()`

```js
Kasen([1, 2, 3])
  .pop()
  .toJS();
// => [1, 2]

Kasen([1, 2, 3])
  .pop.if(false)
  .toJS();
// => [1, 2, 3]

Kasen.pop([1, 2, 3]);
// => [1, 2]
```

## `unshift(...values)`

```js
Kasen([1, 2, 3])
  .unshift(4)
  .toJS();
// => [4, 1, 2, 3]

Kasen([1, 2, 3])
  .unshift(4, 5, 6)
  .toJS();
// => [4, 5, 6, 1, 2, 3]

Kasen([1, 2, 3])
  .unshift.if(false, 4)
  .toJS();
// => [1, 2, 3]

Kasen.unshift([1, 2, 3], 4);
// => [4, 1, 2, 3]
```

## `shift()`

```js
Kasen([1, 2, 3])
  .shift()
  .toJS();
// => [2, 3]

Kasen([1, 2, 3])
  .shift.if(false)
  .toJS();
// => [1, 2, 3]

Kasen.shift([1, 2, 3]);
// => [2, 3]
```

## `splice(index, num, ...values)`

```js
Kasen([1, 2, 3])
  .splice(0, 1)
  .toJS();
// => [2, 3]

Kasen([1, 2, 3])
  .splice(0, 2)
  .toJS();
// => [3]

Kasen([1, 2, 3])
  .splice(2, 1)
  .toJS();
// => [1, 2]

Kasen([1, 2, 3])
  .splice(1, 0, 4, 5)
  .toJS();
// => [1, 4, 5, 2, 3]

Kasen([1, 2, 3])
  .splice(1, 1, 4, 5)
  .toJS();
// => [1, 4, 5, 3]

Kasen([1, 2, 3])
  .splice.if(false, 0, 1)
  .toJS();
// => [1, 2, 3]

Kasen.splice([1, 2, 3], 0, 1);
// => [2, 3]
```

## `setIn(keys, value)`

```js
Kasen([
  { id: 1, name: "alpha" },
  { id: 2, name: "beta" },
  { id: 3, name: "gamma" }
])
  .setIn([1, "name"], "delta")
  .toJS();
// => [{id: 1, name: "alpha"}, {id: 2, name: "delta"}, {id: 3, name: "gamma"}]

Kasen([
  { id: 1, data: { name: "alpha" } },
  { id: 2 },
  { id: 3, data: { name: "gamma" } }
])
  .setIn([1, ["data", {}], "name"], "beta")
  .toJS();
// => [{id: 1, data: {name: "alpha"}}, {id: 2, data: {name: "beta"}}, {id: 3, data: {name: "gamma"}}]

Kasen([
  { id: 1, name: "alpha" },
  { id: 2, name: "beta" },
  { id: 3, name: "gamma" }
])
  .setIn.if(false, [1, "name"], "delta")
  .toJS();
// => [{id: 1, name: "alpha"}, {id: 2, name: "beta"}, {id: 3, name: "gamma"}]

Kasen.setIn(
  [{ id: 1, name: "alpha" }, { id: 2, name: "beta" }, { id: 3, name: "gamma" }],
  [1, "name"],
  "delta"
);
// => [{id: 1, name: "alpha"}, {id: 2, name: "delta"}, {id: 3, name: "gamma"}]
```

## `updateIn(keys, fun)`

```js
Kasen([
  { id: 1, name: "alpha" },
  { id: 2, name: "beta" },
  { id: 3, name: "gamma" }
])
  .updateIn([1, "name"], name => `${name}2`)
  .toJS();
// => [{id: 1, name: "alpha"}, {id: 2, name: "beta2"}, {id: 3, name: "gamma"}]

Kasen([
  { id: 1, data: { name: "alpha" } },
  { id: 2 },
  { id: 3, data: { name: "gamma" } }
])
  .updateIn([1, ["data", {}], ["name", "beta"]], name => `${name}2`)
  .toJS();
// => [{id: 1, data: {name: "alpha"}}, {id: 2, data: {name: "beta2"}}, {id: 3, data: {name: "gamma"}}]

Kasen([
  { id: 1, name: "alpha" },
  { id: 2, name: "beta" },
  { id: 3, name: "gamma" }
])
  .updateIn.if(false, [1, "name"], name => `${name}2`)
  .toJS();
// => [{id: 1, name: "alpha"}, {id: 2, name: "beta"}, {id: 3, name: "gamma"}]

Kasen.updateIn(
  [{ id: 1, name: "alpha" }, { id: 2, name: "beta" }, { id: 3, name: "gamma" }],
  [1, "name"],
  name => `${name}2`
);
// => [{id: 1, name: "alpha"}, {id: 2, name: "beta2"}, {id: 3, name: "gamma"}]
```

## `deleteIn(keys)`

```js
Kasen([
  { id: 1, name: "alpha" },
  { id: 2, name: "beta" },
  { id: 3, name: "gamma" }
])
  .deleteIn([1, "name"])
  .toJS();
// => [{id: 1, name: "alpha"}, {id: 2}, {id: 3, name: "gamma"}]

Kasen([
  { id: 1, name: "alpha" },
  { id: 2, name: "beta" },
  { id: 3, name: "gamma" }
])
  .deleteIn.if(false, [1, "name"])
  .toJS();
// => [{id: 1, name: "alpha"}, {id: 2, name: "beta"}, {id: 3, name: "gamma"}]

Kasen.deleteIn(
  [{ id: 1, name: "alpha" }, { id: 2, name: "beta" }, { id: 3, name: "gamma" }],
  [1, "name"]
);
// => [{id: 1, name: "alpha"}, {id: 2}, {id: 3, name: "gamma"}]
```

## `flatten()`

```js
Kasen([[1, 2], [3, 4]])
  .flatten()
  .toJS();
// => [1, 2, 3, 4]

Kasen([[1, 2], 3, [4]])
  .flatten()
  .toJS();
// => [1, 2, 3, 4]

Kasen([[1, 2], [3, 4]])
  .flatten.if(false)
  .toJS();
// => [[1, 2], [3, 4]]

Kasen.flatten([[1, 2], [3, 4]]);
// => [1, 2, 3, 4]
```

## `flatMap(fun)`

```js
Kasen([
  {
    name: "alpha",
    friends: ["James", "John"]
  },
  {
    name: "beta",
    friends: ["Robert"]
  },
  {
    name: "gamma",
    friends: ["Michael", "William", "David"]
  }
])
  .flatMap(({ friends }) => friends)
  .toJS();
// => ["James", "John", "Robert", "Michael", "William", "David"]

Kasen([
  {
    name: "alpha",
    friends: ["James", "John"]
  },
  {
    name: "beta",
    friends: ["Robert"]
  },
  {
    name: "gamma",
    friends: ["Michael", "William", "David"]
  }
])
  .flatMap.if(false, ({ friends }) => friends)
  .toJS();
// => [{ name: "alpha", friends: ["James", "John"] }, { name: "beta", friends: ["Robert"] }, { name: "gamma", friends: ["Michael", "William", "David"] }]

Kasen.flatMap(
  [
    {
      name: "alpha",
      friends: ["James", "John"]
    },
    {
      name: "beta",
      friends: ["Robert"]
    },
    {
      name: "gamma",
      friends: ["Michael", "William", "David"]
    }
  ],
  ({ friends }) => friends
);
// => ["James", "John", "Robert", "Michael", "William", "David"]
```

## `zip(...arrays)`

```js
Kasen([[1, 2, 3])
  .zip([11, 12])
  .toJS();
// => [[1, 11], [2, 12]]

Kasen([[1, 2, 3])
  .zip([11, 12], [21, 22, 23])
  .toJS();
// => [[1, 11, 21], [2, 12, 22]]

Kasen([[1, 2, 3])
  .zip.if(false, [11, 12])
  .toJS();
// => [1, 2, 3]

Kasen.zip([[1, 2, 3], [11, 12]);
// => [[1, 11], [2, 12]]
```

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

## `get(index, defaultValue)`

## `has(index)`

## `includes(value)`

## `getIn(keys, defaultValue)`

## `hasIn(keys)`

## `head()`

## `first()`

## `tail()`

## `init()`

## `tail()`

## `splitAt(index)`

## `toJS()`

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
