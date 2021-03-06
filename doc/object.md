# Object

## `tap()`

TBD

## `tapEach(fun)`

- **Method chaining only**

### Arguments

- `fun: (v: T, k: string) => any`

### Example

```js
```

### References

| Library   | Function |
| --------- | -------- |
| Lodash    | -        |
| Immutable | -        |
| Ramda     | -        |

| Language   | Function                                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                     |
| Scala      | [tapEach](<https://www.scala-lang.org/api/current/scala/collection/immutable/IndexedSeq.html#tapEach[U](f:A=%3EU):C>) |
| Elixir     | -                                                                                                                     |

## `map(fun)`

### Arguments

- `fun: (v: T, k: string) => U`

### Example

```js
```

### References

| Library   | Function                                                                 |
| --------- | ------------------------------------------------------------------------ |
| Lodash    | [map](https://lodash.com/docs/4.17.11#map)                               |
| Immutable | [map](https://immutable-js.github.io/immutable-js/docs/#/Collection/map) |
| Ramda     | [map](https://ramdajs.com/docs/#map)                                     |

| Language   | Function                                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                 |
| Scala      | [map](<https://www.scala-lang.org/api/current/scala/collection/immutable/IndexedSeq.html#map[B](f:A=%3EB):CC[B]>) |
| Elixir     | [map](https://hexdocs.pm/elixir/Enum.html#map/2)                                                                  |

## `pluck(key)`

### Arguments

- `key: string`

### Example

```js
```

### References

| Library   | Function                                 |
| --------- | ---------------------------------------- |
| Lodash    | -                                        |
| Immutable | -                                        |
| Ramda     | [pluck](https://ramdajs.com/docs/#pluck) |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `filter(fun)`

### Arguments

- `fun: (v: T, k: string) => boolean`
  - default: `v => v`

### Example

```js
```

### References

| Library   | Function                                                                       |
| --------- | ------------------------------------------------------------------------------ |
| Lodash    | [filter](https://lodash.com/docs/4.17.14#filter)                               |
| Immutable | [filter](https://immutable-js.github.io/immutable-js/docs/#/Collection/filter) |
| Ramda     | [filter](https://ramdajs.com/docs/#filter)                                     |

| Language   | Function                                                                                                        |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                               |
| Scala      | [filter](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#filter(pred:A=%3EBoolean):C>) |
| Elixir     | [filter](https://hexdocs.pm/elixir/Enum.html#filter/2)                                                          |

## `filterNot(fun)`

### Arguments

- `fun: (v: T, k: string) => boolean`

### Example

```js
```

### References

| Library   | Function                                                                             |
| --------- | ------------------------------------------------------------------------------------ |
| Lodash    | [reject](https://lodash.com/docs/4.17.14#reject)                                     |
| Immutable | [filterNot](https://immutable-js.github.io/immutable-js/docs/#/Collection/filterNot) |
| Ramda     | [reject](https://ramdajs.com/docs/#reject)                                           |

| Language   | Function                                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                     |
| Scala      | [filterNot](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#filterNot(pred:A=%3EBoolean):C>) |
| Elixir     | [reject](https://hexdocs.pm/elixir/Enum.html#reject/2)                                                                |

## `pick(keys)`

- `keys: string[]`

### Example

```js
```

### References

| Library   | Function                                     |
| --------- | -------------------------------------------- |
| Lodash    | [pick](https://lodash.com/docs/4.17.14#pick) |
| Immutable | -                                            |
| Ramda     | [pick](https://ramdajs.com/docs/#pick)       |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `flip(fun)`

### Arguments

- `fun: (v: T, k: string) => U`
  - default: `v => v`

### Example

```js
```

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [flip](https://lodash.com/docs/4.17.14#flip)                                     |
| Immutable | [flip](https://immutable-js.github.io/immutable-js/docs/#/Collection.Keyed/flip) |
| Ramda     | [flip](https://ramdajs.com/docs/#flip)                                           |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `set(key, value)`

### Arguments

- `key: string`
- `value: T`

### Example

```js
```

### References

| Library   | Function                                                                                       |
| --------- | ---------------------------------------------------------------------------------------------- |
| Lodash    | [set](https://lodash.com/docs/4.17.14#set)                                                     |
| Immutable | [set](https://immutable-js.github.io/immutable-js/docs/#/set)                                  |
| Ramda     | [assoc](https://ramdajs.com/docs/#assoc), [set + lensProp](https://ramdajs.com/docs/#lensProp) |

| Language   | Function                                                                                                                |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                       |
| Scala      | [update](<https://www.scala-lang.org/api/current/scala/collection/mutable/IndexedSeq.html#update(idx:Int,elem:A):Unit>) |
| Elixir     | [put](https://hexdocs.pm/elixir/Map.html#put/3)                                                                         |

## `update(key, fun)`

### Arguments

- `key: string`
- `fun: (v: T) => T`

### Example

```js
```

### References

| Library   | Function                                                            |
| --------- | ------------------------------------------------------------------- |
| Lodash    | -                                                                   |
| Immutable | [update](https://immutable-js.github.io/immutable-js/docs/#/update) |
| Ramda     | [over + lensProp](https://ramdajs.com/docs/#lensProp)               |

| Language   | Function                                              |
| ---------- | ----------------------------------------------------- |
| JavaScript | -                                                     |
| Scala      | -                                                     |
| Elixir     | [update](https://hexdocs.pm/elixir/Map.html#update/4) |

## `delete(key)`

### Arguments

- `key: string`

### Example

```js
```

### References

| Library   | Function                                                                |
| --------- | ----------------------------------------------------------------------- |
| Lodash    | [unset](https://lodash.com/docs/4.17.14#unset)                          |
| Immutable | [delete](https://immutable-js.github.io/immutable-js/docs/#/Map/delete) |
| Ramda     | [dissoc](https://ramdajs.com/docs/#dissoc)                              |

| Language   | Function                                        |
| ---------- | ----------------------------------------------- |
| JavaScript | -                                               |
| Scala      | -                                               |
| Elixir     | [pop](https://hexdocs.pm/elixir/Map.html#pop/3) |

## `deleteAll(keys)`

### Arguments

- `keys: string[]`

### Example

```js
```

### References

| Library   | Function                                                                      |
| --------- | ----------------------------------------------------------------------------- |
| Lodash    | -                                                                             |
| Immutable | [deleteAll](https://immutable-js.github.io/immutable-js/docs/#/Map/deleteAll) |
| Ramda     | -                                                                             |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `clear()`

### Example

```js
```

### References

| Library   | Function                                                              |
| --------- | --------------------------------------------------------------------- |
| Lodash    | -                                                                     |
| Immutable | [clear](https://immutable-js.github.io/immutable-js/docs/#/Map/clear) |
| Ramda     | -                                                                     |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `merge(...objects)` / `assign(...objects)`

### Arguments

- `...objects: Object<string, T>[]`

### Example

```js
```

### References

| Library   | Function                                                              |
| --------- | --------------------------------------------------------------------- |
| Lodash    | [merge](https://lodash.com/docs/4.17.14#merge)                        |
| Immutable | [merge](https://immutable-js.github.io/immutable-js/docs/#/Map/merge) |
| Ramda     | [merge](https://ramdajs.com/docs/#merge)                              |

| Language   | Function                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [assign](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)                                             |
| Scala      | [concat](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#concat[B%3E:A](suffix:scala.collection.IterableOnce[B]):CC[B]>) |
| Elixir     | [merge](https://hexdocs.pm/elixir/Map.html#merge/2)                                                                                               |

## `mergeWith(fun, ...objects)`

### Arguments

- `fun: (left: T, right: T, k: string) => T`
- `...objects: Object<string, T>[]`

### Example

```js
```

### References

| Library   | Function                                                                      |
| --------- | ----------------------------------------------------------------------------- |
| Lodash    | [mergeWith](https://lodash.com/docs/4.17.14#mergeWith)                        |
| Immutable | [mergeWith](https://immutable-js.github.io/immutable-js/docs/#/Map/mergeWith) |
| Ramda     | [mergeWith](https://ramdajs.com/docs/#mergeWith)                              |

| Language   | Function                                            |
| ---------- | --------------------------------------------------- |
| JavaScript | -                                                   |
| Scala      | -                                                   |
| Elixir     | [merge](https://hexdocs.pm/elixir/Map.html#merge/3) |

## `mergeDeep(...objects)`

### Arguments

- `...objects: Object<string, T>[]`

### Example

```js
```

### References

| Library   | Function                                                                      |
| --------- | ----------------------------------------------------------------------------- |
| Lodash    | [merge](https://lodash.com/docs/4.17.14#merge)                                |
| Immutable | [mergeDeep](https://immutable-js.github.io/immutable-js/docs/#/Map/mergeDeep) |
| Ramda     | [mergeDeepRight](https://ramdajs.com/docs/#mergeDeepRight)                    |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `mergeDeepWith(fun, ...objects)`

### Arguments

- `fun: (left: T, right: T, k: string) => T`
- `...objects: Object<string, T>[]`

### Example

```js
```

### References

| Library   | Function                                                                          |
| --------- | --------------------------------------------------------------------------------- |
| Lodash    | [mergeWith](https://lodash.com/docs/4.17.14#mergeWith)                            |
| Immutable | [mergeDeepWith](https://immutable-js.github.io/immutable-js/docs/#/Map/mergeDeep) |
| Ramda     | [mergeDeepWith](https://ramdajs.com/docs/#mergeDeepWith)                          |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `setIn(keys, value)`

### Arguments

- `keys: Array<number | string>`
- `value: T`

### Example

```js
```

### References

| Library   | Function                                                               |
| --------- | ---------------------------------------------------------------------- |
| Lodash    | [set](https://lodash.com/docs/4.17.14#set)                             |
| Immutable | [setIn](https://immutable-js.github.io/immutable-js/docs/#/List/setIn) |
| Ramda     | [set + lensPath](https://ramdajs.com/docs/#lensPath)                   |

| Language   | Function                                                 |
| ---------- | -------------------------------------------------------- |
| JavaScript | -                                                        |
| Scala      | -                                                        |
| Elixir     | [put_in](https://hexdocs.pm/elixir/Kernel.html#put_in/3) |

## `updateIn(keys, fun)`

### Arguments

- `keys: Array<number | string>`
- `fun: (v: any, k: number | string) => any`

### Example

```js
```

### References

| Library   | Function                                                                  |
| --------- | ------------------------------------------------------------------------- |
| Lodash    | -                                                                         |
| Immutable | [updateIn](https://immutable-js.github.io/immutable-js/docs/#/List/setIn) |
| Ramda     | [over + lensPath](https://ramdajs.com/docs/#lensPath)                     |

| Language   | Function                                                       |
| ---------- | -------------------------------------------------------------- |
| JavaScript | -                                                              |
| Scala      | -                                                              |
| Elixir     | [update_in](https://hexdocs.pm/elixir/Kernel.html#update_in/3) |

## `deleteIn(keys)`

### Arguments

- `keys: Array<number | string>`

### Example

```js
```

### References

| Library   | Function                                                                     |
| --------- | ---------------------------------------------------------------------------- |
| Lodash    | [unset](https://lodash.com/docs/4.17.14#unset)                               |
| Immutable | [deleteIn](https://immutable-js.github.io/immutable-js/docs/#/List/deleteIn) |
| Ramda     | [dissocPath](https://ramdajs.com/docs/#dissocPath)                           |

| Language   | Function                                                 |
| ---------- | -------------------------------------------------------- |
| JavaScript | -                                                        |
| Scala      | -                                                        |
| Elixir     | [pop_in](https://hexdocs.pm/elixir/Kernel.html#pop_in/2) |

## `copy()`

### Example

```js
```

### References

| Library   | Function |
| --------- | -------- |
| Lodash    | -        |
| Immutable | -        |
| Ramda     | -        |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `memoize()`

- **Method chaining only**

### Example

```js
```

### References

| Library   | Function                                                                          |
| --------- | --------------------------------------------------------------------------------- |
| Lodash    | -                                                                                 |
| Immutable | [cacheResult](https://immutable-js.github.io/immutable-js/docs/#/Seq/cacheResult) |
| Ramda     | -                                                                                 |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `isEmpty()`

- **Consumer**

### Example

```js
```

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [isEmpty](https://lodash.com/docs/4.17.14#isEmpty)                               |
| Immutable | [isEmpty](https://immutable-js.github.io/immutable-js/docs/#/Collection/isEmpty) |
| Ramda     | [isEmpty](https://ramdajs.com/docs/#isEmpty)                                     |

| Language   | Function                                                                                           |
| ---------- | -------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                  |
| Scala      | [isEmpty](https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#isEmpty:Boolean) |
| Elixir     | [empty?](https://hexdocs.pm/elixir/Enum.html#empty?/1)                                             |

## `isSubset()`

TBD

## `isSuperset()`

TBD

## `count(fun)`

- **Consumer**

### Arguments

- `fun: (v: T, k: string) => boolean`

### Example

```js
```

### References

| Library   | Function                                                                     |
| --------- | ---------------------------------------------------------------------------- |
| Lodash    | -                                                                            |
| Immutable | [count](https://immutable-js.github.io/immutable-js/docs/#/Collection/count) |
| Ramda     | -                                                                            |

| Language   | Function                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| JavaScript | -                                                                                                            |
| Scala      | [count](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#count(p:A=%3EBoolean):Int>) |
| Elixir     | -                                                                                                            |

## `get(key, defaultValue)`

- **Consumer**

### Arguments

- `key: string`
- `defaultValue: T`

### Example

```js
```

### References

| Library   | Function                                                                 |
| --------- | ------------------------------------------------------------------------ |
| Lodash    | [get](https://lodash.com/docs/4.17.14#get)                               |
| Immutable | [get](https://immutable-js.github.io/immutable-js/docs/#/Collection/get) |
| Ramda     | [view + lensProp](https://ramdajs.com/docs/#lensProp)                    |

| Language   | Function                                        |
| ---------- | ----------------------------------------------- |
| JavaScript | -                                               |
| Scala      | -                                               |
| Elixir     | [get](https://hexdocs.pm/elixir/Map.html#get/3) |

## `has(key)`

- **Consumer**

### Arguments

- `key: string`

### Example

```js
```

### References

| Library   | Function                                                                                   |
| --------- | ------------------------------------------------------------------------------------------ |
| Lodash    | [has](https://lodash.com/docs/4.17.14#has), [hasIn](https://lodash.com/docs/4.17.14#hasIn) |
| Immutable | [has](https://immutable-js.github.io/immutable-js/docs/#/Collection/has)                   |
| Ramda     | [has](https://ramdajs.com/docs/#has)                                                       |

| Language   | Function                                                  |
| ---------- | --------------------------------------------------------- |
| JavaScript | -                                                         |
| Scala      | -                                                         |
| Elixir     | [has_key?](https://hexdocs.pm/elixir/Map.html#has_key?/2) |

## `includes(value)`

- **Consumer**

### Arguments

- `value: T`

### Example

```js
```

### References

| Library   | Function                                                                           |
| --------- | ---------------------------------------------------------------------------------- |
| Lodash    | [includes](https://lodash.com/docs/4.17.14#includes)                               |
| Immutable | [includes](https://immutable-js.github.io/immutable-js/docs/#/Collection/includes) |
| Ramda     | -                                                                                  |

| Language   | Function                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| JavaScript | -                                                                                                                        |
| Scala      | [contains](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#contains[A1%3E:A](elem:A1):Boolean>) |
| Elixir     | -                                                                                                                        |

## `getIn(keys, defaultValue)`

- **Consumer**

### Arguments

- `keys: Array<number | string>`
- `defaultValue: any`

### Example

```js
```

### References

| Library   | Function                                                                     |
| --------- | ---------------------------------------------------------------------------- |
| Lodash    | [get](https://lodash.com/docs/4.17.14#get)                                   |
| Immutable | [getIn](https://immutable-js.github.io/immutable-js/docs/#/Collection/getIn) |
| Ramda     | [view + lensPath](https://ramdajs.com/docs/#lensPath)                        |

| Language   | Function                                                 |
| ---------- | -------------------------------------------------------- |
| JavaScript | -                                                        |
| Scala      | -                                                        |
| Elixir     | [get_in](https://hexdocs.pm/elixir/Kernel.html#get_in/2) |

## `hasIn(keys)`

- **Consumer**

### Arguments

- `keys: Array<number | string>`

### Example

```js
```

### References

| Library   | Function                                                                                   |
| --------- | ------------------------------------------------------------------------------------------ |
| Lodash    | [has](https://lodash.com/docs/4.17.14#has), [hasIn](https://lodash.com/docs/4.17.14#hasIn) |
| Immutable | [hasIn](https://immutable-js.github.io/immutable-js/docs/#/Collection/hasIn)               |
| Ramda     | [hasPath](https://ramdajs.com/docs/#hasPath)                                               |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `toJS()`

- **Method chaining only**
- **Consumer**

### Example

```js
```

### References

| Library   | Function                                                                       |
| --------- | ------------------------------------------------------------------------------ |
| Lodash    | [value](https://lodash.com/docs/4.17.14#prototype-value)                       |
| Immutable | [toJSON](https://immutable-js.github.io/immutable-js/docs/#/Collection/toJSON) |
| Ramda     | -                                                                              |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `toArray()`

- **Consumer**

### Example

```js
```

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [toPairs](https://lodash.com/docs/4.17.14#toPairs)                               |
| Immutable | [toArray](https://immutable-js.github.io/immutable-js/docs/#/Collection/toArray) |
| Ramda     | [toPairs](https://ramdajs.com/docs/#toPairs)                                     |

| Language   | Function                                                |
| ---------- | ------------------------------------------------------- |
| JavaScript | -                                                       |
| Scala      | -                                                       |
| Elixir     | [to_list](https://hexdocs.pm/elixir/Map.html#to_list/1) |

## `toObject()`

- **Consumer**

### Example

```js
```

### References

| Library   | Function                                                                           |
| --------- | ---------------------------------------------------------------------------------- |
| Lodash    | -                                                                                  |
| Immutable | [toObject](https://immutable-js.github.io/immutable-js/docs/#/Collection/toObject) |
| Ramda     | -                                                                                  |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `reduce(fun, init)`

- **Consumer**

### Arguments

- `fun: (acc: U, v: T, k: string) => U`
- `init: U`
  - default: `undefined`

### Example

```js
```

### References

| Library   | Function                                                                       |
| --------- | ------------------------------------------------------------------------------ |
| Lodash    | [reduce](https://lodash.com/docs/4.17.14#reduce)                               |
| Immutable | [reduce](https://immutable-js.github.io/immutable-js/docs/#/Collection/reduce) |
| Ramda     | -                                                                              |

| Language   | Function                                                                                                                                                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                                                                                                                                               |
| Scala      | [reduce](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#reduce[B%3E:A](op:(B,B)=%3EB):B>), [fold](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#fold[A1%3E:A](z:A1)(op:(A1,A1)=%3EA1):A1>) |
| Elixir     | -                                                                                                                                                                                                                                               |

## `reduceWhile(fun, init)`

- **Consumer**

### Arguments

- `fun: (acc: U, v: T, k: string) => U`
- `init: U`
  - constraint: `init !== undefined`

### Example

```js
```

### References

| Library   | Function |
| --------- | -------- |
| Lodash    | -        |
| Immutable | -        |
| Ramda     | -        |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `scan(fun, init)`

- **Consumer**

### Arguments

- `fun: (acc: U, v: T, k: string) => U`
- `init: U`
  - default: `undefined`

### Example

```js
```

### References

| Library   | Function |
| --------- | -------- |
| Lodash    | -        |
| Immutable | -        |
| Ramda     | -        |

| Language   | Function                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| JavaScript | -                                                                                                                        |
| Scala      | [scan](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#scan[B%3E:A](z:B)(op:(B,B)=%3EB):CC[B]>) |
| Elixir     | -                                                                                                                        |

## `partition(fun)`

- **Consumer**

### Arguments

- `fun: (v: T, k: string) => boolean`

### Example

```js
```

### References

| Library   | Function                                               |
| --------- | ------------------------------------------------------ |
| Lodash    | [partition](https://lodash.com/docs/4.17.14#partition) |
| Immutable | -                                                      |
| Ramda     | -                                                      |

| Language   | Function                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                      |
| Scala      | [partition](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#partition(p:A=%3EBoolean):(C,C)>) |
| Elixir     | -                                                                                                                      |

## `join(delimiter)`

- **Consumer**

### Arguments

- `delimiter: string`

### Example

```js
```

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | -                                                                          |
| Immutable | [join](https://immutable-js.github.io/immutable-js/docs/#/Collection/join) |
| Ramda     | -                                                                          |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `groupBy(fun)`

- **Consumer**

### Arguments

- `fun: (v: T, k: string) => string`

### Example

```js
```

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [groupBy](https://lodash.com/docs/4.17.14#groupBy)                               |
| Immutable | [groupBy](https://immutable-js.github.io/immutable-js/docs/#/Collection/groupBy) |
| Ramda     | -                                                                                |

| Language   | Function                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                                             |
| Scala      | [groupBy](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#groupBy[K](f:A=%3EK):scala.collection.immutable.Map[K,C]>) |
| Elixir     | -                                                                                                                                             |

## `every(fun)`

- **Consumer**

### Arguments

- `fun: (v: T, k: string) => boolean`

### Example

```js
```

### References

| Library   | Function                                                                     |
| --------- | ---------------------------------------------------------------------------- |
| Lodash    | [every](https://lodash.com/docs/4.17.14#every)                               |
| Immutable | [every](https://immutable-js.github.io/immutable-js/docs/#/Collection/every) |
| Ramda     | -                                                                            |

| Language   | Function                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| JavaScript | -                                                                                                                  |
| Scala      | [forall](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#forall(p:A=%3EBoolean):Boolean>) |
| Elixir     | -                                                                                                                  |

## `some(fun)`

- **Consumer**

### Arguments

- `fun: (v: T, k: string) => boolean`

### Example

```js
```

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [some](https://lodash.com/docs/4.17.14#some)                               |
| Immutable | [some](https://immutable-js.github.io/immutable-js/docs/#/Collection/some) |
| Ramda     | -                                                                          |

| Language   | Function                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| JavaScript | -                                                                                                                              |
| Scala      | [exists](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html?search=some#exists(p:A=%3EBoolean):Boolean>) |
| Elixir     | -                                                                                                                              |

## `find(fun)`

- **Consumer**

### Arguments

- `fun: (v: T, k: string) => boolean`

### Example

```js
```

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [find](https://lodash.com/docs/4.17.14#find)                               |
| Immutable | [find](https://immutable-js.github.io/immutable-js/docs/#/Collection/find) |
| Ramda     | -                                                                          |

| Language   | Function                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                            |
| Scala      | [find](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html?search=some#find(p:A=%3EBoolean):Option[A]>) |
| Elixir     | -                                                                                                                            |

## `findEntry(fun)`

- **Consumer**

### Arguments

- `fun: (v: T, k: string) => boolean`

### Example

```js
```

### References

| Library   | Function                                                                             |
| --------- | ------------------------------------------------------------------------------------ |
| Lodash    | -                                                                                    |
| Immutable | [findEntry](https://immutable-js.github.io/immutable-js/docs/#/Collection/findEntry) |
| Ramda     | -                                                                                    |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `findkey(fun)`

- **Consumer**

### Arguments

- `fun: (v: T, k: string) => boolean`

### Example

```js
```

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [findKey](https://lodash.com/docs/4.17.14#findKey)                               |
| Immutable | [findKey](https://immutable-js.github.io/immutable-js/docs/#/Collection/findKey) |
| Ramda     | -                                                                                |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `keyOf(value)`

- **Consumer**

### Arguments

- `value: T`

### Example

```js
```

### References

| Library   | Function                                                                     |
| --------- | ---------------------------------------------------------------------------- |
| Lodash    | -                                                                            |
| Immutable | [keyOf](https://immutable-js.github.io/immutable-js/docs/#/Collection/keyOf) |
| Ramda     | -                                                                            |

| Language   | Function                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                            |
| Scala      | [indexOf](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html?search=some#indexOf[B%3E:A](elem:B):Int>) |
| Elixir     | -                                                                                                                            |

## `sum(fun)`

- **Consumer**

### Arguments

- `fun: (v: T, k: string) => U`

### Example

```js
```

### References

| Library   | Function |
| --------- | -------- |
| Lodash    | -        |
| Immutable | -        |
| Ramda     | -        |

| Language   | Function                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                                             |
| Scala      | [sum](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html?search=some#sum[B%3E:A](implicitnum:scala.math.Numeric[B]):B>) |
| Elixir     | -                                                                                                                                             |

## `max(fun)`

- **Consumer**

### Arguments

- `fun: (v1: T, v2: T) => number`
  - default: `(v1, v2) => v1 > v2 ? -1 : (v1 === v2 ? 0 : 1)`

### Example

```js
```

### References

| Library   | Function |
| --------- | -------- |
| Lodash    | -        |
| Immutable | -        |
| Ramda     | -        |

| Language   | Function                                                                                                                                                                                                                                                                               |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                                                                                                                                                                                      |
| Scala      | [max](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#maxBy[B](f:A=%3EB)(implicitcmp:scala.math.Ordering[B]):A>), [maxBy](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#maxBy[B](f:A=%3CB)(implicitcmp:scala.math.Ordering[B]):A>) |
| Elixir     | -                                                                                                                                                                                                                                                                                      |

## `maxBy()`

TBD

## `min(fun)`

- **Consumer**

### Arguments

- `fun: (v1: T, v2: T) => number`
  - default: `(v1, v2) => v1 > v2 ? 1 : (v1 === v2 ? 0 : -1)`

### Example

```js
```

### References

| Library   | Function |
| --------- | -------- |
| Lodash    | -        |
| Immutable | -        |
| Ramda     | -        |

| Language   | Function                                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                                                                                                                                                                               |
| Scala      | [min](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#min[B%3E:A](implicitord:scala.math.Ordering[B]):A>), [minBy](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#minBy[B](f:A=%3EB)(implicitcmp:scala.math.Ordering[B]):A>) |
| Elixir     | -                                                                                                                                                                                                                                                                               |

## `minBy()`

TBD

## `equals(value)`

- **Consumer**

### Arguments

- `value: any`

### Example

```js
```

### References

| Library   | Function                                                                       |
| --------- | ------------------------------------------------------------------------------ |
| Lodash    | [isEqual](https://lodash.com/docs/4.17.14#isEqual)                             |
| Immutable | [equals](https://immutable-js.github.io/immutable-js/docs/#/Collection/equals) |
| Ramda     | [equals](https://ramdajs.com/docs/#equals)                                     |

| Language   | Function                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                         |
| Scala      | [equals](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#equals(o:Any):Boolean>) |
| Elixir     | [equal?](https://hexdocs.pm/elixir/Map.html#equal?/2)                                                     |

## `equalsDeep()`

TBD

## `keys()`

- **Consumer**

### Example

```js
```

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [keys](https://lodash.com/docs/4.17.14#keys)                               |
| Immutable | [keys](https://immutable-js.github.io/immutable-js/docs/#/Collection/keys) |
| Ramda     | [keys](https://ramdajs.com/docs/#keys)                                     |

| Language   | Function                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------- |
| JavaScript | [keys](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) |
| Scala      | -                                                                                                 |
| Elixir     | [keys](https://hexdocs.pm/elixir/Map.html#keys/1)                                                 |

## `values()`

- **Consumer**

### Example

```js
```

### References

| Library   | Function                                                                       |
| --------- | ------------------------------------------------------------------------------ |
| Lodash    | [values](https://lodash.com/docs/4.17.14#values)                               |
| Immutable | [values](https://immutable-js.github.io/immutable-js/docs/#/Collection/values) |
| Ramda     | [values](https://ramdajs.com/docs/#values)                                     |

| Language   | Function                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| JavaScript | [values](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/values) |
| Scala      | -                                                                                                     |
| Elixir     | [values](https://hexdocs.pm/elixir/Map.html#values/1)                                                 |

## `entries()`

- **Consumer**

### Example

```js
```

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [toPairs](https://lodash.com/docs/4.17.14#toPairs)                               |
| Immutable | [entries](https://immutable-js.github.io/immutable-js/docs/#/Collection/entries) |
| Ramda     | [toPairs](https://ramdajs.com/docs/#toPairs)                                     |

| Language   | Function                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| JavaScript | [entries](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) |
| Scala      | -                                                                                                       |
| Elixir     | [to_list](https://hexdocs.pm/elixir/Map.html#to_list/1)                                                 |

## `forEach(fun)`

- **Consumer**

### Arguments

- `fun: (v: T, k: string) => any`

### Example

```js
```

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [forEach](https://lodash.com/docs/4.17.14#forEach)                               |
| Immutable | [forEach](https://immutable-js.github.io/immutable-js/docs/#/Collection/forEach) |
| Ramda     | [forEachObjIndexed](https://ramdajs.com/docs/#forEachObjIndexed)                 |

| Language   | Function                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                              |
| Scala      | [forEach](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#foreach[U](f:A=%3EU):Unit>) |
| Elixir     | -                                                                                                              |
