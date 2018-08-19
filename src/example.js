const KasenArray = require('./array');

const input = [1, 2, 3, 4];

console.log(input);

let array = new KasenArray(input)
  .map((v, i) => v + 1)
  .reverse()
  .filter((v, i) => i % 2 === 0)
  .map((v, i) => v + 1);

let output = array.toJs();
output.push(100);

console.log(output);
console.log(array.toJs());

output = new KasenArray(input)
  .map(v => v + 1)
  .reduce((v, k) => v + k, 10);

console.log(output);

output = new KasenArray(input)
  .set(-1, 100)
  .set(-4, 1000)
  .toJs();

console.log(output);

output = new KasenArray(input)
  .map(v => v + 1)
  .every(v => v % 2 == 0);

console.log(output);

output = new KasenArray(input)
  .map(v => v + 1)
  .find(v => v === 3);

console.log(output);

output = new KasenArray(input)
  .map(v => v + 1)
  .findLast(v => v === 3);

console.log(output);

output = new KasenArray(input)
  .map(v => v + 1)
  .take(3)
  .map(v => v + 1)
  .toJs();

console.log(output);
