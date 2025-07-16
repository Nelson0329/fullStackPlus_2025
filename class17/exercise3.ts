/*
Ejercicio 5
Hay un arreglo con varios números donde todos son iguales excepto uno. Haga una función que encuentre qué número es el distinto.

findUniq([1,1,1,1,1,2,1,1,1])  # return (2)
*/

function findUniq(arr: number[]): number {
  const first = arr[0];
  const second = arr[1];
  
  if (first !== second) {
    return arr[2] === first ? second : first;
  }
  
  return arr.find(item => item !== first) as number;
}

// Ejemplo de uso
const numbers = [1, 1, 1, 1, 1, 2, 1, 1, 1];
const uniqueNumber = findUniq(numbers);
console.log(`El número distinto es: ${uniqueNumber}`); // Output: El número distinto es: 2