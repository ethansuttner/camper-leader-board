function* test(i) {
  while (1) { 
    i++;
    yield i+1;
  }
}
let a = test(5);
for (let s of a) {
  console.log(s);
}
// console.log(a.next());
// console.log(a.next());
