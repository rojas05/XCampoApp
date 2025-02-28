const stores = [
  {
    idTienda: "tiendaA",
    nombre: "Tienda A",
    paradas: [
      {
        id: 1,
        tienda: "Tienda A",
        total: 3000,
        productos: [
          { id: 1, nombre: "Producto 1" },
          { id: 2, nombre: "Producto 2" },
        ],
        coordinate: {
          latitude: 1.8597457358731515, // "1.8597457358731515, -76.04371218824772"
          longitude: -76.04371218824772,
        },
      },
      {
        id: 2,
        tienda: "Tienda A",
        total: 2500,
        productos: [{ id: 3, nombre: "Producto 3" }],
        coordinate: { latitude: 1.856276, longitude: -76.043788 }, // "1.856276, -76.043788"
      },
      {
        id: 3,
        tienda: "Tienda A",
        total: 5000,
        productos: [{ id: 4, nombre: "Producto 4" }],
        coordinate: { latitude: 1.857976, longitude: -76.044588 },
      },
    ],
  },
  {
    idTienda: "tiendaB",
    nombre: "Tienda B",
    paradas: [
      {
        id: 4,
        tienda: "Tienda B",
        total: 45000,
        productos: [{ id: 5, nombre: "Producto 5" }],
        coordinate: { latitude: 1.858745, longitude: -76.045712 }, //  "1.858745, -76.045712"
      },
      {
        id: 5,
        tienda: "Tienda B",
        total: 40000,
        productos: [{ id: 6, nombre: "Producto 6" }],
        coordinate: { latitude: 1.860145, longitude: -76.046912 },
      },
      {
        id: 6,
        tienda: "Tienda B",
        total: 35000,
        productos: [{ id: 7, nombre: "Producto 7" }],
        coordinate: { latitude: 1.861445, longitude: -76.048312 },
      },
    ],
  },
  {
    idTienda: "tiendaC",
    nombre: "Tienda C",
    paradas: [
      {
        id: 7,
        tienda: "Tienda C",
        total: 42000,
        productos: [{ id: 8, nombre: "Cafe" }],
        coordinate: { latitude: 1.858345, longitude: -76.049812 },
      },
      {
        id: 8,
        tienda: "Tienda C",
        total: 46000,
        productos: [{ id: 9, nombre: "Tomate" }],
        coordinate: { latitude: 1.860245, longitude: -76.050912 },
      },
      {
        id: 9,
        tienda: "Tienda C",
        total: 48000,
        productos: [{ id: 10, nombre: "Lechuga" }],
        coordinate: { latitude: 1.861745, longitude: -76.052112 },
      },
    ],
  },
  {
    idTienda: "tiendaD",
    nombre: "Tienda D",
    paradas: [
      {
        id: 10,
        tienda: "Tienda D",
        total: 35000,
        productos: [{ id: 11, nombre: "Producto 11" }],
        coordinate: { latitude: 1.862245, longitude: -76.053212 },
      },
      {
        id: 11,
        tienda: "Tienda D",
        total: 29000,
        productos: [{ id: 12, nombre: "Producto 12" }],
        coordinate: { latitude: 1.863545, longitude: -76.054412 },
      },
      {
        id: 12,
        tienda: "Tienda D",
        total: 31000,
        productos: [{ id: 13, nombre: "Producto 13" }],
        coordinate: { latitude: 1.864845, longitude: -76.055612 },
      },
    ],
  },
  {
    idTienda: "tiendaE",
    nombre: "Tienda E",
    paradas: [
      {
        id: 13,
        tienda: "Tienda E",
        total: 37000,
        productos: [{ id: 14, nombre: "Producto 14" }],
        coordinate: { latitude: 1.865945, longitude: -76.056912 },
      },
      {
        id: 14,
        tienda: "Tienda E",
        total: 42000,
        productos: [{ id: 15, nombre: "Producto 15" }],
        coordinate: { latitude: 1.867145, longitude: -76.058212 },
      },
      {
        id: 15,
        tienda: "Tienda E",
        total: 38000,
        productos: [{ id: 16, nombre: "Producto 16" }],
        coordinate: { latitude: 1.868345, longitude: -76.059512 },
      },
    ],
  },
  {
    idTienda: "tiendaF",
    nombre: "Tienda F",
    paradas: [
      {
        id: 16,
        tienda: "Tienda F",
        total: 50000,
        productos: [{ id: 17, nombre: "Producto 17" }],
        coordinate: { latitude: 1.869545, longitude: -76.060712 },
      },
      {
        id: 17,
        tienda: "Tienda F",
        total: 48000,
        productos: [{ id: 18, nombre: "Producto 18" }],
        coordinate: { latitude: 1.870945, longitude: -76.061912 },
      },
      {
        id: 18,
        tienda: "Tienda F",
        total: 52000,
        productos: [{ id: 19, nombre: "Producto 19" }],
        coordinate: { latitude: 1.872245, longitude: -76.063112 },
      },
    ],
  },
];

const order = [
  {
    id: "ORD-1",
    fincaName: "Finca villa nueva",
    stops: 3,
    distance: 10.4,
    userName: "Juan Pérez",
    shippingCost: 2000,
    products: [
      { id: 1, name: "Tomates", quantity: 3, price: 3000, unit: "kg" },
      { id: 2, name: "Queso", quantity: 1, price: 5000, unit: "kg" },
      { id: 3, name: "Naranjas", quantity: 1, price: 5000, unit: "kg" },
    ],
  },
  {
    id: "ORD-2",
    fincaName: "Finca villa maria",
    stops: 2,
    distance: 4.4,
    userName: "María López",
    shippingCost: 3500,
    products: [
      { id: 4, name: "Cebollas", quantity: 2, price: 2000, unit: "kg" },
      { id: 5, name: "Acelga", quantity: 1, price: 3000, unit: "kg" },
    ],
  },
  {
    id: "ORD-3",
    fincaName: "Finca paraiso",
    stops: 2,
    distance: 8.4,
    userName: "Carlos Martínez",
    shippingCost: 5000,
    products: [
      { id: 6, name: "Papayas", quantity: 4, price: 4000, unit: "kg" },
      { id: 7, name: "Yuca", quantity: 5, price: 2000, unit: "kg" },
    ],
  },
  {
    id: "ORD-4",
    fincaName: "Finca primavera",
    stops: 2,
    distance: 3.4,
    userName: "Ana Torres",
    shippingCost: 1500,
    products: [
      { id: 8, name: "Papas", quantity: 2, price: 2500, unit: "kg" },
      { id: 9, name: "Zanahorias", quantity: 3, price: 1500, unit: "kg" },
    ],
  },
  {
    id: "ORD-5",
    fincaName: "Finca alta",
    stops: 3,
    distance: 1.4,
    userName: "Luis González",
    shippingCost: 800,
    products: [
      { id: 10, name: "Lechuga", quantity: 1, price: 1000, unit: "kg" },
    ],
  },
  {
    id: "ORD-6",
    fincaName: "Finca el encuentro",
    stops: 4,
    distance: 15.2,
    userName: "Pedro Gómez",
    shippingCost: 2500,
    products: [
      { id: 11, name: "Aguacates", quantity: 2, price: 5000, unit: "kg" },
      { id: 12, name: "Mangos", quantity: 2, price: 7000, unit: "kg" },
    ],
  },
  {
    id: "ORD-7",
    fincaName: "Finca sol y tierra",
    stops: 5,
    distance: 12.0,
    userName: "Luisa Fernández",
    shippingCost: 3000,
    products: [
      { id: 13, name: "Fresas", quantity: 6, price: 4000, unit: "kg" },
    ],
  },
  {
    id: "ORD-8",
    fincaName: "Finca del sol",
    stops: 2,
    distance: 6.3,
    userName: "Ricardo Herrera",
    shippingCost: 1500,
    products: [
      { id: 14, name: "Pimientos", quantity: 3, price: 4000, unit: "kg" },
    ],
  },
];

export { stores, order };
