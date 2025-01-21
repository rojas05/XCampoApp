const PRODUCT_LIST = [
  { name: "Manzanas", unit: "kg", price: 3.5, quantity: 2 },
  { name: "Pan", unit: "unidad", price: 1.0, quantity: 5 },
  { name: "Leche", unit: "litro", price: 1.2, quantity: 3 },
  { name: "Huevos", unit: "docena", price: 2.5, quantity: 1 },
];

const OrderListProducts = [
  {
    id: "001",
    products: PRODUCT_LIST,
    total: 12,
    totalItems: 7,
  },
  {
    id: "002",
    products: [
      { name: "Tomates", unit: "kg", price: 2.8, quantity: 1 },
      { name: "Queso", unit: "kg", price: 4.5, quantity: 0.5 },
    ],
    total: 4.05,
    totalItems: 2,
  },
  {
    id: "003",
    products: [
      { name: "Tomates", unit: "kg", price: 2.8, quantity: 1 },
      { name: "Queso", unit: "kg", price: 4.5, quantity: 0.5 },
    ],
    total: 4.05,
    totalItems: 2,
  },
  {
    id: "004",
    products: PRODUCT_LIST,
    total: 12,
    totalItems: 7,
  },
  {
    id: "005",
    products: PRODUCT_LIST,
    total: 12,
    totalItems: 7,
  },
];

export { OrderListProducts };
