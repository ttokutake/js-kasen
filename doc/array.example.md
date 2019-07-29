# Array

## `tap()`

TBD

## `tapEach(fun)`

- **Method chaining only**

### Arguments

- `fun: (v: T, i: number) => any`

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

- `fun: (v: T, i: number) => U`

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
| JavaScript | [map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)                    |
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

- `fun: (v: T, i: number) => boolean`
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
| JavaScript | [filter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)            |
| Scala      | [filter](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#filter(pred:A=%3EBoolean):C>) |
| Elixir     | [filter](https://hexdocs.pm/elixir/Enum.html#filter/2)                                                          |

## `filterNot(fun)`

### Arguments

- `fun: (v: T, i: number) => boolean`

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

## `reverse()`

### Example

```js
```

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [reverse](https://lodash.com/docs/4.17.14#reverse)                               |
| Immutable | [reverse](https://immutable-js.github.io/immutable-js/docs/#/Collection/reverse) |
| Ramda     | [reverse](https://ramdajs.com/docs/#reverse)                                     |

| Language   | Function                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| JavaScript | [reverse](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) |
| Scala      | [reverse](https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#reverse:C)           |
| Elixir     | [reverse](https://hexdocs.pm/elixir/Enum.html#reverse/1)                                               |

## `slice()`

TBD

## `take(num)`

### Arguments

- `num: number`

### Example

```js
```

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [take](https://lodash.com/docs/4.17.14#take)                               |
| Immutable | [take](https://immutable-js.github.io/immutable-js/docs/#/Collection/take) |
| Ramda     | [take](https://ramdajs.com/docs/#take)                                     |

| Language   | Function                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                               |
| Scala      | [take](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#take(n:Int):C>) |
| Elixir     | [take](https://hexdocs.pm/elixir/Enum.html#take/2)                                              |

## `takeLast(num)`

### Arguments

- `num: number`

### Example

```js
```

### References

| Library   | Function                                                                           |
| --------- | ---------------------------------------------------------------------------------- |
| Lodash    | [takeRight](https://lodash.com/docs/4.17.14#takeRight)                             |
| Immutable | [takeLast](https://immutable-js.github.io/immutable-js/docs/#/Collection/takeLast) |
| Ramda     | [takeLast](https://ramdajs.com/docs/#takeLast)                                     |

| Language   | Function                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                         |
| Scala      | [takeRight](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#takeRight(n:Int):C>) |
| Elixir     | -                                                                                                         |

## `takeWhile(fun)`

### Arguments

- `fun: (v: T, i: number) => boolean`

### Example

```js
```

### References

| Library   | Function                                                                             |
| --------- | ------------------------------------------------------------------------------------ |
| Lodash    | [takeWhile](https://lodash.com/docs/4.17.14#takeWhile)                               |
| Immutable | [takeWhile](https://immutable-js.github.io/immutable-js/docs/#/Collection/takeWhile) |
| Ramda     | [takeWhile](https://ramdajs.com/docs/#takeWhile)                                     |

| Language   | Function                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| JavaScript | -                                                                                                                  |
| Scala      | [takeWhile](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#takeWhile(p:A=%3EBoolean):C>) |
| Elixir     | [take_while](https://hexdocs.pm/elixir/Enum.html#take_while/2)                                                     |

## `takeUntil(fun)`

### Arguments

- `fun: (v: T, i: number) => boolean`

### Example

```js
```

### References

| Library   | Function                                                                             |
| --------- | ------------------------------------------------------------------------------------ |
| Lodash    | -                                                                                    |
| Immutable | [takeUntil](https://immutable-js.github.io/immutable-js/docs/#/Collection/takeUntil) |
| Ramda     | -                                                                                    |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `skip(num)`

### Arguments

- `num: number`

### Example

```js
```

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [drop](https://lodash.com/docs/4.17.14#drop)                               |
| Immutable | [skip](https://immutable-js.github.io/immutable-js/docs/#/Collection/skip) |
| Ramda     | [drop](https://ramdajs.com/docs/#drop)                                     |

| Language   | Function                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                               |
| Scala      | [drop](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#drop(n:Int):C>) |
| Elixir     | [drop](https://hexdocs.pm/elixir/Enum.html#drop/2)                                              |

## `skipLast(num)`

### Arguments

- `num: number`

### Example

```js
```

### References

| Library   | Function                                                                           |
| --------- | ---------------------------------------------------------------------------------- |
| Lodash    | [dropRight](https://lodash.com/docs/4.17.14#dropRight)                             |
| Immutable | [skipLast](https://immutable-js.github.io/immutable-js/docs/#/Collection/skipLast) |
| Ramda     | [dropLast](https://ramdajs.com/docs/#dropLast)                                     |

| Language   | Function                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                         |
| Scala      | [dropRight](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#dropRight(n:Int):C>) |
| Elixir     | -                                                                                                         |

## `skipWhile(fun)`

### Arguments

- `fun: (v: T, i: number) => boolean`

### Example

```js
```

### References

| Library   | Function                                                                             |
| --------- | ------------------------------------------------------------------------------------ |
| Lodash    | [dropWhile](https://lodash.com/docs/4.17.14#dropWhile)                               |
| Immutable | [skipWhile](https://immutable-js.github.io/immutable-js/docs/#/Collection/skipWhile) |
| Ramda     | [dropWhile](https://ramdajs.com/docs/#dropWhile)                                     |

| Language   | Function                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| JavaScript | -                                                                                                                  |
| Scala      | [dropWhile](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#dropWhile(p:A=%3EBoolean):C>) |
| Elixir     | [drop_while](https://hexdocs.pm/elixir/Enum.html#drop_while/2)                                                     |

## `skipUntil(fun)`

### Arguments

- `fun: (v: T, i: number) => boolean`

### Example

```js
```

### References

| Library   | Function                                                                             |
| --------- | ------------------------------------------------------------------------------------ |
| Lodash    | -                                                                                    |
| Immutable | [skipUntil](https://immutable-js.github.io/immutable-js/docs/#/Collection/skipUntil) |
| Ramda     | -                                                                                    |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `set(index, value)`

### Arguments

- `index: number`
- `value: T`

### Example

```js
```

### References

| Library   | Function                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------- |
| Lodash    | [set](https://lodash.com/docs/4.17.14#set)                                                         |
| Immutable | [set](https://immutable-js.github.io/immutable-js/docs/#/set)                                      |
| Ramda     | [update](https://ramdajs.com/docs/#update), [set + lensIndex](https://ramdajs.com/docs/#lensIndex) |

| Language   | Function                                                                                                                |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                       |
| Scala      | [update](<https://www.scala-lang.org/api/current/scala/collection/mutable/IndexedSeq.html#update(idx:Int,elem:A):Unit>) |
| Elixir     | -                                                                                                                       |

## `update(index, fun)`

### Arguments

- `index: number`
- `fun: (v: T) => T`

### Example

```js
```

### References

| Library   | Function                                                            |
| --------- | ------------------------------------------------------------------- |
| Lodash    | -                                                                   |
| Immutable | [update](https://immutable-js.github.io/immutable-js/docs/#/update) |
| Ramda     | [over + lensIndex](https://ramdajs.com/docs/#lensIndex)             |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `delete(index)`

### Arguments

- `index: number`

### Example

```js
```

### References

| Library   | Function                                                                |
| --------- | ----------------------------------------------------------------------- |
| Lodash    | [unset](https://lodash.com/docs/4.17.14#unset)                          |
| Immutable | [delete](https://immutable-js.github.io/immutable-js/docs/#/Map/delete) |
| Ramda     | -                                                                       |

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

| Library   | Function                                                               |
| --------- | ---------------------------------------------------------------------- |
| Lodash    | -                                                                      |
| Immutable | [clear](https://immutable-js.github.io/immutable-js/docs/#/List/clear) |
| Ramda     | -                                                                      |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `concat(...values)`

### Arguments

- `...values: Array<T[] | T>`

### Example

```js
```

### References

| Library   | Function                                                                       |
| --------- | ------------------------------------------------------------------------------ |
| Lodash    | [concat](https://lodash.com/docs/4.17.14#concat)                               |
| Immutable | [concat](https://immutable-js.github.io/immutable-js/docs/#/Collection/concat) |
| Ramda     | [concat](https://ramdajs.com/docs/#concat)                                     |

| Language   | Function                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [concat](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)                                              |
| Scala      | [concat](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#concat[B%3E:A](suffix:scala.collection.IterableOnce[B]):CC[B]>) |
| Elixir     | [concat](https://hexdocs.pm/elixir/Enum.html#concat/2)                                                                                            |

## `insert(index, value)`

### Arguments

- `index: number`
- `value: T`

### Example

```js
```

### References

| Library   | Function                                                                 |
| --------- | ------------------------------------------------------------------------ |
| Lodash    | -                                                                        |
| Immutable | [insert](https://immutable-js.github.io/immutable-js/docs/#/List/insert) |
| Ramda     | [insert](https://ramdajs.com/docs/#insert)                               |

| Language   | Function                                                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                          |
| Scala      | [insert](<https://www.scala-lang.org/api/current/scala/collection/mutable/ArrayBuffer.html#insert(index:Int,elem:A):Unit>) |
| Elixir     | [insert_at](https://hexdocs.pm/elixir/List.html#insert_at/3)                                                               |

## `push(...values)`

### Arguments

- `...values: T[]`

### Example

```js
```

### References

| Library   | Function                                                             |
| --------- | -------------------------------------------------------------------- |
| Lodash    | -                                                                    |
| Immutable | [push](https://immutable-js.github.io/immutable-js/docs/#/List/push) |
| Ramda     | [append](https://ramdajs.com/docs/#append)                           |

| Language   | Function                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------ |
| JavaScript | [push](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/push) |
| Scala      | -                                                                                                |
| Elixir     | -                                                                                                |

## `pop()`

### Example

```js
```

### References

| Library   | Function                                                           |
| --------- | ------------------------------------------------------------------ |
| Lodash    | -                                                                  |
| Immutable | [pop](https://immutable-js.github.io/immutable-js/docs/#/List/pop) |
| Ramda     | [init](https://ramdajs.com/docs/#init)                             |

| Language   | Function                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------- |
| JavaScript | [pop](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) |
| Scala      | [init](https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#init:C)         |
| Elixir     | -                                                                                              |

## `unshift(...values)`

### Arguments

- `...values: T[]`

### Example

```js
```

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | -                                                                          |
| Immutable | [unshift](https://immutable-js.github.io/immutable-js/docs/#/List/unshift) |
| Ramda     | [prepend](https://ramdajs.com/docs/#prepend)                               |

| Language   | Function                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| JavaScript | [unshift](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) |
| Scala      | -                                                                                                      |
| Elixir     | -                                                                                                      |

## `shift()`

### Example

```js
```

### References

| Library   | Function                                                               |
| --------- | ---------------------------------------------------------------------- |
| Lodash    | [tail](https://lodash.com/docs/4.17.14#tail)                           |
| Immutable | [shift](https://immutable-js.github.io/immutable-js/docs/#/List/shift) |
| Ramda     | [tail](https://ramdajs.com/docs/#tail)                                 |

| Language   | Function                                                                                           |
| ---------- | -------------------------------------------------------------------------------------------------- |
| JavaScript | [shift](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) |
| Scala      | [tail](https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#tail:C)             |
| Elixir     | -                                                                                                  |

## `splice(index, num, ...values)`

### Arguments

- `index: number`
- `num: number`
- `...values: T[]`

### Example

```js
```

### References

| Library   | Function                                                                 |
| --------- | ------------------------------------------------------------------------ |
| Lodash    | -                                                                        |
| Immutable | [splice](https://immutable-js.github.io/immutable-js/docs/#/List/splice) |
| Ramda     | -                                                                        |

| Language   | Function                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| JavaScript | [splice](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) |
| Scala      | -                                                                                                    |
| Elixir     | -                                                                                                    |

## `setIn(keys, value)`

### Arguments

- `keys: (number | string)[]`
- `value: T`

### Example

```js
```

### References

| Library   | Function                                                              |
| --------- | --------------------------------------------------------------------- |
| Lodash    | [set](https://lodash.com/docs/4.17.14#set)                            |
| Immutable | [setIn](https://immutable-js.github.io/immutable-js/docs/#/Map/setIn) |
| Ramda     | [set + lensPath](https://ramdajs.com/docs/#lensPath)                  |

| Language   | Function                                                 |
| ---------- | -------------------------------------------------------- |
| JavaScript | -                                                        |
| Scala      | -                                                        |
| Elixir     | [put_in](https://hexdocs.pm/elixir/Kernel.html#put_in/3) |

## `updateIn(keys, fun)`

### Arguments

- `keys: (number | string)[]`
- `fun: (v: any, k: number | string) => any`

### Example

```js
```

### References

| Library   | Function                                                                    |
| --------- | --------------------------------------------------------------------------- |
| Lodash    | -                                                                           |
| Immutable | [updateIn](https://immutable-js.github.io/immutable-js/docs/#/Map/updateIn) |
| Ramda     | [over + lensPath](https://ramdajs.com/docs/#lensPath)                       |

| Language   | Function                                                       |
| ---------- | -------------------------------------------------------------- |
| JavaScript | -                                                              |
| Scala      | -                                                              |
| Elixir     | [update_in](https://hexdocs.pm/elixir/Kernel.html#update_in/3) |

## `deleteIn(keys)`

### Arguments

- `keys: (number | string)[]`

### Example

```js
```

### References

| Library   | Function                                                                    |
| --------- | --------------------------------------------------------------------------- |
| Lodash    | [unset](https://lodash.com/docs/4.17.14#unset)                              |
| Immutable | [deleteIn](https://immutable-js.github.io/immutable-js/docs/#/Map/deleteIn) |
| Ramda     | -                                                                           |

| Language   | Function                                                 |
| ---------- | -------------------------------------------------------- |
| JavaScript | -                                                        |
| Scala      | -                                                        |
| Elixir     | [pop_in](https://hexdocs.pm/elixir/Kernel.html#pop_in/2) |

## `flatten()`

### Example

```js
```

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [flatten](https://lodash.com/docs/4.17.14#flatten)                               |
| Immutable | [flatten](https://immutable-js.github.io/immutable-js/docs/#/Collection/flatten) |
| Ramda     | [flatten](https://ramdajs.com/docs/#flatten)                                     |

| Language   | Function                                                                                                                                                        |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [flat](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)                                                                |
| Scala      | [flatten](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#flatten[B](implicitasIterable:A=%3Escala.collection.IterableOnce[B]):CC[B]>) |
| Elixir     | [flatten](https://hexdocs.pm/elixir/List.html#flatten/1)                                                                                                        |

## `flatMap(fun)`

### Arguments

- `fun: (v: T, i: number) => U[]`

### Example

```js
```

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [flatMap](https://lodash.com/docs/4.17.14#flatMap)                               |
| Immutable | [flatMap](https://immutable-js.github.io/immutable-js/docs/#/Collection/flatMap) |
| Ramda     | -                                                                                |

| Language   | Function                                                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [flatMap](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)                                         |
| Scala      | [flatMap](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#flatMap[B](f:A=%3Escala.collection.IterableOnce[B]):CC[B]>) |
| Elixir     | [flat_map](https://hexdocs.pm/elixir/Enum.html#flat_map/2)                                                                                     |

## `interpose()`

TBD

## `interleave()`

TBD

## `zip(...arrays)`

### Arguments

- `...arrays: Array<any[]>`

### Example

```js
```

### References

| Library   | Function                                                           |
| --------- | ------------------------------------------------------------------ |
| Lodash    | [zip](https://lodash.com/docs/4.17.14#zip)                         |
| Immutable | [zip](https://immutable-js.github.io/immutable-js/docs/#/List/zip) |
| Ramda     | [zip](https://ramdajs.com/docs/#zip)                               |

| Language   | Function                                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                                                                                     |
| Scala      | [zip](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#zip[B](that:scala.collection.IterableOnce[B]):CC[(A@scala.annotation.unchecked.uncheckedVariance,B)]>) |
| Elixir     | [zip](https://hexdocs.pm/elixir/Enum.html#zip/2)                                                                                                                                      |

## `zipAll(...arrays)`

### Arguments

- `...arrays: Array<any[]>`

### Example

```js
```

### References

| Library   | Function                                                                 |
| --------- | ------------------------------------------------------------------------ |
| Lodash    | -                                                                        |
| Immutable | [zipAll](https://immutable-js.github.io/immutable-js/docs/#/List/zipAll) |
| Ramda     | -                                                                        |

| Language   | Function                                                                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                                                         |
| Scala      | [zipAll](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#zipAll[A1%3E:A,B](that:Iterable[B],thisElem:A1,thatElem:B):CC[(A1,B)]>) |
| Elixir     | -                                                                                                                                                         |

## `zipWith(fun, ...arrays)`

### Arguments

- `fun: (...values: any[]) => U`
- `...arrays: Array<any[]>`

### Example

```js
```

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [zipWith](https://lodash.com/docs/4.17.14#zipWith)                         |
| Immutable | [zipWith](https://immutable-js.github.io/immutable-js/docs/#/List/zipWith) |
| Ramda     | [zipWith](https://ramdajs.com/docs/#zipWith)                               |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `sort(fun)`

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [sortBy](https://lodash.com/docs/4.17.14#sortBy)                           |
| Immutable | [sort](https://immutable-js.github.io/immutable-js/docs/#/Collection/sort) |
| Ramda     | [sort](https://ramdajs.com/docs/#sort)                                     |

| Language   | Function                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [sort](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)                              |
| Scala      | [sorted](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#sorted[B%3E:A](implicitord:Ordering[B]):C>) |
| Elixir     | [sort](https://hexdocs.pm/elixir/Enum.html#sort/2)                                                                            |

## `sortBy()`

TBD

## `unique(fun)`

### References

| Library   | Function                                                                                       |
| --------- | ---------------------------------------------------------------------------------------------- |
| Lodash    | [uniq](https://lodash.com/docs/4.17.14#uniq), [uniqBy](https://lodash.com/docs/4.17.14#uniqBy) |
| Immutable | -                                                                                              |
| Ramda     | [uniq](https://ramdajs.com/docs/#uniq), [uniqBy](https://ramdajs.com/docs/#uniqBy)             |

| Language   | Function                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| JavaScript | -                                                                                                            |
| Scala      | -                                                                                                            |
| Elixir     | [uniq](https://hexdocs.pm/elixir/Enum.html#uniq/1), [uniq_by](https://hexdocs.pm/elixir/Enum.html#uniq_by/2) |

## `uniqueBy()`

TBD

## `chunk(num)`

### References

| Library   | Function                                           |
| --------- | -------------------------------------------------- |
| Lodash    | [chunk](https://lodash.com/docs/4.17.14#chunk)     |
| Immutable | -                                                  |
| Ramda     | [splitEvery](https://ramdajs.com/docs/#splitEvery) |

| Language   | Function                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| JavaScript | -                                                                                                                  |
| Scala      | [sliding](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#sliding(size:Int):Iterator[C]>) |
| Elixir     | [chunk_every](https://hexdocs.pm/elixir/Enum.html#chunk_every/2)                                                   |

## `sliding(num, step)`

### References

| Library   | Function |
| --------- | -------- |
| Lodash    | -        |
| Immutable | -        |
| Ramda     | -        |

| Language   | Function                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                           |
| Scala      | [sliding](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#sliding(size:Int,step:Int):Iterator[C]>) |
| Elixir     | -                                                                                                                           |

## `range(start, end, step)`

### References

| Library   | Function                                                          |
| --------- | ----------------------------------------------------------------- |
| Lodash    | [range](https://lodash.com/docs/4.17.14#range)                    |
| Immutable | [Range](https://immutable-js.github.io/immutable-js/docs/#/Range) |
| Ramda     | [range](https://ramdajs.com/docs/#range)                          |

| Language   | Function                                                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                                                        |
| Scala      | [range](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq$.html#range[A](start:A,end:A,step:A)(implicitevidence$4:Integral[A]):CC[A]>) |
| Elixir     | [Range](https://hexdocs.pm/elixir/Range.html)                                                                                                            |

## `repeat(value, num)`

### References

| Library   | Function                                                            |
| --------- | ------------------------------------------------------------------- |
| Lodash    | -                                                                   |
| Immutable | [Repeat](https://immutable-js.github.io/immutable-js/docs/#/Repeat) |
| Ramda     | [repeat](https://ramdajs.com/docs/#repeat)                          |

| Language   | Function                                                         |
| ---------- | ---------------------------------------------------------------- |
| JavaScript | -                                                                |
| Scala      | -                                                                |
| Elixir     | [repeatedly](https://hexdocs.pm/elixir/Stream.html#repeatedly/1) |

## `copy()`

### Example

TODO

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

TODO

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

## `startsWith()`

TBD

## `endsWith()`

TBD

## `count(fun)`

- **Consumer**

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
| Elixir     | [length](https://hexdocs.pm/elixir/Kernel.html#length/1)                                                     |

## `get(index, defaultValue)`

- **Consumer**

### References

| Library   | Function                                                                 |
| --------- | ------------------------------------------------------------------------ |
| Lodash    | [get](https://lodash.com/docs/4.17.14#get)                               |
| Immutable | [get](https://immutable-js.github.io/immutable-js/docs/#/Collection/get) |
| Ramda     | [view + lensIndex](https://ramdajs.com/docs/#lensIndex)                  |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `has(index)`

- **Consumer**

### References

| Library   | Function                                                                                   |
| --------- | ------------------------------------------------------------------------------------------ |
| Lodash    | [has](https://lodash.com/docs/4.17.14#has), [hasIn](https://lodash.com/docs/4.17.14#hasIn) |
| Immutable | [has](https://immutable-js.github.io/immutable-js/docs/#/Collection/has)                   |
| Ramda     | [has](https://ramdajs.com/docs/#has)                                                       |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `includes(value)`

- **Consumer**

### References

| Library   | Function                                                                           |
| --------- | ---------------------------------------------------------------------------------- |
| Lodash    | [includes](https://lodash.com/docs/4.17.14#includes)                               |
| Immutable | [includes](https://immutable-js.github.io/immutable-js/docs/#/Collection/includes) |
| Ramda     | [includes](https://ramdajs.com/docs/#includes)                                     |

| Language   | Function                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| JavaScript | [includes](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)                 |
| Scala      | [contains](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#contains[A1%3E:A](elem:A1):Boolean>) |
| Elixir     | [in](https://hexdocs.pm/elixir/Kernel.html#in/2)                                                                         |

## `getIn(keys, defaultValue)`

- **Consumer**

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

## `head() / first()`

- **Consumer**

### References

| Library   | Function                                                                     |
| --------- | ---------------------------------------------------------------------------- |
| Lodash    | [head / first](https://lodash.com/docs/4.17.14#head)                         |
| Immutable | [first](https://immutable-js.github.io/immutable-js/docs/#/Collection/first) |
| Ramda     | [head](https://ramdajs.com/docs/#head)                                       |

| Language   | Function                                                                               |
| ---------- | -------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                      |
| Scala      | [head](https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#head:A) |
| Elixir     | [hd](https://hexdocs.pm/elixir/Kernel.html#hd/1)                                       |

## `tail()`

- **Consumer**

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [tail](https://lodash.com/docs/4.17.14#tail)                               |
| Immutable | [rest](https://immutable-js.github.io/immutable-js/docs/#/Collection/rest) |
| Ramda     | [tail](https://ramdajs.com/docs/#tail)                                     |

| Language   | Function                                                                               |
| ---------- | -------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                      |
| Scala      | [tail](https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#tail:C) |
| Elixir     | [tl](https://hexdocs.pm/elixir/Kernel.html#tl/1)                                       |

## `init()`

- **Consumer**

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [initial](https://lodash.com/docs/4.17.14#initial)                               |
| Immutable | [butLast](https://immutable-js.github.io/immutable-js/docs/#/Collection/butLast) |
| Ramda     | [init](https://ramdajs.com/docs/#init)                                           |

| Language   | Function                                                                               |
| ---------- | -------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                      |
| Scala      | [init](https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#init:C) |
| Elixir     | -                                                                                      |

## `last()`

- **Consumer**

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [last](https://lodash.com/docs/4.17.14#last)                               |
| Immutable | [last](https://immutable-js.github.io/immutable-js/docs/#/Collection/last) |
| Ramda     | [last](https://ramdajs.com/docs/#last)                                     |

| Language   | Function                                                                               |
| ---------- | -------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                      |
| Scala      | [last](https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#last:A) |
| Elixir     | [last](https://hexdocs.pm/elixir/List.html#last/1)                                     |

## `splitAt(index)`

- **Consumer**

### References

| Library   | Function                                     |
| --------- | -------------------------------------------- |
| Lodash    | -                                            |
| Immutable | -                                            |
| Ramda     | [splitAt](https://ramdajs.com/docs/#splitAt) |

| Language   | Function                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                         |
| Scala      | [splitAt](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#splitAt(n:Int):(C,C)>) |
| Elixir     | [split](https://hexdocs.pm/elixir/Enum.html#split/2)                                                      |

## `toJS()`

- **Method chaining only**
- **Consumer**

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

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | -                                                                                |
| Immutable | [toArray](https://immutable-js.github.io/immutable-js/docs/#/Collection/toArray) |
| Ramda     | -                                                                                |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `toObject()`

- **Consumer**

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

### References

| Library   | Function                                                                       |
| --------- | ------------------------------------------------------------------------------ |
| Lodash    | [reduce](https://lodash.com/docs/4.17.14#reduce)                               |
| Immutable | [reduce](https://immutable-js.github.io/immutable-js/docs/#/Collection/reduce) |
| Ramda     | [reduce](https://ramdajs.com/docs/#reduce)                                     |

| Language   | Function                                                                                                                                                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [reduce](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)                                                                                                                                            |
| Scala      | [reduce](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#reduce[B%3E:A](op:(B,B)=%3EB):B>), [fold](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#fold[A1%3E:A](z:A1)(op:(A1,A1)=%3EA1):A1>) |
| Elixir     | [reduce](https://hexdocs.pm/elixir/Enum.html#reduce/3)                                                                                                                                                                                          |

## `reduceRight(fun, init)`

- **Consumer**

### References

| Library   | Function                                                                                 |
| --------- | ---------------------------------------------------------------------------------------- |
| Lodash    | [reduceRight](https://lodash.com/docs/4.17.14#reduce)                                    |
| Immutable | [reduceRight](https://immutable-js.github.io/immutable-js/docs/#/Collection/reduceRight) |
| Ramda     | [reduceRight](https://ramdajs.com/docs/#reduceRight)                                     |

| Language   | Function                                                                                                                                                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [reduceRight](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)                                                                                                                                           |
| Scala      | [reduceRight](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#reduceRight[B%3E:A](op:(A,B)=%3EB):B>), [foldRight](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#foldRight[B](z:B)(op:(A,B)=%3EB):B>) |
| Elixir     | -                                                                                                                                                                                                                                                        |

## `reduceWhile(fun, init)`

- **Consumer**

### References

| Library   | Function                                             |
| --------- | ---------------------------------------------------- |
| Lodash    | -                                                    |
| Immutable | -                                                    |
| Ramda     | [reduceWhile](https://ramdajs.com/docs/#reduceWhile) |

| Language   | Function                                                           |
| ---------- | ------------------------------------------------------------------ |
| JavaScript | -                                                                  |
| Scala      | -                                                                  |
| Elixir     | [reduce_while](https://hexdocs.pm/elixir/Enum.html#reduce_while/3) |

## `scan(fun, init)`

- **Consumer**

### References

| Library   | Function                               |
| --------- | -------------------------------------- |
| Lodash    | -                                      |
| Immutable | -                                      |
| Ramda     | [scan](https://ramdajs.com/docs/#scan) |

| Language   | Function                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| JavaScript | -                                                                                                                        |
| Scala      | [scan](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#scan[B%3E:A](z:B)(op:(B,B)=%3EB):CC[B]>) |
| Elixir     | -                                                                                                                        |

## `scanRight(fun, init)`

- **Consumer**

### References

| Library   | Function |
| --------- | -------- |
| Lodash    | -        |
| Immutable | -        |
| Ramda     | -        |

| Language   | Function                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                             |
| Scala      | [scanRight](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#scanRight[B](z:B)(op:(A,B)=%3EB):CC[B]>) |
| Elixir     | -                                                                                                                             |

## `partition(fun)`

- **Consumer**

### References

| Library   | Function                                               |
| --------- | ------------------------------------------------------ |
| Lodash    | [partition](https://lodash.com/docs/4.17.14#partition) |
| Immutable | -                                                      |
| Ramda     | [partition](https://ramdajs.com/docs/#partition)       |

| Language   | Function                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                      |
| Scala      | [partition](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#partition(p:A=%3EBoolean):(C,C)>) |
| Elixir     | [split_with](https://hexdocs.pm/elixir/Enum.html#split_with/2)                                                         |

## `join()`

- **Consumer**

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [join](https://lodash.com/docs/4.17.14#join)                               |
| Immutable | [join](https://immutable-js.github.io/immutable-js/docs/#/Collection/join) |
| Ramda     | [partition](https://ramdajs.com/docs/#partition)                           |

| Language   | Function                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                      |
| Scala      | [partition](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#partition(p:A=%3EBoolean):(C,C)>) |
| Elixir     | [split_with](https://hexdocs.pm/elixir/Enum.html#split_with/2)                                                         |

## `unzip()`

TBD

## `unzipAll()`

TBD

## `groupBy(fun)`

- **Consumer**

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [groupBy](https://lodash.com/docs/4.17.14#groupBy)                               |
| Immutable | [groupBy](https://immutable-js.github.io/immutable-js/docs/#/Collection/groupBy) |
| Ramda     | [groupBy](https://ramdajs.com/docs/#groupBy)                                     |

| Language   | Function                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                                             |
| Scala      | [groupBy](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#groupBy[K](f:A=%3EK):scala.collection.immutable.Map[K,C]>) |
| Elixir     | [group_by](https://hexdocs.pm/elixir/Enum.html#group_by/3)                                                                                    |

## `every(fun)`

- **Consumer**

### References

| Library   | Function                                                                     |
| --------- | ---------------------------------------------------------------------------- |
| Lodash    | [every](https://lodash.com/docs/4.17.14#every)                               |
| Immutable | [every](https://immutable-js.github.io/immutable-js/docs/#/Collection/every) |
| Ramda     | [all](https://ramdajs.com/docs/#all)                                         |

| Language   | Function                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| JavaScript | [every](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/every)                 |
| Scala      | [forall](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#forall(p:A=%3EBoolean):Boolean>) |
| Elixir     | [all?](https://hexdocs.pm/elixir/Enum.html#all?/2)                                                                 |

## `some(fun)`

- **Consumer**

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [some](https://lodash.com/docs/4.17.14#some)                               |
| Immutable | [some](https://immutable-js.github.io/immutable-js/docs/#/Collection/some) |
| Ramda     | [any](https://ramdajs.com/docs/#any)                                       |

| Language   | Function                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| JavaScript | [some](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/some)                               |
| Scala      | [exists](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html?search=some#exists(p:A=%3EBoolean):Boolean>) |
| Elixir     | [any?](https://hexdocs.pm/elixir/Enum.html#any?/2)                                                                             |

## `find(fun)`

- **Consumer**

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | [find](https://lodash.com/docs/4.17.14#find)                               |
| Immutable | [find](https://immutable-js.github.io/immutable-js/docs/#/Collection/find) |
| Ramda     | [find](https://ramdajs.com/docs/#find)                                     |

| Language   | Function                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [find](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/find)                             |
| Scala      | [find](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html?search=some#find(p:A=%3EBoolean):Option[A]>) |
| Elixir     | [find](https://hexdocs.pm/elixir/Enum.html#find/3)                                                                           |

## `findLast(fun)`

- **Consumer**

### References

| Library   | Function                                                                           |
| --------- | ---------------------------------------------------------------------------------- |
| Lodash    | [findLast](https://lodash.com/docs/4.17.14#findLast)                               |
| Immutable | [findLast](https://immutable-js.github.io/immutable-js/docs/#/Collection/findLast) |
| Ramda     | [findLast](https://ramdajs.com/docs/#findLast)                                     |

| Language   | Function                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| JavaScript | -                                                                                                                                    |
| Scala      | [findLast](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html?search=some#findLast(p:A=%3EBoolean):Option[A]>) |
| Elixir     | -                                                                                                                                    |

## `findEntry(fun)`

- **Consumer**

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

## `findLastEntry(fun)`

- **Consumer**

### References

| Library   | Function                                                                                     |
| --------- | -------------------------------------------------------------------------------------------- |
| Lodash    | -                                                                                            |
| Immutable | [findLastEntry](https://immutable-js.github.io/immutable-js/docs/#/Collection/findLastEntry) |
| Ramda     | -                                                                                            |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `findKey(fun) / findIndex(fun)`

- **Consumer**

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | [findIndex](https://lodash.com/docs/4.17.14#findIndex)                           |
| Immutable | [findKey](https://immutable-js.github.io/immutable-js/docs/#/Collection/findKey) |
| Ramda     | [findIndex](https://ramdajs.com/docs/#findIndex)                                 |

| Language   | Function                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| JavaScript | [findIndex](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) |
| Scala      | -                                                                                                          |
| Elixir     | [find_index](https://hexdocs.pm/elixir/Enum.html#find_index/2)                                             |

## `findLastKey(fun) / findLastIndex(fun)`

- **Consumer**

### References

| Library   | Function                                                                                 |
| --------- | ---------------------------------------------------------------------------------------- |
| Lodash    | [findLastIndex](https://lodash.com/docs/4.17.14#findLastIndex)                           |
| Immutable | [findLastKey](https://immutable-js.github.io/immutable-js/docs/#/Collection/findLastKey) |
| Ramda     | [findLastIndex](https://ramdajs.com/docs/#findLastIndex)                                 |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `keyOf(value) / indexOf(value)`

- **Consumer**

### References

| Library   | Function                                                                     |
| --------- | ---------------------------------------------------------------------------- |
| Lodash    | [indexOf](https://lodash.com/docs/4.17.14#indexOf)                           |
| Immutable | [keyOf](https://immutable-js.github.io/immutable-js/docs/#/Collection/keyOf) |
| Ramda     | [indexOf](https://ramdajs.com/docs/#indexOf)                                 |

| Language   | Function                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [indexOf](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)                       |
| Scala      | [indexOf](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html?search=some#indexOf[B%3E:A](elem:B):Int>) |
| Elixir     | -                                                                                                                            |

## `lastKeyOf(value) / lastIndexOf(value)`

- **Consumer**

### References

| Library   | Function                                                                             |
| --------- | ------------------------------------------------------------------------------------ |
| Lodash    | -                                                                                    |
| Immutable | [lastKeyOf](https://immutable-js.github.io/immutable-js/docs/#/Collection/lastKeyOf) |
| Ramda     | [lastIndexOf](https://ramdajs.com/docs/#lastIndexOf)                                 |

| Language   | Function                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| JavaScript | [lastIndexOf](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf) |
| Scala      | -                                                                                                              |
| Elixir     | -                                                                                                              |

## `sum(fun)`

- **Consumer**

### References

| Library   | Function                                                                                   |
| --------- | ------------------------------------------------------------------------------------------ |
| Lodash    | [sum](https://lodash.com/docs/4.17.14#sum), [sumBy](https://lodash.com/docs/4.17.14#sumBy) |
| Immutable | -                                                                                          |
| Ramda     | [sum](https://ramdajs.com/docs/#sum)                                                       |

| Language   | Function                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | -                                                                                                                                             |
| Scala      | [sum](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html?search=some#sum[B%3E:A](implicitnum:scala.math.Numeric[B]):B>) |
| Elixir     | [sum](https://hexdocs.pm/elixir/Enum.html#sum/1)                                                                                              |

## `max(fun)`

- **Consumer**

### References

| Library   | Function                                                                                   |
| --------- | ------------------------------------------------------------------------------------------ |
| Lodash    | [max](https://lodash.com/docs/4.17.14#max), [maxBy](https://lodash.com/docs/4.17.14#maxBy) |
| Immutable | -                                                                                          |
| Ramda     | [max](https://ramdajs.com/docs/#max), [maxBy](https://ramdajs.com/docs/#maxBy)             |

| Language   | Function                                                                                                                                                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| JavaScript | [max](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/max)                                                                                                                                                                                        |
| Scala      | [max](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#maxBy[B](f:A=%3EB)(implicitcmp:scala.math.Ordering[B]):A>), [maxBy](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#maxBy[B](f:A=>B)(implicitcmp:scala.math.Ordering[B]):A>) |
| Elixir     | [max](https://hexdocs.pm/elixir/Enum.html#max/2)                                                                                                                                                                                                                                     |

## `maxBy()`

TBD

## `min(fun)`

- **Consumer**

### References

| Library   | Function                                                                                   |
| --------- | ------------------------------------------------------------------------------------------ |
| Lodash    | [min](https://lodash.com/docs/4.17.14#min), [minBy](https://lodash.com/docs/4.17.14#minBy) |
| Immutable | -                                                                                          |
| Ramda     | [min](https://ramdajs.com/docs/#min), [minBy](https://ramdajs.com/docs/#minBy)             |

| Language   | Function                                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [min](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/min)                                                                                                                                                                                   |
| Scala      | [min](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#min[B%3E:A](implicitord:scala.math.Ordering[B]):A>), [minBy](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#minBy[B](f:A=%3EB)(implicitcmp:scala.math.Ordering[B]):A>) |
| Elixir     | [min](https://hexdocs.pm/elixir/Enum.html#min/2)                                                                                                                                                                                                                                |

## `minBy()`

TBD

## `equals(value)`

- **Consumer**

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
| Elixir     | -                                                                                                         |

## `equalsDeep()`

TBD

## `keys()`

- **Consumer**

### References

| Library   | Function                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Lodash    | -                                                                          |
| Immutable | [keys](https://immutable-js.github.io/immutable-js/docs/#/Collection/keys) |
| Ramda     | -                                                                          |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `values()`

- **Consumer**

### References

| Library   | Function                                                                       |
| --------- | ------------------------------------------------------------------------------ |
| Lodash    | -                                                                              |
| Immutable | [values](https://immutable-js.github.io/immutable-js/docs/#/Collection/values) |
| Ramda     | -                                                                              |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `entries()`

- **Consumer**

### References

| Library   | Function                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Lodash    | -                                                                                |
| Immutable | [entries](https://immutable-js.github.io/immutable-js/docs/#/Collection/entries) |
| Ramda     | -                                                                                |

| Language   | Function |
| ---------- | -------- |
| JavaScript | -        |
| Scala      | -        |
| Elixir     | -        |

## `forEach(fun)`

- **Consumer**

### References

| Library   | Function                                                                                                       |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| Lodash    | [forEach](https://lodash.com/docs/4.17.14#forEach)                                                             |
| Immutable | [forEach](https://immutable-js.github.io/immutable-js/docs/#/Collection/forEach)                               |
| Ramda     | [forEach](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#foreach[U](f:A=%3EU):Unit>) |

| Language   | Function                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| JavaScript | [forEach](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)         |
| Scala      | [forEach](<https://www.scala-lang.org/api/current/scala/collection/IndexedSeq.html#foreach[U](f:A=%3EU):Unit>) |
| Elixir     | [each](https://hexdocs.pm/elixir/Enum.html#each/2)                                                             |
