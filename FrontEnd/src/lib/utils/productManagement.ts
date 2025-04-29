import { Status } from "./dataManagement";

export function subTotalesDeProductos({productWithStatus} : {

    productWithStatus: {
        status: Status;
        id: string;
        userId: string;
        name: string;
        price: number;
        quantity: number;
        expirationDate: string;
    }[]
}){

  //Sumar todos los subtotales de los productos 
  const groupedProducts = productWithStatus.reduce((acc, product) => {
    const key = `${product.name}_${product.status}`; // Unique key for name + status
  
    if (!acc[key]) {
      acc[key] = {
        name: product.name,
        status: product.status,
        quantity: product.quantity, // Initialize with the product's quantity
        expirationDates: new Set<string>(), // Track unique expiration dates
      };
    } else {
      acc[key].quantity += product.quantity; // Sum quantities
    }
  
    acc[key].expirationDates.add(product.expirationDate); // Track unique dates
    return acc;
  }, {} as Record<string, { name: string; status: Status; quantity: number; expirationDates: Set<string> }>);

  return groupedProducts;

}

export function totalPorStatus({groupedProducts}: {

    groupedProducts: Record<string, {
        name: string;
        status: Status;
        quantity: number;
        expirationDates: Set<string>;
    }>
}){

    const totalByStatus = Object.values(groupedProducts).reduce((acc, product) => {
        acc[product.status] = (acc[product.status] || 0) + product.quantity;
        return acc;
      }, {} as Record<string, number>);

      return totalByStatus;

}