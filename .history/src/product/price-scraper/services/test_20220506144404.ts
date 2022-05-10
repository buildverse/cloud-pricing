import { of, mergeMap, interval, map } from 'rxjs';
 
const letters = of('a', 'b', 'c');
const result = letters.pipe(
  mergeMap(x => interval(1000).pipe(map(i => x + i)))
);
 
result.subscribe(x => console.log(x));