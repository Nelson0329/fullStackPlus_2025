//Ejercicio 1: Utility Types
//Crea un sistema de gestión de productos que use Partial, Pick y Omit para diferentes operaciones ABM.
 
interface Product {
    id : string;
    name : string;
    description?: string;
    price:number;
    stock:number;
    category: string;
}


function createProduct( list: Product[], data: Omit<Product, 'id'> ): Product {
  
 const newProduct: Product = {...data, id: crypto.randomUUID()};

 list.push(newProduct);   

  return newProduct;
}

function deleteProduct(list: Product[], id: string): boolean {
  const index = list.findIndex(p => p.id === id);
 
  if (index === -1){
    console.error(`Product with id ${id} not found.`);
    return false;
  } 

  list.splice(index, 1);
  return true;
}

function listProductSummary(list: Product[]): Pick<Product, 'name' | 'stock'>[] {
  return list.map(({ name, stock }) => ({ name, stock }));
}

function updateProduct(list: Product[], id: string, data: Partial<Omit<Product, 'id'>>): Product | null {
  const index = list.findIndex(p => p.id === id);
  if (index === -1) return null;

  list[index] = { ...list[index], ...data };
  return list[index];
}



const products: Product[] = [
    {
        id: "1",
        name: "Laptop",
        description: "Laptop gaming",
        price: 1500,
        stock: 10,
        category: "Electronics",
    },
    {
        id: "2",
        name: "Smartphone",
        description: "Smartphone latest model",
        price: 800,
        stock: 20,
        category: "Electronics",
    },
    {
        id: "3",
        name: "Tablet",
        description: "Tablet with stylus support",
        price: 600,
        stock: 15,
        category: "Electronics",
    },
];


console.log(products);

  const prod1: Omit<Product, 'id'> = {
  name: "Smartwatch",
  description: "Smartwatch with health tracking",
  price: 300,
  stock: 25,
  category: "Electronics",
};  


const nuevo = createProduct(products, prod1);


updateProduct(products, nuevo.id, { stock: 5, price: 1400 });

console.log("Actualizamos stock y price del producto:");

console.log(listProductSummary(products));

console.log(products);


deleteProduct(products, nuevo.id);
console.log(products);