

//Implementar un sistema de tipos para un carrito de compras con funciones
//  para añadir/eliminar productos y calcular el total.


interface Product {
  name: string;
  price: number;
  stock: number;
  readonly id: number;
  description?: string;
}

type CartItem = Product & { quantity: number };

// Esta funcion resuelve el total de un producto como al total de un carrito
function calculateCartTotal(itemOrItems: Product | CartItem | (Product | CartItem)[]): number {
  const items = Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];

  return items.reduce((total, item) => {
    const isCartItem = "quantity" in item;
    const quantity = isCartItem ? item.quantity : item.stock;

    if (item.price < 0 || quantity < 0 || item.id < 0) 
      throw new Error("Datos inválidos: negativos no permitidos");
    
    if (isCartItem && item.quantity > item.stock) 
      throw new Error(
        `Cantidad solicitada (${item.quantity}) mayor al stock disponible (${item.stock}) para el producto "${item.name}"`
      );
    
    return total + item.price * quantity;
  }, 0);
}

//Ejercicio 2
function addProductToCart(cart: CartItem[], product: Product, quantity: number): CartItem[] {
  
  if (quantity <= 0 || quantity > product.stock) 
    throw new Error("Cantidad inválida");
  
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) 
    existingItem.quantity += quantity;
  else 
    cart.push({ ...product, quantity });

  return cart;
}

function removeProductFromCart(cart: CartItem[], productId: number): CartItem[] {
  const index = cart.findIndex(item => item.id === productId);
  
  if (index === -1) 
    throw new Error("Producto no encontrado en el carrito");
  
  cart.splice(index, 1);
  return cart;
}

function displayCart(cart: CartItem[]): void {
  if (cart.length === 0) {
    console.log("🛒 El carrito está vacío.");
    return;
  }

  console.log("🛒 Productos en el carrito:");
  console.log("---------------------------");

  cart.forEach((item, index) => {
    console.log(`Producto #${index + 1}`);
    console.log(`🆔 ID: ${item.id}`);
    console.log(`📦 Nombre: ${item.name}`);
    console.log(`💵 Precio: $${item.price}`);
    console.log(`🔢 Cantidad en carrito: ${item.quantity}`);
    console.log(`📦 Stock disponible: ${item.stock}`);
    if (item.description) console.log(`📝 Descripción: ${item.description}`);
    console.log("---------------------------");
  });

}

// Ejemplo de uso ejercicio 1

const newProduct: Product = {
  id: 4,
  name: "Smartwatch",
  price: 200,
  stock: 20
};

const total = calculateCartTotal(newProduct); // Calcula el total de un solo producto

console.log(`El total del producto ${newProduct.name} es: USD$${total}`);

// Ejemplo de uso ejercicio 2


const cart: CartItem[] = [
  { name: "Laptop", price: 1000, stock: 5, id: 1, description: "High-end laptop", quantity: 2 },
  { name: "Smartphone", price: 500, stock: 10, id: 2, quantity: 1 },
  { name: "Tablet", price: 300, stock: 3, id: 3, quantity: 2 }
];

displayCart(cart);

// Añadir un nuevo producto al carrito
console.log("Añadiendo un nuevo producto al carrito...");
addProductToCart(cart, newProduct, 3);
displayCart(cart);

// Eliminar un producto del carrito
console.log("Eliminando un producto del carrito...");
removeProductFromCart(cart, 2);
displayCart(cart);

// Calcular el total del carrito
const cartTotal = calculateCartTotal(cart);
console.log(`El total del carrito es: USD$${cartTotal}`);