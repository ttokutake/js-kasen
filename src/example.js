const KasenArray = require('./array');

const input = [1, 2, 3, 4];

console.log(input);

let array = new KasenArray(input)
  .map((v, i) => { console.log(i, v); return v + 1; })
  .reverse()
  .map((v, i) => { console.log(i, v); return v + 1; });

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
