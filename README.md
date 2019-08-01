# Kasen

[![npm version](https://badge.fury.io/js/kasen.svg)](https://badge.fury.io/js/kasen)
[![CircleCI](https://circleci.com/gh/ttokutake/js-kasen.svg?style=svg)](https://circleci.com/gh/ttokutake/js-kasen)
[![codecov](https://codecov.io/gh/ttokutake/js-kasen/branch/master/graph/badge.svg)](https://codecov.io/gh/ttokutake/js-kasen)

_Kasen_ is the library of collection methods which is inspired by
[Lodash](https://lodash.com/),
[Immutable](https://immutable-js.github.io/immutable-js/),
[Rambda](https://ramdajs.com/),
[Scala](https://www.scala-lang.org/) and
[Elixir](https://elixir-lang.org/docs.html).

**Note that Kasen is experimental state.**
**APIs can be changed in the future.**

## What does Kasen mean?

"Kasen" means "underscore" in Japanese :stuck_out_tongue:

## Installation

```bash
npm install kasen
```

## Import

- ES Modules: `import Kasen from "kasen";`
- CommonJS: `const Kasen = require("kasen");`

## Example

```js
const result1 = Kasen.map({ a: 1, b: 2, c: 3 }, v => v + 1);
console.log(result1); // => { a: 2, b: 3, c: 4 }

const result2 = Kasen([1, 2, 3])
  .filter(v => v % 2 === 1)
  .map(v => v + 1)
  .toJS();
console.log(result2); // => [2, 4]
```

## Feature

1. Immutability: Methods do not mutate an input collection.

   ```js
   const input = [1, 2, 3];
   const result = Kasen.push(input, 4);
   console.log(input); // => [1, 2, 3]
   console.log(result); // => [1, 2, 3, 4]
   ```

2. Lazy Evaluation: Method chaining does not process unnecessary calculations.

   ```js
   const result = Kasen([1, 2, 3])
     .map(v => {
       console.log(v);
       return v + 1;
     })
     .every(v => v % 2 === 0);
   // => 1
   // => 2
   console.log(result); // => false
   ```

3. Great Selection of Methods: Kasen will have a lot of collection methods.
   - 96 methods for Array.
   - 57 methods for Object.
4. Light Weight: Kasen will be light weight library.
   - Kasen is 68 KB now.

## APIs

**Note that documentation is under construction.**

- [APIs for Array](./doc/array.md)
- [APIs for Object](./doc/object.md)

## Contribution

TBD

## License

Kasen is [MIT-licensed](./LICENSE).
