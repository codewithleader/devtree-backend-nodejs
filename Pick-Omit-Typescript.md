```typescript
type Product = {
  id: number;
  name: string;
  price: number;
};

// Pick permite extraer una propiedad y excluir las demás
type ProductID = Pick<Product, 'id'>;
// Resultado
type ProductId = {
  id: number;
};

// Omit: omite solo la propiedad indicada y deja las restantes
type ProductName = Omit<Product, 'id' | 'price'>;
// Resultado
type ProductName = {
  name: string;
};
```
